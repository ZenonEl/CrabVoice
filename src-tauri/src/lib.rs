mod domain;
mod premium;
mod settings;
mod yandex_api;

use domain::{AppSettings, TranslationProvider, TranslationResult};
use settings::SettingsManager;
use yandex_api::YandexClient;

use log::{error, info};
use std::fs;
use std::sync::Arc;
use tauri::{Manager, State};
use tauri_plugin_log::{Target, TargetKind};
use tokio::sync::Mutex;

struct AppState {
    yandex_translator: Arc<dyn TranslationProvider>,
    settings: Mutex<AppSettings>,
    settings_manager: SettingsManager,
}

// Команда-мост для инжектора (так как на внешних сайтах JS API плагина недоступен)
#[tauri::command]
fn log_message(source: String, msg: String) {
    if source == "error" || source.contains("Error") {
        error!("[Injector] {}", msg);
    } else {
        info!("[Injector] {}", msg);
    }
}

#[tauri::command]
async fn get_logs(app: tauri::AppHandle) -> Result<String, String> {
    let log_dir = app.path().app_log_dir().map_err(|e| e.to_string())?;
    
    let mut all_logs = String::new();
    if let Ok(entries) = fs::read_dir(&log_dir) {
        let mut files: Vec<_> = entries.filter_map(|e| e.ok()).collect();
        files.sort_by_key(|a| a.metadata().and_then(|m| m.modified()).ok());
        
        for entry in files {
            if entry.path().extension().map_or(false, |ext| ext == "log") {
                if let Ok(content) = fs::read_to_string(entry.path()) {
                    all_logs.push_str(&content);
                    all_logs.push('\n');
                }
            }
        }
    }
    
    if all_logs.is_empty() {
        Ok("Logs are empty or not found.".to_string())
    } else {
        Ok(all_logs)
    }
}

// Новая команда: надежный экспорт логов
#[tauri::command]
async fn export_logs(app: tauri::AppHandle) -> Result<String, String> {
    let logs = get_logs(app.clone()).await?;
    
    // Пытаемся сохранить в Загрузки, если не выйдет - в Документы
    let mut path = match app.path().download_dir() {
        Ok(p) => p,
        Err(_) => app.path().document_dir().map_err(|e| e.to_string())?,
    };
    
    path.push("crabvoice.log");
    fs::write(&path, &logs).map_err(|e| format!("Failed to write file: {}", e))?;
    
    Ok(path.to_string_lossy().into_owned())
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
async fn ping_proxy(proxy_url: String) -> Result<u128, String> {
    let mut client_builder = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(5));
        
    if !proxy_url.is_empty() {
        if let Ok(proxy) = reqwest::Proxy::all(&proxy_url) {
            client_builder = client_builder.proxy(proxy);
        } else {
            return Err("Invalid proxy URL format".into());
        }
    }
    
    let client = client_builder.build().map_err(|e| e.to_string())?;
    
    let start = std::time::Instant::now();
    // Testing a very fast endpoint usually used for latency checks
    let res = client
        .get("http://gstatic.com/generate_204")
        .send()
        .await
        .map_err(|e| format!("Proxy error: {}", e))?;
        
    if res.status().is_success() {
        Ok(start.elapsed().as_millis())
    } else {
        Err(format!("HTTP Error: {}", res.status()))
    }
}

#[tauri::command]
async fn get_settings(state: State<'_, AppState>) -> Result<AppSettings, String> {
    let s = state.settings.lock().await;
    Ok(s.clone())
}

#[tauri::command]
async fn save_settings(
    new_settings: AppSettings,
    state: State<'_, AppState>,
) -> Result<(), String> {
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
async fn translate(
    url: String,
    duration: f64,
    state: State<'_, AppState>,
) -> Result<TranslationResult, String> {
    let current_settings = state.settings.lock().await.clone();

    if current_settings.use_proxy {
        info!(
            "Translate via Proxy ({}): {}",
            current_settings.proxy_url, url
        );
    } else {
        info!("Translate via Direct Connection: {}", url);
    };

    let result = state
        .yandex_translator
        .translate_video(&url, duration, &current_settings)
        .await;

    if let Err(e) = &result {
        error!("Translate Error: {}", e);
    }
    result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let init_script = include_str!("../injector.js");

    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(log::LevelFilter::Info)
                .clear_targets()
                .target(Target::new(TargetKind::Stdout))
                .target(Target::new(TargetKind::LogDir { file_name: Some("crabvoice.log".to_string()) }))
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            translate,
            get_settings,
            save_settings,
            save_yandex_token,
            log_message,
            get_logs,
            export_logs,
            is_premium_active,
            get_skip_segments,
            ping_proxy
        ])
        .setup(move |app| {
            let settings_manager = SettingsManager::new(app.handle());
            let settings = settings_manager.load();
            info!("🦀 CrabVoice backend started");

            app.manage(AppState {
                yandex_translator: Arc::new(YandexClient::new()),
                settings: Mutex::new(settings.clone()),
                settings_manager,
            });

            // 3. Создаем окно
            let mut window_builder = tauri::WebviewWindowBuilder::new(
                app,
                "main",
                tauri::WebviewUrl::App("index.html".into()),
            )
            .initialization_script(init_script);

            if settings.use_proxy && !settings.proxy_url.is_empty() {
                match tauri::Url::parse(&settings.proxy_url) {
                    Ok(url) => {
                        window_builder = window_builder.proxy_url(url);
                        info!("🌐 Webview Proxy enabled: {}", settings.proxy_url);
                    }
                    Err(e) => {
                        error!("❌ Invalid proxy URL: {}", e);
                    }
                }
            }

            window_builder.build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
