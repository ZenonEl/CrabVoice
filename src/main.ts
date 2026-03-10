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
      // Статус 2 (или другие) = В процессе перевода (особенно для новых длинных видео)
      else if (result.status === 2 || result.message === "waiting") {
        resultMsgEl.textContent = "⏳ Translation is in progress on Yandex servers. Click 'Translate' again in 30 seconds.";
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
