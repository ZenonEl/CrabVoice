use std::sync::Arc;
use tauri::{State};

mod domain;
mod yandex_api;

use domain::{TranslationProvider, TranslationResult};
use yandex_api::YandexClient;

struct AppState {
    translator: Arc<dyn TranslationProvider>,
}

#[tauri::command]
async fn translate(url: String, duration: f64, state: State<'_, AppState>) -> Result<TranslationResult, String> {
    state.translator.translate_video(&url, duration).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let yandex_client = YandexClient::new();

    // Бессмертный инжектор, работающий на всех сайтах (Mobile First)
    let init_script = r#"
        // Защита от двойного запуска на SPA сайтах
        if (!window._cvInitialized) {
            window._cvInitialized = true;
            
            let mainVideo = null;
            let audioObj = null;

            function syncAudio() {
                if (!mainVideo || !audioObj) return;
                if (mainVideo.volume > 0.15) mainVideo.volume = 0.15;
                
                if (mainVideo.paused || mainVideo.waiting || mainVideo.ended) {
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

            async function requestTranslation(v) {
                if (window._cvTranslating) return;
                window._cvTranslating = true;
                
                let attempts = 0;
                const pollTranslation = async () => {
                    const statusEl = document.getElementById('cv-status');
                    if (statusEl) statusEl.innerText = "Yandex Processing... ⏳";
                    
                    try {
                        const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
                        if (!invoke) return;

                        const duration = (v.duration && !isNaN(v.duration)) ? v.duration : 344.0;
                        const res = await invoke("translate", { 
                            url: window.location.href, 
                            duration: duration 
                        });
                        
                        if (res.status === 1 && res.url) {
                            if (statusEl) {
                                statusEl.innerText = "Linked & Translated ✅";
                                statusEl.style.color = "\#4CAF50";
                            }
                            
                            audioObj = new Audio(res.url);
                            const events =['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ratechange', 'timeupdate'];
                            events.forEach(e => v.addEventListener(e, syncAudio));
                            syncAudio();
                        } else {
                            attempts++;
                            if (attempts > 15) {
                                if (statusEl) {
                                    statusEl.innerText = "Timeout ❌";
                                    statusEl.style.color = "\#ff5e5e";
                                }
                                window._cvTranslating = false;
                                return;
                            }
                            setTimeout(pollTranslation, 10000);
                        }
                    } catch (e) {
                        if (statusEl) statusEl.innerText = "Error: " + e;
                        window._cvTranslating = false;
                    }
                };
                
                pollTranslation();
            }

            const checkAndInject = () => {
                // Если мы на стартовой странице приложения - ничего не делаем
                if (window.location.hostname === 'localhost' || window.location.hostname === 'tauri.localhost') return;

                // Защита от удаления пульта Ютубом (SPA Wipes)
                if (!document.getElementById('cv-panel')) {
                    const panel = document.createElement('div');
                    panel.id = 'cv-panel';
                    panel.innerHTML = `
                        <div style="font-size: 13px; margin-bottom: 5px; color: \#fff; text-shadow: 1px 1px 2px \#000; font-family: sans-serif;">
                            🦀 CrabVoice: <span id="cv-status" style="color:\#FFC131">Searching video...</span>
                        </div>
                        <button id="cv-close" style="background:\#ff5e5e; color:\#fff; border:none; padding:8px 15px; border-radius:6px; font-weight:bold; cursor:pointer; font-family: sans-serif; width: 100%;">
                            ⬅ Back to App
                        </button>
                    `;
                    Object.assign(panel.style, {
                        position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.85)',
                        padding: '12px', borderRadius: '8px', zIndex: '2147483647', boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                        minWidth: '150px'
                    });
                    
                    // Вставляем прямо в <html>, чтобы body.innerHTML = "" Ютуба не убил нас
                    document.documentElement.appendChild(panel);

                    document.getElementById('cv-close').onclick = () => {
                        // Магия нативного возврата на главный экран
                        window.history.go(-(window.history.length - 1));
                    };
                }

                // Поиск видео (селекторы vot.js)
                if (!mainVideo) {
                    const selectors =[
                        ".html5-video-container video", // YouTube
                        "vk-video-player", // VK
                        ".vjs-tech", // VideoJS
                        ".fp-player video", // Flowplayer
                        "video" // Fallback
                    ];
                    
                    for (let sel of selectors) {
                        let v = document.querySelector(sel);
                        // Игнорируем фоновые обрезки и рекламу
                        if (v && v.duration > 0 && v.offsetWidth > 100) {
                            mainVideo = v;
                            requestTranslation(v);
                            break;
                        }
                    }
                }
            };

            // Проверяем DOM каждую секунду
            setInterval(checkAndInject, 1000);
        }
    "#;

    tauri::Builder::default()
        .manage(AppState {
            translator: Arc::new(yandex_client),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate])
        .setup(move |app| {
            // Создаем единое главное окно ВРУЧНУЮ, чтобы прикрепить бессмертный скрипт
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()))
                .title("crabvoice")
                .initialization_script(init_script)
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}