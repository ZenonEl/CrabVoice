use std::sync::Arc;
use tokio::sync::Mutex;
use tauri::{State, Manager};

mod domain;
mod yandex_api;
mod worker_api;
mod settings;

use domain::{TranslationProvider, TranslationResult, AppSettings};
use settings::SettingsManager;
use yandex_api::YandexClient;
use worker_api::WorkerClient;

struct AppState {
    yandex_translator: Arc<dyn TranslationProvider>,
    worker_translator: Arc<dyn TranslationProvider>,
    settings: Mutex<AppSettings>,
    settings_manager: SettingsManager,
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
async fn translate(url: String, duration: f64, state: State<'_, AppState>) -> Result<TranslationResult, String> {
    let current_settings = state.settings.lock().await.clone();
    
    // Динамический выбор: Прямо в Яндекс или через Proxy Worker
    if current_settings.use_proxy {
        state.worker_translator.translate_video(&url, duration, &current_settings).await
    } else {
        state.yandex_translator.translate_video(&url, duration, &current_settings).await
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let init_script = include_str!("../injector.js");

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate, get_settings, save_settings])
        .setup(move |app| {
            // 1. Инициализируем менеджер настроек (здесь есть доступ к файловой системе ОС)
            let settings_manager = SettingsManager::new(app.handle());
            let settings = settings_manager.load();

            // 2. Внедряем глобальное состояние
            app.manage(AppState {
                yandex_translator: Arc::new(YandexClient::new()),
                worker_translator: Arc::new(WorkerClient::new()),
                settings: Mutex::new(settings),
                settings_manager,
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