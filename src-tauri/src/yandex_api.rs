use crate::domain::{AppSettings, TranslationProvider, TranslationResult};
use crate::error::AppError;
use async_trait::async_trait;
use hmac::{Hmac, Mac};
use log::{debug, info, warn};
use prost::Message;
use reqwest::{header, Client};
use sha2::Sha256;
use uuid::Uuid;

pub mod pb {
    #![allow(dead_code)]
    include!(concat!(env!("OUT_DIR"), "/_.rs"));
}

const HMAC_KEY: &[u8] = b"bt8xH3VOlb4mqf0nqAibnDOoiPlXsisf";

pub struct YandexClient;

impl YandexClient {
    pub fn new() -> Self {
        Self {}
    }
}

#[async_trait]
impl TranslationProvider for YandexClient {
    async fn translate_video(
        &self,
        video_url: &str,
        duration: f64,
        first_request: bool,
        settings: &AppSettings,
    ) -> Result<TranslationResult, AppError> {
        let request = pb::VideoTranslationRequest {
            url: video_url.to_string(),
            language: settings.default_source_lang.clone(),
            response_language: settings.default_target_lang.clone(),
            first_request,
            duration,
            unknown0: 1,
            unknown1: 0,
            unknown2: 1,
            unknown3: 2,
            use_lively_voice: settings.use_lively_voice,
            bypass_cache: false,
            ..Default::default()
        };

        let mut buf = Vec::new();
        request.encode(&mut buf)?;

        let mut mac =
            Hmac::<Sha256>::new_from_slice(HMAC_KEY).expect("HMAC can take key of any size");
        mac.update(&buf);
        let signature_hex = hex::encode(mac.finalize().into_bytes());
        let uuid_str = Uuid::new_v4().to_string();

        info!(
            "Yandex API request: {} -> {}, duration={:.0}s, lively={}, first_request={}",
            settings.default_source_lang, settings.default_target_lang, duration, settings.use_lively_voice, first_request
        );

        let mut headers = header::HeaderMap::new();
        headers.insert(header::USER_AGENT, header::HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.836 YaBrowser/23.9.1.836 Yowser/2.5 Safari/537.36"));
        headers.insert(header::ACCEPT, header::HeaderValue::from_static("application/x-protobuf"));
        headers.insert(header::CONTENT_TYPE, header::HeaderValue::from_static("application/x-protobuf"));

        let mut client_builder = Client::builder()
            .default_headers(headers)
            .timeout(std::time::Duration::from_secs(60));

        if settings.use_proxy && !settings.proxy_url.is_empty() {
            match reqwest::Proxy::all(&settings.proxy_url) {
                Ok(proxy) => {
                    debug!("Using proxy: {}", settings.proxy_url);
                    client_builder = client_builder.proxy(proxy);
                }
                Err(e) => {
                    warn!("Invalid proxy URL '{}': {}", settings.proxy_url, e);
                    return Err(AppError::Config(format!(
                        "Invalid proxy URL '{}': {}",
                        settings.proxy_url, e
                    )));
                }
            }
        }

        let client = client_builder.build().map_err(|e| {
            AppError::Network(format!("Failed to create HTTP client: {}", e))
        })?;

        let mut req_builder = client
            .post("https://api.browser.yandex.ru/video-translation/translate")
            .header("Vtrans-Signature", signature_hex)
            .header("Sec-Vtrans-Token", uuid_str)
            .body(buf);

        if let Some(token) = settings.yandex_token.clone() {
            req_builder = req_builder.header("Authorization", format!("OAuth {}", token));
        }

        let response = req_builder.send().await.map_err(|e| {
            if e.is_timeout() {
                AppError::Network("Request timed out — check your connection or proxy".into())
            } else if e.is_connect() {
                AppError::Network("Cannot connect to Yandex API — check your network".into())
            } else {
                AppError::Network(e.to_string())
            }
        })?;

        if !response.status().is_success() {
            let status = response.status();
            let err_text = response.text().await.unwrap_or_default();
            warn!("Yandex API HTTP {}: {}", status, err_text);
            return Err(AppError::Api(format!("Yandex HTTP {}: {}", status, err_text)));
        }

        let response_bytes = response.bytes().await?;
        let yandex_response = pb::VideoTranslationResponse::decode(response_bytes)?;

        info!(
            "Yandex response: status={}, url={}, remaining_time={:?}",
            yandex_response.status,
            yandex_response.url.as_deref().unwrap_or("none"),
            yandex_response.remaining_time
        );

        Ok(TranslationResult {
            url: yandex_response.url,
            status: yandex_response.status,
            message: yandex_response.message,
            remaining_time: yandex_response.remaining_time,
        })
    }
}
