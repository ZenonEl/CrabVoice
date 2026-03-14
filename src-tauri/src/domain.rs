use async_trait::async_trait;
use serde::{Deserialize, Serialize};

/// Сущность успешного или ожидающего перевода (то, что полетит на фронтенд)
#[derive(Debug, Serialize, Deserialize)]
pub struct TranslationResult {
    pub url: Option<String>,
    pub status: i32,
    pub message: Option<String>,
    pub remaining_time: Option<i32>,
}

/// Порт (Интерфейс) для инверсии зависимостей.
/// Наш контроллер (Tauri command) будет знать ТОЛЬКО об этом трейте.
#[async_trait]
pub trait TranslationProvider: Send + Sync {
    async fn translate_video(&self, video_url: &str, duration: f64) -> Result<TranslationResult, String>;
}