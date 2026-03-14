window.addEventListener("DOMContentLoaded", () => {
  const urlInputEl = document.querySelector("#url-input") as HTMLInputElement;
  const resultMsgEl = document.querySelector("#result-msg");

  document.querySelector("#translate-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (urlInputEl && resultMsgEl && urlInputEl.value) {
      resultMsgEl.innerHTML = `<div style="color: #24c8db;">🎬 Redirecting... Translation will start automatically.</div>`;
      
      // Настоящий Mobile First! Просто перенаправляем текущее окно на сайт с видео.
      // Наш бессмертный скрипт из Rust проснется и сам всё сделает.
      window.location.href = urlInputEl.value;
    }
  });
});
