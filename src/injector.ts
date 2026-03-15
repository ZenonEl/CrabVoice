import { getService, getVideoData } from "@vot.js/ext/utils/videoData";  
import type { ServiceConf } from "@vot.js/ext/types/service";

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
}

function safeSetHTML(element: HTMLElement | ShadowRoot, html: string) {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        if (!window._cvPolicy) {
            try {
                window._cvPolicy = window.trustedTypes.createPolicy('cv-policy-bypass', {
                    createHTML: (string: string) => string
                });
            } catch (e) { }
        }
        if (window._cvPolicy) {
            element.innerHTML = window._cvPolicy.createHTML(html);
            return;
        }
    }
    element.innerHTML = html;
}

if (!window._cvInitialized) {
    window._cvInitialized = true;

    const isHome = window.location.hostname === 'localhost' || window.location.hostname === 'tauri.localhost' || window.location.protocol === 'tauri:';
    if (isHome) {
        localStorage.setItem('cv_home_url', window.location.href);
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

    function updateStatus(text: string, color?: string) {
        const panel = document.getElementById('cv-panel-host');
        if (panel && panel.shadowRoot) {
            const statusEl = panel.shadowRoot.getElementById('cv-status');
            if (statusEl) {
                statusEl.innerText = text;
                statusEl.style.color = color || '#fff';
            }
        }
    }

    // Главная функция синхронизации
    function syncAudio() {
        if (!mainVideo || !audioObj) return;
        
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
        
        isTranslating = true;
        currentVideoUrl = window.location.href;
        let attempts = 0;

        // Загружаем настройки из Rust, если еще не загрузили
        if (!appSettings && window.__TAURI__) {
            try {

                appSettings = await window.__TAURI__.core.invoke("get_settings");
                userVideoVolume = appSettings!.volume_ducking;
                
                // Обновляем ползунок в UI
                const panel = document.getElementById('cv-panel-host');
                if (panel && panel.shadowRoot) {
                    const vidSlider = panel.shadowRoot.getElementById('cv-vol-video') as HTMLInputElement;
                    if (vidSlider) vidSlider.value = (userVideoVolume * 100).toString();
                }
            } catch (e) { console.error("CrabVoice: Failed to fetch settings", e); }
        }

        try {
            // Получаем конфигурацию сервиса для текущей страницы  
            const services = getService();  
            if (!services.length) {  
                console.error("Сервис не определен для текущей страницы");  
                throw new Error("Unknown service");
            }

            // Берем первый подходящий сервис  
            const service: ServiceConf = services[0];

            updateStatus("VOT.js extracting... 🔍", "#24c8db");

            const videoData = await getVideoData(service);

            const duration = videoData?.duration || v.duration || 344.0;

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

                    const res = await invoke("translate", { url: window.location.href, duration: duration });
                    
                    if (res.status === 1 && res.url) {
                        updateStatus("Linked & Translated ✅", "#4CAF50");
                        
                        if (audioObj) {
                            audioObj.pause();
                            audioObj.src = "";
                        }
                        
                        audioObj = new Audio(res.url);
                        translationPaused = false;
                        
                        const panel = document.getElementById('cv-panel-host');
                        if (panel && panel.shadowRoot) {
                            const btnPause = panel.shadowRoot.getElementById('cv-toggle-play');
                            if (btnPause) btnPause.innerText = "⏸ Pause Translation";
                        }

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
                } catch (e) {
                    updateStatus("Error: API Failed ⚠️", "#ff5e5e");
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
        let node = root.querySelector('video');
        if (node && node.duration > 0 && node.offsetWidth > 100) return node;
        let els = root.querySelectorAll('*');
        for (let el of els) {
            if (el.shadowRoot) {
                let res = walkDOMForVideo(el.shadowRoot);
                if (res) return res;
            }
        }
        return null;
    };

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
        if (!panelHost) {
            panelHost = document.createElement('div');
            panelHost.id = 'cv-panel-host';
            panelHost.attachShadow({mode: 'open'});
            
            const htmlTemplate = `
                <style>
                    .cv-container {
                        position: fixed !important; bottom: 20px !important; right: 20px !important;
                        background: rgba(0,0,0,0.85) !important; padding: 15px !important;
                        border-radius: 10px !important; z-index: 2147483647 !important;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                        font-family: sans-serif !important; min-width: 200px !important;
                        pointer-events: auto !important; color: #fff !important;
                    }
                    .cv-header { font-size: 14px !important; margin-bottom: 12px !important; font-weight: bold; }
                    .cv-row { display: flex !important; flex-direction: column !important; gap: 5px !important; margin-bottom: 10px !important; }
                    .cv-row label { font-size: 11px !important; color: #bbb !important; display: flex; justify-content: space-between; }
                    .cv-slider { width: 100% !important; accent-color: #24c8db !important; cursor: pointer; }
                    .cv-btn-group { display: flex !important; gap: 8px !important; margin-bottom: 10px !important; }
                    .cv-btn {
                        background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                        padding: 6px 10px !important; border-radius: 6px !important; font-size: 12px !important;
                        cursor: pointer !important; flex: 1 !important; transition: 0.2s;
                    }
                    .cv-btn:hover { background: #444 !important; }
                    .cv-btn-close {
                        background: #ff5e5e !important; color: #fff !important; border: none !important;
                        padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                        cursor: pointer !important; width: 100% !important; font-size: 13px !important;
                    }
                </style>
                <div class="cv-container">
                    <div class="cv-header">🦀 CrabVoice: <span id="cv-status" style="color:#FFC131">Searching video...</span></div>
                    
                    <div class="cv-row">
                        <label>Translation Vol: <span id="cv-val-audio">100%</span></label>
                        <input type="range" class="cv-slider" id="cv-vol-audio" min="0" max="100" value="100">
                    </div>
                    
                    <div class="cv-row">
                        <label>Original Vol: <span id="cv-val-video">15%</span></label>
                        <input type="range" class="cv-slider" id="cv-vol-video" min="0" max="100" value="15">
                    </div>

                    <div class="cv-btn-group">
                        <button class="cv-btn" id="cv-toggle-play">⏸ Pause</button>
                        <button class="cv-btn" id="cv-refresh">🔄 Refresh</button>
                    </div>

                    <button class="cv-btn-close" id="cv-close">⬅ Back to App</button>
                </div>
            `;
            
            safeSetHTML(panelHost.shadowRoot!, htmlTemplate);
            document.documentElement.appendChild(panelHost);

            // Биндим логику UI пульта
            const shadow = panelHost.shadowRoot!;
            
            shadow.getElementById('cv-close')!.onclick = () => {
                const homeUrl = localStorage.getItem('cv_home_url');
                if (homeUrl) window.location.href = homeUrl;
                else window.history.go(-(window.history.length - 1));
            };

            shadow.getElementById('cv-vol-audio')!.oninput = (e: any) => {
                userAudioVolume = e.target.value / 100;
                shadow.getElementById('cv-val-audio')!.innerText = `${e.target.value}%`;
                if (audioObj) audioObj.volume = userAudioVolume;
            };

            shadow.getElementById('cv-vol-video')!.oninput = (e: any) => {
                userVideoVolume = e.target.value / 100;
                shadow.getElementById('cv-val-video')!.innerText = `${e.target.value}%`;
                if (mainVideo) mainVideo.volume = userVideoVolume;
            };

            shadow.getElementById('cv-toggle-play')!.onclick = (e: any) => {
                translationPaused = !translationPaused;
                e.target.innerText = translationPaused ? "▶️ Play" : "⏸ Pause";
                syncAudio();
            };

            shadow.getElementById('cv-refresh')!.onclick = () => {
                if (audioObj) { audioObj.pause(); audioObj.src = ""; }
                if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
                translationPaused = false;
                shadow.getElementById('cv-toggle-play')!.innerText = "⏸ Pause";
                if (mainVideo) requestTranslation(mainVideo, true);
            };
        }

        if (!mainVideo && !isTranslating) {
            let v = document.querySelector(".html5-video-container video, video.vjs-tech, .fp-player video") as HTMLVideoElement;
            if (!v || v.duration === 0) v = walkDOMForVideo(document) as HTMLVideoElement;
            if (v && v.duration > 0 && v.offsetWidth > 100) {
                mainVideo = v;
                requestTranslation(v);
            }
        }
    };

    setInterval(checkAndInject, 1000);
}