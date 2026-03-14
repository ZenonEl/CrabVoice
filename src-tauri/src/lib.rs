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

    // Макрос include_str! ищет файл относительно текущего (src/lib.rs).
    // Так как скрипт лежит в src-tauri/injector.js, нам нужно выйти на папку выше (../)
    let init_script = include_str!("../injector.js");

    tauri::Builder::default()
        .manage(AppState {
            translator: Arc::new(yandex_client),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate])
        .setup(move |app| {
            // Создаем единое главное окно ВРУЧНУЮ, чтобы прикрепить бессмертный скрипт
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()))
                .initialization_script(init_script)
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}