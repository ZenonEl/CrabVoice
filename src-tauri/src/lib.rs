mod domain;
mod error;
mod premium;
mod settings;
mod yandex_api;

use domain::{AppSettings, DeviceCodeResponse, DeviceTokenResponse, TranslationProvider, TranslationResult};
use settings::SettingsManager;
use yandex_api::YandexClient;

use log::{error, info, warn};
use std::fs;
use std::sync::Arc;
use tauri::{Manager, State};
use tauri_plugin_log::{Target, TargetKind};
use tokio::sync::Mutex;

const YANDEX_CLIENT_ID: &str = env!("YANDEX_CLIENT_ID");
const YANDEX_CLIENT_SECRET: &str = env!("YANDEX_CLIENT_SECRET");

struct AppState {
    yandex_translator: Arc<dyn TranslationProvider>,
    settings: Mutex<AppSettings>,
    settings_manager: SettingsManager,
}

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
    let log_dir = app
        .path()
        .app_log_dir()
        .map_err(|e| format!("Config error: {}", e))?;

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

#[tauri::command]
async fn export_logs(app: tauri::AppHandle) -> Result<String, String> {
    let logs = get_logs(app.clone()).await?;

    let mut path = match app.path().download_dir() {
        Ok(p) => p,
        Err(_) => app
            .path()
            .document_dir()
            .map_err(|e| format!("IO error: cannot find export directory: {}", e))?,
    };

    path.push("crabvoice.log");
    fs::write(&path, &logs).map_err(|e| format!("IO error: failed to write log file: {}", e))?;
    info!("Logs exported to {}", path.display());

    Ok(path.to_string_lossy().into_owned())
}

/// Returns the current app tier: "free", "subscribers", or "premium"
#[tauri::command]
fn get_app_tier() -> &'static str {
    premium::get_tier()
}

#[tauri::command]
async fn get_skip_segments(
    video_id: String,
) -> Result<Vec<premium::SponsorSegment>, String> {
    premium::fetch_sponsor_segments(&video_id)
        .await
        .map_err(|e| {
            warn!("SponsorBlock error for '{}': {}", video_id, e);
            e.to_string()
        })
}

#[tauri::command]
async fn ping_proxy(proxy_url: String) -> Result<u128, String> {
    let mut client_builder = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(5));

    if !proxy_url.is_empty() {
        match reqwest::Proxy::all(&proxy_url) {
            Ok(proxy) => client_builder = client_builder.proxy(proxy),
            Err(e) => {
                return Err(format!("Config error: invalid proxy URL: {}", e));
            }
        }
    }

    let client = client_builder
        .build()
        .map_err(|e| format!("Network error: {}", e))?;

    let start = std::time::Instant::now();
    let res = client
        .get("http://gstatic.com/generate_204")
        .send()
        .await
        .map_err(|e| {
            if e.is_timeout() {
                "Network error: proxy connection timed out".to_string()
            } else if e.is_connect() {
                "Network error: cannot connect through proxy".to_string()
            } else {
                format!("Network error: {}", e)
            }
        })?;

    if res.status().is_success() {
        let ms = start.elapsed().as_millis();
        info!("Proxy ping: {} ms via {}", ms, proxy_url);
        Ok(ms)
    } else {
        Err(format!("API error: HTTP {}", res.status()))
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
    state.settings_manager.save(&new_settings).map_err(|e| {
        error!("Failed to save settings: {}", e);
        e.to_string()
    })?;
    Ok(())
}

#[tauri::command]
async fn save_yandex_token(token: String, state: State<'_, AppState>) -> Result<(), String> {
    let mut s = state.settings.lock().await;
    s.yandex_token = Some(token);
    state.settings_manager.save(&s).map_err(|e| {
        error!("Failed to save OAuth token: {}", e);
        e.to_string()
    })?;
    info!("OAuth token saved successfully");
    Ok(())
}

#[tauri::command]
async fn request_device_code() -> Result<DeviceCodeResponse, String> {
    let client = reqwest::Client::new();
    let resp = client
        .post("https://oauth.yandex.com/device/code")
        .form(&[("client_id", YANDEX_CLIENT_ID)])
        .send()
        .await
        .map_err(|e| format!("Network error: {}", e))?;

    if !resp.status().is_success() {
        let status = resp.status();
        let body = resp.text().await.unwrap_or_default();
        return Err(format!("API error: HTTP {} — {}", status, body));
    }

    let code_resp: DeviceCodeResponse = resp.json().await.map_err(|e| format!("Parse error: {}", e))?;
    info!("Device code requested, user_code: {}", code_resp.user_code);
    Ok(code_resp)
}

#[tauri::command]
async fn poll_device_token(device_code: String) -> Result<DeviceTokenResponse, String> {
    let client = reqwest::Client::new();
    let resp = client
        .post("https://oauth.yandex.com/token")
        .form(&[
            ("grant_type", "device_code"),
            ("code", &device_code),
            ("client_id", YANDEX_CLIENT_ID),
            ("client_secret", YANDEX_CLIENT_SECRET),
        ])
        .send()
        .await
        .map_err(|e| format!("Network error: {}", e))?;

    let token_resp: DeviceTokenResponse = resp.json().await.map_err(|e| format!("Parse error: {}", e))?;
    if let Some(ref token) = token_resp.access_token {
        info!("Device code flow: token obtained (len={})", token.len());
    }
    Ok(token_resp)
}

#[tauri::command]
async fn set_pip_allowed(app: tauri::AppHandle, allowed: bool) -> Result<(), String> {
    #[cfg(target_os = "android")]
    {
        let bundle_id = &app.config().identifier;
        let path = std::path::PathBuf::from(format!("/data/data/{}/files/pip_allowed.txt", bundle_id));
        fs::write(&path, if allowed { "1" } else { "0" })
            .map_err(|e| format!("IO error: {}", e))?;
    }
    #[cfg(not(target_os = "android"))]
    {
        let _ = (app, allowed);
    }
    Ok(())
}

#[tauri::command]
async fn consume_shared_url(app: tauri::AppHandle) -> Result<Option<String>, String> {
    #[cfg(target_os = "android")]
    {
        let bundle_id = &app.config().identifier;
        let path = std::path::PathBuf::from(format!("/data/data/{}/files/shared_url.txt", bundle_id));
        info!("consume_shared_url: checking {}", path.display());
        if !path.exists() {
            return Ok(None);
        }
        let url = fs::read_to_string(&path).ok();
        let _ = fs::remove_file(&path);
        let result = url.map(|s| s.trim().to_string()).filter(|s| !s.is_empty());
        info!("consume_shared_url: read {:?}", result);
        return Ok(result);
    }
    #[cfg(not(target_os = "android"))]
    {
        let _ = app;
        Ok(None)
    }
}

#[tauri::command]
async fn translate(
    url: String,
    duration: f64,
    first_request: bool,
    state: State<'_, AppState>,
) -> Result<TranslationResult, String> {
    let current_settings = state.settings.lock().await.clone();

    if current_settings.use_proxy {
        info!(
            "Translate via proxy ({}): {}",
            current_settings.proxy_url, url
        );
    } else {
        info!("Translate via direct connection: {}", url);
    };

    state
        .yandex_translator
        .translate_video(&url, duration, first_request, &current_settings)
        .await
        .map_err(|e| {
            error!("Translation failed for '{}': {}", url, e);
            e.to_string()
        })
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
                .target(Target::new(TargetKind::LogDir {
                    file_name: Some("crabvoice.log".to_string()),
                }))
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
            get_app_tier,
            get_skip_segments,
            ping_proxy,
            request_device_code,
            poll_device_token,
            consume_shared_url,
            set_pip_allowed
        ])
        .setup(move |app| {
            let settings_manager = SettingsManager::new(app.handle());
            let settings = settings_manager.load();
            info!("CrabVoice backend started (tier: {})", premium::get_tier());

            app.manage(AppState {
                yandex_translator: Arc::new(YandexClient::new()),
                settings: Mutex::new(settings.clone()),
                settings_manager,
            });

            let mut window_builder = tauri::WebviewWindowBuilder::new(
                app,
                "main",
                tauri::WebviewUrl::App("index.html".into()),
            )
            .initialization_script(init_script)
            .on_navigation(|url| {
                let url_str = url.as_str();
                // Block non-http(s) schemes (yandexauth://, intent://, etc.)
                // These cause white screen on Android webview
                if !url_str.starts_with("http://") && !url_str.starts_with("https://") && !url_str.starts_with("tauri://") && !url_str.starts_with("about:") {
                    warn!("Blocked navigation to unsupported scheme: {}", url_str);
                    return false;
                }
                true
            });

            if settings.use_proxy && !settings.proxy_url.is_empty() {
                match tauri::Url::parse(&settings.proxy_url) {
                    Ok(url) => {
                        window_builder = window_builder.proxy_url(url);
                        info!("Webview proxy enabled: {}", settings.proxy_url);
                    }
                    Err(e) => {
                        warn!("Invalid proxy URL for webview: {}", e);
                    }
                }
            }

            window_builder.build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
