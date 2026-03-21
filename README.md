# CrabVoice 🦀🎙️

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-24c8db?logo=tauri)](https://v2.tauri.app)
[![Rust](https://img.shields.io/badge/Rust-Backend-orange?logo=rust)](https://www.rust-lang.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-blue?logo=typescript)](https://www.typescriptlang.org)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20Android-green)]()
[![GitHub Release](https://img.shields.io/github/v/release/ZenonEl/CrabVoice)](https://github.com/ZenonEl/CrabVoice/releases)

> **[Русская версия / Russian version](README_RU.md)**

**CrabVoice** — a cross-platform desktop and mobile app for real-time voice-over translation of online videos. Watch YouTube, VK, Vimeo and 55+ other platforms in your native language with synchronized audio dubbing.

Built with **Tauri v2** (Rust + TypeScript), CrabVoice bypasses CORS and CSP restrictions to deliver native-quality audio translation directly inside video pages — no browser extension needed.

## ✨ Features

- **Cross-Platform** — Windows, Linux (deb, AppImage, portable), Android (APK)
- **Real-time Voice Translation** — automatic audio dubbing via Yandex Translation API
- **55+ Video Platforms** — YouTube, VK, Vimeo, TikTok, Twitch, and [many more](https://github.com/ilyhalight/voice-over-translation/wiki/%5BEN%5D-Supported-sites)
- **Audio Sync** — playback, pause, seek, and speed sync between original and translated audio
- **SponsorBlock** — auto-skip ads and sponsor segments (subscribers tier)
- **Proxy Support** — HTTP/SOCKS5 proxy with built-in ping checker
- **Yandex OAuth** — optional authorization for better translation quality
- **Floating Control Panel** — draggable Shadow DOM panel with volume controls, status indicators
- **CSP & SPA Resistant** — works on sites with strict Content Security Policies

## 📥 Installation

Download the latest release for your platform:

**[→ Download from Releases](https://github.com/ZenonEl/CrabVoice/releases/latest)**

| Platform | File |
|----------|------|
| Windows | `CrabVoice_x.x.x_x64-setup.exe` / `.msi` |
| Linux (Debian/Ubuntu) | `CrabVoice_x.x.x_amd64.deb` |
| Linux (portable) | `CrabVoice-linux-portable` |
| Linux (AppImage) | `CrabVoice_x.x.x_amd64.AppImage` |
| Android | `CrabVoice-universal-release.apk` |

## 🚀 Quick Start

1. Install and launch CrabVoice
2. Paste a video URL (YouTube, VK, Vimeo, etc.)
3. The app navigates to the video and automatically starts translation
4. Use the floating panel to control volume, pause translation, or refresh

## 🌐 Supported Platforms

CrabVoice uses [vot.js](https://github.com/FOSWLY/vot.js) for video detection. Full list of potentially supported sites: [voice-over-translation wiki](https://github.com/ilyhalight/voice-over-translation/wiki/%5BEN%5D-Supported-sites).

**Verified:** YouTube, VK, Vimeo
**Detected (requires testing):** TikTok, Twitch, Twitter/X, Reddit, Rutube, Dailymotion, Bilibili, Kick, and 40+ more

### Known Limitations
- **TikTok** — under investigation, Yandex API may require direct video URLs (#11)
- **Videos over 4 hours** — not supported by the translation API
- **Some regions** may require proxy for API access

## 🏗️ Building from Source

```bash
pnpm install
pnpm tauri dev                                        # Dev mode
pnpm tauri build                                      # Production build
pnpm tauri build -- --features subscribers            # With SponsorBlock
```

**Requirements:** Node.js 20+, Rust stable, pnpm, protobuf-compiler

## 🙏 Acknowledgements

- [vot.js](https://github.com/FOSWLY/vot.js) — video data extraction and platform detection
- [voice-over-translation](https://github.com/ilyhalight/voice-over-translation) — the browser extension that inspired this project
- [SponsorBlock](https://sponsor.ajay.app/) — ad segment data (CC BY-NC-SA 4.0)

## ⚠️ Disclaimer

The video translation feature uses a reverse-engineered third-party API for research purposes. This functionality is provided as-is, without any guarantees, and is not affiliated with or endorsed by the API provider.