use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct SponsorSegment {
    pub start: f32,
    pub end: f32,
    pub category: String,
}

// --------------------------------------------------------
// РЕАЛИЗАЦИЯ ДЛЯ БЕСПЛАТНОЙ ВЕРСИИ (Пустышки)
// --------------------------------------------------------
#[cfg(not(feature = "premium"))]
pub async fn fetch_sponsor_segments(_video_id: &str) -> Result<Vec<SponsorSegment>, String> {
    Ok(vec![]) // Бесплатная версия ничего не находит
}

// --------------------------------------------------------
// PUBLIC STUB: Реализация находится в приватном репозитории
// --------------------------------------------------------
#[cfg(feature = "premium")]
pub async fn fetch_sponsor_segments(_video_id: &str) -> Result<Vec<SponsorSegment>, String> {
    Ok(vec![])
}
