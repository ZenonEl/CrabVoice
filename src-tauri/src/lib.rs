use std::sync::Arc;

mod domain;
mod yandex_api;

use domain::{TranslationProvider};
use yandex_api::YandexClient;

struct AppState {
    translator: Arc<dyn TranslationProvider>,
}

// Тестовая функция-обработчик
#[tauri::command]
fn log_video_data(title: String, duration: f64) {
    println!("========================================");
    println!("🚀 СРАБОТАЛА МАГИЯ VOT.JS!");
    println!("🎬 Название видео: {}", title);
    println!("⏱ Длина видео: {} сек", duration);
    println!("========================================");
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
        .invoke_handler(tauri::generate_handler![log_video_data])
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