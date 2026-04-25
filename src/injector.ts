import { getService, getVideoData } from "@vot.js/ext/utils/videoData";  
import type { ServiceConf } from "@vot.js/ext/types/service";
import { CrabPanel, type AppTier } from "./injectorPanel";
import { t, setLocale, type Locale } from "./i18n";

// Универсальная функция отправки логов из песочницы инжектора в Rust
// Инжектор работает на внешних сайтах, где JS API плагина недоступен, поэтому вызываем кастомную Rust-команду
const invokeLog = (source: string, msg: string) => {
    if (window.__TAURI__) {
        window.__TAURI__.core.invoke("log_message", { source, msg }).catch(()=>{});
    }
};

const appLog = (msg: string) => {
    console.log("[CrabVoice Injector]", msg);
    invokeLog("info", msg);
};

// Перехватываем ошибки от vot.js и самого плеера
const originalError = console.error;
console.error = (...args) => {
    originalError(...args);
    const msg = args.map(a => {
        if (a instanceof Error) return `${a.name}: ${a.message}\n${a.stack}`;
        if (typeof a === 'object') return JSON.stringify(a, null, 2);
        return String(a);
    }).join(" ");
    invokeLog("error", msg);
};

declare global {
    interface Window {
        __TAURI__?: {
            core: { invoke(cmd: string, args?: any): Promise<any>; };
        };
        _cvInitialized?: boolean;
        _cvHomeUrl?: string;
        trustedTypes?: any;
        _cvPolicy?: any;
    }
}

interface AppSettings {
    volume_ducking: number;
    default_source_lang: string;
    default_target_lang: string;
    sponsorblock_enabled: boolean;
    ui_language: string;
    use_proxy: boolean;
    proxy_url: string;
    yandex_token: string | null;
}

if (!window._cvInitialized) {
    window._cvInitialized = true;

    // When user shares a URL while app is foregrounded on any page,
    // visibilitychange fires when app returns — pick up the shared URL and navigate.
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") return;
        if (!window.__TAURI__) return;
        window.__TAURI__.core.invoke("consume_shared_url").then((url: string | null) => {
            if (url) window.location.href = url;
        }).catch(() => {});
    });

    const isHome = window.location.hostname === 'localhost' || window.location.hostname === 'tauri.localhost' || window.location.protocol === 'tauri:';


    // Skip vot.js/CrabPanel injection on non-video pages
    // OAuth/auth pages cause webview hangs on Android when vot.js walks the DOM
    const skipDomains = ['oauth.yandex.', 'passport.yandex.', 'accounts.google.', 'login.yandex.', 'sso.yandex.'];
    const hostname = window.location.hostname;
    const shouldSkipInjection = isHome || skipDomains.some(d => hostname.includes(d));

    if (!isHome) {
        appLog(`CrabVoice Injector attached to ${window.location.hostname}${shouldSkipInjection ? ' (skip mode)' : ''}`);
    }

    let mainVideo: HTMLVideoElement | null = null;
    let audioObj: HTMLAudioElement | null = null;
    let isTranslating = false;
    let currentVideoUrl = "";
    let countdownInterval: any = null;
    
    // Временные стейты пульта
    let appSettings: AppSettings | null = null;
    let translationPaused = false;
    let userAudioVolume = 1.0;
    let userVideoVolume = 0.15; // По умолчанию будет перезаписано из настроек

    let panelInstance: CrabPanel | null = null;
    let appTier: AppTier = 'free';
    let sponsorBlockEnabled = true;

    function updateStatus(text: string, color?: string) {
        if (panelInstance) {
            panelInstance.updateStatus(text, color || '#fff');
        }
    }

    let userFullscreen = false;
    let savedVideoStyles: Record<string, string> | null = null;
    let savedBodyStyles: { background: string; overflow: string } | null = null;
    let savedVideoParent: Node | null = null;
    let savedVideoNextSibling: Node | null = null;

    const CINEMATIC_VIDEO_STYLES: Record<string, string> = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        'z-index': '999999',
        'object-fit': 'contain',
        background: '#000',
        margin: '0',
    };

    function enterCinematic() {
        if (!mainVideo) return;
        if (savedVideoStyles) return; // already active
        savedVideoStyles = {};
        for (const key of Object.keys(CINEMATIC_VIDEO_STYLES)) {
            savedVideoStyles[key] = mainVideo.style.getPropertyValue(key);
        }
        savedBodyStyles = {
            background: document.body.style.getPropertyValue('background'),
            overflow: document.body.style.getPropertyValue('overflow'),
        };
        // Move video to body root so position:fixed escapes any transformed ancestors
        savedVideoParent = mainVideo.parentNode;
        savedVideoNextSibling = mainVideo.nextSibling;
        if (savedVideoParent !== document.body) {
            document.body.appendChild(mainVideo);
        }
        for (const [key, value] of Object.entries(CINEMATIC_VIDEO_STYLES)) {
            mainVideo.style.setProperty(key, value, 'important');
        }
        document.body.style.setProperty('background', '#000', 'important');
        document.body.style.setProperty('overflow', 'hidden', 'important');
        const r = mainVideo.getBoundingClientRect();
        const cs = getComputedStyle(mainVideo);
        appLog(`Cinematic ON: rect=${r.left}x${r.top} ${r.width}x${r.height} parent=${mainVideo.parentNode?.nodeName} pos=${cs.position} z=${cs.zIndex} display=${cs.display} vis=${cs.visibility} opacity=${cs.opacity}`);
        try {
            const els = document.elementsFromPoint(window.innerWidth/2, window.innerHeight/2)
                .slice(0, 4).map((e: any) => `${e.tagName}.${(e.className?.toString?.() || '').slice(0,30)}`).join(' > ');
            appLog(`Cinematic ON: top elements at center: ${els}`);
        } catch (e) { appLog(`elementsFromPoint err: ${e}`); }
    }

    function exitCinematic() {
        if (!mainVideo || !savedVideoStyles || !savedBodyStyles) return;
        for (const key of Object.keys(CINEMATIC_VIDEO_STYLES)) {
            const v = savedVideoStyles[key];
            if (v) mainVideo.style.setProperty(key, v);
            else mainVideo.style.removeProperty(key);
        }
        // Restore original DOM position
        if (savedVideoParent && savedVideoParent !== document.body) {
            try {
                if (savedVideoNextSibling && savedVideoParent.contains(savedVideoNextSibling)) {
                    savedVideoParent.insertBefore(mainVideo, savedVideoNextSibling);
                } else {
                    savedVideoParent.appendChild(mainVideo);
                }
            } catch (e) {
                appLog(`Failed to restore video position: ${e}`);
            }
        }
        document.body.style.setProperty('background', savedBodyStyles.background);
        document.body.style.setProperty('overflow', savedBodyStyles.overflow);
        savedVideoStyles = null;
        savedBodyStyles = null;
        savedVideoParent = null;
        savedVideoNextSibling = null;
        appLog('Cinematic mode OFF');
    }

    function toggleFullscreen() {
        appLog(`Fullscreen toggle requested, mainVideo=${!!mainVideo}, current=${userFullscreen}`);
        if (!mainVideo) return;
        userFullscreen = !userFullscreen;
        if (userFullscreen) {
            enterCinematic();
            try { (screen.orientation as any)?.lock?.('landscape').catch(() => {}); } catch (_) {}
        } else {
            exitCinematic();
            try { (screen.orientation as any)?.unlock?.(); } catch (_) {}
        }
    }

    // Allow PIP whenever injector loads on a non-home page (a video site).
    // Home page disables it via main.ts. This is more robust than tracking playback
    // because mobile event listeners can be unreliable on pages like YouTube.
    if (!isHome && window.__TAURI__) {
        window.__TAURI__.core.invoke("set_pip_allowed", { allowed: true }).catch(() => {});
    }

    // Detect Android system PIP via tiny viewport (PIP windows are ~256x144).
    // Phones never go below ~350 wide, so this is a safe threshold without feedback loops.
    let pipMode = false;
    let pauseListenersAttached = false;

    const onMediaPause = function(this: HTMLMediaElement) {
        if (pipMode && !this.ended) this.play().catch(() => {});
    };

    function attachPauseListeners() {
        if (pauseListenersAttached) return;
        if (mainVideo) mainVideo.addEventListener('pause', onMediaPause);
        if (audioObj) audioObj.addEventListener('pause', onMediaPause);
        pauseListenersAttached = true;
    }

    window.addEventListener('resize', () => {
        const isPip = window.innerWidth < 350;
        if (isPip === pipMode) return;
        pipMode = isPip;
        appLog(`PIP mode change: ${isPip} (viewport=${window.innerWidth}x${window.innerHeight})`);
        if (isPip) {
            if (!userFullscreen) enterCinematic();
            if (panelInstance) panelInstance.host.style.setProperty('display', 'none', 'important');
            attachPauseListeners();
            if (mainVideo && mainVideo.paused && !mainVideo.ended) mainVideo.play().catch(() => {});
            if (audioObj && audioObj.paused && !audioObj.ended) audioObj.play().catch(() => {});
        } else {
            if (panelInstance) panelInstance.host.style.removeProperty('display');
            if (!userFullscreen) exitCinematic();
        }
        if (mainVideo) {
            appLog(`PIP video state: paused=${mainVideo.paused} ended=${mainVideo.ended} currentTime=${mainVideo.currentTime.toFixed(2)} readyState=${mainVideo.readyState}`);
        }
    });

    // Prevent sites (YouTube etc.) from pausing video on visibility/focus change.
    // PIP/background marks page hidden + window blurs — sites listening to these pause the video.
    if (!isHome) {
        try {
            Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
            Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
            Object.defineProperty(document, 'webkitHidden', { configurable: true, get: () => false });
            document.hasFocus = () => true;
            // Suppress visibility/focus loss events so sites' own listeners never fire
            const blockEvents = ['visibilitychange', 'webkitvisibilitychange', 'blur', 'pagehide'];
            for (const ev of blockEvents) {
                window.addEventListener(ev, (e) => { e.stopImmediatePropagation(); }, true);
                document.addEventListener(ev, (e) => { e.stopImmediatePropagation(); }, true);
            }
            appLog('Page Visibility/Focus spoofed for background playback');
        } catch (e) {
            appLog(`Failed to spoof visibility/focus: ${e}`);
        }
    }

    let sponsorSegments: {start: number, end: number, category: string}[] =[];

    // Главная функция синхронизации
    function syncAudio() {
        if (!mainVideo || !audioObj) return;
        
        // SponsorBlock: skip ad segments when enabled
        if (sponsorBlockEnabled && sponsorSegments.length > 0 && !mainVideo.paused) {
            const ct = mainVideo.currentTime;
            for (let seg of sponsorSegments) {
                if (ct >= seg.start && ct < seg.end) {
                    mainVideo.currentTime = seg.end;
                    appLog(`SponsorBlock: Skipped ${seg.category} (${seg.start.toFixed(1)}s -> ${seg.end.toFixed(1)}s)`);
                    updateStatus(t('status.skipped', { category: seg.category }), "#FFD700");
                    setTimeout(() => updateStatus(t('status.linked'), "#4CAF50"), 3000);
                    break;
                }
            }
        }

        // 1. Управление громкостью оригинала
        if (mainVideo.volume !== userVideoVolume) {
            mainVideo.volume = userVideoVolume;
        }
        
        // 2. Управление громкостью перевода
        audioObj.volume = userAudioVolume;

        // 3. Синхронизация Play/Pause
        if (translationPaused || mainVideo.paused || mainVideo.ended) {
            audioObj.pause();
        } else if (audioObj.paused) {
            audioObj.play().catch(() => {});
        }
        
        // 4. Синхронизация времени
        if (Math.abs(audioObj.currentTime - mainVideo.currentTime) > 0.3) {
            audioObj.currentTime = mainVideo.currentTime;
        }
        
        // 5. Синхронизация скорости
        if (audioObj.playbackRate !== mainVideo.playbackRate) {
            audioObj.playbackRate = mainVideo.playbackRate;
        }
    }

    async function requestTranslation(v: HTMLVideoElement, forceRefresh: boolean = false) {
        if (isTranslating && !forceRefresh) return;

        appLog(`Current URL: ${window.location.href}`);
        appLog(`Hostname: ${window.location.hostname}`);
        
        isTranslating = true;
        currentVideoUrl = window.location.href;
        let attempts = 0;
        let apiErrorRetries = 0;

        // Загружаем настройки из Rust, если еще не загрузили
        if (!appSettings && window.__TAURI__) {
            try {

                appSettings = await window.__TAURI__.core.invoke("get_settings");
                userVideoVolume = appSettings!.volume_ducking;
                sponsorBlockEnabled = appSettings!.sponsorblock_enabled ?? true;
                if (appSettings!.ui_language) {
                    setLocale(appSettings!.ui_language as Locale, false);
                }
                if (panelInstance) {
                    panelInstance.setVideoVolumeSlider(userVideoVolume);
                    panelInstance.setSponsorBlockState(sponsorBlockEnabled);

                    // Update status indicators
                    panelInstance.updateIndicator('sponsorblock', sponsorBlockEnabled ? 'ok' : 'off');
                    panelInstance.updateIndicator('auth', appSettings!.yandex_token ? 'ok' : 'off');
                    if (appSettings!.use_proxy && appSettings!.proxy_url) {
                        panelInstance.updateIndicator('proxy', 'ok');
                        try {
                            await window.__TAURI__!.core.invoke("ping_proxy", { proxyUrl: appSettings!.proxy_url });
                        } catch {
                            panelInstance.updateIndicator('proxy', 'error');
                        }
                    } else {
                        panelInstance.updateIndicator('proxy', 'off');
                    }
                }
            } catch (e) { console.error("CrabVoice: Failed to fetch settings", e); }
        }

        try {
            // Получаем конфигурацию сервиса для текущей страницы  
            const services = getService();
            appLog(`Services found: ${JSON.stringify(services)}`);
            if (!services.length) {  
                console.error("Сервис не определен для текущей страницы");  
                throw new Error("Unknown service");
            }

            // Берем первый подходящий сервис  
            const service: ServiceConf = services[0];

            appLog("Extracting video data via VOT.js");
            updateStatus(t('status.extracting'), "#24c8db");

            const videoData = await getVideoData(service);

            const duration = videoData?.duration || v.duration || 344.0;
            appLog(`Video data: service=${JSON.stringify(service.host)}, duration=${duration}, videoId=${videoData?.videoId ?? 'unknown'}`);

            // Load SponsorBlock segments (subscribers+ tier, YouTube only)
            if (appTier !== 'free' && sponsorBlockEnabled && window.location.hostname.includes("youtube.com")) {
                const urlObj = new URL(window.location.href);
                const videoId = urlObj.searchParams.get("v");
                if (videoId && window.__TAURI__) {
                    try {
                        sponsorSegments = await window.__TAURI__.core.invoke("get_skip_segments", { videoId });
                        if (sponsorSegments.length > 0) {
                            appLog(`SponsorBlock: Loaded ${sponsorSegments.length} segments`);
                        }
                        if (panelInstance) panelInstance.updateIndicator('sponsorblock', 'ok');
                    } catch (e) {
                        if (panelInstance) panelInstance.updateIndicator('sponsorblock', 'error');
                    }
                }
            }

            const pollTranslation = async () => {
                if (window.location.href !== currentVideoUrl) {
                    appLog("URL changed, stopping poll");
                    isTranslating = false;
                    return;
                }
                
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }

                updateStatus(t('status.requesting'), "#FFC131");

                try {
                    const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
                    if (!invoke) return;

                    appLog(`Poll attempt=${attempts}, firstRequest=${attempts === 0}`);
                    const res = await Promise.race([
                        invoke("translate", { url: window.location.href, duration, firstRequest: attempts === 0 }),
                        new Promise((_, reject) => setTimeout(() => reject(new Error("Network error")), 35000))
                    ]) as any;
                    
                    appLog(`Response: status=${res.status}, remaining_time=${res.remaining_time ?? 'none'}, hasUrl=${!!res.url}`);

                    if (res.status === 1 && res.url) {
                        appLog("Translation successful! Playing native audio...");
                        updateStatus(t('status.linked'), "#4CAF50");
                        
                        if (audioObj) {
                            audioObj.pause();
                            audioObj.src = "";
                        }
                        
                        audioObj = new Audio(res.url);
                        translationPaused = false;
                        if (panelInstance) panelInstance.setPlayPauseState(false);

                        const events =['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ratechange', 'timeupdate'];
                        events.forEach(e => v.addEventListener(e, syncAudio));
                        syncAudio();
                    } else {
                        attempts++;
                        if (attempts > 30) {
                            updateStatus(t('status.timeout'), "#ff5e5e");
                            isTranslating = false;
                            return;
                        }

                        let timeLeft = (res.remaining_time && res.remaining_time > 0) ? res.remaining_time : 15;
                        updateStatus(`Processing... (~${timeLeft}s) ⏳`, "#FFC131");
                        
                        countdownInterval = setInterval(() => {
                            if (window.location.href !== currentVideoUrl) {
                                clearInterval(countdownInterval);
                                return;
                            }
                            timeLeft--;
                            if (timeLeft > 0) {
                                updateStatus(t('status.processing', { seconds: timeLeft }), "#FFC131");
                            } else {
                                clearInterval(countdownInterval);
                                pollTranslation();
                            }
                        }, 1000);
                    }
                } catch (e: any) {
                    const errStr = e?.toString() ?? '';
                    appLog(`Backend error (attempt=${attempts}): ${errStr}`);

                    const isApiError = errStr.includes('API error');
                    if (isApiError && apiErrorRetries < 3) {
                        apiErrorRetries++;
                        appLog(`API error retry ${apiErrorRetries}/3 — restarting session in 10s`);
                        updateStatus(t('status.retrying', { attempt: apiErrorRetries }), "#FFC131");
                        attempts = 0;
                        setTimeout(pollTranslation, 10000);
                        return;
                    }

                    let userMsg = t('error.unknown');
                    if (errStr.startsWith('Network error')) userMsg = t('error.network');
                    else if (isApiError) userMsg = t('error.api');
                    else if (errStr.startsWith('Parse error')) userMsg = t('error.parse');
                    else if (errStr.startsWith('Config error')) userMsg = t('error.config');
                    updateStatus(userMsg + " ⚠️", "#ff5e5e");
                    isTranslating = false;
                }
            };
            
            pollTranslation();

        } catch (error) {
            updateStatus(t('status.parse_error'), "#ff5e5e");
            isTranslating = false;
        }
    }

    const walkDOMForVideo = (root: any): HTMLVideoElement | null => {
        // Сначала соберем все видео в текущем контексте
        const videos = root.querySelectorAll('video');
        
        if (videos.length > 0) {
            appLog(`Found ${videos.length} video elements in current context.`);
            for (let i = 0; i < videos.length; i++) {
                const v = videos[i];
                appLog(`Checking video #${i}: duration=${v.duration}, width=${v.offsetWidth}, src=${v.src?.substring(0, 30)}...`);
                
                // Проверяем критерии
                if (v.duration > 0 && v.offsetWidth > 100) {
                    appLog(`SUCCESS: Found valid video at index ${i}`);
                    return v;
                }
            }
        }

        // Если не нашли, идем в Shadow DOM
        const els = root.querySelectorAll('*');
        for (let el of els) {
            if (el.shadowRoot) {
                // Рекурсивно проверяем Shadow DOM
                const res = walkDOMForVideo(el.shadowRoot);
                if (res) return res;
            }
        }
        return null;
    };

    // Load tier once at startup
    if (window.__TAURI__) {
        window.__TAURI__.core.invoke("get_app_tier").then((tier: string) => {
            appTier = tier as AppTier;
            appLog(`App tier: ${appTier}`);
        }).catch(() => {});
    }

    const checkAndInject = () => {
        if (shouldSkipInjection) return;

        if (mainVideo && (!mainVideo.isConnected || window.location.href !== currentVideoUrl)) {
            mainVideo = null;
            if (audioObj) { audioObj.pause(); audioObj = null; }
            if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
            isTranslating = false;
            updateStatus(t('status.searching_new'), "#FFC131");
        }

        let panelHost = document.getElementById('cv-panel-host');
        if (!panelHost && !panelInstance) {
            panelInstance = new CrabPanel({
                onClose: () => {
                    history.back();
                },
                onAudioVolume: (val: number) => {
                    userAudioVolume = val;
                    if (audioObj) audioObj.volume = userAudioVolume;
                },
                onVideoVolume: (val: number) => {
                    userVideoVolume = val;
                    if (mainVideo) mainVideo.volume = userVideoVolume;
                },
                onTogglePlay: (paused: boolean) => {
                    translationPaused = paused;
                    syncAudio();
                },
                onRefresh: () => {
                    if (audioObj) { audioObj.pause(); audioObj.src = ""; }
                    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
                    translationPaused = false;
                    if (panelInstance) panelInstance.setPlayPauseState(false);
                    if (mainVideo) requestTranslation(mainVideo, true);
                },
                onFullscreen: () => toggleFullscreen(),
                onSponsorBlockToggle: (enabled: boolean) => {
                    sponsorBlockEnabled = enabled;
                    if (panelInstance) panelInstance.updateIndicator('sponsorblock', enabled ? 'ok' : 'off');
                    appLog(`SponsorBlock toggled: ${enabled}`);
                    // Persist setting
                    if (window.__TAURI__ && appSettings) {
                        appSettings.sponsorblock_enabled = enabled;
                        window.__TAURI__.core.invoke("save_settings", { newSettings: appSettings }).catch(() => {});
                    }
                }
            }, { tier: appTier, sponsorBlockEnabled });
            document.documentElement.appendChild(panelInstance.host);
        }

        if (!mainVideo && !isTranslating) {
            let v = document.querySelector(".html5-video-container video, video.vjs-tech, .fp-player video") as HTMLVideoElement;
            if (!v || v.duration === 0) v = walkDOMForVideo(document) as HTMLVideoElement;
            appLog(`Found video element: ${!!v}`);
            if (v && v.duration > 0 && v.offsetWidth > 100) {
                mainVideo = v;
                requestTranslation(v);
            }
        }
    };

    setInterval(checkAndInject, 1000);
}