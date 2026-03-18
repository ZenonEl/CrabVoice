use crate::domain::AppSettings;
use crate::error::AppError;
use log::{info, warn};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

pub struct SettingsManager {
    filepath: PathBuf,
}

impl SettingsManager {
    pub fn new(app: &AppHandle) -> Self {
        let mut path = app
            .path()
            .app_data_dir()
            .expect("Failed to get app data dir");

        if !path.exists() {
            let _ = fs::create_dir_all(&path);
        }

        path.push("settings.json");
        info!("Settings path: {}", path.display());
        Self { filepath: path }
    }

    pub fn load(&self) -> AppSettings {
        match fs::read_to_string(&self.filepath) {
            Ok(content) => match serde_json::from_str(&content) {
                Ok(settings) => {
                    info!("Settings loaded from {}", self.filepath.display());
                    settings
                }
                Err(e) => {
                    warn!(
                        "Settings file corrupted ({}), using defaults: {}",
                        self.filepath.display(),
                        e
                    );
                    AppSettings::default()
                }
            },
            Err(_) => {
                info!("No settings file found, using defaults");
                AppSettings::default()
            }
        }
    }

    pub fn save(&self, settings: &AppSettings) -> Result<(), AppError> {
        let content = serde_json::to_string_pretty(settings)?;
        fs::write(&self.filepath, content)?;
        Ok(())
    }
}
