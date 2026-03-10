use std::sync::Arc;
use tauri::State;

mod domain;
mod yandex_api;

use domain::{TranslationProvider, TranslationResult};
use yandex_api::YandexClient;

// DI Контейнер для хранения провайдера
struct AppState {
    translator: Arc<dyn TranslationProvider>,
}

// Наш Controller (Tauri Command). 
// Обрати внимание: он зависит только от `AppState` (абстракции), а не от Яндекса.
#[tauri::command]
async fn translate(url: String, state: State<'_, AppState>) -> Result<TranslationResult, String> {
    state.translator.translate_video(&url).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Инициализируем конкретную реализацию (Адаптер)
    let yandex_client = YandexClient::new();

    tauri::Builder::default()
        // Регистрируем зависимость в стейт-менеджере Tauri
        .manage(AppState {
            translator: Arc::new(yandex_client),
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
