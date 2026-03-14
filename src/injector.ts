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

// Функция для обхода защиты Ютуба (CSP Trusted Types)
function safeSetHTML(element: HTMLElement | ShadowRoot, html: string) {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        if (!window._cvPolicy) {
            try {
                // Создаем "доверенную" политику
                window._cvPolicy = window.trustedTypes.createPolicy('cv-policy-bypass', {
                    createHTML: (string: string) => string
                });
            } catch (e) {
                console.error("CrabVoice: Failed to create trusted policy", e);
            }
        }
        if (window._cvPolicy) {
            element.innerHTML = window._cvPolicy.createHTML(html);
            return;
        }
    }
    // Фолбэк для сайтов без TrustedTypes (ВК, Vimeo)
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

    function updateStatus(text: string, color?: string) {
        const panel = document.getElementById('cv-panel-host');
        if (panel && panel.shadowRoot) {
            const statusEl = panel.shadowRoot.getElementById('cv-status');
            if (statusEl) {
                // innerText безопасен, он не триггерит CSP
                statusEl.innerText = text;
                statusEl.style.color = color || '#fff';
            }
        }
    }

    function syncAudio() {
        if (!mainVideo || !audioObj) return;
        
        if (mainVideo.volume > 0.15) mainVideo.volume = 0.15;
        
        if (mainVideo.paused || mainVideo.ended) {
            audioObj.pause();
        } else if (audioObj.paused) {
            audioObj.play().catch(() => {});
        }
        
        if (Math.abs(audioObj.currentTime - mainVideo.currentTime) > 0.3) {
            audioObj.currentTime = mainVideo.currentTime;
        }
        
        if (audioObj.playbackRate !== mainVideo.playbackRate) {
            audioObj.playbackRate = mainVideo.playbackRate;
        }
    }

    async function requestTranslation(v: HTMLVideoElement) {
        if (isTranslating) return;
        isTranslating = true;
        currentVideoUrl = window.location.href;

        let attempts = 0;

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
            
            // МАГИЯ VOT.JS: Автоматически достает метаданные (Ютуб, ВК, Vimeo и тд)
            const videoData = await getVideoData(service);
            console.log("🦀 CrabVoice: Метаданные от vot.js:", videoData);

            const duration = videoData?.duration || v.duration || 344.0;

            const pollTranslation = async () => {
                // Если URL изменился (Ютуб переключил видео без перезагрузки)
                if (window.location.href !== currentVideoUrl) {
                    isTranslating = false;
                    return;
                }

                updateStatus("Yandex Processing... ⏳", "#FFC131");

                try {
                    const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
                    if (!invoke) return;

                    // Отправляем чистые данные в Rust
                    const res = await invoke("translate", { 
                        url: window.location.href, 
                        duration: duration 
                    });
                    
                    if (res.status === 1 && res.url) {
                        updateStatus("Linked & Translated ✅", "#4CAF50");
                        
                        audioObj = new Audio(res.url);
                        const events =['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ratechange', 'timeupdate'];
                        events.forEach(e => v.addEventListener(e, syncAudio));
                        syncAudio();
                    } else {
                        attempts++;
                        if (attempts > 15) {
                            updateStatus("Timeout ❌", "#ff5e5e");
                            isTranslating = false;
                            return;
                        }
                        setTimeout(pollTranslation, 10000);
                    }
                } catch (e) {
                    updateStatus("Error: API Failed ⚠️", "#ff5e5e");
                    isTranslating = false;
                }
            };
            
            pollTranslation();

        } catch (error) {
            console.error("🦀 CrabVoice VOT.js Error:", error);
            updateStatus("VOT.js Parse Error ❌", "#ff5e5e");
            isTranslating = false;
        }
    }

    // Рекурсивный бур для поиска видео (пробивает ВК)
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

        // Если SPA Ютуба переключило видео, сбрасываем старый звук
        if (mainVideo && (!mainVideo.isConnected || window.location.href !== currentVideoUrl)) {
            mainVideo = null;
            if (audioObj) { audioObj.pause(); audioObj = null; }
            isTranslating = false;
            updateStatus("Searching new video...", "#FFC131");
        }

        // Создаем ИЗОЛИРОВАННУЮ панель (Неуязвима для стилей Ютуба)
        let panelHost = document.getElementById('cv-panel-host');
        if (!panelHost) {
            panelHost = document.createElement('div');
            panelHost.id = 'cv-panel-host';
            
            panelHost.attachShadow({mode: 'open'});
            
            const htmlTemplate = `
                <style>
                    .cv-container {
                        position: fixed !important; bottom: 20px !important; right: 20px !important;
                        background: rgba(0,0,0,0.85) !important; padding: 12px !important;
                        border-radius: 8px !important; z-index: 2147483647 !important;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.5) !important;
                        font-family: sans-serif !important; min-width: 150px !important;
                        pointer-events: auto !important;
                    }
                    .cv-header { color: #fff !important; font-size: 13px !important; margin-bottom: 8px !important; }
                    .cv-btn {
                        background: #ff5e5e !important; color: #fff !important; border: none !important;
                        padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                        cursor: pointer !important; width: 100% !important; font-size: 14px !important;
                    }
                </style>
                <div class="cv-container">
                    <div class="cv-header">🦀 CrabVoice: <span id="cv-status" style="color:#FFC131">Searching video...</span></div>
                    <button class="cv-btn" id="cv-close">⬅ Back to App</button>
                </div>
            `;
            
            // Используем нашу безопасную функцию вместо прямого innerHTML
            safeSetHTML(panelHost.shadowRoot!, htmlTemplate);
            
            document.documentElement.appendChild(panelHost);

            panelHost.shadowRoot!.getElementById('cv-close')!.onclick = () => {
                const homeUrl = localStorage.getItem('cv_home_url');
                if (homeUrl) window.location.href = homeUrl;
                else window.history.go(-(window.history.length - 1));
            };
        }

        // Поиск видео
        if (!mainVideo && !isTranslating) {
            let v = document.querySelector(".html5-video-container video, video.vjs-tech, .fp-player video") as HTMLVideoElement;
            
            if (!v || v.duration === 0) {
                v = walkDOMForVideo(document) as HTMLVideoElement;
            }

            if (v && v.duration > 0 && v.offsetWidth > 100) {
                mainVideo = v;
                requestTranslation(v);
            }
        }
    };

    // Запускаем бесконечный поллинг, так как SPA-сайты динамические
    setInterval(checkAndInject, 1000);
}