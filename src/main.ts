import { invoke } from "@tauri-apps/api/core";
import { info, warn, error, debug } from "@tauri-apps/plugin-log";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Icons } from "./icons";
import { t, setLocale, type Locale } from "./i18n";

// Forward console.log to Rust log file
function forwardConsole(
  fnName: 'log' | 'debug' | 'info' | 'warn' | 'error',
  logger: (message: string) => Promise<void>
) {
  const original = console[fnName];
  console[fnName] = (...args: any[]) => {
    original(...args);
    const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    logger(`[UI] ${msg}`);
  };
}

forwardConsole('log', info);
forwardConsole('debug', debug);
forwardConsole('info', info);
forwardConsole('warn', warn);
forwardConsole('error', error);

interface AppSettings {
    volume_ducking: number;
    default_source_lang: string;
    default_target_lang: string;
    use_proxy: boolean;
    proxy_url: string;
    use_lively_voice: boolean;
    sponsorblock_enabled: boolean;
    ui_language: string;
    theme: string;
    yandex_token?: string;
}

function applyTheme(theme: string) {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
}

window.addEventListener("DOMContentLoaded", async () => {
    const urlInputEl = document.querySelector("#url-input") as HTMLInputElement;
    const resultMsgEl = document.querySelector("#result-msg") as HTMLElement;

    const targetLang = document.querySelector("#set-target-lang") as HTMLSelectElement;
    const volDucking = document.querySelector("#set-volume") as HTMLInputElement;
    const volVal = document.querySelector("#vol-val") as HTMLElement;
    const livelyVoice = document.querySelector("#set-lively") as HTMLInputElement;
    const useProxy = document.querySelector("#set-use-proxy") as HTMLInputElement;
    const proxyHost = document.querySelector("#set-proxy-host") as HTMLInputElement;
    const proxyContainer = document.querySelector("#proxy-container") as HTMLElement;
    const btnLogin = document.querySelector("#btn-login-yandex") as HTMLButtonElement;
    const authStatus = document.querySelector("#auth-status") as HTMLElement;
    const btnPingProxy = document.querySelector("#btn-ping-proxy") as HTMLButtonElement;
    const proxyPingResult = document.querySelector("#proxy-ping-result") as HTMLElement;
    const uiLanguage = document.querySelector("#set-ui-language") as HTMLSelectElement;
    const themeSelect = document.querySelector("#set-theme") as HTMLSelectElement;

    const btnViewLogs = document.querySelector("#btn-view-logs") as HTMLButtonElement;
    const btnDownloadLogs = document.querySelector("#btn-download-logs") as HTMLButtonElement;
    const logsArea = document.querySelector("#logs-area") as HTMLTextAreaElement;

    // Auth state tracked explicitly (not via CSS color)
    let isAuthorized = false;

    function updateAuthStatus() {
        if (isAuthorized) {
            authStatus.innerText = t('auth.authorized');
            authStatus.style.color = "#4CAF50";
        } else {
            authStatus.innerText = t('auth.not_authorized');
            authStatus.style.color = "#aaa";
        }
    }

    // Check app tier
    try {
        const tier = await invoke("get_app_tier") as string;
        document.body.classList.add(`tier-${tier}`);
        if (tier !== 'free') {
            console.log(`${tier} features activated`);
        }
    } catch (e) {}

    // Load settings
    try {
        const settings: AppSettings = await invoke("get_settings");

        // Apply i18n first (so t() calls below use correct locale)
        const locale = (settings.ui_language || 'en') as Locale;
        uiLanguage.value = locale;
        setLocale(locale);

        // Apply theme
        const theme = settings.theme || 'dark';
        themeSelect.value = theme;
        applyTheme(theme);

        // Apply settings to UI
        targetLang.value = settings.default_target_lang;
        volDucking.value = (settings.volume_ducking * 100).toString();
        volVal.innerText = `${volDucking.value}%`;
        livelyVoice.checked = settings.use_lively_voice;
        useProxy.checked = settings.use_proxy;
        proxyHost.value = settings.proxy_url;
        proxyContainer.style.display = useProxy.checked ? "flex" : "none";

        // Auth status
        isAuthorized = !!settings.yandex_token;
        updateAuthStatus();
    } catch (e) {
        console.error("Failed to load settings:", e);
    }

    // Device Code Flow elements
    const deviceCodeFlow = document.querySelector("#device-code-flow") as HTMLElement;
    const deviceUserCode = document.querySelector("#device-user-code") as HTMLElement;
    const btnOpenDevicePage = document.querySelector("#btn-open-device-page") as HTMLButtonElement;
    const deviceStatus = document.querySelector("#device-status") as HTMLElement;
    let devicePollTimer: ReturnType<typeof setInterval> | null = null;

    // Yandex OAuth via Device Code Flow (avoids WebView issues on Android)
    btnLogin.addEventListener("click", async (e) => {
        e.preventDefault();
        if (devicePollTimer) return; // already in progress

        authStatus.innerText = t('auth.requesting_code');
        authStatus.style.color = "#FFC131";

        try {
            const codeResp = await invoke("request_device_code") as {
                device_code: string;
                user_code: string;
                verification_url: string;
                interval: number;
                expires_in: number;
            };

            // Show device code UI
            deviceCodeFlow.style.display = "block";
            deviceUserCode.textContent = codeResp.user_code;
            deviceStatus.innerText = t('auth.waiting_for_auth');
            deviceStatus.style.color = "#FFC131";
            btnLogin.disabled = true;

            // Open verification URL in system browser
            btnOpenDevicePage.onclick = () => {
                openUrl(codeResp.verification_url);
            };

            // Poll for token
            const interval = Math.max(codeResp.interval || 5, 5) * 1000;
            const expiresAt = Date.now() + codeResp.expires_in * 1000;

            devicePollTimer = setInterval(async () => {
                if (Date.now() > expiresAt) {
                    clearInterval(devicePollTimer!);
                    devicePollTimer = null;
                    deviceCodeFlow.style.display = "none";
                    btnLogin.disabled = false;
                    authStatus.innerText = t('auth.code_expired');
                    authStatus.style.color = "#ff5e5e";
                    return;
                }

                try {
                    const tokenResp = await invoke("poll_device_token", {
                        deviceCode: codeResp.device_code
                    }) as { access_token?: string; error?: string };

                    if (tokenResp.access_token) {
                        clearInterval(devicePollTimer!);
                        devicePollTimer = null;

                        // Save token
                        await invoke("save_yandex_token", { token: tokenResp.access_token });
                        isAuthorized = true;
                        updateAuthStatus();
                        deviceCodeFlow.style.display = "none";
                        btnLogin.disabled = false;
                        console.log("Device code auth successful");
                    }
                    // If error is "authorization_pending", just keep polling
                } catch (err) {
                    console.error("Poll error:", err);
                }
            }, interval);

        } catch (err) {
            console.error("Failed to request device code:", err);
            authStatus.innerText = t('auth.code_request_failed');
            authStatus.style.color = "#ff5e5e";
        }
    });

    // Save settings helper — loads current settings first to preserve fields not in UI
    const saveSettings = async () => {
        let current: AppSettings | null = null;
        try { current = await invoke("get_settings"); } catch (_) {}
        const newSettings: AppSettings = {
            volume_ducking: parseInt(volDucking.value) / 100.0,
            default_source_lang: "en",
            default_target_lang: targetLang.value,
            use_proxy: useProxy.checked,
            proxy_url: proxyHost.value,
            use_lively_voice: livelyVoice.checked,
            sponsorblock_enabled: current?.sponsorblock_enabled ?? true,
            ui_language: uiLanguage.value,
            theme: themeSelect.value,
            yandex_token: current?.yandex_token,
        };
        try {
            await invoke("save_settings", { newSettings });
        } catch (e) {
            console.error("Failed to save settings:", e);
        }
    };

    // UI event bindings
    targetLang.addEventListener("change", saveSettings);
    livelyVoice.addEventListener("change", saveSettings);
    proxyHost.addEventListener("input", saveSettings);

    volDucking.addEventListener("input", () => {
        volVal.innerText = `${volDucking.value}%`;
        saveSettings();
    });

    useProxy.addEventListener("change", () => {
        proxyContainer.style.display = useProxy.checked ? "flex" : "none";
        saveSettings();
    });

    // Language selector — hot-reload
    uiLanguage.addEventListener("change", () => {
        setLocale(uiLanguage.value as Locale);
        updateAuthStatus();
        saveSettings();
    });

    // Theme selector
    themeSelect.addEventListener("change", () => {
        applyTheme(themeSelect.value);
        saveSettings();
    });

    btnPingProxy.addEventListener("click", async (e) => {
        e.preventDefault();
        const proxyUrl = proxyHost.value.trim();
        proxyPingResult.style.color = "#FFC131";
        proxyPingResult.innerText = t('settings.proxy_pinging');

        try {
            const ms = await invoke("ping_proxy", { proxyUrl });
            proxyPingResult.style.color = "#4CAF50";
            proxyPingResult.innerText = t('settings.proxy_success', { ms: ms as number });
        } catch (err: any) {
            proxyPingResult.style.color = "#ff5e5e";
            proxyPingResult.innerText = t('settings.proxy_failed', { error: err });
        }
    });

    // Open video
    document.querySelector("#translate-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (urlInputEl.value) {
            console.log(`Requested translation for: ${urlInputEl.value}`);
            resultMsgEl.innerHTML = `<span style="color: #4CAF50;"${Icons.videoRedirectShow} ${t('url.redirecting')}</span>`;
            window.location.href = urlInputEl.value;
        }
    });

    // Logs
    btnViewLogs.addEventListener("click", async () => {
        try {
            const logs: string = await invoke("get_logs");
            logsArea.style.display = "block";
            logsArea.value = logs || t('logs.empty');
            logsArea.scrollTop = logsArea.scrollHeight;
        } catch (e) {
            console.error(e);
        }
    });

    btnDownloadLogs.addEventListener("click", async () => {
        const fallbackCopyToClipboard = async () => {
            const logs: string = await invoke("get_logs");
            await navigator.clipboard.writeText(logs);
            alert(t('logs.copied'));
        };

        try {
            if (/android/i.test(navigator.userAgent)) {
                const logs: string = await invoke("get_logs");
                const file = new File([logs], "crabvoice.log", { type: "text/plain" });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({ files:[file], title: 'CrabVoice Logs' });
                } else {
                    await fallbackCopyToClipboard();
                }
            } else {
                const path: string = await invoke("export_logs");
                alert(t('logs.saved', { path }));
            }
        } catch (e) {
            console.warn("Export failed, falling back to clipboard...", e);
            try {
                await fallbackCopyToClipboard();
            } catch (err) {
                alert(t('logs.copy_failed'));
            }
        }
    });

    // Apply icons
    document.querySelectorAll('[data-icon]').forEach(el => {
        const iconName = el.getAttribute('data-icon');
        if (iconName && Icons[iconName]) {
            el.innerHTML = Icons[iconName];
        }
    });

    // Reset PIP state — home page should not trigger PIP on Home button
    invoke("set_pip_allowed", { allowed: false }).catch(() => {});

    // Check for URL shared via Android share menu — also re-check when app returns to foreground
    // (handles case where app was already open and user shared a new URL)
    const checkSharedUrl = async () => {
        try {
            const sharedUrl = await invoke("consume_shared_url") as string | null;
            if (sharedUrl) {
                console.log(`Opening shared URL: ${sharedUrl}`);
                urlInputEl.value = sharedUrl;
                resultMsgEl.innerHTML = `<span style="color: #4CAF50;">${Icons.videoRedirectShow} ${t('url.redirecting')}</span>`;
                window.location.href = sharedUrl;
            }
        } catch (e) {
            console.warn("consume_shared_url failed:", e);
        }
    };

    await checkSharedUrl();

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            checkSharedUrl();
        }
    });

    console.log("Main UI loaded successfully");
});
