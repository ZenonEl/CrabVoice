import { getService, getVideoData } from "@vot.js/ext/utils/videoData";  
import type { ServiceConf } from "@vot.js/ext/types/service";
import { CrabPanel, type AppTier } from "./injectorPanel";
import { Icons } from "./icons";

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
        trustedTypes?: any;
        _cvPolicy?: any;
    }
}

interface AppSettings {
    volume_ducking: number;
    default_source_lang: string;
    default_target_lang: string;
    sponsorblock_enabled: boolean;
}

// Перехват OAuth редиректа от сервера Яндекса
if (window.location.href.includes('access_token=')) {
    const hashOrSearch = window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.search.replace(/^\?/, '');
    const params = new URLSearchParams(hashOrSearch);
    const token = params.get('access_token');
    
    if (token && window.__TAURI__) {
        try { window.stop(); } catch(e){} // Стопаем загрузку страницы Яндекса
        document.documentElement.innerHTML = `<body style='background:#121212;'><h2 style='color: #4CAF50; text-align: center; margin-top: 50px; font-family: sans-serif;'>${Icons.done} Login successful!<br><br><span style='color: #aaa; font-size: 16px;'>Returning to CrabVoice...</span></h2></body>`;
        
        window.__TAURI__.core.invoke('save_yandex_token', { token: token }).then(() => {
            const homeUrl = localStorage.getItem('cv_home_url');
            setTimeout(() => {
                if (homeUrl) window.location.href = homeUrl;
                else window.history.go(-(window.history.length - 1));
            }, 1000);
        });
    }
}

if (!window._cvInitialized) {
    window._cvInitialized = true;

    const isHome = window.location.hostname === 'localhost' || window.location.hostname === 'tauri.localhost' || window.location.protocol === 'tauri:';
    if (isHome) {
        localStorage.setItem('cv_home_url', window.location.href);
    } else {
        appLog(`CrabVoice Injector attached to ${window.location.hostname}`);
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
                    updateStatus(`Skipped ${seg.category} ⏩`, "#FFD700");
                    setTimeout(() => updateStatus("Linked & Translated ✅", "#4CAF50"), 3000);
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

        // Загружаем настройки из Rust, если еще не загрузили
        if (!appSettings && window.__TAURI__) {
            try {

                appSettings = await window.__TAURI__.core.invoke("get_settings");
                userVideoVolume = appSettings!.volume_ducking;
                sponsorBlockEnabled = appSettings!.sponsorblock_enabled ?? true;
                if (panelInstance) {
                    panelInstance.setVideoVolumeSlider(userVideoVolume);
                    panelInstance.setSponsorBlockState(sponsorBlockEnabled);
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
            updateStatus("VOT.js extracting... 🔍", "#24c8db");

            const videoData = await getVideoData(service);

            const duration = videoData?.duration || v.duration || 344.0;

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
                    } catch (e) {
                        // Ошибка или бесплатная версия — просто игнорируем
                    }
                }
            }

            const pollTranslation = async () => {
                if (window.location.href !== currentVideoUrl) {
                    isTranslating = false;
                    return;
                }
                
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }

                updateStatus("Requesting Yandex... ⏳", "#FFC131");

                try {
                    const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
                    if (!invoke) return;

                    appLog("Sent translation request to Rust backend");
                    const res = await invoke("translate", { url: window.location.href, duration: duration });
                    
                    if (res.status === 1 && res.url) {
                        appLog("Translation successful! Playing native audio...");
                        updateStatus("Linked & Translated ✅", "#4CAF50");
                        
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
                            updateStatus("Timeout ❌", "#ff5e5e");
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
                                updateStatus(`Processing... (~${timeLeft}s) ⏳`, "#FFC131");
                            } else {
                                clearInterval(countdownInterval);
                                pollTranslation();
                            }
                        }, 1000);
                    }
                } catch (e: any) {
                    // Выводим ТОЧНУЮ причину ошибки из Rust
                    appLog(`Rust Error: ${e.toString()}`);
                    console.error("CrabVoice Rust Error:", e);
                    updateStatus(e.toString().substring(0, 30) + " ⚠️", "#ff5e5e");
                    isTranslating = false;
                }
            };
            
            pollTranslation();

        } catch (error) {
            updateStatus("VOT.js Parse Error ❌", "#ff5e5e");
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
        if (isHome) return;

        if (mainVideo && (!mainVideo.isConnected || window.location.href !== currentVideoUrl)) {
            mainVideo = null;
            if (audioObj) { audioObj.pause(); audioObj = null; }
            if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
            isTranslating = false;
            updateStatus("Searching new video...", "#FFC131");
        }

        let panelHost = document.getElementById('cv-panel-host');
        if (!panelHost && !panelInstance) {
            panelInstance = new CrabPanel({
                onClose: () => {
                    const homeUrl = localStorage.getItem('cv_home_url');
                    if (homeUrl) window.location.href = homeUrl;
                    else window.history.go(-(window.history.length - 1));
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
                onSponsorBlockToggle: (enabled: boolean) => {
                    sponsorBlockEnabled = enabled;
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