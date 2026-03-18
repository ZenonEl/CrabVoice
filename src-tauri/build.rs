fn main() {
    // Load .env and pass variables to rustc at compile time
    if let Ok(content) = std::fs::read_to_string(".env") {
        for line in content.lines() {
            let line = line.trim();
            if line.is_empty() || line.starts_with('#') {
                continue;
            }
            if let Some((key, value)) = line.split_once('=') {
                println!("cargo:rustc-env={}={}", key.trim(), value.trim());
            }
        }
        println!("cargo:rerun-if-changed=.env");
    }

    // Компилируем наш proto файл. Он сгенерирует Rust-код в папку target/OUT_DIR
    prost_build::compile_protos(&["proto/yandex.proto"], &["proto/"])
        .expect("Failed to compile Protobuf");

    tauri_build::build()
}
