use std::fmt;

/// Structured error type for the entire app.
/// Converts to user-friendly strings at IPC boundary.
#[derive(Debug)]
pub enum AppError {
    /// Network connectivity issues (proxy, DNS, timeout)
    Network(String),
    /// External API errors (Yandex, SponsorBlock)
    Api(String),
    /// Serialization/deserialization failures (protobuf, JSON)
    Parse(String),
    /// Configuration/settings issues
    Config(String),
    /// File system operations
    Io(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Network(msg) => write!(f, "Network error: {}", msg),
            AppError::Api(msg) => write!(f, "API error: {}", msg),
            AppError::Parse(msg) => write!(f, "Parse error: {}", msg),
            AppError::Config(msg) => write!(f, "Config error: {}", msg),
            AppError::Io(msg) => write!(f, "IO error: {}", msg),
        }
    }
}

impl From<AppError> for String {
    fn from(e: AppError) -> String {
        e.to_string()
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError::Io(e.to_string())
    }
}

impl From<serde_json::Error> for AppError {
    fn from(e: serde_json::Error) -> Self {
        AppError::Parse(e.to_string())
    }
}

impl From<reqwest::Error> for AppError {
    fn from(e: reqwest::Error) -> Self {
        if e.is_connect() || e.is_timeout() {
            AppError::Network(e.to_string())
        } else if e.is_decode() {
            AppError::Parse(e.to_string())
        } else {
            AppError::Network(e.to_string())
        }
    }
}

impl From<prost::EncodeError> for AppError {
    fn from(e: prost::EncodeError) -> Self {
        AppError::Parse(format!("Protobuf encode: {}", e))
    }
}

impl From<prost::DecodeError> for AppError {
    fn from(e: prost::DecodeError) -> Self {
        AppError::Parse(format!("Protobuf decode: {}", e))
    }
}
