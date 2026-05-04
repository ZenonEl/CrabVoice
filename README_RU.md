# CrabVoice 🦀🎙️

[![Лицензия: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-24c8db?logo=tauri)](https://v2.tauri.app)
[![Rust](https://img.shields.io/badge/Rust-Backend-orange?logo=rust)](https://www.rust-lang.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-blue?logo=typescript)](https://www.typescriptlang.org)
[![Платформы](https://img.shields.io/badge/Платформы-Windows%20%7C%20Linux%20%7C%20Android-green)]()
[![Релиз](https://img.shields.io/github/v/release/ZenonEl/CrabVoice)](https://github.com/ZenonEl/CrabVoice/releases)

> **[English version](README.md)**

**CrabVoice** — кроссплатформенное приложение для голосового перевода онлайн-видео в реальном времени. Смотрите YouTube, VK, Vimeo и 55+ других платформ на родном языке с синхронизированной озвучкой.

Построен на **Tauri v2** (Rust + TypeScript). CrabVoice обходит ограничения CORS и CSP, обеспечивая нативный голосовой перевод прямо на страницах с видео — без браузерных расширений.

## ✨ Возможности

- **Кроссплатформенность** — Windows, Linux (deb, rpm, AppImage, portable), Android (APK)
- **Голосовой перевод в реальном времени** — автоматическая озвучка через API Яндекс Переводчика
- **55+ видеоплатформ** — YouTube, VK, Vimeo, TikTok, Twitch и [многие другие](https://github.com/ilyhalight/voice-over-translation/wiki/%5BRU%5D-Supported-sites)
- **Синхронизация аудио** — воспроизведение, пауза, перемотка и скорость синхронизированы между оригиналом и переводом
- **SponsorBlock** — автопропуск рекламы и спонсорских вставок (тир подписчиков)
- **Поддержка прокси** — HTTP/SOCKS5 с встроенной проверкой пинга
- **Авторизация Яндекс** — опциональная OAuth-авторизация для улучшения качества перевода
- **Плавающая панель управления** — перетаскиваемая панель в Shadow DOM с регулировкой громкости и статус-индикаторами
- **Устойчивость к CSP и SPA** — работает на сайтах со строгими политиками безопасности

## 📥 Установка

Скачайте последний релиз для вашей платформы:

**[→ Скачать из Releases](https://github.com/ZenonEl/CrabVoice/releases/latest)**

| Платформа | Файл |
|-----------|------|
| Windows | `CrabVoice_x.x.x_x64-setup.exe` / `.msi` |
| Linux (Debian/Ubuntu) | `CrabVoice_x.x.x_amd64.deb` |
| Linux (Fedora/RHEL) | `CrabVoice-x.x.x-1.x86_64.rpm` |
| Linux (переносной) | `CrabVoice-linux-portable` |
| Linux (AppImage) | `CrabVoice_x.x.x_amd64.AppImage` |
| Android | `CrabVoice-universal-release.apk` |

## 🚀 Быстрый старт

1. Установите и запустите CrabVoice
2. Вставьте ссылку на видео (YouTube, VK, Vimeo и др.)
3. Приложение откроет видео и автоматически начнёт перевод
4. Используйте плавающую панель для управления громкостью, паузой и обновления перевода

## 🌐 Поддерживаемые платформы

CrabVoice использует [vot.js](https://github.com/FOSWLY/vot.js) для определения видео. Полный список потенциально поддерживаемых сайтов: [wiki voice-over-translation](https://github.com/ilyhalight/voice-over-translation/wiki/%5BRU%5D-Supported-sites).

**Проверено:** YouTube, VK, Vimeo
**Определяется (требует тестирования):** TikTok, Twitch, Twitter/X, Reddit, Rutube, Dailymotion, Bilibili, Kick и 40+ других

### Известные ограничения
- **TikTok** — исследуется, API Яндекса может требовать прямые URL видеофайлов (#11)
- **Видео длиннее 4 часов** — не поддерживается API перевода
- **В некоторых регионах** может потребоваться прокси для доступа к API

## 🏗️ Сборка из исходников

```bash
pnpm install
pnpm tauri dev                                        # Режим разработки
pnpm tauri build                                      # Продакшн сборка
pnpm tauri build -- --features subscribers            # Со SponsorBlock
```

**Требования:** Node.js 20+, Rust stable, pnpm, protobuf-compiler

## 🔐 Архитектура и безопасность

CrabVoice открывает видеостраницы внутри Tauri WebView и внедряет локальный управляющий скрипт, чтобы находить видео, запрашивать голосовой перевод и синхронизировать переведённое аудио с оригинальным плеером. Поэтому CSP для WebView отключён намеренно: ключевая функция приложения зависит от внедрения скрипта на сторонние видеостраницы, а не от обычной статичной оболочки.

Интеграция с видео-переводом Яндекса использует реверс-инженерный flow подписи запросов, совместимый с публичной экосистемой `vot.js` / `voice-over-translation`. HMAC-ключ для подписи — публичные compatibility-данные, а не секрет репозитория. OAuth-credentials передаются через GitHub Actions secrets при release-сборке и не хранятся в git.

## 🙏 Благодарности

- [vot.js](https://github.com/FOSWLY/vot.js) — извлечение данных видео и определение платформ
- [voice-over-translation](https://github.com/ilyhalight/voice-over-translation) — браузерное расширение, вдохновившее этот проект
- [SponsorBlock](https://sponsor.ajay.app/) — данные о рекламных сегментах (CC BY-NC-SA 4.0)

## ⚠️ Отказ от ответственности

Функция перевода видео использует реверс-инженерный сторонний API в исследовательских целях. Эта функциональность предоставляется «как есть», без каких-либо гарантий, и не связана с провайдером API.
