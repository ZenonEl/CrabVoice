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
        let endpoint = format!("https://{}/video-translation/translate", host);

        let req_body = WorkerRequest {
            url: video_url.to_string(),
            language: settings.default_source_lang.clone(),
            response_language: settings.default_target_lang.clone(),
            duration,
            first_request: true,
            use_lively_voice: settings.use_lively_voice,
        };

        let response = self.http_client
            .post(&endpoint)
            .json(&req_body)
            .send()
            .await
            .map_err(|e| format!("Worker Proxy Network Error: {}", e))?;

        if !response.status().is_success() {
            return Err(format!("Worker Error: HTTP {}", response.status()));
        }

        let proxy_res: WorkerResponse = response.json()
            .await
            .map_err(|e| format!("Failed to parse JSON from worker: {}", e))?;

        Ok(TranslationResult {
            url: proxy_res.url,
            status: proxy_res.status,
            message: proxy_res.message,
            remaining_time: proxy_res.remaining_time,
        })
    }
}