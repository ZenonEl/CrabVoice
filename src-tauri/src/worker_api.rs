use crate::domain::{TranslationProvider, TranslationResult, AppSettings};
use async_trait::async_trait;
use reqwest::Client;
use serde::{Deserialize, Serialize};

pub struct WorkerClient {
    http_client: Client,
}

impl WorkerClient {
    pub fn new() -> Self {
        Self {
            http_client: Client::new(),
        }
    }
}

// Структура запроса, которую понимает vot-worker
#[derive(Serialize)]
struct WorkerRequest {
    url: String,
    language: String,
    #[serde(rename = "responseLanguage")]
    response_language: String,
    duration: f64,
    #[serde(rename = "firstRequest")]
    first_request: bool,
    #[serde(rename = "useLivelyVoice")]
    use_lively_voice: bool,
}

// Ответ от vot-worker (JSON)
#[derive(Deserialize)]
struct WorkerResponse {
    url: Option<String>,
    status: i32,
    message: Option<String>,
    #[serde(rename = "remainingTime")]
    remaining_time: Option<i32>,
}

#[async_trait]
impl TranslationProvider for WorkerClient {
    async fn translate_video(&self, video_url: &str, duration: f64, settings: &AppSettings) -> Result<TranslationResult, String> {
        let host = &settings.proxy_worker_host;
        // Чистим URL, если юзер случайно ввел с https://
        let clean_host = host.replace("https://", "").replace("http://", "").trim_end_matches('/').to_string();
        let endpoint = format!("https://{}/video-translation/translate", clean_host);

        let req_body = WorkerRequest {
            url: video_url.to_string(),
            language: settings.default_source_lang.clone(),
            response_language: settings.default_target_lang.clone(),
            duration,
            first_request: true,
            use_lively_voice: settings.use_lively_voice,
        };

        let mut req_builder = self.http_client.post(&endpoint).json(&req_body);

        // Если есть токен, добавляем авторизацию
        if let Some(token) = &settings.yandex_token {
            req_builder = req_builder.header("Authorization", format!("OAuth {}", token));
        }

        let response = req_builder
            .send()
            .await
            .map_err(|e| format!("Worker Network Error: {}", e))?;

        if !response.status().is_success() {
            let status = response.status();
            // Вытаскиваем точный текст ошибки от сервера
            let err_text = response.text().await.unwrap_or_else(|_| "Unknown Error".to_string());
            println!("❌ Worker Proxy Error: HTTP {} - {}", status, err_text);
            return Err(format!("Worker HTTP {}: {}", status, err_text));
        }

        let proxy_res: WorkerResponse = response.json()
            .await
            .map_err(|e| format!("JSON Parse Error: {}", e))?;

        Ok(TranslationResult {
            url: proxy_res.url,
            status: proxy_res.status,
            message: proxy_res.message,
            remaining_time: proxy_res.remaining_time,
        })
    }
}