import { invoke } from "@tauri-apps/api/core";

window.addEventListener("DOMContentLoaded", () => {
  const urlInputEl = document.querySelector("#url-input") as HTMLInputElement;
  const resultMsgEl = document.querySelector("#result-msg");

  document.querySelector("#translate-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (urlInputEl && resultMsgEl) {
      resultMsgEl.innerHTML = `<div style="color: #24c8db;">🎬 Opening Player... Translation will start automatically inside the player.</div>`;
      try {
        await invoke("open_player", { targetUrl: urlInputEl.value });
      } catch (err) {
        resultMsgEl.innerHTML = `<div style="color: #ff5e5e;">❌ Error: ${err}</div>`;
      }
    }
  });
});
