use async_trait::async_trait;
use serde::{Deserialize, Serialize};

/// Глобальные настройки приложения (хранятся на диске)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppSettings {
    pub volume_ducking: f64,          // До скольки глушить видео (например, 0.15)
    pub default_source_lang: String,  // Язык оригинала по умолчанию (например, "en")
    pub default_target_lang: String,  // Язык перевода по умолчанию ("ru")
    pub use_proxy: bool,              // Использовать ли vot-worker
    pub proxy_worker_host: String,    // Адрес воркера
    pub use_lively_voice: bool,       // Использовать живые голоса (доп. опция)
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            volume_ducking: 0.15,
            default_source_lang: "en".to_string(),
            default_target_lang: "ru".to_string(),
            use_proxy: false,
            proxy_worker_host: "vot-worker.kload.workers.dev".to_string(),
            use_lively_voice: false,
        }
    }
}

/// Сущность результата перевода
#[derive(Debug, Serialize, Deserialize)]
pub struct TranslationResult {
    pub url: Option<String>,
    pub status: i32,
    pub message: Option<String>,
    pub remaining_time: Option<i32>,
}

/// Порт (Интерфейс) для инверсии зависимостей.
#[async_trait]
pub trait TranslationProvider: Send + Sync {
    // Теперь провайдер принимает настройки, чтобы знать, какие параметры отправлять (языки, голоса)
    async fn translate_video(&self, video_url: &str, duration: f64, settings: &AppSettings) -> Result<TranslationResult, String>;
}