import { invoke } from "@tauri-apps/api/core";

const appLog = (msg: string) => {
    console.log("[CrabVoice UI]", msg);
    invoke("log_message", { source: "UI", msg }).catch(()=>{});
};

// Интерфейс должен совпадать со структурой в Rust
interface AppSettings {
    volume_ducking: number;
    default_source_lang: string;
    default_target_lang: string;
    use_proxy: boolean;
    proxy_url: string;
    use_lively_voice: boolean;
}

window.addEventListener("DOMContentLoaded", async () => {
    const urlInputEl = document.querySelector("#url-input") as HTMLInputElement;
    const resultMsgEl = document.querySelector("#result-msg") as HTMLElement;
    
    // Элементы настроек
    const targetLang = document.querySelector("#set-target-lang") as HTMLSelectElement;
    const volDucking = document.querySelector("#set-volume") as HTMLInputElement;
    const volVal = document.querySelector("#vol-val") as HTMLElement;
    const livelyVoice = document.querySelector("#set-lively") as HTMLInputElement;
    const useProxy = document.querySelector("#set-use-proxy") as HTMLInputElement;
    const proxyHost = document.querySelector("#set-proxy-host") as HTMLInputElement;
    const proxyContainer = document.querySelector("#proxy-container") as HTMLElement;
    const btnLogin = document.querySelector("#btn-login-yandex") as HTMLButtonElement;
    const authStatus = document.querySelector("#auth-status") as HTMLElement;
    
    // Элементы логов
    const btnViewLogs = document.querySelector("#btn-view-logs") as HTMLButtonElement;
    const btnDownloadLogs = document.querySelector("#btn-download-logs") as HTMLButtonElement;
    const logsArea = document.querySelector("#logs-area") as HTMLTextAreaElement;

    // 1. Загрузка настроек из Rust
    try {
        // @ts-ignore - yandex_token added in backend
        const settings: AppSettings & { yandex_token?: string } = await invoke("get_settings");
        
        targetLang.value = settings.default_target_lang;
        volDucking.value = (settings.volume_ducking * 100).toString();
        volVal.innerText = `${volDucking.value}%`;
        livelyVoice.checked = settings.use_lively_voice;
        useProxy.checked = settings.use_proxy;
        proxyHost.value = settings.proxy_url;
        
        proxyContainer.style.display = useProxy.checked ? "flex" : "none";

        if (settings.yandex_token) {
            authStatus.innerText = "✅ Authorized";
            authStatus.style.color = "#4CAF50";
        } else {
            authStatus.innerText = "❌ Not authorized";
        }
    } catch (e) {
        console.error("Failed to load settings:", e);
    }

    // Обработчик входа в Яндекс (Mobile First: редирект в текущем окне)
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        authStatus.innerText = "Redirecting to Yandex...";
        // Используем прямой официальный Yandex OAuth вместо мертвого сервера-прокладки
        window.location.href = "https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d";
    });

    // 2. Функция сохранения
    const saveSettings = async () => {
        const newSettings: AppSettings = {
            volume_ducking: parseInt(volDucking.value) / 100.0,
            default_source_lang: "en", // Пока хардкодим source, чтобы не усложнять UI
            default_target_lang: targetLang.value,
            use_proxy: useProxy.checked,
            proxy_url: proxyHost.value,
            use_lively_voice: livelyVoice.checked
        };
        try {
            await invoke("save_settings", { newSettings });
        } catch (e) {
            console.error("Failed to save settings:", e);
        }
    };

    // 3. Подписка на изменения UI
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

    // 4. Запуск перевода
    document.querySelector("#translate-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (urlInputEl.value) {
            appLog(`Requested translation for: ${urlInputEl.value}`);
            resultMsgEl.innerHTML = `<span style="color: #4CAF50;">🎬 Redirecting... Translation will start automatically.</span>`;
            window.location.href = urlInputEl.value;
        }
    });

    // 5. Логи
    btnViewLogs.addEventListener("click", async () => {
        try {
            const logs: string = await invoke("get_logs");
            logsArea.style.display = "block";
            logsArea.value = logs || "Logs are empty.";
            logsArea.scrollTop = logsArea.scrollHeight;
            appLog("Opened logs viewer");
        } catch (e) {
            console.error(e);
        }
    });

    btnDownloadLogs.addEventListener("click", async () => {
        try {
            const logs: string = await invoke("get_logs");
            const blob = new Blob([logs], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "crabvoice.log";
            a.click();
            URL.revokeObjectURL(url);
            appLog("Downloaded logs");
        } catch (e) {
            console.error(e);
        }
    });
    
    appLog("Main UI loaded successfully");
});