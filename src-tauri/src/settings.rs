use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use crate::domain::AppSettings;

pub struct SettingsManager {
    filepath: PathBuf,
}

impl SettingsManager {
    pub fn new(app: &AppHandle) -> Self {
        // Получаем правильный путь к папке данных приложения в зависимости от ОС (Windows/Mac/Android)
        let mut path = app.path().app_data_dir().expect("Failed to get app data dir");
        
        // Создаем папку, если её нет
        if !path.exists() {
            let _ = fs::create_dir_all(&path);
        }
        
        path.push("settings.json");
        Self { filepath: path }
    }

    pub fn load(&self) -> AppSettings {
        if let Ok(content) = fs::read_to_string(&self.filepath) {
            serde_json::from_str(&content).unwrap_or_default()
        } else {
            AppSettings::default()
        }
    }

    pub fn save(&self, settings: &AppSettings) -> Result<(), String> {
        let content = serde_json::to_string_pretty(settings).map_err(|e| e.to_string())?;
        fs::write(&self.filepath, content).map_err(|e| e.to_string())
    }
}