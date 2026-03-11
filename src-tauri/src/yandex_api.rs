use crate::domain::{TranslationProvider, TranslationResult};
use async_trait::async_trait;
use prost::Message;
use reqwest::{Client, header};
use hmac::{Hmac, Mac};
use sha2::Sha256;
use uuid::Uuid;

// Подключаем сгенерированный Protobuf код
pub mod pb {
    include!(concat!(env!("OUT_DIR"), "/_.rs"));
}

// Секретный ключ Яндекса для подписи запросов (вытащен из браузера)
const HMAC_KEY: &[u8] = b"bt8xH3VOlb4mqf0nqAibnDOoiPlXsisf";

pub struct YandexClient {
    http_client: Client,
}

impl YandexClient {
    pub fn new() -> Self {
        // Яндексу нужен правдоподобный User-Agent, иначе отдаст 403 Forbidden
        let mut headers = header::HeaderMap::new();
        headers.insert(
            header::USER_AGENT,
            header::HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.836 YaBrowser/23.9.1.836 Yowser/2.5 Safari/537.36"),
        );
        headers.insert(
            header::ACCEPT,
            header::HeaderValue::from_static("application/x-protobuf"),
        );
        headers.insert(
            header::CONTENT_TYPE,
            header::HeaderValue::from_static("application/x-protobuf"),
        );

        let client = Client::builder()
            .default_headers(headers)
            .build()
            .expect("Failed to build reqwest client");

        Self {
            http_client: client,
        }
    }
}

#[async_trait]
impl TranslationProvider for YandexClient {
    async fn translate_video(&self, video_url: &str) -> Result<TranslationResult, String> {
        // 1. Формируем Protobuf запрос по спецификации vot.js
        let request = pb::VideoTranslationRequest {
            url: video_url.to_string(),
            language: "en".to_string(),
            response_language: "ru".to_string(),
            first_request: true,
            duration: 344.0, // Дефолтное значение, если мы пока не умеем парсить длину
            unknown0: 1,
            unknown1: 0,
            unknown2: 1,
            unknown3: 2, // Актуально для 2025/2026 года
            use_lively_voice: false, // Обычные голоса (без OAuth)
            bypass_cache: false,
            ..Default::default()
        };

        // 2. Сериализуем в бинарный формат
        let mut buf = Vec::new();
        request.encode(&mut buf).map_err(|e| e.to_string())?;

        // 3. Создаем криптографическую подпись (HMAC-SHA256)
        let mut mac = Hmac::<Sha256>::new_from_slice(HMAC_KEY)
            .expect("HMAC can take key of any size");
        mac.update(&buf);
        let signature_bytes = mac.finalize().into_bytes();
        let signature_hex = hex::encode(signature_bytes); // Переводим в 16-ричную строку

        // 4. Генерируем уникальный токен сессии (Яндекс это требует)
        let uuid_str = Uuid::new_v4().to_string();

        // 5. Отправляем POST запрос Яндексу с новыми заголовками
        let response = self
            .http_client
            .post("https://api.browser.yandex.ru/video-translation/translate")
            // Добавляем обязательные кастомные заголовки
            .header("Vtrans-Signature", signature_hex)
            .header("Sec-Vtrans-Token", uuid_str)
            .body(buf)
            .send()
            .await
            .map_err(|e| format!("Network error: {}", e))?;

        if !response.status().is_success() {
            return Err(format!("Yandex API error: HTTP {}", response.status()));
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