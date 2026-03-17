fn main() {
    // Компилируем наш proto файл. Он сгенерирует Rust-код в папку target/OUT_DIR
    prost_build::compile_protos(&["proto/yandex.proto"], &["proto/"])
        .expect("Failed to compile Protobuf");

    tauri_build::build()
}
