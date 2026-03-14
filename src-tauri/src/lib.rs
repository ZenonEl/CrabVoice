use std::sync::Arc;
use tauri::{State, AppHandle, WebviewWindowBuilder, WebviewUrl, Manager};

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

#[tauri::command]
fn close_player(app: tauri::AppHandle) {
    if let Some(window) = app.get_webview_window("player_window") {
        #[cfg(not(any(target_os = "android", target_os = "ios")))]
        {
            let _ = window.close();
        }

        #[cfg(any(target_os = "android", target_os = "ios"))]
        {
            // на мобилках тоже закрываем окно, это и закрывает webview
            let _ = window.close();
            // или: let _ = window.destroy();
        }
    }
}

#[tauri::command]
async fn open_player(app: AppHandle, target_url: String) -> Result<(), String> {
    let init_script = r#"
        window.addEventListener('DOMContentLoaded', () => {
            // Tauri v2 позволяет внешним сайтам вызывать команды (благодаря withGlobalTauri)
            const invoke = window.__TAURI__.core.invoke;
            
            let mainVideo = null;
            let audioObj = null;
            let isTranslating = false;

            const panel = document.createElement('div');
            panel.innerHTML = `
                <div style="font-size: 12px; margin-bottom: 5px; color: #fff; font-family: sans-serif;">
                    CrabVoice: <span id="cv-status" style="color:#FFC131">Searching video...</span>
                </div>
                <button id="cv-close" style="background:#ff5e5e; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-family: sans-serif;">
                    ❌ Close Player
                </button>
            `;
            Object.assign(panel.style, {
                position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.8)',
                padding: '10px', borderRadius: '8px', zIndex: '9999999', boxShadow: '0 4px 6px rgba(0,0,0,0.5)'
            });
            document.body.appendChild(panel);

            document.getElementById('cv-close').onclick = () => {
                invoke("close_player");
            };

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

            // Функция связи с Rust API
            async function requestTranslation(v) {
                if (isTranslating) return;
                isTranslating = true;
                
                const pollTranslation = async () => {
                    document.getElementById('cv-status').innerText = "Translating Yandex... ⏳";
                    try {
                        const duration = v.duration && !isNaN(v.duration) ? v.duration : 344.0;
                        const res = await invoke("translate", { 
                            url: window.location.href, 
                            duration: duration 
                        });
                        
                        if (res.status === 1 && res.url) {
                            // Успех! Перевод готов
                            document.getElementById('cv-status').innerText = "Linked & Translated ✅";
                            document.getElementById('cv-status').style.color = "\#4CAF50";
                            
                            audioObj = new Audio(res.url);
                            const events =['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ratechange', 'timeupdate'];
                            events.forEach(e => v.addEventListener(e, syncAudio));
                            syncAudio();
                        } else {
                            // YouTube AUDIO_REQUESTED или ожидание кэша
                            document.getElementById('cv-status').innerText = "Yandex Processing... (Retry 10s)";
                            setTimeout(pollTranslation, 10000);
                        }
                    } catch (e) {
                        document.getElementById('cv-status').innerText = "Error: " + e;
                        isTranslating = false;
                    }
                };
                
                pollTranslation();
            }

            // Умный поиск с селекторами из vot.js
            function findVideo() {
                if (mainVideo) return;
                
                // vot.js selectors
                const selectors =[
                    ".html5-video-container video", // YouTube
                    "vk-video-player", // VK
                    ".vjs-tech", // VideoJS Universal
                    ".fp-player video", // Flowplayer
                    "video" // Fallback
                ];
                
                for (let sel of selectors) {
                    let v = document.querySelector(sel);
                    if (v && v.duration > 0) {
                        mainVideo = v;
                        requestTranslation(v);
                        return;
                    }
                }
            }

            setInterval(findVideo, 2000);
        });
    "#;

    let _player_window = WebviewWindowBuilder::new(
        &app,
        "player_window", 
        WebviewUrl::External(target_url.parse().unwrap())
    )
    .initialization_script(init_script)
    .build()
    .map_err(|e: tauri::Error| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let yandex_client = YandexClient::new();

    tauri::Builder::default()
        .manage(AppState {
            translator: Arc::new(yandex_client),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate, open_player, close_player])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}