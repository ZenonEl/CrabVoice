use crate::domain::{TranslationProvider, TranslationResult, AppSettings};
use async_trait::async_trait;
use reqwest::Client;
use serde::{Deserialize, Serialize};

pub struct WorkerClient {
    http_client: Client,
}

impl WorkerClient {
    pub fn new() -> Self {
        let mut headers = reqwest::header::HeaderMap::new();
        // Cloudflare жестко дропает запросы без валидного User-Agent'а
        headers.insert(
            reqwest::header::USER_AGENT,
            reqwest::header::HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.836 YaBrowser/23.9.1.836 Yowser/2.5 Safari/537.36"),
        );
        headers.insert(reqwest::header::ACCEPT, reqwest::header::HeaderValue::from_static("application/json"));

        let client = Client::builder()
            .default_headers(headers)
            .build()
            .expect("Failed to build worker client");

        Self {
            http_client: client,
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