use serde::Serialize;

#[cfg(feature = "subscribers")]
use serde::Deserialize;

#[derive(Serialize, Clone)]
pub struct SponsorSegment {
    pub start: f32,
    pub end: f32,
    pub category: String,
}

/// Returns the current app tier as a string: "free", "subscribers", or "premium"
pub fn get_tier() -> &'static str {
    if cfg!(feature = "premium") {
        "premium"
    } else if cfg!(feature = "subscribers") {
        "subscribers"
    } else {
        "free"
    }
}

// --------------------------------------------------------
// FREE: SponsorBlock is not available
// --------------------------------------------------------
#[cfg(not(feature = "subscribers"))]
pub async fn fetch_sponsor_segments(_video_id: &str) -> Result<Vec<SponsorSegment>, String> {
    Ok(vec![])
}

// --------------------------------------------------------
// SUBSCRIBERS+: Real SponsorBlock API integration
// --------------------------------------------------------
#[cfg(feature = "subscribers")]
pub async fn fetch_sponsor_segments(video_id: &str) -> Result<Vec<SponsorSegment>, String> {
    #[derive(Deserialize)]
    struct ApiSegment {
        segment: [f32; 2],
        category: String,
    }

    let url = format!(
        "https://sponsor.ajay.app/api/skipSegments?videoID={}&categories={}",
        video_id,
        r#"["sponsor","selfpromo","interaction","intro","outro"]"#
    );

    let resp = reqwest::get(&url)
        .await
        .map_err(|e| format!("SponsorBlock request failed: {}", e))?;

    if resp.status() == 404 {
        return Ok(vec![]);
    }

    if !resp.status().is_success() {
        return Err(format!("SponsorBlock API error: {}", resp.status()));
    }

    let api_segments: Vec<ApiSegment> = resp
        .json()
        .await
        .map_err(|e| format!("SponsorBlock parse error: {}", e))?;

    Ok(api_segments
        .into_iter()
        .map(|s| SponsorSegment {
            start: s.segment[0],
            end: s.segment[1],
            category: s.category,
        })
        .collect())
}
