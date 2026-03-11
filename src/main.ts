import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

let urlInputEl: HTMLInputElement | null;
let resultMsgEl: HTMLElement | null;

// Слушаем только событие закрытия плеера от инжектированного скрипта
async function setupEventListeners() {
  await listen("player-closed", async () => {
    if (resultMsgEl) {
      resultMsgEl.innerHTML = `<div style="color: #ff5e5e;">⏹ Player closed. Translation stopped.</div>`;
    }
    try {
      await invoke("close_player");
    } catch (e) {
      console.error("Failed to close player:", e);
    }
  });
}

async function translateVideo() {
  if (resultMsgEl && urlInputEl) {
    resultMsgEl.innerHTML = `<div style="color: #FFC131;">⏳ <strong>Translating... Please wait.</strong></div>`;
    
    try {
      // 1. Вызываем функцию перевода на Rust
      const result: any = await invoke("translate", {
        url: urlInputEl.value,
      });

      // Статус 1 = Успех (перевод готов)
      if (result.status === 1 && result.url) {
        // РИСУЕМ КНОПКУ РУЧНОГО ЗАПУСКА
        resultMsgEl.innerHTML = `
          <div style="color: #24c8db; margin-bottom: 15px;">✅ <strong>Translation ready!</strong></div>
          <button id="btn-open-player" style="background-color: #4CAF50; color: white; width: 100%; font-size: 1.1em; padding: 12px; border-radius: 8px;">🎬 Open Video Player</button>
        `;
        
        // ВЕШАЕМ СЛУШАТЕЛЬ НА КНОПКУ
        document.getElementById("btn-open-player")?.addEventListener("click", async () => {
            resultMsgEl!.innerHTML = `<div style="color: #24c8db;">Player is running. Close it to translate another video.</div>`;
            
            // Передаем и целевой URL и URL переведенного аудио
            await invoke("open_player", { 
              targetUrl: urlInputEl!.value,
              audioUrl: result.url
            });
        });

      } 
      // Статус 2 (WAITING) или 3 (LONG_WAITING) = В процессе перевода
      else if (result.status === 2 || result.status === 3 || result.message === "waiting") {
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
      else {
        resultMsgEl.textContent = `⚠️ Status: ${result.status}. Message: ${result.message || "Unknown state"}`;
      }
    } catch (e) {
      resultMsgEl.textContent = `❌ Error: ${e}`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  urlInputEl = document.querySelector("#url-input");
  resultMsgEl = document.querySelector("#result-msg");
  
  setupEventListeners();

  document.querySelector("#translate-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    translateVideo();
  });
});
