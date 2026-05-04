use crate::error::AppError;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};

/// Global application settings persisted on disk.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    pub volume_ducking: f64,
    pub default_source_lang: String,
    pub default_target_lang: String,
    pub use_proxy: bool,
    pub proxy_url: String,
    pub use_lively_voice: bool,
    pub yandex_token: Option<String>,
    #[serde(default = "default_true")]
    pub sponsorblock_enabled: bool,
    #[serde(default = "default_lang")]
    pub ui_language: String,
    #[serde(default = "default_theme")]
    pub theme: String,
}

fn default_true() -> bool {
    true
}

fn default_lang() -> String {
    "en".to_string()
}

fn default_theme() -> String {
    "dark".to_string()
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            volume_ducking: 0.15,
            default_source_lang: "en".to_string(),
            default_target_lang: "ru".to_string(),
            use_proxy: false,
            proxy_url: "".to_string(), // Accepts http://... or socks5://...
            use_lively_voice: false,
            yandex_token: None,
            sponsorblock_enabled: true,
            ui_language: "en".to_string(),
            theme: "dark".to_string(),
        }
    }
}

/// Translation result entity.
#[derive(Debug, Serialize, Deserialize)]
pub struct TranslationResult {
    pub url: Option<String>,
    pub status: i32,
    pub message: Option<String>,
    pub remaining_time: Option<i32>,
}

/// Response from Yandex OAuth Device Code request
#[derive(Debug, Serialize, Deserialize)]
pub struct DeviceCodeResponse {
    pub device_code: String,
    pub user_code: String,
    pub verification_url: String,
    pub interval: u64,
    pub expires_in: u64,
}

/// Response from Yandex OAuth token polling
#[derive(Debug, Serialize, Deserialize)]
pub struct DeviceTokenResponse {
    pub access_token: Option<String>,
    pub token_type: Option<String>,
    pub expires_in: Option<u64>,
    pub error: Option<String>,
}

/// Port interface for dependency inversion.
#[async_trait]
pub trait TranslationProvider: Send + Sync {
    // Provider receives settings to decide which languages and voice options to send.
    async fn translate_video(
        &self,
        video_url: &str,
        duration: f64,
        first_request: bool,
        settings: &AppSettings,
    ) -> Result<TranslationResult, AppError>;
}
