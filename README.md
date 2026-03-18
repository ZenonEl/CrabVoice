# CrabVoice 🦀🎙️

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Tauri](https://img.shields.io/badge/Tauri-2.0-24c8db?logo=tauri)
![Rust](https://img.shields.io/badge/Rust-Backend-orange?logo=rust)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-blue?logo=typescript)

**CrabVoice** is a blazing-fast, cross-platform (Desktop & Android) application built with Tauri that provides real-time voice-over translation for videos on platforms like YouTube, VK, and Vimeo. 

By leveraging the power of Rust on the backend, CrabVoice successfully bypasses strict browser CORS constraints, while its injected Shadow DOM UI penetrates tough Content Security Policies (CSP) to deliver seamless native audio synchronization directly in your browser or mobile screen.

## ✨ Features
- **Cross-Platform:** Runs natively on Windows, macOS, Linux, and Android.
- **Yandex Translation API Integration:** Fully reverse-engineered Protobuf and HMAC-SHA256 signing via Rust.
- **SPA & CSP Resistance:** Survives aggressive Single Page Application navigation and bypasses strict YouTube/VK CSP policies using isolated `Shadow DOM` and `TrustedHTML`.
- **Auto-Sync:** Native video event hooks automatically sync playback, pausing, and scrubbing between the original video and the translated audio track.

## 🙏 Acknowledgements
A huge thank you to the [vot.js](https://github.com/FOSWLY/vot.js) project! Their incredible work on video data extraction, player detection, and API reverse-engineering made the frontend integration of CrabVoice incredibly robust.

Uses [SponsorBlock](https://sponsor.ajay.app/) data licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) from https://sponsor.ajay.app/.

## ⚠️ Legal Disclaimer
The app was created exclusively for research purposes and isn't intended for commercial use. All rights to the original software belong to their respective right holders. The app isn't affiliated with the original rights holders.