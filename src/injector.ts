// Импортируем конкретно хелпер для YouTube, чтобы не тянуть лишнее
import YoutubeHelper from "@vot.js/ext/helpers/youtube";

declare global {
    interface Window {
        __TAURI__?: {
            core: {
                invoke(cmd: string, args?: any): Promise<any>;
            };
        };
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const isApp = window.location.hostname === 'localhost' || window.location.hostname === 'tauri.localhost' || window.location.protocol === 'tauri:';
    if (isApp) return;

    console.log("🦀 CrabVoice: vot.js скрипт запущен!");

    try {
        // Тестируем логику официального vot.js для YouTube
        if (window.location.hostname.includes("youtube.com")) {
            const ytHelper = new YoutubeHelper();
            
            // 1. Получаем ID видео из текущей ссылки
            const videoId = await ytHelper.getVideoId(new URL(window.location.href));
            
            if (videoId) {
                // 2. Вытаскиваем все метаданные через официальный API Ютуба (магия vot.js)
                const videoData = await ytHelper.getVideoData(videoId);
                console.log("✅ VOT.JS вытащил данные:", videoData);

                // 3. Отправляем в наш Rust!
                if (window.__TAURI__) {
                    await window.__TAURI__.core.invoke("log_video_data", { 
                        title: videoData?.title || "Без названия", 
                        duration: videoData?.duration || 0.0 
                    });
                }
            } else {
                console.log("⚠️ CrabVoice: Это YouTube, но видео не найдено на странице.");
            }
        }
    } catch (e) {
        console.error("❌ Ошибка CrabVoice:", e);
    }
});