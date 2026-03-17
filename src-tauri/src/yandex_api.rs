use crate::domain::{AppSettings, TranslationProvider, TranslationResult};
use async_trait::async_trait;
use hmac::{Hmac, Mac};
use prost::Message;
use reqwest::{header, Client};
use sha2::Sha256;
use uuid::Uuid;

pub mod pb {
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
        settings: &AppSettings,
    ) -> Result<TranslationResult, String> {
        // 1. Используем настройки, выбранные юзером
        let request = pb::VideoTranslationRequest {
            url: video_url.to_string(),
            language: settings.default_source_lang.clone(),
            response_language: settings.default_target_lang.clone(),
            first_request: true,
            duration,
            unknown0: 1,
            unknown1: 0,
            unknown2: 1,
            unknown3: 2,
            use_lively_voice: settings.use_lively_voice,
            bypass_cache: false,
            ..Default::default()
        };

        // 2. Сериализуем в бинарный формат
        let mut buf = Vec::new();
        request.encode(&mut buf).map_err(|e| e.to_string())?;

        // 3. Создаем криптографическую подпись (HMAC-SHA256)
        let mut mac =
            Hmac::<Sha256>::new_from_slice(HMAC_KEY).expect("HMAC can take key of any size");
        mac.update(&buf);
        let signature_bytes = mac.finalize().into_bytes();
        let signature_hex = hex::encode(signature_bytes); // Переводим в 16-ричную строку

        // 4. Генерируем уникальный токен сессии (Яндекс это требует)
        let uuid_str = Uuid::new_v4().to_string();

        // 5. Собираем HTTP клиент Яндекса на лету
        let mut headers = header::HeaderMap::new();
        headers.insert(header::USER_AGENT, header::HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.836 YaBrowser/23.9.1.836 Yowser/2.5 Safari/537.36"));
        headers.insert(
            header::ACCEPT,
            header::HeaderValue::from_static("application/x-protobuf"),
        );
        headers.insert(
            header::CONTENT_TYPE,
            header::HeaderValue::from_static("application/x-protobuf"),
        );

        let mut client_builder = Client::builder().default_headers(headers);

        // Применяем кастомный прокси, если включен
        if settings.use_proxy && !settings.proxy_url.is_empty() {
            if let Ok(proxy) = reqwest::Proxy::all(&settings.proxy_url) {
                client_builder = client_builder.proxy(proxy);
            }
        }

        let client = client_builder
            .build()
            .map_err(|e| format!("Failed to build reqwest client: {}", e))?;

        // 6. Отправляем POST запрос Яндексу
        let mut req_builder = client
            .post("https://api.browser.yandex.ru/video-translation/translate")
            .header("Vtrans-Signature", signature_hex)
            .header("Sec-Vtrans-Token", uuid_str)
            .body(buf);

        if let Some(token) = settings.yandex_token.clone() {
            req_builder = req_builder.header("Authorization", format!("OAuth {}", token));
        }

        let response = req_builder
            .send()
            .await
            .map_err(|e| format!("Network error: {}", e))?;

        if !response.status().is_success() {
            let status = response.status();
            let err_text = response.text().await.unwrap_or_default();
            println!("❌ Yandex API Error: HTTP {} - {}", status, err_text);
            return Err(format!("Yandex HTTP {}: {}", status, err_text));
        }

        // 4. Получаем бинарный ответ и десериализуем его
        let response_bytes = response.bytes().await.map_err(|e| e.to_string())?;
        let yandex_response = pb::VideoTranslationResponse::decode(response_bytes)
            .map_err(|e| format!("Failed to decode protobuf: {}", e))?;

        // 5. Мапим ответ Яндекса в нашу доменную сущность
        Ok(TranslationResult {
            url: yandex_response.url,
            status: yandex_response.status,
            message: yandex_response.message,
            remaining_time: yandex_response.remaining_time,
        })
    }
}
