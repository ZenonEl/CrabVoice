"use strict";
(() => {
  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/data/config.js
  var config_default = {
    host: "api.browser.yandex.ru",
    hostVOT: "vot.toil.cc/v1",
    hostWorker: "vot-worker.toil.cc",
    mediaProxy: "media-proxy.toil.cc",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 YaBrowser/25.4.0.0 Safari/537.36",
    componentVersion: "25.6.0.2259",
    hmac: "bt8xH3VOlb4mqf0nqAibnDOoiPlXsisf",
    defaultDuration: 343,
    minChunkSize: 5295308,
    loggerLevel: 1,
    version: "2.4.12"
  };

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/utils/utils.js
  var iso6392to6391 = {
    afr: "af",
    aka: "ak",
    alb: "sq",
    amh: "am",
    ara: "ar",
    arm: "hy",
    asm: "as",
    aym: "ay",
    aze: "az",
    baq: "eu",
    bel: "be",
    ben: "bn",
    bos: "bs",
    bul: "bg",
    bur: "my",
    cat: "ca",
    chi: "zh",
    cos: "co",
    cze: "cs",
    dan: "da",
    div: "dv",
    dut: "nl",
    eng: "en",
    epo: "eo",
    est: "et",
    ewe: "ee",
    fin: "fi",
    fre: "fr",
    fry: "fy",
    geo: "ka",
    ger: "de",
    gla: "gd",
    gle: "ga",
    glg: "gl",
    gre: "el",
    grn: "gn",
    guj: "gu",
    hat: "ht",
    hau: "ha",
    hin: "hi",
    hrv: "hr",
    hun: "hu",
    ibo: "ig",
    ice: "is",
    ind: "id",
    ita: "it",
    jav: "jv",
    jpn: "ja",
    kan: "kn",
    kaz: "kk",
    khm: "km",
    kin: "rw",
    kir: "ky",
    kor: "ko",
    kur: "ku",
    lao: "lo",
    lat: "la",
    lav: "lv",
    lin: "ln",
    lit: "lt",
    ltz: "lb",
    lug: "lg",
    mac: "mk",
    mal: "ml",
    mao: "mi",
    mar: "mr",
    may: "ms",
    mlg: "mg",
    mlt: "mt",
    mon: "mn",
    nep: "ne",
    nor: "no",
    nya: "ny",
    ori: "or",
    orm: "om",
    pan: "pa",
    per: "fa",
    pol: "pl",
    por: "pt",
    pus: "ps",
    que: "qu",
    rum: "ro",
    rus: "ru",
    san: "sa",
    sin: "si",
    slo: "sk",
    slv: "sl",
    smo: "sm",
    sna: "sn",
    snd: "sd",
    som: "so",
    sot: "st",
    spa: "es",
    srp: "sr",
    sun: "su",
    swa: "sw",
    swe: "sv",
    tam: "ta",
    tat: "tt",
    tel: "te",
    tgk: "tg",
    tha: "th",
    tir: "ti",
    tso: "ts",
    tuk: "tk",
    tur: "tr",
    uig: "ug",
    ukr: "uk",
    urd: "ur",
    uzb: "uz",
    vie: "vi",
    wel: "cy",
    xho: "xh",
    yid: "yi",
    yor: "yo",
    zul: "zu"
  };
  async function fetchWithTimeout(url, options = {
    headers: {
      "User-Agent": config_default.userAgent
    }
  }) {
    const { timeout = 3e3, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      signal: controller.signal,
      ...fetchOptions
    });
    clearTimeout(timeoutId);
    return response;
  }
  function normalizeLang(lang) {
    if (lang.length === 3) {
      return iso6392to6391[lang];
    }
    return lang.toLowerCase().split(/[_;-]/)[0].trim();
  }

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/base.js
  var BaseHelper = class {
    API_ORIGIN = window.location.origin;
    fetch;
    extraInfo;
    referer;
    origin;
    service;
    video;
    language;
    constructor({ fetchFn = fetchWithTimeout, extraInfo = true, referer = document.referrer ?? `${window.location.origin}/`, origin = window.location.origin, service, video, language = "en" } = {}) {
      this.fetch = fetchFn;
      this.extraInfo = extraInfo;
      this.referer = referer;
      this.origin = /^(http(s)?):\/\//.test(String(origin)) ? origin : window.location.origin;
      this.service = service;
      this.video = video;
      this.language = language;
    }
    async getVideoData(_videoId) {
      return void 0;
    }
    async getVideoId(_url) {
      return void 0;
    }
    returnBaseData(videoId) {
      if (!this.service) {
        return void 0;
      }
      return {
        url: this.service.url + videoId,
        videoId,
        host: this.service.host,
        duration: void 0
      };
    }
  };

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/data/consts.js
  var availableLangs = [
    "auto",
    "ru",
    "en",
    "zh",
    "ko",
    "lt",
    "lv",
    "ar",
    "fr",
    "it",
    "es",
    "de",
    "ja"
  ];

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/types/logger.js
  var LoggerLevel;
  (function(LoggerLevel2) {
    LoggerLevel2[LoggerLevel2["DEBUG"] = 0] = "DEBUG";
    LoggerLevel2[LoggerLevel2["INFO"] = 1] = "INFO";
    LoggerLevel2[LoggerLevel2["WARN"] = 2] = "WARN";
    LoggerLevel2[LoggerLevel2["ERROR"] = 3] = "ERROR";
    LoggerLevel2[LoggerLevel2["SILENCE"] = 4] = "SILENCE";
  })(LoggerLevel || (LoggerLevel = {}));

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/utils/logger.js
  var Logger = class _Logger {
    static prefix = `[vot.js v${config_default.version}]`;
    static canLog(level) {
      return config_default.loggerLevel <= level;
    }
    static log(...messages) {
      if (!_Logger.canLog(LoggerLevel.DEBUG)) {
        return;
      }
      console.log(_Logger.prefix, ...messages);
    }
    static info(...messages) {
      if (!_Logger.canLog(LoggerLevel.INFO)) {
        return;
      }
      console.info(_Logger.prefix, ...messages);
    }
    static warn(...messages) {
      if (!_Logger.canLog(LoggerLevel.WARN)) {
        return;
      }
      console.warn(_Logger.prefix, ...messages);
    }
    static error(...messages) {
      if (!_Logger.canLog(LoggerLevel.ERROR)) {
        return;
      }
      console.error(_Logger.prefix, ...messages);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/youtube.js
  var YoutubeHelper = class _YoutubeHelper extends BaseHelper {
    static isMobile() {
      return /^m\.youtube\.com$/.test(window.location.hostname);
    }
    static getPlayer() {
      if (window.location.pathname.startsWith("/shorts/") && !_YoutubeHelper.isMobile()) {
        return document.querySelector("#shorts-player");
      }
      return document.querySelector("#movie_player");
    }
    static getPlayerResponse() {
      return _YoutubeHelper.getPlayer()?.getPlayerResponse?.call(void 0);
    }
    static getPlayerData() {
      return _YoutubeHelper.getPlayer()?.getVideoData?.call(void 0);
    }
    static getVolume() {
      const player = _YoutubeHelper.getPlayer();
      if (player?.getVolume) {
        return player.getVolume() / 100;
      }
      return 1;
    }
    static setVolume(volume) {
      const player = _YoutubeHelper.getPlayer();
      if (player?.setVolume) {
        player.setVolume(Math.round(volume * 100));
        return true;
      }
      return false;
    }
    static isMuted() {
      const player = _YoutubeHelper.getPlayer();
      if (player?.isMuted) {
        return player.isMuted();
      }
      return false;
    }
    static videoSeek(video, time) {
      Logger.log("videoSeek", time);
      const preTime = _YoutubeHelper.getPlayer()?.getProgressState()?.seekableEnd ?? video.currentTime;
      const finalTime = preTime - time;
      video.currentTime = finalTime;
    }
    static getPoToken() {
      const player = _YoutubeHelper.getPlayer();
      if (!player) {
        return void 0;
      }
      const audioTrack = player.getAudioTrack?.call(void 0);
      if (!audioTrack?.captionTracks?.length) {
        return void 0;
      }
      const audioTrackWithPoToken = audioTrack.captionTracks.find((captionTrack) => captionTrack.url.includes("&pot="));
      if (!audioTrackWithPoToken) {
        return void 0;
      }
      return /&pot=([^&]+)/.exec(audioTrackWithPoToken.url)?.[1];
    }
    static getGlobalConfig() {
      if (typeof yt !== "undefined") {
        return yt?.config_;
      }
      return typeof ytcfg !== "undefined" ? ytcfg?.data_ : void 0;
    }
    static getDeviceParams() {
      const ytconfig = _YoutubeHelper.getGlobalConfig();
      if (!ytconfig) {
        return "c=WEB";
      }
      const innertubeClient = ytconfig.INNERTUBE_CONTEXT?.client;
      const deviceParams = new URLSearchParams(ytconfig.DEVICE);
      deviceParams.delete("ceng");
      deviceParams.delete("cengver");
      deviceParams.set("c", innertubeClient?.clientName ?? ytconfig.INNERTUBE_CLIENT_NAME);
      deviceParams.set("cver", innertubeClient?.clientVersion ?? ytconfig.INNERTUBE_CLIENT_VERSION);
      deviceParams.set("cplayer", "UNIPLAYER");
      return deviceParams.toString();
    }
    static getSubtitles(userLang) {
      const response = _YoutubeHelper.getPlayerResponse();
      const playerCaptions = response?.captions?.playerCaptionsTracklistRenderer;
      if (!playerCaptions) {
        return [];
      }
      const captionTracks = playerCaptions.captionTracks ?? [];
      const translationLanguages = playerCaptions.translationLanguages ?? [];
      const userLangSupported = translationLanguages.find((language) => language.languageCode === userLang);
      const asrSubtitleItem = captionTracks.find((captionTrack) => captionTrack?.kind === "asr");
      const asrLang = asrSubtitleItem?.languageCode ?? "en";
      const subtitles = captionTracks.reduce((result, captionTrack) => {
        if (!("languageCode" in captionTrack)) {
          return result;
        }
        const language = captionTrack.languageCode ? normalizeLang(captionTrack.languageCode) : void 0;
        const url = captionTrack.baseUrl;
        if (!language || !url) {
          return result;
        }
        const captionUrl = `${url.startsWith("http") ? url : `${window.location.origin}/${url}`}&fmt=json3`;
        result.push({
          source: "youtube",
          format: "json",
          language,
          isAutoGenerated: captionTrack?.kind === "asr",
          url: captionUrl
        });
        if (userLangSupported && captionTrack.isTranslatable && captionTrack.languageCode === asrLang && userLang !== language) {
          result.push({
            source: "youtube",
            format: "json",
            language: userLang,
            isAutoGenerated: captionTrack?.kind === "asr",
            translatedFromLanguage: language,
            url: `${captionUrl}&tlang=${userLang}`
          });
        }
        return result;
      }, []);
      Logger.log("youtube subtitles:", subtitles);
      return subtitles;
    }
    static getLanguage() {
      if (!_YoutubeHelper.isMobile()) {
        const player = _YoutubeHelper.getPlayer();
        const trackInfo = player?.getAudioTrack?.call(void 0)?.getLanguageInfo();
        if (trackInfo && trackInfo.id !== "und") {
          return normalizeLang(trackInfo.id.split(".")[0]);
        }
      }
      const response = _YoutubeHelper.getPlayerResponse();
      const autoCaption = response?.captions?.playerCaptionsTracklistRenderer.captionTracks.find((caption) => caption.kind === "asr" && caption.languageCode);
      return autoCaption ? normalizeLang(autoCaption.languageCode) : void 0;
    }
    async getVideoData(videoId) {
      const { title: localizedTitle } = _YoutubeHelper.getPlayerData() ?? {};
      const { shortDescription: description, isLive: isStream, title } = _YoutubeHelper.getPlayerResponse()?.videoDetails ?? {};
      const subtitles = _YoutubeHelper.getSubtitles(this.language);
      let detectedLanguage = _YoutubeHelper.getLanguage();
      if (detectedLanguage && !availableLangs.includes(detectedLanguage)) {
        detectedLanguage = void 0;
      }
      const duration = _YoutubeHelper.getPlayer()?.getDuration?.call(void 0) ?? void 0;
      return {
        url: this.service.url + videoId,
        isStream,
        title,
        localizedTitle,
        detectedLanguage,
        description,
        subtitles,
        duration
      };
    }
    async getVideoId(url) {
      if (url.hostname === "youtu.be") {
        url.search = `?v=${url.pathname.replace("/", "")}`;
        url.pathname = "/watch";
      }
      if (url.searchParams.has("enablejsapi")) {
        const videoUrl = _YoutubeHelper.getPlayer()?.getVideoUrl();
        url = videoUrl ? new URL(videoUrl) : url;
      }
      return /(?:watch|embed|shorts|live)\/([^/]+)/.exec(url.pathname)?.[1] ?? url.searchParams.get("v");
    }
  };

  // src/injector.ts
  window.addEventListener("DOMContentLoaded", async () => {
    const isApp = window.location.hostname === "localhost" || window.location.hostname === "tauri.localhost" || window.location.protocol === "tauri:";
    if (isApp) return;
    console.log("\u{1F980} CrabVoice: vot.js \u0441\u043A\u0440\u0438\u043F\u0442 \u0437\u0430\u043F\u0443\u0449\u0435\u043D!");
    try {
      if (window.location.hostname.includes("youtube.com")) {
        const ytHelper = new YoutubeHelper();
        const videoId = await ytHelper.getVideoId(new URL(window.location.href));
        if (videoId) {
          const videoData = await ytHelper.getVideoData(videoId);
          console.log("\u2705 VOT.JS \u0432\u044B\u0442\u0430\u0449\u0438\u043B \u0434\u0430\u043D\u043D\u044B\u0435:", videoData);
          if (window.__TAURI__) {
            await window.__TAURI__.core.invoke("log_video_data", {
              title: videoData?.title || "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
              duration: videoData?.duration || 0
            });
          }
        } else {
          console.log("\u26A0\uFE0F CrabVoice: \u042D\u0442\u043E YouTube, \u043D\u043E \u0432\u0438\u0434\u0435\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435.");
        }
      }
    } catch (e) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 CrabVoice:", e);
    }
  });
})();
