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
async fn translate(url: String, state: State<'_, AppState>) -> Result<TranslationResult, String> {
    state.translator.translate_video(&url).await
}

#[tauri::command]
fn close_player(app: AppHandle) {
    if let Some(window) = app.get_webview_window("player_window") {
        // Tauri v2 стандартизировал работу с окнами. Просто закрываем (Android Activity закроется или вьюшка уничтожится).
        let _ = window.close();
    }
}

#[tauri::command]
async fn open_player(app: AppHandle, target_url: String, audio_url: String) -> Result<(), String> {
    // Внедряем логику Voice Over Translation (Нативный DOM-связкинг).
    // Аудио играет ВНУТРИ самого окна с видео, обеспечивая идеальный синхрон.
    let init_script = r#"
        window.addEventListener('DOMContentLoaded', () => {
            console.log("CrabVoice: Initializing sync...");
            
            // 1. Создаем аудио-объект прямо в контексте страницы
            const audioObj = new Audio("AUDIO_URL_PLACEHOLDER");
            audioObj.crossOrigin = "anonymous";
            let mainVideo = null;

            // 2. Создаем минималистичный UI (Пульт закрытия/статуса)
            const panel = document.createElement('div');
            panel.innerHTML = `
                <div style="font-size: 12px; margin-bottom: 5px; color: #fff; font-family: sans-serif;">
                    CrabVoice: <span id="cv-status" style="color:#FFC131">Searching...</span>
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
                window.__TAURI_INTERNALS__.invoke("plugin:event|emit", { event: "player-closed", payload: "" });
            };

            // 3. Главная функция синхронизации
            function syncAudio() {
                if (!mainVideo) return;
                
                // Приглушаем оригинальное видео
                if (mainVideo.volume > 0.15) mainVideo.volume = 0.15;
                
                // Синхронизация Play/Pause
                if (mainVideo.paused || mainVideo.waiting || mainVideo.ended) {
                    audioObj.pause();
                } else {
                    if (audioObj.paused) {
                        audioObj.play().catch(e => console.log("CrabVoice Audio Play Error:", e));
                    }
                }
                
                // Синхронизация Времени (Отмотка). 
                // Погрешность 0.3s нормальная, иначе будет постоянное заикание.
                if (Math.abs(audioObj.currentTime - mainVideo.currentTime) > 0.3) {
                    audioObj.currentTime = mainVideo.currentTime;
                }
                
                // Синхронизация скорости (x1.5, x2)
                if (audioObj.playbackRate !== mainVideo.playbackRate) {
                    audioObj.playbackRate = mainVideo.playbackRate;
                }
            }

            // 4. Привязка нативных слушателей к найденному видео
            function attachListeners(v) {
                if (v._cvAttached) return;
                v._cvAttached = true;
                mainVideo = v;
                
                document.getElementById('cv-status').innerText = "Linked ✅";
                document.getElementById('cv-status').style.color = "\#4CAF50";
                
                // Полный набор событий для мгновенной реакции как у нативного плеера
                const events =['play', 'pause', 'playing', 'waiting', 'seeking', 'seeked', 'ratechange', 'timeupdate'];
                events.forEach(e => v.addEventListener(e, syncAudio));
                
                // Принудительный первый вызов
                syncAudio();
            }

            // 5. Умный поиск видео (в т.ч. в Shadow DOM)
            function findVideo() {
                if (mainVideo) return; // Уже нашли

                const walk = (root) => {
                    let node = root.querySelector('video');
                    if (node) return node;
                    
                    let els = root.querySelectorAll('*');
                    for (let el of els) {
                        if (el.shadowRoot) {
                            let res = walk(el.shadowRoot);
                            if (res) return res;
                        }
                    }
                    return null;
                };

                let v = walk(document);
                // Защита от микро-видео (рекламы, превьюшек)
                if (v && v.offsetWidth > 100) {
                    attachListeners(v);
                }
            }

            // Ищем видео раз в секунду (на случай если оно загружается динамически)
            setInterval(findVideo, 1000);
            findVideo(); // Первая попытка
        });
    "#.replace("AUDIO_URL_PLACEHOLDER", &audio_url);

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