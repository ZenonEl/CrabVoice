use std::sync::Arc;
use tokio::sync::Mutex;
use tauri::{State, Manager};

mod domain;
mod yandex_api;
mod settings;
mod logger;
mod premium;

use domain::{TranslationProvider, TranslationResult, AppSettings};
use settings::SettingsManager;
use yandex_api::YandexClient;
use logger::Logger;

struct AppState {
    yandex_translator: Arc<dyn TranslationProvider>,
    settings: Mutex<AppSettings>,
    settings_manager: SettingsManager,
    logger: Mutex<Logger>,
}

#[tauri::command]
async fn log_message(source: String, msg: String, state: State<'_, AppState>) -> Result<(), String> {
    state.logger.lock().await.write(&source, &msg);
    Ok(())
}

#[tauri::command]
async fn get_logs(state: State<'_, AppState>) -> Result<String, String> {
    Ok(state.logger.lock().await.read())
}

// Команда, чтобы UI знал, куплен ли Premium
#[tauri::command]
fn is_premium_active() -> bool {
    cfg!(feature = "premium")
}

// Команда получения сегментов с рекламой
#[tauri::command]
async fn get_skip_segments(video_id: String) -> Result<Vec<premium::SponsorSegment>, String> {
    premium::fetch_sponsor_segments(&video_id).await
}

#[tauri::command]
async fn get_settings(state: State<'_, AppState>) -> Result<AppSettings, String> {
    let s = state.settings.lock().await;
    Ok(s.clone())
}

#[tauri::command]
async fn save_settings(new_settings: AppSettings, state: State<'_, AppState>) -> Result<(), String> {
    let mut s = state.settings.lock().await;
    *s = new_settings.clone();
    state.settings_manager.save(&new_settings)?;
    Ok(())
}

#[tauri::command]
async fn save_yandex_token(token: String, state: State<'_, AppState>) -> Result<(), String> {
    let mut s = state.settings.lock().await;
    s.yandex_token = Some(token);
    state.settings_manager.save(&s)?;
    println!("✅ OAuth Token saved successfully!");
    Ok(())
}

#[tauri::command]
async fn translate(url: String, duration: f64, state: State<'_, AppState>) -> Result<TranslationResult, String> {
    let current_settings = state.settings.lock().await.clone();
    
    let log_msg = if current_settings.use_proxy {
        format!("Translate via Proxy ({}): {}", current_settings.proxy_url, url)
    } else {
        format!("Translate via Direct Connection: {}", url)
    };
    let _ = state.logger.lock().await.write("Rust", &log_msg);

    let result = state.yandex_translator.translate_video(&url, duration, &current_settings).await;

    if let Err(e) = &result {
        let _ = state.logger.lock().await.write("Rust", &format!("Translate Error: {}", e));
    }
    result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let init_script = include_str!("../injector.js");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate, get_settings, save_settings, save_yandex_token, log_message, get_logs, is_premium_active, get_skip_segments])
        .setup(move |app| {
            let settings_manager = SettingsManager::new(app.handle());
            let settings = settings_manager.load();
            let logger = Logger::new(app.handle());
            logger.write("System", "🦀 CrabVoice backend started");

            app.manage(AppState {
                yandex_translator: Arc::new(YandexClient::new()),
                settings: Mutex::new(settings),
                settings_manager,
                logger: Mutex::new(logger),
            });

            // 3. Создаем окно
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()))
                .initialization_script(init_script)
                .build()?;
                
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}