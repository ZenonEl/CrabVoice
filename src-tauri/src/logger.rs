use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use std::time::{SystemTime, UNIX_EPOCH};

pub struct Logger {
    filepath: PathBuf,
    backup_path: PathBuf,
}

impl Logger {
    pub fn new(app: &AppHandle) -> Self {
        let mut path = app.path().app_data_dir().unwrap_or_else(|_| PathBuf::from("."));
        if !path.exists() {
            let _ = fs::create_dir_all(&path);
        }
        let mut backup = path.clone();
        path.push("crabvoice.log");
        backup.push("crabvoice.bak.log");

        Self {
            filepath: path,
            backup_path: backup,
        }
    }

    pub fn write(&self, source: &str, msg: &str) {
        // Ротация: если файл больше 2 МБ, переименовываем его в .bak.log
        if let Ok(meta) = fs::metadata(&self.filepath) {
            if meta.len() > 2 * 1024 * 1024 {
                let _ = fs::rename(&self.filepath, &self.backup_path);
            }
        }

        let sys_time = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
        let log_line = format!("[EPOCH {}] [{}] {}\n", sys_time, source, msg);

        if let Ok(mut file) = OpenOptions::new().create(true).append(true).open(&self.filepath) {
            let _ = file.write_all(log_line.as_bytes());
        }
        println!("{}", log_line.trim());
    }

    pub fn read(&self) -> String {
        let mut content = String::new();
        // Сначала читаем бэкап, потом текущие логи, чтобы сохранить хронологию
        if self.backup_path.exists() {
            if let Ok(bak) = fs::read_to_string(&self.backup_path) {
                content.push_str(&bak);
            }
        }
        if let Ok(curr) = fs::read_to_string(&self.filepath) {
            content.push_str(&curr);
        }
        content
    }
}