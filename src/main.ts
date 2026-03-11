import { invoke } from "@tauri-apps/api/core";

let urlInputEl: HTMLInputElement | null;
let resultMsgEl: HTMLElement | null;

async function translateVideo() {
  if (resultMsgEl && urlInputEl) {
    resultMsgEl.textContent = "Translating... Please wait.";
    try {
      // Вызываем нашу функцию на Rust, передавая URL
      const result: any = await invoke("translate", {
        url: urlInputEl.value,
      });

      // Статус 1 = Успех (перевод готов)
      if (result.status === 1 && result.url) {
        resultMsgEl.innerHTML = `
          <div style="color: #24c8db; margin-bottom: 10px;">✅ <strong>Success!</strong></div>
          <audio controls src="${result.url}"></audio>
          <br><br>
          <a href="${result.url}" target="_blank">Direct Audio Link</a>
        `;
      } 
      // Статус 2 (WAITING) или 3 (LONG_WAITING) = В процессе перевода
      else if (result.status === 2 || result.status === 3 || result.message === "waiting") {
        // Берем время от Яндекса или ждем 20 секунд по умолчанию
        const waitSeconds = result.remaining_time && result.remaining_time > 0 ? result.remaining_time : 20;
        
        resultMsgEl.innerHTML = `
          <div style="color: #FFC131;">⏳ <strong>Translating...</strong></div>
          <p>Yandex is processing the video. Auto-retrying in ${waitSeconds} seconds.</p>
        `;

        // Автоматически дергаем функцию снова через N секунд
        setTimeout(() => {
          translateVideo();
        }, waitSeconds * 1000);
      } 
      // Неизвестная ошибка со стороны Яндекса
      else {
        resultMsgEl.textContent = `⚠️ Status: ${result.status}. Message: ${result.message || "Unknown state"}`;
      }
    } catch (e) {
      // Ошибка сети или паника в Rust
      resultMsgEl.textContent = `❌ Error: ${e}`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  urlInputEl = document.querySelector("#url-input");
  resultMsgEl = document.querySelector("#result-msg");
  document.querySelector("#translate-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    translateVideo();
  });
});
