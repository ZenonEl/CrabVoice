"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/@vot.js+core@2.4.12_typescript@5.6.3/node_modules/@vot.js/core/dist/types/service.js
  var VideoService;
  (function(VideoService3) {
    VideoService3["custom"] = "custom";
    VideoService3["directlink"] = "custom";
    VideoService3["youtube"] = "youtube";
    VideoService3["piped"] = "piped";
    VideoService3["invidious"] = "invidious";
    VideoService3["vk"] = "vk";
    VideoService3["nine_gag"] = "nine_gag";
    VideoService3["gag"] = "nine_gag";
    VideoService3["twitch"] = "twitch";
    VideoService3["proxitok"] = "proxitok";
    VideoService3["tiktok"] = "tiktok";
    VideoService3["vimeo"] = "vimeo";
    VideoService3["xvideos"] = "xvideos";
    VideoService3["pornhub"] = "pornhub";
    VideoService3["twitter"] = "twitter";
    VideoService3["x"] = "twitter";
    VideoService3["rumble"] = "rumble";
    VideoService3["facebook"] = "facebook";
    VideoService3["rutube"] = "rutube";
    VideoService3["coub"] = "coub";
    VideoService3["bilibili"] = "bilibili";
    VideoService3["mail_ru"] = "mailru";
    VideoService3["mailru"] = "mailru";
    VideoService3["bitchute"] = "bitchute";
    VideoService3["eporner"] = "eporner";
    VideoService3["peertube"] = "peertube";
    VideoService3["dailymotion"] = "dailymotion";
    VideoService3["trovo"] = "trovo";
    VideoService3["yandexdisk"] = "yandexdisk";
    VideoService3["ok_ru"] = "okru";
    VideoService3["okru"] = "okru";
    VideoService3["googledrive"] = "googledrive";
    VideoService3["bannedvideo"] = "bannedvideo";
    VideoService3["weverse"] = "weverse";
    VideoService3["newgrounds"] = "newgrounds";
    VideoService3["egghead"] = "egghead";
    VideoService3["youku"] = "youku";
    VideoService3["archive"] = "archive";
    VideoService3["kodik"] = "kodik";
    VideoService3["patreon"] = "patreon";
    VideoService3["reddit"] = "reddit";
    VideoService3["kick"] = "kick";
    VideoService3["apple_developer"] = "apple_developer";
    VideoService3["appledeveloper"] = "apple_developer";
    VideoService3["poketube"] = "poketube";
    VideoService3["epicgames"] = "epicgames";
    VideoService3["odysee"] = "odysee";
    VideoService3["coursehunterLike"] = "coursehunterLike";
    VideoService3["sap"] = "sap";
    VideoService3["watchpornto"] = "watchpornto";
    VideoService3["linkedin"] = "linkedin";
    VideoService3["ricktube"] = "ricktube";
    VideoService3["incestflix"] = "incestflix";
    VideoService3["porntn"] = "porntn";
    VideoService3["dzen"] = "dzen";
    VideoService3["cloudflarestream"] = "cloudflarestream";
    VideoService3["loom"] = "loom";
    VideoService3["rtnews"] = "rtnews";
    VideoService3["bitview"] = "bitview";
    VideoService3["thisvid"] = "thisvid";
    VideoService3["ign"] = "ign";
    VideoService3["bunkr"] = "bunkr";
    VideoService3["imdb"] = "imdb";
    VideoService3["telegram"] = "telegram";
  })(VideoService || (VideoService = {}));

  // node_modules/.pnpm/@vot.js+core@2.4.12_typescript@5.6.3/node_modules/@vot.js/core/dist/utils/videoData.js
  var VideoDataError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "VideoDataError";
      this.message = message;
    }
  };
  var localLinkRe = /(file:\/\/(\/)?|(http(s)?:\/\/)(127\.0\.0\.1|localhost|192\.168\.(\d){1,3}\.(\d){1,3}))/;

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/data/alternativeUrls.js
  var sitesInvidious = [
    "yewtu.be",
    "yt.artemislena.eu",
    "invidious.flokinet.to",
    "iv.melmac.space",
    "inv.nadeko.net",
    "inv.tux.pizza",
    "invidious.private.coffee",
    "yt.drgnz.club",
    "vid.puffyan.us",
    "invidious.dhusch.de"
  ];
  var sitesPiped = [
    "piped.video",
    "piped.tokhmi.xyz",
    "piped.moomoo.me",
    "piped.syncpundit.io",
    "piped.mha.fi",
    "watch.whatever.social",
    "piped.garudalinux.org",
    "efy.piped.pages.dev",
    "watch.leptons.xyz",
    "piped.lunar.icu",
    "yt.dc09.ru",
    "piped.mint.lgbt",
    "il.ax",
    "piped.privacy.com.de",
    "piped.esmailelbob.xyz",
    "piped.projectsegfau.lt",
    "piped.in.projectsegfau.lt",
    "piped.us.projectsegfau.lt",
    "piped.privacydev.net",
    "piped.palveluntarjoaja.eu",
    "piped.smnz.de",
    "piped.adminforge.de",
    "piped.qdi.fi",
    "piped.hostux.net",
    "piped.chauvet.pro",
    "piped.jotoma.de",
    "piped.pfcd.me",
    "piped.frontendfriendly.xyz"
  ];
  var sitesProxiTok = [
    "proxitok.pabloferreiro.es",
    "proxitok.pussthecat.org",
    "tok.habedieeh.re",
    "proxitok.esmailelbob.xyz",
    "proxitok.privacydev.net",
    "tok.artemislena.eu",
    "tok.adminforge.de",
    "tt.vern.cc",
    "cringe.whatever.social",
    "proxitok.lunar.icu",
    "proxitok.privacy.com.de"
  ];
  var sitesPeertube = [
    "peertube.1312.media",
    "tube.shanti.cafe",
    "bee-tube.fr",
    "video.sadmin.io",
    "dalek.zone",
    "review.peertube.biz",
    "peervideo.club",
    "tube.la-dina.net",
    "peertube.tmp.rcp.tf",
    "peertube.su",
    "video.blender.org",
    "videos.viorsan.com",
    "tube-sciences-technologies.apps.education.fr",
    "tube-numerique-educatif.apps.education.fr",
    "tube-arts-lettres-sciences-humaines.apps.education.fr",
    "beetoons.tv",
    "comics.peertube.biz",
    "makertube.net"
  ];
  var sitesPoketube = [
    "poketube.fun",
    "pt.sudovanilla.org",
    "poke.ggtyler.dev",
    "poke.uk2.littlekai.co.uk",
    "poke.blahai.gay"
  ];
  var sitesRicktube = ["ricktube.ru"];
  var sitesCoursehunterLike = ["coursehunter.net", "coursetrain.net"];

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/types/service.js
  var ExtVideoService;
  (function(ExtVideoService2) {
    ExtVideoService2["udemy"] = "udemy";
    ExtVideoService2["coursera"] = "coursera";
    ExtVideoService2["douyin"] = "douyin";
    ExtVideoService2["artstation"] = "artstation";
    ExtVideoService2["kickstarter"] = "kickstarter";
    ExtVideoService2["oraclelearn"] = "oraclelearn";
    ExtVideoService2["deeplearningai"] = "deeplearningai";
    ExtVideoService2["netacad"] = "netacad";
  })(ExtVideoService || (ExtVideoService = {}));
  var VideoService2 = {
    ...VideoService,
    ...ExtVideoService
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/data/sites.js
  var sites_default = [
    {
      additionalData: "mobile",
      host: VideoService.youtube,
      url: "https://youtu.be/",
      match: /^m.youtube.com$/,
      selector: ".player-container",
      needExtraData: true
    },
    {
      host: VideoService.youtube,
      url: "https://youtu.be/",
      match: /^(www.)?youtube(-nocookie|kids)?.com$/,
      selector: ".html5-video-container:not(#inline-player *)",
      needExtraData: true
    },
    {
      host: VideoService.invidious,
      url: "https://youtu.be/",
      match: sitesInvidious,
      selector: "#player",
      needBypassCSP: true
    },
    {
      host: VideoService.piped,
      url: "https://youtu.be/",
      match: sitesPiped,
      selector: ".shaka-video-container",
      needBypassCSP: true
    },
    {
      host: VideoService.poketube,
      url: "https://youtu.be/",
      match: sitesPoketube,
      selector: ".video-player-container"
    },
    {
      host: VideoService.ricktube,
      url: "https://youtu.be/",
      match: sitesRicktube,
      selector: "#oframeplayer > pjsdiv:has(video)"
    },
    {
      additionalData: "mobile",
      host: VideoService.vk,
      url: "https://vk.com/video?z=",
      match: [/^m.vk.(com|ru)$/, /^m.vkvideo.ru$/],
      selector: "vk-video-player",
      shadowRoot: true,
      needExtraData: true
    },
    {
      additionalData: "clips",
      host: VideoService.vk,
      url: "https://vk.com/video?z=",
      match: /^(www.|m.)?vk.(com|ru)$/,
      selector: 'div[data-testid="clipcontainer-video"]',
      needExtraData: true
    },
    {
      host: VideoService.vk,
      url: "https://vk.com/video?z=",
      match: [/^(www.|m.)?vk.(com|ru)$/, /^(www.|m.)?vkvideo.ru$/],
      selector: ".videoplayer_media",
      needExtraData: true
    },
    {
      host: VideoService.nine_gag,
      url: "https://9gag.com/gag/",
      match: /^9gag.com$/,
      selector: ".video-post",
      needExtraData: true
    },
    {
      host: VideoService.twitch,
      url: "https://twitch.tv/",
      match: [
        /^m.twitch.tv$/,
        /^(www.)?twitch.tv$/,
        /^clips.twitch.tv$/,
        /^player.twitch.tv$/
      ],
      needExtraData: true,
      selector: ".video-ref, main > div > section > div > div > div"
    },
    {
      host: VideoService.proxitok,
      url: "https://www.tiktok.com/",
      match: sitesProxiTok,
      selector: ".column.has-text-centered"
    },
    {
      host: VideoService.tiktok,
      url: "https://www.tiktok.com/",
      match: /^(www.)?tiktok.com$/,
      selector: null
    },
    {
      host: ExtVideoService.douyin,
      url: "https://www.douyin.com/",
      match: /^(www.)?douyin.com/,
      selector: ".xg-video-container",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: VideoService.vimeo,
      url: "https://vimeo.com/",
      match: /^vimeo.com$/,
      needExtraData: true,
      selector: ".player"
    },
    {
      host: VideoService.vimeo,
      url: "https://player.vimeo.com/",
      match: /^player.vimeo.com$/,
      additionalData: "embed",
      needExtraData: true,
      needBypassCSP: true,
      selector: ".player"
    },
    {
      host: VideoService.xvideos,
      url: "https://www.xvideos.com/",
      match: [
        /^(www.)?xvideos(-ar)?.com$/,
        /^(www.)?xvideos(\d\d\d).com$/,
        /^(www.)?xv-ru.com$/
      ],
      selector: "#hlsplayer",
      needBypassCSP: true
    },
    {
      host: VideoService.pornhub,
      url: "https://rt.pornhub.com/view_video.php?viewkey=",
      match: /^[a-z]+.pornhub.(com|org)$/,
      selector: ".mainPlayerDiv > .video-element-wrapper-js > div",
      eventSelector: ".mgp_eventCatcher"
    },
    {
      additionalData: "embed",
      host: VideoService.pornhub,
      url: "https://rt.pornhub.com/view_video.php?viewkey=",
      match: (url) => /^[a-z]+.pornhub.(com|org)$/.exec(url.host) && url.pathname.startsWith("/embed/"),
      selector: "#player"
    },
    {
      host: VideoService.twitter,
      url: "https://twitter.com/i/status/",
      match: /^(twitter|x).com$/,
      selector: 'div[data-testid="videoComponent"] > div:nth-child(1) > div',
      eventSelector: 'div[data-testid="videoPlayer"]',
      needBypassCSP: true
    },
    {
      host: VideoService.rumble,
      url: "https://rumble.com/",
      match: /^rumble.com$/,
      selector: "#videoPlayer > .videoPlayer-Rumble-cls > div"
    },
    {
      host: VideoService.facebook,
      url: "https://facebook.com/",
      match: (url) => url.host.includes("facebook.com") && url.pathname.includes("/videos/"),
      selector: 'div[role="main"] div[data-pagelet$="video" i]',
      needBypassCSP: true
    },
    {
      additionalData: "reels",
      host: VideoService.facebook,
      url: "https://facebook.com/",
      match: (url) => url.host.includes("facebook.com") && url.pathname.includes("/reel/"),
      selector: 'div[role="main"]',
      needBypassCSP: true
    },
    {
      host: VideoService.rutube,
      url: "https://rutube.ru/video/",
      match: /^rutube.ru$/,
      selector: ".video-player > div > div > div:nth-child(2)"
    },
    {
      additionalData: "embed",
      host: VideoService.rutube,
      url: "https://rutube.ru/video/",
      match: /^rutube.ru$/,
      selector: "#app > div > div"
    },
    {
      host: VideoService.bilibili,
      url: "https://www.bilibili.com/",
      match: /^(www|m|player).bilibili.com$/,
      selector: ".bpx-player-video-wrap"
    },
    {
      additionalData: "old",
      host: VideoService.bilibili,
      url: "https://www.bilibili.com/",
      match: /^(www|m).bilibili.com$/,
      selector: null
    },
    {
      host: VideoService.mailru,
      url: "https://my.mail.ru/",
      match: /^my.mail.ru$/,
      selector: "#b-video-wrapper"
    },
    {
      host: VideoService.bitchute,
      url: "https://www.bitchute.com/video/",
      match: /^(www.)?bitchute.com$/,
      selector: ".video-js"
    },
    {
      host: VideoService.eporner,
      url: "https://www.eporner.com/",
      match: /^(www.)?eporner.com$/,
      selector: ".vjs-v7"
    },
    {
      host: VideoService.peertube,
      url: "stub",
      match: sitesPeertube,
      selector: ".vjs-v7"
    },
    {
      host: VideoService.dailymotion,
      url: "https://dai.ly/",
      match: /^geo([\d]+)?.dailymotion.com$/,
      selector: ".player"
    },
    {
      host: VideoService.trovo,
      url: "https://trovo.live/s/",
      match: /^trovo.live$/,
      selector: ".player-video"
    },
    {
      host: VideoService.yandexdisk,
      url: "https://yadi.sk/",
      match: /^disk.yandex.(ru|kz|com(\.(am|ge|tr))?|by|az|co\.il|ee|lt|lv|md|net|tj|tm|uz)$/,
      selector: ".video-player__player > div:nth-child(1)",
      eventSelector: ".video-player__player",
      needBypassCSP: true,
      needExtraData: true
    },
    {
      host: VideoService.okru,
      url: "https://ok.ru/video/",
      match: /^ok.ru$/,
      selector: "vk-video-player",
      shadowRoot: true
    },
    {
      host: VideoService.googledrive,
      url: "https://drive.google.com/file/d/",
      match: /^youtube.googleapis.com$/,
      selector: ".html5-video-container"
    },
    {
      host: VideoService.bannedvideo,
      url: "https://madmaxworld.tv/watch?id=",
      match: /^(www.)?banned.video|madmaxworld.tv$/,
      selector: ".vjs-v7",
      needExtraData: true
    },
    {
      host: VideoService.weverse,
      url: "https://weverse.io/",
      match: /^weverse.io$/,
      selector: ".webplayer-internal-source-wrapper",
      needExtraData: true
    },
    {
      host: VideoService.newgrounds,
      url: "https://www.newgrounds.com/",
      match: /^(www.)?newgrounds.com$/,
      selector: ".ng-video-player"
    },
    {
      host: VideoService.egghead,
      url: "https://egghead.io/",
      match: /^egghead.io$/,
      selector: ".cueplayer-react-video-holder"
    },
    {
      host: VideoService.youku,
      url: "https://v.youku.com/",
      match: /^v.youku.com$/,
      selector: "#ykPlayer"
    },
    {
      host: VideoService.archive,
      url: "https://archive.org/details/",
      match: /^archive.org$/,
      selector: ".jw-media"
    },
    {
      host: VideoService.kodik,
      url: "stub",
      match: /^kodik.(info|biz|cc)$/,
      selector: ".fp-player",
      needExtraData: true
    },
    {
      host: VideoService.patreon,
      url: "stub",
      match: /^(www.)?patreon.com$/,
      selector: 'div[data-tag="post-card"] div[elevation="subtle"] > div > div > div > div',
      needExtraData: true
    },
    {
      additionalData: "old",
      host: VideoService.reddit,
      url: "stub",
      match: /^old.reddit.com$/,
      selector: ".reddit-video-player-root",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: VideoService.reddit,
      url: "stub",
      match: /^(www.|new.)?reddit.com$/,
      selector: "div[slot=post-media-container]",
      shadowRoot: true,
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: VideoService.kick,
      url: "https://kick.com/",
      match: /^kick.com$/,
      selector: "#injected-embedded-channel-player-video > div",
      needExtraData: true
    },
    {
      host: VideoService.appledeveloper,
      url: "https://developer.apple.com/",
      match: /^developer.apple.com$/,
      selector: ".developer-video-player",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: VideoService.epicgames,
      url: "https://dev.epicgames.com/community/learning/",
      match: /^dev.epicgames.com$/,
      selector: ".vjs-v7",
      needExtraData: true
    },
    {
      host: VideoService.odysee,
      url: "stub",
      match: /^odysee.com$/,
      selector: ".vjs-v7",
      needExtraData: true
    },
    {
      host: VideoService.coursehunterLike,
      url: "stub",
      match: sitesCoursehunterLike,
      selector: "#oframeplayer > pjsdiv:has(video)",
      needExtraData: true
    },
    {
      host: VideoService.sap,
      url: "https://learning.sap.com/courses/",
      match: /^learning.sap.com$/,
      selector: ".playkit-container",
      eventSelector: ".playkit-player",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: ExtVideoService.udemy,
      url: "https://www.udemy.com/",
      match: /udemy.com$/,
      selector: 'div[data-purpose="curriculum-item-viewer-content"] > section > div > div > div > div:nth-of-type(2)',
      needExtraData: true
    },
    {
      host: ExtVideoService.coursera,
      url: "https://www.coursera.org/",
      match: /coursera.org$/,
      selector: ".vjs-v8",
      needExtraData: true
    },
    {
      host: VideoService.watchpornto,
      url: "https://watchporn.to/",
      match: /^watchporn.to$/,
      selector: ".fp-player"
    },
    {
      host: VideoService.linkedin,
      url: "https://www.linkedin.com/learning/",
      match: /^(www.)?linkedin.com$/,
      selector: ".vjs-v7",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: VideoService.incestflix,
      url: "https://www.incestflix.net/watch/",
      match: /^(www.)?incestflix.(net|to|com)$/,
      selector: "#incflix-stream",
      needExtraData: true
    },
    {
      host: VideoService.porntn,
      url: "https://porntn.com/videos/",
      match: /^porntn.com$/,
      selector: ".fp-player",
      needExtraData: true
    },
    {
      host: VideoService.dzen,
      url: "https://dzen.ru/video/watch/",
      match: /^dzen.ru$/,
      selector: ".zen-ui-video-video-player"
    },
    {
      host: VideoService.cloudflarestream,
      url: "stub",
      match: /^(watch|embed|iframe|customer-[^.]+).cloudflarestream.com$/,
      selector: null
    },
    {
      host: VideoService.loom,
      url: "https://www.loom.com/share/",
      match: /^(www.)?loom.com$/,
      selector: ".VideoLayersContainer",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: ExtVideoService.artstation,
      url: "https://www.artstation.com/learning/",
      match: /^(www.)?artstation.com$/,
      selector: ".vjs-v7",
      needExtraData: true
    },
    {
      host: VideoService.rtnews,
      url: "https://www.rt.com/",
      match: /^(www.)?rt.com$/,
      selector: ".jw-media",
      needExtraData: true
    },
    {
      host: VideoService.bitview,
      url: "https://www.bitview.net/watch?v=",
      match: /^(www.)?bitview.net$/,
      selector: ".vlScreen",
      needExtraData: true
    },
    {
      host: ExtVideoService.kickstarter,
      url: "https://www.kickstarter.com/",
      match: /^(www.)?kickstarter.com/,
      selector: ".ksr-video-player",
      needExtraData: true
    },
    {
      host: VideoService.thisvid,
      url: "https://thisvid.com/",
      match: /^(www.)?thisvid.com$/,
      selector: ".fp-player"
    },
    {
      additionalData: "regional",
      host: VideoService.ign,
      url: "https://de.ign.com/",
      match: /^(\w{2}.)?ign.com$/,
      needExtraData: true,
      selector: ".video-container"
    },
    {
      host: VideoService.ign,
      url: "https://www.ign.com/",
      match: /^(www.)?ign.com$/,
      selector: ".player",
      needExtraData: true
    },
    {
      host: VideoService.bunkr,
      url: "https://bunkr.site/",
      match: /^bunkr\.(site|black|cat|media|red|site|ws|org|s[kiu]|c[ir]|fi|p[hks]|ru|la|is|to|a[cx])$/,
      needExtraData: true,
      selector: ".plyr__video-wrapper"
    },
    {
      host: VideoService.imdb,
      url: "https://www.imdb.com/video/",
      match: /^(www\.)?imdb\.com$/,
      selector: ".jw-media"
    },
    {
      host: VideoService.telegram,
      url: "https://t.me/",
      match: (url) => /^web\.telegram\.org$/.test(url.hostname) && url.pathname.startsWith("/k"),
      selector: ".ckin__player"
    },
    {
      host: ExtVideoService.oraclelearn,
      url: "https://mylearn.oracle.com/ou/course/",
      match: /^mylearn\.oracle\.com/,
      selector: ".vjs-v7",
      needExtraData: true,
      needBypassCSP: true
    },
    {
      host: ExtVideoService.deeplearningai,
      url: "https://learn.deeplearning.ai/courses/",
      match: /^learn(-dev|-staging)?\.deeplearning\.ai/,
      selector: ".lesson-video-player",
      needExtraData: true
    },
    {
      host: ExtVideoService.netacad,
      url: "https://www.netacad.com/",
      match: /^(www\.)?netacad\.com/,
      selector: ".vjs-v8",
      needExtraData: true
    },
    {
      host: VideoService.custom,
      url: "stub",
      match: (url) => /([^.]+)\.(mp4|webm)/.test(url.pathname),
      rawResult: true
    }
  ];

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
  function proxyMedia(url, format = "mp4") {
    const generalUrl = `https://${config_default.mediaProxy}/v1/proxy/video.${format}?format=base64&force=true`;
    if (!(url instanceof URL)) {
      return `${generalUrl}&url=${btoa(url)}`;
    }
    return `${generalUrl}&url=${btoa(url.href)}&origin=${url.origin}&referer=${url.origin}`;
  }

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/base.js
  var VideoHelperError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "VideoHelper";
      this.message = message;
    }
  };
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

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/appledeveloper.js
  var AppleDeveloperHelper = class extends BaseHelper {
    API_ORIGIN = "https://developer.apple.com";
    async getVideoData(videoId) {
      try {
        const contentUrl = document.querySelector("meta[property='og:video']")?.content;
        if (!contentUrl) {
          throw new VideoHelperError("Failed to find content url");
        }
        return {
          url: contentUrl
        };
      } catch (err) {
        Logger.error(`Failed to get apple developer video data by video ID: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return /videos\/play\/([^/]+)\/([\d]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/archive.js
  var ArchiveHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /(details|embed)\/([^/]+)/.exec(url.pathname)?.[2];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/artstation.js
  var ArtstationHelper = class extends BaseHelper {
    API_ORIGIN = "https://www.artstation.com/api/v2/learning";
    getCSRFToken() {
      return document.querySelector('meta[name="public-csrf-token"]')?.content;
    }
    async getCourseInfo(courseId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/courses/${courseId}/autoplay.json`, {
          method: "POST",
          headers: {
            "PUBLIC-CSRF-TOKEN": this.getCSRFToken()
          }
        });
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get artstation course info by courseId: ${courseId}.`, err.message);
        return false;
      }
    }
    async getVideoUrl(chapterId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/quicksilver/video_url.json?chapter_id=${chapterId}`);
        const data = await res.json();
        return data.url.replace("qsep://", "https://");
      } catch (err) {
        Logger.error(`Failed to get artstation video url by chapterId: ${chapterId}.`, err.message);
        return false;
      }
    }
    async getVideoData(videoId) {
      const [, courseId, , , chapterId] = videoId.split("/");
      const courseInfo = await this.getCourseInfo(courseId);
      if (!courseInfo) {
        return void 0;
      }
      const chapter = courseInfo.chapters.find((chapter2) => chapter2.hash_id === chapterId);
      if (!chapter) {
        return void 0;
      }
      const videoUrl = await this.getVideoUrl(chapter.id);
      if (!videoUrl) {
        return void 0;
      }
      const { title, duration, subtitles: videoSubtitles } = chapter;
      const subtitles = videoSubtitles.filter((subtitle) => subtitle.format === "vtt").map((subtitle) => ({
        language: normalizeLang(subtitle.locale),
        source: "artstation",
        format: "vtt",
        url: subtitle.file_url
      }));
      return {
        url: videoUrl,
        title,
        duration,
        subtitles
      };
    }
    async getVideoId(url) {
      return /courses\/(\w{3,5})\/([^/]+)\/chapters\/(\w{3,5})/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/bannedvideo.js
  var BannedVideoHelper = class extends BaseHelper {
    API_ORIGIN = "https://api.banned.video";
    async getVideoInfo(videoId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/graphql`, {
          method: "POST",
          body: JSON.stringify({
            operationName: "GetVideo",
            query: `query GetVideo($id: String!) {
            getVideo(id: $id) {
              title
              description: summary
              duration: videoDuration
              videoUrl: directUrl
              isStream: live
            }
          }`,
            variables: {
              id: videoId
            }
          }),
          headers: {
            "User-Agent": "bannedVideoFrontEnd",
            "apollographql-client-name": "banned-web",
            "apollographql-client-version": "1.3",
            "content-type": "application/json"
          }
        });
        return await res.json();
      } catch (err) {
        console.error(`Failed to get bannedvideo video info by videoId: ${videoId}.`, err.message);
        return false;
      }
    }
    async getVideoData(videoId) {
      const videoInfo = await this.getVideoInfo(videoId);
      if (!videoInfo) {
        return void 0;
      }
      const { videoUrl, duration, isStream, description, title } = videoInfo.data.getVideo;
      return {
        url: videoUrl,
        duration,
        isStream,
        title,
        description
      };
    }
    async getVideoId(url) {
      return url.searchParams.get("id") ?? void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/bilibili.js
  var BilibiliHelper = class extends BaseHelper {
    async getVideoId(url) {
      const bangumiId = /bangumi\/play\/([^/]+)/.exec(url.pathname)?.[0];
      if (bangumiId) {
        return bangumiId;
      }
      const bvid = url.searchParams.get("bvid");
      if (bvid) {
        return `video/${bvid}`;
      }
      let vid = /video\/([^/]+)/.exec(url.pathname)?.[0];
      if (vid && url.searchParams.get("p") !== null) {
        vid += `/?p=${url.searchParams.get("p")}`;
      }
      return vid;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/bitchute.js
  var BitchuteHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /(video|embed)\/([^/]+)/.exec(url.pathname)?.[2];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/bitview.js
  var BitviewHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      try {
        const videoUrl = document.querySelector(".vlScreen > video")?.src;
        if (!videoUrl) {
          throw new VideoHelperError("Failed to find video URL");
        }
        return {
          url: videoUrl
        };
      } catch (err) {
        Logger.error(`Failed to get Bitview data by videoId: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return url.searchParams.get("v");
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/bunkr.js
  var BunkrHelper = class extends BaseHelper {
    async getVideoData(_videoId) {
      const url = document.querySelector('#player > source[type="video/mp4"]')?.src;
      if (!url) {
        return void 0;
      }
      return {
        url
      };
    }
    async getVideoId(url) {
      return /\/f\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/cloudflarestream.js
  var CloudflareStreamHelper = class extends BaseHelper {
    async getVideoId(url) {
      return url.pathname + url.search;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/coursehunterLike.js
  var CoursehunterLikeHelper = class extends BaseHelper {
    API_ORIGIN = this.origin ?? "https://coursehunter.net";
    async getCourseId() {
      const courseId = window.course_id;
      if (courseId !== void 0) {
        return String(courseId);
      }
      return document.querySelector('input[name="course_id"]')?.value;
    }
    async getLessonsData(courseId) {
      const lessons = window.lessons;
      if (lessons?.length) {
        return lessons;
      }
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/api/v1/course/${courseId}/lessons`);
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get CoursehunterLike lessons data by courseId: ${courseId}, because ${err.message}`);
        return void 0;
      }
    }
    getLessondId(videoId) {
      let lessondId = videoId.split("?lesson=")?.[1];
      if (lessondId) {
        return +lessondId;
      }
      const activeLessondEl = document.querySelector(".lessons-item_active");
      lessondId = activeLessondEl?.dataset?.index;
      if (lessondId) {
        return +lessondId;
      }
      return 1;
    }
    async getVideoData(videoId) {
      const courseId = await this.getCourseId();
      if (!courseId) {
        return void 0;
      }
      const lessonsData = await this.getLessonsData(courseId);
      if (!lessonsData) {
        return void 0;
      }
      const lessonId = this.getLessondId(videoId);
      const currentLesson = lessonsData?.[lessonId - 1];
      const { file: videoUrl, duration, title } = currentLesson;
      if (!videoUrl) {
        return void 0;
      }
      return {
        url: proxyMedia(videoUrl),
        duration,
        title
      };
    }
    async getVideoId(url) {
      const courseId = /course\/([^/]+)/.exec(url.pathname)?.[0];
      return courseId ? courseId + url.search : void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/videojs.js
  var VideoJSHelper = class _VideoJSHelper extends BaseHelper {
    SUBTITLE_SOURCE = "videojs";
    SUBTITLE_FORMAT = "vtt";
    static getPlayer() {
      return document.querySelector(".video-js")?.player;
    }
    getVideoDataByPlayer(videoId) {
      try {
        const player2 = _VideoJSHelper.getPlayer();
        if (!player2) {
          throw new Error(`Video player doesn't have player option, videoId ${videoId}`);
        }
        const duration = player2.duration();
        const sources = Array.isArray(player2.currentSources) ? player2.currentSources : player2.getCache()?.sources;
        const { tracks_: tracks } = player2.textTracks();
        const videoUrl = sources.find((source) => source.type === "video/mp4" || source.type === "video/webm");
        if (!videoUrl) {
          throw new Error(`Failed to find video url for videoID ${videoId}`);
        }
        const subtitles = tracks.filter((track) => track.src && track.kind !== "metadata").map((track) => ({
          language: normalizeLang(track.language),
          source: this.SUBTITLE_SOURCE,
          format: this.SUBTITLE_FORMAT,
          url: track.src
        }));
        return {
          url: videoUrl.src,
          duration,
          subtitles
        };
      } catch (err) {
        Logger.error("Failed to get videojs video data", err.message);
        return void 0;
      }
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

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/coursera.js
  var CourseraHelper = class _CourseraHelper extends VideoJSHelper {
    API_ORIGIN = "https://www.coursera.org/api";
    SUBTITLE_SOURCE = "coursera";
    async getCourseData(courseId) {
      try {
        const response = await this.fetch(`${this.API_ORIGIN}/onDemandCourses.v1/${courseId}`);
        const resJSON = await response.json();
        return resJSON?.elements?.[0];
      } catch (err) {
        Logger.error(`Failed to get course data by courseId: ${courseId}`, err.message);
        return void 0;
      }
    }
    static getPlayer() {
      return VideoJSHelper.getPlayer();
    }
    async getVideoData(videoId) {
      const data = this.getVideoDataByPlayer(videoId);
      if (!data) {
        return void 0;
      }
      const { options_: options } = _CourseraHelper.getPlayer() ?? {};
      if (!data.subtitles?.length && options) {
        data.subtitles = options.tracks.map((track) => ({
          url: track.src,
          language: normalizeLang(track.srclang),
          source: this.SUBTITLE_SOURCE,
          format: this.SUBTITLE_FORMAT
        }));
      }
      const courseId = options?.courseId;
      if (!courseId) {
        return data;
      }
      let courseLang = "en";
      const courseData = await this.getCourseData(courseId);
      if (courseData) {
        const { primaryLanguageCodes: [primaryLangauge] } = courseData;
        courseLang = primaryLangauge ? normalizeLang(primaryLangauge) : "en";
      }
      if (!availableLangs.includes(courseLang)) {
        courseLang = "en";
      }
      const subtitleItem = data.subtitles.find((subtitle) => subtitle.language === courseLang) ?? data.subtitles?.[0];
      const subtitleUrl = subtitleItem?.url;
      if (!subtitleUrl) {
        Logger.warn("Failed to find any subtitle file");
      }
      const { url, duration } = data;
      const translationHelp = subtitleUrl ? [
        {
          target: "subtitles_file_url",
          targetUrl: subtitleUrl
        },
        {
          target: "video_file_url",
          targetUrl: url
        }
      ] : null;
      return {
        ...subtitleUrl ? {
          url: this.service?.url + videoId,
          translationHelp
        } : {
          url,
          translationHelp
        },
        detectedLanguage: courseLang,
        duration
      };
    }
    async getVideoId(url) {
      const matched = /learn\/([^/]+)\/lecture\/([^/]+)/.exec(url.pathname) ?? /lecture\/([^/]+)\/([^/]+)/.exec(url.pathname);
      return matched?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/dailymotion.js
  var DailymotionHelper = class extends BaseHelper {
    async getVideoId(_url) {
      const plainPlayerConfig = Array.from(document.querySelectorAll("*")).filter((s) => s.innerHTML.trim().includes(".m3u8"));
      const videoUrl = plainPlayerConfig?.[1]?.lastChild?.src;
      return videoUrl ? /\/video\/(\w+)\.m3u8/.exec(videoUrl)?.[1] : void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/deeplearningai.js
  var DeeplearningAIHelper = class extends BaseHelper {
    async getVideoData(_videoId) {
      if (!this.video) {
        return void 0;
      }
      const sourceUrl = this.video.querySelector('source[type="application/x-mpegurl"]')?.src;
      if (!sourceUrl) {
        return void 0;
      }
      return {
        url: sourceUrl
      };
    }
    async getVideoId(url) {
      return /courses\/(([^/]+)\/lesson\/([^/]+)\/([^/]+))/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/douyin.js
  var DouyinHelper = class _DouyinHelper extends BaseHelper {
    static getPlayer() {
      if (typeof player === "undefined") {
        return void 0;
      }
      return player;
    }
    async getVideoData(_videoId) {
      const xgPlayer = _DouyinHelper.getPlayer();
      if (!xgPlayer) {
        return void 0;
      }
      const { config: { url: sources, duration, lang, isLive: isStream } } = xgPlayer;
      if (!sources) {
        return void 0;
      }
      const source = sources.find((s) => s.src.includes("www.douyin.com/aweme/v1/play/"));
      if (!source) {
        return void 0;
      }
      return {
        url: proxyMedia(source.src),
        duration,
        isStream,
        ...availableLangs.includes(lang) ? { detectedLanguage: lang } : {}
      };
    }
    async getVideoId(url) {
      const pathId = /video\/([\d]+)/.exec(url.pathname)?.[0];
      if (pathId) {
        return pathId;
      }
      return _DouyinHelper.getPlayer()?.config.vid;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/dzen.js
  var DzenHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /video\/watch\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/egghead.js
  var EggheadHelper = class extends BaseHelper {
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/epicgames.js
  var EpicGamesHelper = class extends BaseHelper {
    API_ORIGIN = "https://dev.epicgames.com/community/api/learning";
    async getPostInfo(videoId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/post.json?hash_id=${videoId}`);
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get epicgames post info by videoId: ${videoId}.`, err.message);
        return false;
      }
    }
    getVideoBlock() {
      const videoUrlRe = /videoUrl\s?=\s"([^"]+)"?/;
      const script = Array.from(document.body.querySelectorAll("script")).find((s) => videoUrlRe.exec(s.innerHTML));
      if (!script) {
        return void 0;
      }
      const content = script.innerHTML.trim();
      const playlistUrl = videoUrlRe.exec(content)?.[1]?.replace("qsep://", "https://");
      if (!playlistUrl) {
        return void 0;
      }
      let subtitlesString = /sources\s?=\s(\[([^\]]+)\])?/.exec(content)?.[1];
      if (!subtitlesString) {
        return {
          playlistUrl,
          subtitles: []
        };
      }
      try {
        subtitlesString = (subtitlesString.replace(/src:(\s)+?(videoUrl)/g, 'src:"removed"').substring(0, subtitlesString.lastIndexOf("},")) + "]").split("\n").map((line) => line.replace(/([^\s]+):\s?(?!.*\1)/, '"$1":')).join("\n");
        const subtitlesObj = JSON.parse(subtitlesString);
        const subtitles = subtitlesObj.filter((sub) => sub.type === "captions");
        return {
          playlistUrl,
          subtitles
        };
      } catch {
        return {
          playlistUrl,
          subtitles: []
        };
      }
    }
    async getVideoData(videoId) {
      const courseId = videoId.split(":")?.[1];
      const postInfo = await this.getPostInfo(courseId);
      if (!postInfo) {
        return void 0;
      }
      const videoBlock = this.getVideoBlock();
      if (!videoBlock) {
        return void 0;
      }
      const { playlistUrl, subtitles: videoSubtitles } = videoBlock;
      const { title, description } = postInfo;
      const subtitles = videoSubtitles.map((caption) => ({
        language: normalizeLang(caption.srclang),
        source: "epicgames",
        format: "vtt",
        url: caption.src
      }));
      return {
        url: playlistUrl,
        title,
        description,
        subtitles
      };
    }
    async getVideoId(_url) {
      return new Promise((resolve) => {
        const origin = "https://dev.epicgames.com";
        const reqId = btoa(window.location.href);
        window.addEventListener("message", (e) => {
          if (e.origin !== origin) {
            return void 0;
          }
          if (!(typeof e.data === "string" && e.data.startsWith("getVideoId:"))) {
            return void 0;
          }
          const videoId = e.data.replace("getVideoId:", "");
          return resolve(videoId);
        });
        window.top.postMessage(`getVideoId:${reqId}`, origin);
      });
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/eporner.js
  var EpornerHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /video-([^/]+)\/([^/]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/facebook.js
  var FacebookHelper = class extends BaseHelper {
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/googledrive.js
  var GoogleDriveHelper = class extends BaseHelper {
    getPlayerData() {
      const playerEl = document.querySelector("#movie_player");
      return playerEl?.getVideoData?.call() ?? void 0;
    }
    async getVideoId(_url) {
      return this.getPlayerData()?.video_id;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/ign.js
  var IgnHelper = class extends BaseHelper {
    getVideoDataBySource(videoId) {
      const url = document.querySelector('.icms.video > source[type="video/mp4"][data-quality="360"]')?.src;
      if (!url) {
        return this.returnBaseData(videoId);
      }
      return {
        url: proxyMedia(url)
      };
    }
    getVideoDataByNext(videoId) {
      try {
        const nextContent = document.getElementById("__NEXT_DATA__")?.textContent;
        if (!nextContent) {
          throw new VideoDataError("Not found __NEXT_DATA__ content");
        }
        const data = JSON.parse(nextContent);
        const { props: { pageProps: { page: { description, title, video: { videoMetadata: { duration }, assets } } } } } = data;
        const videoUrl = assets.find((asset) => asset.height === 360 && asset.url.includes(".mp4"))?.url;
        if (!videoUrl) {
          throw new VideoDataError("Not found video URL in assets");
        }
        return {
          url: proxyMedia(videoUrl),
          duration,
          title,
          description
        };
      } catch (err) {
        Logger.warn(`Failed to get ign video data by video ID: ${videoId}, because ${err.message}. Using clear link instead...`);
        return this.returnBaseData(videoId);
      }
    }
    async getVideoData(videoId) {
      if (document.getElementById("__NEXT_DATA__")) {
        return this.getVideoDataByNext(videoId);
      }
      return this.getVideoDataBySource(videoId);
    }
    async getVideoId(url) {
      return /([^/]+)\/([\d]+)\/video\/([^/]+)/.exec(url.pathname)?.[0] ?? /\/videos\/([^/]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/imdb.js
  var IMDbHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /video\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/incestflix.js
  var IncestflixHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      try {
        const sourceEl = document.querySelector("#incflix-stream source:first-of-type");
        if (!sourceEl) {
          throw new VideoHelperError("Failed to find source element");
        }
        const srcLink = sourceEl.getAttribute("src");
        if (!srcLink) {
          throw new VideoHelperError("Failed to find source link");
        }
        const source = new URL(srcLink.startsWith("//") ? `https:${srcLink}` : srcLink);
        source.searchParams.append("media-proxy", "video.mp4");
        return {
          url: proxyMedia(source)
        };
      } catch (err) {
        Logger.error(`Failed to get Incestflix data by videoId: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return /\/watch\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/kick.js
  var KickHelper = class extends BaseHelper {
    API_ORIGIN = "https://kick.com/api";
    async getClipInfo(clipId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/v2/clips/${clipId}`);
        const data = await res.json();
        const { clip_url: url, duration, title } = data.clip;
        return {
          url,
          duration,
          title
        };
      } catch (err) {
        Logger.error(`Failed to get kick clip info by clipId: ${clipId}.`, err.message);
        return void 0;
      }
    }
    async getVideoInfo(videoId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/v1/video/${videoId}`);
        const data = await res.json();
        const { source: url, livestream } = data;
        const { session_title: title, duration } = livestream;
        return {
          url,
          duration: Math.round(duration / 1e3),
          title
        };
      } catch (err) {
        Logger.error(`Failed to get kick video info by videoId: ${videoId}.`, err.message);
        return void 0;
      }
    }
    async getVideoData(videoId) {
      return videoId.startsWith("videos") ? await this.getVideoInfo(videoId.replace("videos/", "")) : await this.getClipInfo(videoId.replace("clips/", ""));
    }
    async getVideoId(url) {
      return /([^/]+)\/((videos|clips)\/([^/]+))/.exec(url.pathname)?.[2];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/kickstarter.js
  var KickstarterHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      try {
        const videoEl = document.querySelector(".ksr-video-player > video");
        const url = videoEl?.querySelector("source[type^='video/mp4']")?.src;
        if (!url) {
          throw new VideoHelperError("Failed to find video URL");
        }
        const subtitles = videoEl?.querySelectorAll("track") ?? [];
        return {
          url,
          subtitles: Array.from(subtitles).reduce((result, sub) => {
            const lang = sub.getAttribute("srclang");
            const url2 = sub.getAttribute("src");
            if (!lang || !url2) {
              return result;
            }
            result.push({
              language: normalizeLang(lang),
              url: url2,
              format: "vtt",
              source: "kickstarter"
            });
            return result;
          }, [])
        };
      } catch (err) {
        Logger.error(`Failed to get Kickstarter data by videoId: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/kodik.js
  var KodikHelper = class extends BaseHelper {
    API_ORIGIN = window.location.origin;
    getSecureData(videoPath) {
      try {
        const [videoType, videoId, hash] = videoPath.split("/").filter((a) => a);
        const allScripts = Array.from(document.getElementsByTagName("script"));
        const secureScript = allScripts.filter((s) => s.innerHTML.includes(`videoId = "${videoId}"`) || s.innerHTML.includes(`serialId = Number(${videoId})`));
        if (!secureScript.length) {
          throw new VideoHelperError("Failed to find secure script");
        }
        const secureContent = /'{[^']+}'/.exec(secureScript[0].textContent.trim())?.[0];
        if (!secureContent) {
          throw new VideoHelperError("Secure json wasn't found in secure script");
        }
        const secureJSON = JSON.parse(secureContent.replaceAll("'", ""));
        if (videoType !== "serial") {
          return {
            videoType,
            videoId,
            hash,
            ...secureJSON
          };
        }
        const videoInfoContent = allScripts.find((s) => s.innerHTML.includes(`var videoInfo = {}`))?.textContent?.trim();
        if (!videoInfoContent) {
          throw new VideoHelperError("Failed to find videoInfo content");
        }
        const realVideoType = /videoInfo\.type\s+?=\s+?'([^']+)'/.exec(videoInfoContent)?.[1];
        const realVideoId = /videoInfo\.id\s+?=\s+?'([^']+)'/.exec(videoInfoContent)?.[1];
        const realHash = /videoInfo\.hash\s+?=\s+?'([^']+)'/.exec(videoInfoContent)?.[1];
        if (!realVideoType || !realVideoId || !realHash) {
          throw new VideoHelperError("Failed to parse videoInfo content");
        }
        return {
          videoType: realVideoType,
          videoId: realVideoId,
          hash: realHash,
          ...secureJSON
        };
      } catch (err) {
        Logger.error(`Failed to get kodik secure data by videoPath: ${videoPath}.`, err.message);
        return false;
      }
    }
    async getFtor(secureData) {
      const { videoType, videoId: id, hash, d, d_sign, pd, pd_sign, ref, ref_sign } = secureData;
      try {
        const res = await this.fetch(this.API_ORIGIN + "/ftor", {
          method: "POST",
          headers: {
            "User-Agent": config_default.userAgent,
            Origin: this.API_ORIGIN,
            Referer: `${this.API_ORIGIN}/${videoType}/${id}/${hash}/360p`
          },
          body: new URLSearchParams({
            d,
            d_sign,
            pd,
            pd_sign,
            ref: decodeURIComponent(ref),
            ref_sign,
            bad_user: "false",
            cdn_is_working: "true",
            info: "{}",
            type: videoType,
            hash,
            id
          })
        });
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get kodik video data (type: ${videoType}, id: ${id}, hash: ${hash})`, err.message);
        return false;
      }
    }
    decryptUrl(encryptedUrl) {
      const decryptedUrl = atob(encryptedUrl.replace(/[a-zA-Z]/g, function(e) {
        const charCode = e.charCodeAt(0) + 18;
        const pos = e <= "Z" ? 90 : 122;
        return String.fromCharCode(pos >= charCode ? charCode : charCode - 26);
      }));
      return "https:" + decryptedUrl;
    }
    async getVideoData(videoId) {
      const secureData = this.getSecureData(videoId);
      if (!secureData) {
        return void 0;
      }
      const videoData = await this.getFtor(secureData);
      if (!videoData) {
        return void 0;
      }
      const videoDataLinks = Object.entries(videoData.links[videoData.default.toString()]);
      const videoLink = videoDataLinks.find(([, data]) => data.type === "application/x-mpegURL")?.[1];
      if (!videoLink) {
        return void 0;
      }
      return {
        url: videoLink.src.startsWith("//") ? `https:${videoLink.src}` : this.decryptUrl(videoLink.src)
      };
    }
    async getVideoId(url) {
      return /\/(uv|video|seria|episode|season|serial)\/([^/]+)\/([^/]+)\/([\d]+)p/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/linkedin.js
  var LinkedinHelper = class extends VideoJSHelper {
    SUBTITLE_SOURCE = "linkedin";
    async getVideoData(videoId) {
      const data = this.getVideoDataByPlayer(videoId);
      if (!data) {
        return void 0;
      }
      const { url, duration, subtitles } = data;
      return {
        url: proxyMedia(new URL(url)),
        duration,
        subtitles
      };
    }
    async getVideoId(url) {
      return /\/learning\/(([^/]+)\/([^/]+))/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/protos/yandex.js
  var StreamInterval;
  (function(StreamInterval2) {
    StreamInterval2[StreamInterval2["NO_CONNECTION"] = 0] = "NO_CONNECTION";
    StreamInterval2[StreamInterval2["TRANSLATING"] = 10] = "TRANSLATING";
    StreamInterval2[StreamInterval2["STREAMING"] = 20] = "STREAMING";
    StreamInterval2[StreamInterval2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  })(StreamInterval || (StreamInterval = {}));

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/types/helpers/bannedvideo.js
  var TypeName;
  (function(TypeName2) {
    TypeName2["Channel"] = "Channel";
    TypeName2["Video"] = "Video";
  })(TypeName || (TypeName = {}));

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/loom.js
  var LoomHelper = class extends BaseHelper {
    getClientVersion() {
      if (typeof SENTRY_RELEASE === "undefined") {
        return void 0;
      }
      return SENTRY_RELEASE.id;
    }
    async getVideoData(videoId) {
      try {
        const clientVer = this.getClientVersion();
        if (!clientVer) {
          throw new VideoHelperError("Failed to get client version");
        }
        const res = await this.fetch("https://www.loom.com/graphql", {
          headers: {
            "User-Agent": config_default.userAgent,
            "content-type": "application/json",
            "x-loom-request-source": `loom_web_${clientVer}`,
            "apollographql-client-name": "web",
            "apollographql-client-version": clientVer,
            "Alt-Used": "www.loom.com"
          },
          body: `{"operationName":"FetchCaptions","variables":{"videoId":"${videoId}"},"query":"query FetchCaptions($videoId: ID!, $password: String) {\\n  fetchVideoTranscript(videoId: $videoId, password: $password) {\\n    ... on VideoTranscriptDetails {\\n      id\\n      captions_source_url\\n      language\\n      __typename\\n    }\\n    ... on GenericError {\\n      message\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}`,
          method: "POST"
        });
        if (res.status !== 200) {
          throw new VideoHelperError("Failed to get data from graphql");
        }
        const result = await res.json();
        const data = result.data.fetchVideoTranscript;
        if (data.__typename === "GenericError") {
          throw new VideoHelperError(data.message);
        }
        return {
          url: this.service.url + videoId,
          subtitles: [
            {
              format: "vtt",
              language: normalizeLang(data.language),
              source: "loom",
              url: data.captions_source_url
            }
          ]
        };
      } catch (err) {
        Logger.error(`Failed to get Loom video data, because: ${err.message}`);
        return this.returnBaseData(videoId);
      }
    }
    async getVideoId(url) {
      return /(embed|share)\/([^/]+)?/.exec(url.pathname)?.[2];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/mailru.js
  var MailRuHelper = class extends BaseHelper {
    API_ORIGIN = "https://my.mail.ru";
    async getVideoMeta(videoId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/+/video/meta/${videoId}?xemail=&ajax_call=1&func_name=&mna=&mnb=&ext=1&_=${(/* @__PURE__ */ new Date()).getTime()}`);
        return await res.json();
      } catch (err) {
        Logger.error("Failed to get mail.ru video data", err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      const pathname = url.pathname;
      if (/\/(v|mail|bk|inbox)\//.exec(pathname)) {
        return pathname.slice(1);
      }
      const videoId = /video\/embed\/([^/]+)/.exec(pathname)?.[1];
      if (!videoId) {
        return void 0;
      }
      const videoData = await this.getVideoMeta(videoId);
      if (!videoData) {
        return void 0;
      }
      return videoData.meta.url.replace("//my.mail.ru/", "");
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/netacad.js
  var NetacadHelper = class extends VideoJSHelper {
    SUBTITLE_SOURCE = "netacad";
    async getVideoData(videoId) {
      const data = this.getVideoDataByPlayer(videoId);
      if (!data) {
        return void 0;
      }
      const { url, duration, subtitles } = data;
      return {
        url: proxyMedia(new URL(url)),
        duration,
        subtitles
      };
    }
    async getVideoId(url) {
      return url.pathname + url.search;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/newgrounds.js
  var NewgroundsHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /([^/]+)\/(view)\/([^/]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/nine_gag.js
  var NineGAGHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      const data = this.returnBaseData(videoId);
      if (!data) {
        return data;
      }
      try {
        if (!this.video) {
          throw new Error("Video element not found");
        }
        const videoUrl = this.video.querySelector('source[type^="video/mp4"], source[type^="video/webm"]')?.src;
        if (!videoUrl || !/^https?:\/\//.test(videoUrl)) {
          throw new Error("Video source not found");
        }
        return {
          ...data,
          translationHelp: [
            {
              target: "video_file_url",
              targetUrl: videoUrl
            }
          ]
        };
      } catch {
        return data;
      }
    }
    async getVideoId(url) {
      return /gag\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/odysee.js
  var OdyseeHelper = class extends BaseHelper {
    API_ORIGIN = "https://odysee.com";
    async getVideoData(videoId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/${videoId}`);
        const content = await res.text();
        const url = /"contentUrl":(\s)?"([^"]+)"/.exec(content)?.[2];
        if (!url) {
          throw new VideoHelperError("Odysee url doesn't parsed");
        }
        return { url };
      } catch (err) {
        Logger.error(`Failed to get odysee video data by video ID: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/okru.js
  var OKRuHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /\/video\/(\d+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/oraclelearn.js
  var OracleLearnHelper = class extends VideoJSHelper {
    SUBTITLE_SOURCE = "oraclelearn";
    async getVideoData(videoId) {
      const data = this.getVideoDataByPlayer(videoId);
      if (!data) {
        return void 0;
      }
      const { url, duration, subtitles } = data;
      const baseData = this.returnBaseData(videoId);
      const videoUrl = proxyMedia(new URL(url));
      if (!baseData) {
        return {
          url: videoUrl,
          duration,
          subtitles
        };
      }
      return {
        url: baseData.url,
        duration,
        subtitles,
        translationHelp: [
          {
            target: "video_file_url",
            targetUrl: videoUrl
          }
        ]
      };
    }
    async getVideoId(url) {
      return /\/ou\/course\/(([^/]+)\/(\d+)\/(\d+))/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/patreon.js
  var PatreonHelper = class extends BaseHelper {
    API_ORIGIN = "https://www.patreon.com/api";
    async getPosts(postId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/posts/${postId}?json-api-use-default-includes=false`);
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get patreon posts by postId: ${postId}.`, err.message);
        return false;
      }
    }
    async getVideoData(postId) {
      const postData = await this.getPosts(postId);
      if (!postData) {
        return void 0;
      }
      const postFileUrl = postData.data.attributes.post_file.url;
      if (!postFileUrl) {
        return void 0;
      }
      return {
        url: postFileUrl
      };
    }
    async getVideoId(url) {
      const fullPostId = /posts\/([^/]+)/.exec(url.pathname)?.[1];
      if (!fullPostId) {
        return void 0;
      }
      return fullPostId.replace(/[^\d.]/g, "");
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/peertube.js
  var PeertubeHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /\/w\/([^/]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/pornhub.js
  var PornhubHelper = class extends BaseHelper {
    async getVideoId(url) {
      return url.searchParams.get("viewkey") ?? /embed\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/porntn.js
  var PornTNHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      try {
        if (typeof flashvars === "undefined") {
          return void 0;
        }
        const { rnd, video_url: source, video_title: title } = flashvars;
        if (!source || !rnd) {
          throw new VideoHelperError("Failed to find video source or rnd");
        }
        const getFileUrl = new URL(source);
        getFileUrl.searchParams.append("rnd", rnd);
        Logger.log("PornTN get_file link", getFileUrl.href);
        const cdnResponse = await this.fetch(getFileUrl.href, { method: "head" });
        const cdnUrl = new URL(cdnResponse.url);
        Logger.log("PornTN cdn link", cdnUrl.href);
        const proxiedUrl = proxyMedia(cdnUrl);
        return {
          url: proxiedUrl,
          title
        };
      } catch (err) {
        Logger.error(`Failed to get PornTN data by videoId: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return /\/videos\/(([^/]+)\/([^/]+))/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/reddit.js
  var RedditHelper = class extends BaseHelper {
    API_ORIGIN = "https://www.reddit.com";
    async getContentUrl(_videoId) {
      if (this.service?.additionalData !== "old") {
        return document.querySelector("shreddit-player-2")?.src;
      }
      const playerEl = document.querySelector("[data-hls-url]");
      return playerEl?.dataset.hlsUrl?.replaceAll("&amp;", "&");
    }
    async getVideoData(videoId) {
      try {
        const contentUrl = await this.getContentUrl(videoId);
        if (!contentUrl) {
          throw new VideoHelperError("Failed to find content url");
        }
        return {
          url: decodeURIComponent(contentUrl)
        };
      } catch (err) {
        Logger.error(`Failed to get reddit video data by video ID: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoId(url) {
      return /\/r\/(([^/]+)\/([^/]+)\/([^/]+)\/([^/]+))/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/rtnews.js
  var RtNewsHelper = class extends BaseHelper {
    async getVideoData(videoId) {
      const videoEl = document.querySelector(".jw-video, .media__video_noscript");
      if (!videoEl) {
        return void 0;
      }
      let videoSrc = videoEl.getAttribute("src");
      if (!videoSrc) {
        return void 0;
      }
      if (videoSrc.endsWith(".MP4")) {
        videoSrc = proxyMedia(videoSrc);
      }
      return {
        videoId,
        url: videoSrc
      };
    }
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/rumble.js
  var RumbleHelper = class extends BaseHelper {
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/rutube.js
  var RutubeHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /(?:video|embed)\/([^/]+)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/sap.js
  var SapHelper = class extends BaseHelper {
    API_ORIGIN = "https://learning.sap.com/";
    async requestKaltura(kalturaDomain, partnerId, entryId) {
      const clientTag = "html5:v3.17.22";
      const apiVersion = "3.3.0";
      try {
        const res = await this.fetch(`https://${kalturaDomain}/api_v3/service/multirequest`, {
          method: "POST",
          body: JSON.stringify({
            "1": {
              service: "session",
              action: "startWidgetSession",
              widgetId: `_${partnerId}`
            },
            "2": {
              service: "baseEntry",
              action: "list",
              ks: "{1:result:ks}",
              filter: { redirectFromEntryId: entryId },
              responseProfile: {
                type: 1,
                fields: "id,referenceId,name,description,dataUrl,duration,flavorParamsIds,type,dvrStatus,externalSourceType,createdAt,updatedAt,endDate,plays,views,downloadUrl,creatorId"
              }
            },
            "3": {
              service: "baseEntry",
              action: "getPlaybackContext",
              entryId: "{2:result:objects:0:id}",
              ks: "{1:result:ks}",
              contextDataParams: {
                objectType: "KalturaContextDataParams",
                flavorTags: "all"
              }
            },
            apiVersion,
            format: 1,
            ks: "",
            clientTag,
            partnerId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        return await res.json();
      } catch (err) {
        Logger.error("Failed to request kaltura data", err.message);
        return void 0;
      }
    }
    async getKalturaData(videoId) {
      try {
        const scriptEl = document.querySelector('script[data-nscript="beforeInteractive"]');
        if (!scriptEl) {
          throw new VideoHelperError("Failed to find script element");
        }
        const sapData = /https:\/\/([^"]+)\/p\/([^"]+)\/embedPlaykitJs\/uiconf_id\/([^"]+)/.exec(scriptEl?.src);
        if (!sapData) {
          throw new VideoHelperError(`Failed to get sap data for videoId: ${videoId}`);
        }
        const [, kalturaDomain, partnerId] = sapData;
        let entryId = document.querySelector("#shadow")?.firstChild?.getAttribute("id");
        if (!entryId) {
          const nextDataEl = document.querySelector("#__NEXT_DATA__");
          if (!nextDataEl) {
            throw new VideoHelperError("Failed to find next data element");
          }
          entryId = /"sourceId":\s?"([^"]+)"/.exec(nextDataEl.innerText)?.[1];
        }
        if (!kalturaDomain || Number.isNaN(+partnerId) || !entryId) {
          throw new VideoHelperError(`One of the necessary parameters for getting a link to a sap video in wasn't found for ${videoId}. Params: kalturaDomain = ${kalturaDomain}, partnerId = ${partnerId}, entryId = ${entryId}`);
        }
        return await this.requestKaltura(kalturaDomain, partnerId, entryId);
      } catch (err) {
        Logger.error("Failed to get kaltura data", err.message);
        return void 0;
      }
    }
    async getVideoData(videoId) {
      const kalturaData = await this.getKalturaData(videoId);
      if (!kalturaData) {
        return void 0;
      }
      const [, baseEntryList, playbackContext] = kalturaData;
      const { duration } = baseEntryList.objects[0];
      const videoUrl = playbackContext.sources.find((source) => source.format === "url" && source.protocols === "http,https" && source.url.includes(".mp4"))?.url;
      if (!videoUrl) {
        return void 0;
      }
      const subtitles = playbackContext.playbackCaptions.map((caption) => {
        return {
          language: normalizeLang(caption.languageCode),
          source: "sap",
          format: "vtt",
          url: caption.webVttUrl,
          isAutoGenerated: caption.label.includes("auto-generated")
        };
      });
      return {
        url: videoUrl,
        subtitles,
        duration
      };
    }
    async getVideoId(url) {
      return /((courses|learning-journeys)\/([^/]+)(\/[^/]+)?)/.exec(url.pathname)?.[1];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/telegram.js
  var TelegramHelper = class _TelegramHelper extends BaseHelper {
    static getMediaViewer() {
      if (typeof appMediaViewer === "undefined") {
        return void 0;
      }
      return appMediaViewer;
    }
    async getVideoId(_url) {
      const mediaViewer = _TelegramHelper.getMediaViewer();
      if (!mediaViewer) {
        return void 0;
      }
      if (mediaViewer.live) {
        return void 0;
      }
      const message = mediaViewer.target.message;
      if (message.peer_id._ !== "peerChannel") {
        return void 0;
      }
      const media = message.media;
      if (media._ !== "messageMediaDocument") {
        return void 0;
      }
      if (media.document.type !== "video") {
        return void 0;
      }
      const postId = message.mid & 4294967295;
      const username = await mediaViewer.managers.appPeersManager.getPeerUsername(message.peerId);
      return `${username}/${postId}`;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/thisvid.js
  var ThisVidHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /(videos|embed)\/[^/]+/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/tiktok.js
  var TikTokHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /([^/]+)\/video\/([^/]+)/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/trovo.js
  var TrovoHelper = class extends BaseHelper {
    async getVideoId(url) {
      const vid = url.searchParams.get("vid");
      const path = /([^/]+)\/([\d]+)/.exec(url.pathname)?.[0];
      if (!vid || !path) {
        return void 0;
      }
      return `${path}?vid=${vid}`;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/twitch.js
  var TwitchHelper = class extends BaseHelper {
    API_ORIGIN = "https://clips.twitch.tv";
    async getClipLink(pathname, clipId) {
      const schema = document.querySelector("script[type='application/ld+json']");
      const clearPathname = pathname.slice(1);
      if (schema) {
        const schemaJSON = JSON.parse(schema.innerText);
        const channelLink2 = schemaJSON["@graph"].find((obj) => obj["@type"] === "VideoObject")?.creator.url;
        if (!channelLink2) {
          throw new VideoHelperError("Failed to find channel link");
        }
        const channelName2 = channelLink2.replace("https://www.twitch.tv/", "");
        return `${channelName2}/clip/${clearPathname}`;
      }
      const isEmbed = clearPathname === "embed";
      const channelLink = document.querySelector(isEmbed ? ".tw-link[data-test-selector='stream-info-card-component__stream-avatar-link']" : ".clips-player a:not([class])");
      if (!channelLink) {
        return void 0;
      }
      const channelName = channelLink.href.replace("https://www.twitch.tv/", "");
      return `${channelName}/clip/${isEmbed ? clipId : clearPathname}`;
    }
    async getVideoData(videoId) {
      const title = document.querySelector('[data-a-target="stream-title"], [data-test-selector="stream-info-card-component__subtitle"]')?.innerText;
      const isStream = !!document.querySelector('[data-a-target="animated-channel-viewers-count"], .channel-status-info--live, .top-bar--pointer-enabled .tw-channel-status-text-indicator');
      return {
        url: this.service.url + videoId,
        isStream,
        title
      };
    }
    async getVideoId(url) {
      const pathname = url.pathname;
      if (/^m\.twitch\.tv$/.test(pathname)) {
        return /videos\/([^/]+)/.exec(url.href)?.[0] ?? pathname.slice(1);
      } else if (/^player\.twitch\.tv$/.test(url.hostname)) {
        return `videos/${url.searchParams.get("video")}`;
      }
      const clipPath = /([^/]+)\/(?:clip)\/([^/]+)/.exec(pathname);
      if (clipPath) {
        return clipPath[0];
      }
      const isClipsDomain = /^clips\.twitch\.tv$/.test(url.hostname);
      if (isClipsDomain) {
        return await this.getClipLink(pathname, url.searchParams.get("clip"));
      }
      const videoPath = /(?:videos)\/([^/]+)/.exec(pathname);
      if (videoPath) {
        return videoPath[0];
      }
      const isUserOfflinePage = document.querySelector(".home-offline-hero .tw-link");
      if (isUserOfflinePage?.href) {
        const pageUrl = new URL(isUserOfflinePage.href);
        return /(?:videos)\/([^/]+)/.exec(pageUrl.pathname)?.[0];
      }
      return document.querySelector(".persistent-player") ? pathname : void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/twitter.js
  var TwitterHelper = class extends BaseHelper {
    async getVideoId(url) {
      const videoId = /status\/([^/]+)/.exec(url.pathname)?.[1];
      if (videoId) {
        return videoId;
      }
      const postEl = this.video?.closest('[data-testid="tweet"]');
      const newLink = postEl?.querySelector('a[role="link"][aria-label]')?.href;
      return newLink ? /status\/([^/]+)/.exec(newLink)?.[1] : void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/udemy.js
  var UdemyHelper = class extends BaseHelper {
    API_ORIGIN = "https://www.udemy.com/api-2.0";
    getModuleData() {
      const appLoaderEl = document.querySelector(".ud-app-loader[data-module-id='course-taking']");
      const moduleData = appLoaderEl?.dataset?.moduleArgs;
      if (!moduleData) {
        return void 0;
      }
      return JSON.parse(moduleData);
    }
    getLectureId() {
      return /learn\/lecture\/([^/]+)/.exec(window.location.pathname)?.[1];
    }
    isErrorData(data) {
      return Object.hasOwn(data, "error");
    }
    async getLectureData(courseId, lectureId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/users/me/subscribed-courses/${courseId}/lectures/${lectureId}/?` + new URLSearchParams({
          "fields[lecture]": "title,description,asset",
          "fields[asset]": "length,media_sources,captions"
        }).toString());
        const data = await res.json();
        if (this.isErrorData(data)) {
          throw new VideoHelperError(data.detail ?? "unknown error");
        }
        return data;
      } catch (err) {
        Logger.error(`Failed to get lecture data by courseId: ${courseId} and lectureId: ${lectureId}`, err.message);
        return void 0;
      }
    }
    async getCourseLang(courseId) {
      try {
        const res = await this.fetch(`${this.API_ORIGIN}/users/me/subscribed-courses/${courseId}?` + new URLSearchParams({
          "fields[course]": "locale"
        }).toString());
        const data = await res.json();
        if (this.isErrorData(data)) {
          throw new VideoHelperError(data.detail ?? "unknown error");
        }
        return data;
      } catch (err) {
        Logger.error(`Failed to get course lang by courseId: ${courseId}`, err.message);
        return void 0;
      }
    }
    findVideoUrl(sources) {
      return sources?.find((src) => src.type === "video/mp4")?.src;
    }
    findSubtitleUrl(captions, detectedLanguage) {
      const subtitle = captions?.find((caption) => normalizeLang(caption.locale_id) === detectedLanguage) ?? captions?.find((caption) => normalizeLang(caption.locale_id) === "en") ?? captions?.[0];
      return subtitle?.url;
    }
    async getVideoData(videoId) {
      const moduleData = this.getModuleData();
      if (!moduleData) {
        return void 0;
      }
      const { courseId } = moduleData;
      const lectureId = this.getLectureId();
      Logger.log(`[Udemy] courseId: ${courseId}, lectureId: ${lectureId}`);
      if (!lectureId) {
        return void 0;
      }
      const lectureData = await this.getLectureData(courseId, lectureId);
      if (!lectureData) {
        return void 0;
      }
      const { title, description, asset } = lectureData;
      const { length: duration, media_sources, captions } = asset;
      const videoUrl = this.findVideoUrl(media_sources);
      if (!videoUrl) {
        Logger.log("Failed to find .mp4 video file in media_sources", media_sources);
        return void 0;
      }
      let courseLang = "en";
      const courseLangData = await this.getCourseLang(courseId);
      if (courseLangData) {
        const { locale: { locale: courseLocale } } = courseLangData;
        courseLang = courseLocale ? normalizeLang(courseLocale) : courseLang;
      }
      if (!availableLangs.includes(courseLang)) {
        courseLang = "en";
      }
      const subtitleUrl = this.findSubtitleUrl(captions, courseLang);
      if (!subtitleUrl) {
        Logger.log("Failed to find subtitle file in captions", captions);
      }
      return {
        ...subtitleUrl ? {
          url: this.service?.url + videoId,
          translationHelp: [
            {
              target: "subtitles_file_url",
              targetUrl: subtitleUrl
            },
            {
              target: "video_file_url",
              targetUrl: videoUrl
            }
          ],
          detectedLanguage: courseLang
        } : {
          url: videoUrl,
          translationHelp: null
        },
        duration,
        title,
        description
      };
    }
    async getVideoId(url) {
      return url.pathname.slice(1);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/vimeo.js
  var VimeoHelper = class extends BaseHelper {
    API_KEY = "";
    DEFAULT_SITE_ORIGIN = "https://vimeo.com";
    SITE_ORIGIN = this.service?.url?.slice(0, -1) ?? this.DEFAULT_SITE_ORIGIN;
    isErrorData(data) {
      return Object.hasOwn(data, "error");
    }
    isPrivatePlayer() {
      return this.referer && !this.referer.includes("vimeo.com") && this.origin.endsWith("player.vimeo.com");
    }
    async getViewerData() {
      try {
        const res = await this.fetch("https://vimeo.com/_next/viewer");
        const data = await res.json();
        const { apiUrl, jwt } = data;
        this.API_ORIGIN = `https://${apiUrl}`;
        this.API_KEY = `jwt ${jwt}`;
        return data;
      } catch (err) {
        Logger.error(`Failed to get default viewer data.`, err.message);
        return false;
      }
    }
    async getVideoInfo(videoId) {
      try {
        const params = new URLSearchParams({
          fields: "name,link,description,duration"
        }).toString();
        const res = await this.fetch(`${this.API_ORIGIN}/videos/${videoId}?${params}`, {
          headers: {
            Authorization: this.API_KEY
          }
        });
        const data = await res.json();
        if (this.isErrorData(data)) {
          throw new Error(data.developer_message ?? data.error);
        }
        return data;
      } catch (err) {
        Logger.error(`Failed to get video info by video ID: ${videoId}`, err.message);
        return false;
      }
    }
    async getPrivateVideoSource(files) {
      try {
        const { default_cdn, cdns } = files.dash;
        const cdnUrl = cdns[default_cdn].url;
        const res = await this.fetch(cdnUrl);
        if (res.status !== 200) {
          throw new VideoHelperError(await res.text());
        }
        const data = await res.json();
        const baseUrl = new URL(data.base_url, cdnUrl);
        const videoData = data.audio.find((v) => v.mime_type === "audio/mp4" && v.format === "dash");
        if (!videoData) {
          throw new VideoHelperError("Failed to find video data");
        }
        const segmentUrl = videoData.segments?.[0]?.url;
        if (!segmentUrl) {
          throw new VideoHelperError("Failed to find first segment url");
        }
        const [videoName, videoParams] = segmentUrl.split("?", 2);
        const params = new URLSearchParams(videoParams);
        params.delete("range");
        return new URL(`${videoData.base_url}${videoName}?${params.toString()}`, baseUrl).href;
      } catch (err) {
        Logger.error(`Failed to get private video source`, err.message);
        return false;
      }
    }
    async getPrivateVideoInfo(videoId) {
      try {
        if (typeof playerConfig === "undefined") {
          return void 0;
        }
        const videoSource = await this.getPrivateVideoSource(playerConfig.request.files);
        if (!videoSource) {
          throw new VideoHelperError("Failed to get private video source");
        }
        const { video: { title, duration }, request: { text_tracks: subs } } = playerConfig;
        return {
          url: `${this.SITE_ORIGIN}/${videoId}`,
          video_url: videoSource,
          title,
          duration,
          subs
        };
      } catch (err) {
        Logger.error(`Failed to get private video info by video ID: ${videoId}`, err.message);
        return false;
      }
    }
    async getSubsInfo(videoId) {
      try {
        const params = new URLSearchParams({
          per_page: "100",
          fields: "language,type,link"
        }).toString();
        const res = await this.fetch(`${this.API_ORIGIN}/videos/${videoId}/texttracks?${params}`, {
          headers: {
            Authorization: this.API_KEY
          }
        });
        const content = await res.json();
        if (this.isErrorData(content)) {
          throw new Error(content.developer_message ?? content.error);
        }
        return content.data;
      } catch (err) {
        Logger.error(`Failed to get subtitles info by video ID: ${videoId}`, err.message);
        return [];
      }
    }
    async getVideoData(videoId) {
      const isPrivate = this.isPrivatePlayer();
      if (isPrivate) {
        const videoInfo2 = await this.getPrivateVideoInfo(videoId);
        if (!videoInfo2) {
          return void 0;
        }
        const { url: url2, subs, video_url, title: title2, duration: duration2 } = videoInfo2;
        const subtitles2 = subs.map((sub) => ({
          language: normalizeLang(sub.lang),
          source: "vimeo",
          format: "vtt",
          url: this.SITE_ORIGIN + sub.url,
          isAutoGenerated: sub.lang.includes("autogenerated")
        }));
        const translationHelp = subtitles2.length ? [
          { target: "video_file_url", targetUrl: video_url },
          { target: "subtitles_file_url", targetUrl: subtitles2[0].url }
        ] : null;
        return {
          ...translationHelp ? {
            url: url2,
            translationHelp
          } : {
            url: video_url
          },
          subtitles: subtitles2,
          title: title2,
          duration: duration2
        };
      }
      if (!this.extraInfo) {
        return this.returnBaseData(videoId);
      }
      if (videoId.includes("/")) {
        videoId = videoId.replace("/", ":");
      }
      const viewerData = await this.getViewerData();
      if (!viewerData) {
        return this.returnBaseData(videoId);
      }
      const videoInfo = await this.getVideoInfo(videoId);
      if (!videoInfo) {
        return this.returnBaseData(videoId);
      }
      const subsData = await this.getSubsInfo(videoId);
      const subtitles = subsData.map((caption) => ({
        language: normalizeLang(caption.language),
        source: "vimeo",
        format: "vtt",
        url: caption.link,
        isAutoGenerated: caption.language.includes("autogen")
      }));
      const { link: url, duration, name: title, description } = videoInfo;
      return {
        url,
        title,
        description,
        subtitles,
        duration
      };
    }
    async getVideoId(url) {
      const embedId = /video\/[^/]+$/.exec(url.pathname)?.[0];
      if (this.isPrivatePlayer()) {
        return embedId;
      }
      if (embedId) {
        const hash = url.searchParams.get("h");
        const videoId = embedId.replace("video/", "");
        return hash ? `${videoId}/${hash}` : videoId;
      }
      const categoriesVideoId = /channels\/[^/]+\/([^/]+)/.exec(url.pathname)?.[1] ?? /groups\/[^/]+\/videos\/([^/]+)/.exec(url.pathname)?.[1] ?? /(showcase|album)\/[^/]+\/video\/([^/]+)/.exec(url.pathname)?.[2];
      if (categoriesVideoId) {
        return categoriesVideoId;
      }
      return /([^/]+\/)?[^/]+$/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/vk.js
  var VKHelper = class _VKHelper extends BaseHelper {
    static getPlayer() {
      if (typeof Videoview === "undefined") {
        return void 0;
      }
      return Videoview?.getPlayerObject?.call(void 0);
    }
    async getVideoData(videoId) {
      const player2 = _VKHelper.getPlayer();
      if (!player2) {
        return this.returnBaseData(videoId);
      }
      try {
        const { description: descriptionHTML, duration, md_title: title } = player2.vars;
        const parser = new DOMParser();
        const doc = parser.parseFromString(descriptionHTML, "text/html");
        const description = Array.from(doc.body.childNodes).filter((el) => el.nodeName !== "BR").map((el) => el.textContent).join("\n");
        let subtitles;
        if (Object.hasOwn(player2.vars, "subs")) {
          subtitles = player2.vars.subs.map((sub) => ({
            language: normalizeLang(sub.lang),
            source: "vk",
            format: "vtt",
            url: sub.url,
            isAutoGenerated: !!sub.is_auto
          }));
        }
        return {
          url: this.service.url + videoId,
          title,
          description,
          duration,
          subtitles
        };
      } catch (err) {
        Logger.error(`Failed to get VK video data, because: ${err.message}`);
        return this.returnBaseData(videoId);
      }
    }
    async getVideoId(url) {
      const pathID = /^\/(video|clip)-?\d{8,9}_\d{9}$/.exec(url.pathname);
      if (pathID) {
        return pathID[0].slice(1);
      }
      const idInsidePlaylist = /\/playlist\/[^/]+\/(video-?\d{8,9}_\d{9})/.exec(url.pathname);
      if (idInsidePlaylist) {
        return idInsidePlaylist[1];
      }
      const paramZ = url.searchParams.get("z");
      if (paramZ) {
        return paramZ.split("/")[0];
      }
      const paramOID = url.searchParams.get("oid");
      const paramID = url.searchParams.get("id");
      if (paramOID && paramID) {
        return `video-${Math.abs(parseInt(paramOID))}_${paramID}`;
      }
      return void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/watchpornto.js
  var WatchPornToHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /(video|embed)\/(\d+)(\/[^/]+\/)?/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+shared@2.4.12_typescript@5.6.3/node_modules/@vot.js/shared/dist/secure.js
  var { componentVersion } = config_default;
  async function getCrypto() {
    if (typeof window !== "undefined" && window.crypto) {
      return window.crypto;
    }
    return await import("node:crypto");
  }
  var utf8Encoder = new TextEncoder();
  async function signHMAC(hashName, hmac, data) {
    const crypto = await getCrypto();
    const key = await crypto.subtle.importKey("raw", utf8Encoder.encode(hmac), { name: "HMAC", hash: { name: hashName } }, false, ["sign", "verify"]);
    return await crypto.subtle.sign("HMAC", key, data);
  }
  async function getHmacSha1(hmacKey, salt) {
    try {
      const hmacSalt = utf8Encoder.encode(salt);
      const signature = await signHMAC("SHA-1", hmacKey, hmacSalt);
      return btoa(String.fromCharCode(...new Uint8Array(signature)));
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
  var browserSecHeaders = {
    "sec-ch-ua": `"Chromium";v="134", "YaBrowser";v="${componentVersion.slice(0, 5)}", "Not?A_Brand";v="24", "Yowser";v="2.5"`,
    "sec-ch-ua-full-version-list": `"Chromium";v="134.0.6998.543", "YaBrowser";v="${componentVersion}", "Not?A_Brand";v="24.0.0.0", "Yowser";v="2.5"`,
    "Sec-Fetch-Mode": "no-cors"
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/weverse.js
  var WeverseHelper = class extends BaseHelper {
    API_ORIGIN = "https://global.apis.naver.com/weverse/wevweb";
    API_APP_ID = "be4d79eb8fc7bd008ee82c8ec4ff6fd4";
    API_HMAC_KEY = "1b9cb6378d959b45714bec49971ade22e6e24e42";
    HEADERS = {
      Accept: "application/json, text/plain, */*",
      Origin: "https://weverse.io",
      Referer: "https://weverse.io/"
    };
    getURLData() {
      return {
        appId: this.API_APP_ID,
        language: "en",
        os: "WEB",
        platform: "WEB",
        wpf: "pc"
      };
    }
    async createHash(pathname) {
      const timestamp = Date.now();
      const salt = pathname.substring(0, Math.min(255, pathname.length)) + timestamp;
      const sign = await getHmacSha1(this.API_HMAC_KEY, salt);
      if (!sign) {
        throw new VideoHelperError("Failed to get weverse HMAC signature");
      }
      return {
        wmsgpad: timestamp.toString(),
        wmd: sign
      };
    }
    async getHashURLParams(pathname) {
      const hash = await this.createHash(pathname);
      return new URLSearchParams(hash).toString();
    }
    async getPostPreview(postId) {
      const pathname = `/post/v1.0/post-${postId}/preview?` + new URLSearchParams({
        fieldSet: "postForPreview",
        ...this.getURLData()
      }).toString();
      try {
        const urlParams = await this.getHashURLParams(pathname);
        const res = await this.fetch(this.API_ORIGIN + pathname + "&" + urlParams, {
          headers: this.HEADERS
        });
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get weverse post preview by postId: ${postId}`, err.message);
        return false;
      }
    }
    async getVideoInKey(videoId) {
      const pathname = `/video/v1.1/vod/${videoId}/inKey?` + new URLSearchParams({
        gcc: "RU",
        ...this.getURLData()
      }).toString();
      try {
        const urlParams = await this.getHashURLParams(pathname);
        const res = await this.fetch(this.API_ORIGIN + pathname + "&" + urlParams, {
          method: "POST",
          headers: this.HEADERS
        });
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get weverse InKey by videoId: ${videoId}`, err.message);
        return false;
      }
    }
    async getVideoInfo(infraVideoId, inkey, serviceId) {
      const timestamp = Date.now();
      try {
        const urlParams = new URLSearchParams({
          key: inkey,
          sid: serviceId,
          nonce: timestamp.toString(),
          devt: "html5_pc",
          prv: "N",
          aup: "N",
          stpb: "N",
          cpl: "en",
          env: "prod",
          lc: "en",
          adi: JSON.stringify([
            {
              adSystem: null
            }
          ]),
          adu: "/"
        }).toString();
        const res = await this.fetch(`https://global.apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/${infraVideoId}?` + urlParams, {
          headers: this.HEADERS
        });
        return await res.json();
      } catch (err) {
        Logger.error(`Failed to get weverse video info (infraVideoId: ${infraVideoId}, inkey: ${inkey}, serviceId: ${serviceId}`, err.message);
        return false;
      }
    }
    extractVideoInfo(videoList) {
      return videoList.find((video) => video.useP2P === false && video.source.includes(".mp4"));
    }
    async getVideoData(videoId) {
      const videoPreview = await this.getPostPreview(videoId);
      if (!videoPreview) {
        return void 0;
      }
      const { videoId: internalVideoId, serviceId, infraVideoId } = videoPreview.extension.video;
      if (!(internalVideoId && serviceId && infraVideoId)) {
        return void 0;
      }
      const inkeyData = await this.getVideoInKey(internalVideoId);
      if (!inkeyData) {
        return void 0;
      }
      const videoInfo = await this.getVideoInfo(infraVideoId, inkeyData.inKey, serviceId);
      if (!videoInfo) {
        return void 0;
      }
      const videoItem = this.extractVideoInfo(videoInfo.videos.list);
      if (!videoItem) {
        return void 0;
      }
      return {
        url: videoItem.source,
        duration: videoItem.duration
      };
    }
    async getVideoId(url) {
      return /([^/]+)\/(live|media)\/([^/]+)/.exec(url.pathname)?.[3];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/xvideos.js
  var XVideosHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /[^/]+\/[^/]+$/.exec(url.pathname)?.[0];
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/yandexdisk.js
  var YandexDiskHelper = class extends BaseHelper {
    API_ORIGIN = window.location.origin;
    CLIENT_PREFIX = "/client/disk";
    INLINE_PREFIX = "/i/";
    DISK_PREFIX = "/d/";
    isErrorData(data) {
      return Object.hasOwn(data, "error");
    }
    async getClientVideoData(videoId) {
      const url = new URL(window.location.href);
      const dialogId = url.searchParams.get("idDialog");
      if (!dialogId) {
        return void 0;
      }
      const preloadedScript = document.querySelector("#preloaded-data");
      if (!preloadedScript) {
        return void 0;
      }
      try {
        const preloadedData = JSON.parse(preloadedScript.innerText);
        const { idClient, sk } = preloadedData.config;
        const res = await this.fetch(this.API_ORIGIN + "/models-v2?m=mpfs/info", {
          method: "POST",
          body: JSON.stringify({
            apiMethod: "mpfs/info",
            connection_id: idClient,
            requestParams: {
              path: dialogId
            },
            sk
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        if (this.isErrorData(data)) {
          throw new VideoHelperError(data.error?.message ?? data.error?.code);
        }
        if (data?.type !== "file") {
          throw new VideoHelperError("Failed to get resource info");
        }
        const { meta: { short_url, video_info }, name } = data;
        if (!video_info) {
          throw new VideoHelperError("There's no video open right now");
        }
        if (!short_url) {
          throw new VideoHelperError("Access to the video is limited");
        }
        const title = this.clearTitle(name);
        const duration = Math.round(video_info.duration / 1e3);
        return {
          url: short_url,
          title,
          duration
        };
      } catch (err) {
        Logger.error(`Failed to get yandex disk video data by video ID: ${videoId}, because ${err.message}`);
        return void 0;
      }
    }
    clearTitle(title) {
      return title.replace(/(\.[^.]+)$/, "");
    }
    getBodyHash(fileHash, sk) {
      const data = JSON.stringify({
        hash: fileHash,
        sk
      });
      return encodeURIComponent(data);
    }
    async fetchList(dirHash, sk) {
      const body = this.getBodyHash(dirHash, sk);
      const res = await this.fetch(this.API_ORIGIN + "/public/api/fetch-list", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (Object.hasOwn(data, "error")) {
        throw new VideoHelperError("Failed to fetch folder list");
      }
      return data.resources;
    }
    async getDownloadUrl(fileHash, sk) {
      const body = this.getBodyHash(fileHash, sk);
      const res = await this.fetch(this.API_ORIGIN + "/public/api/download-url", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.error) {
        throw new VideoHelperError("Failed to get download url");
      }
      return data.data.url;
    }
    async getDiskVideoData(videoId) {
      try {
        const prefetchEl = document.getElementById("store-prefetch");
        if (!prefetchEl) {
          throw new VideoHelperError("Failed to get prefetch data");
        }
        const resourcePaths = videoId.split("/").slice(3);
        if (!resourcePaths.length) {
          throw new VideoHelperError("Failed to find video file path");
        }
        const data = JSON.parse(prefetchEl.innerText);
        const { resources, rootResourceId, environment: { sk } } = data;
        const rootResource = resources[rootResourceId];
        const resourcePathsLastIdx = resourcePaths.length - 1;
        const resourcePath = resourcePaths.filter((_, idx) => idx !== resourcePathsLastIdx).join("/");
        let resourcesList = Object.values(resources);
        if (resourcePath.includes("/")) {
          resourcesList = await this.fetchList(`${rootResource.hash}:/${resourcePath}`, sk);
        }
        const resource = resourcesList.find((resource2) => resource2.name === resourcePaths[resourcePathsLastIdx]);
        if (!resource) {
          throw new VideoHelperError("Failed to find resource");
        }
        if (resource && resource.type === "dir") {
          throw new VideoHelperError("Path is dir, but expected file");
        }
        const { meta: { short_url, mediatype, videoDuration }, path, name } = resource;
        if (mediatype !== "video") {
          throw new VideoHelperError("Resource isn't a video");
        }
        const title = this.clearTitle(name);
        const duration = Math.round(videoDuration / 1e3);
        if (short_url) {
          return {
            url: short_url,
            duration,
            title
          };
        }
        const downloadUrl = await this.getDownloadUrl(path, sk);
        return {
          url: proxyMedia(new URL(downloadUrl)),
          duration,
          title
        };
      } catch (err) {
        Logger.error(`Failed to get yandex disk video data by disk video ID: ${videoId}`, err.message);
        return void 0;
      }
    }
    async getVideoData(videoId) {
      if (videoId.startsWith(this.INLINE_PREFIX) || /^\/d\/([^/]+)$/.exec(videoId)) {
        return {
          url: this.service.url + videoId.slice(1)
        };
      }
      videoId = decodeURIComponent(videoId);
      if (videoId.startsWith(this.CLIENT_PREFIX)) {
        return await this.getClientVideoData(videoId);
      }
      return await this.getDiskVideoData(videoId);
    }
    async getVideoId(url) {
      if (url.pathname.startsWith(this.CLIENT_PREFIX)) {
        return url.pathname + url.search;
      }
      const fileId = /\/i\/([^/]+)/.exec(url.pathname)?.[0];
      if (fileId) {
        return fileId;
      }
      return /\/d\/([^/]+)/.exec(url.pathname) ? url.pathname : void 0;
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/youku.js
  var YoukuHelper = class extends BaseHelper {
    async getVideoId(url) {
      return /v_show\/id_[\w=]+/.exec(url.pathname)?.[0];
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
      const player2 = _YoutubeHelper.getPlayer();
      if (player2?.getVolume) {
        return player2.getVolume() / 100;
      }
      return 1;
    }
    static setVolume(volume) {
      const player2 = _YoutubeHelper.getPlayer();
      if (player2?.setVolume) {
        player2.setVolume(Math.round(volume * 100));
        return true;
      }
      return false;
    }
    static isMuted() {
      const player2 = _YoutubeHelper.getPlayer();
      if (player2?.isMuted) {
        return player2.isMuted();
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
      const player2 = _YoutubeHelper.getPlayer();
      if (!player2) {
        return void 0;
      }
      const audioTrack = player2.getAudioTrack?.call(void 0);
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
        const player2 = _YoutubeHelper.getPlayer();
        const trackInfo = player2?.getAudioTrack?.call(void 0)?.getLanguageInfo();
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

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/helpers/index.js
  var availableHelpers = {
    [VideoService.mailru]: MailRuHelper,
    [VideoService.weverse]: WeverseHelper,
    [VideoService.kodik]: KodikHelper,
    [VideoService.patreon]: PatreonHelper,
    [VideoService.reddit]: RedditHelper,
    [VideoService.bannedvideo]: BannedVideoHelper,
    [VideoService.kick]: KickHelper,
    [VideoService.appledeveloper]: AppleDeveloperHelper,
    [VideoService.epicgames]: EpicGamesHelper,
    [VideoService.odysee]: OdyseeHelper,
    [VideoService.coursehunterLike]: CoursehunterLikeHelper,
    [VideoService.twitch]: TwitchHelper,
    [VideoService.sap]: SapHelper,
    [VideoService.linkedin]: LinkedinHelper,
    [VideoService.vimeo]: VimeoHelper,
    [VideoService.yandexdisk]: YandexDiskHelper,
    [VideoService.vk]: VKHelper,
    [VideoService.trovo]: TrovoHelper,
    [VideoService.incestflix]: IncestflixHelper,
    [VideoService.porntn]: PornTNHelper,
    [VideoService.googledrive]: GoogleDriveHelper,
    [VideoService.bilibili]: BilibiliHelper,
    [VideoService.xvideos]: XVideosHelper,
    [VideoService.watchpornto]: WatchPornToHelper,
    [VideoService.archive]: ArchiveHelper,
    [VideoService.dailymotion]: DailymotionHelper,
    [VideoService.youku]: YoukuHelper,
    [VideoService.egghead]: EggheadHelper,
    [VideoService.newgrounds]: NewgroundsHelper,
    [VideoService.okru]: OKRuHelper,
    [VideoService.peertube]: PeertubeHelper,
    [VideoService.eporner]: EpornerHelper,
    [VideoService.bitchute]: BitchuteHelper,
    [VideoService.rutube]: RutubeHelper,
    [VideoService.facebook]: FacebookHelper,
    [VideoService.rumble]: RumbleHelper,
    [VideoService.twitter]: TwitterHelper,
    [VideoService.pornhub]: PornhubHelper,
    [VideoService.tiktok]: TikTokHelper,
    [VideoService.proxitok]: TikTokHelper,
    [VideoService.nine_gag]: NineGAGHelper,
    [VideoService.youtube]: YoutubeHelper,
    [VideoService.ricktube]: YoutubeHelper,
    [VideoService.invidious]: YoutubeHelper,
    [VideoService.poketube]: YoutubeHelper,
    [VideoService.piped]: YoutubeHelper,
    [VideoService.dzen]: DzenHelper,
    [VideoService.cloudflarestream]: CloudflareStreamHelper,
    [VideoService.loom]: LoomHelper,
    [VideoService.rtnews]: RtNewsHelper,
    [VideoService.bitview]: BitviewHelper,
    [VideoService.thisvid]: ThisVidHelper,
    [VideoService.ign]: IgnHelper,
    [VideoService.bunkr]: BunkrHelper,
    [VideoService.imdb]: IMDbHelper,
    [VideoService.telegram]: TelegramHelper,
    [ExtVideoService.udemy]: UdemyHelper,
    [ExtVideoService.coursera]: CourseraHelper,
    [ExtVideoService.douyin]: DouyinHelper,
    [ExtVideoService.artstation]: ArtstationHelper,
    [ExtVideoService.kickstarter]: KickstarterHelper,
    [ExtVideoService.oraclelearn]: OracleLearnHelper,
    [ExtVideoService.deeplearningai]: DeeplearningAIHelper,
    [ExtVideoService.netacad]: NetacadHelper
  };
  var VideoHelper = class {
    helpersData;
    constructor(helpersData = {}) {
      this.helpersData = helpersData;
    }
    getHelper(service) {
      return new availableHelpers[service](this.helpersData);
    }
  };

  // node_modules/.pnpm/@vot.js+ext@2.4.12_typescript@5.6.3/node_modules/@vot.js/ext/dist/utils/videoData.js
  function getService() {
    if (localLinkRe.exec(window.location.href)) {
      return [];
    }
    const hostname = window.location.hostname;
    const enteredURL = new URL(window.location.href);
    const isMatches = (match) => {
      if (match instanceof RegExp) {
        return match.test(hostname);
      } else if (typeof match === "string") {
        return hostname.includes(match);
      } else if (typeof match === "function") {
        return match(enteredURL);
      }
      return false;
    };
    return sites_default.filter((e) => {
      return (Array.isArray(e.match) ? e.match.some(isMatches) : isMatches(e.match)) && e.host && e.url;
    });
  }
  async function getVideoID(service, opts = {}) {
    const url = new URL(window.location.href);
    const serviceHost = service.host;
    if (Object.keys(availableHelpers).includes(serviceHost)) {
      const helper = new VideoHelper(opts).getHelper(serviceHost);
      return await helper.getVideoId(url);
    }
    return serviceHost === VideoService.custom ? url.href : void 0;
  }
  async function getVideoData(service, opts = {}) {
    const videoId = await getVideoID(service, opts);
    if (!videoId) {
      throw new VideoDataError(`Entered unsupported link: "${service.host}"`);
    }
    const origin = window.location.origin;
    if ([
      VideoService.peertube,
      VideoService.coursehunterLike,
      VideoService.cloudflarestream
    ].includes(service.host)) {
      service.url = origin;
    }
    if (service.rawResult) {
      return {
        url: videoId,
        videoId,
        host: service.host,
        duration: void 0
      };
    }
    if (!service.needExtraData) {
      return {
        url: service.url + videoId,
        videoId,
        host: service.host,
        duration: void 0
      };
    }
    const helper = new VideoHelper({
      ...opts,
      service,
      origin
    }).getHelper(service.host);
    const result = await helper.getVideoData(videoId);
    if (!result) {
      throw new VideoDataError(`Failed to get video raw url for ${service.host}`);
    }
    return {
      ...result,
      videoId,
      host: service.host
    };
  }

  // src/injectorPanel.ts
  var CrabPanel = class {
    constructor(callbacks) {
      this.callbacks = callbacks;
      this.host = document.createElement("div");
      this.host.id = "cv-panel-host";
      this.shadow = this.host.attachShadow({ mode: "open" });
      this.render();
      this.bindEvents();
      this.setupDraggable();
    }
    host;
    shadow;
    translationPaused = false;
    isCollapsed = false;
    // UI Элементы
    wrapper;
    panel;
    fab;
    statusEl;
    valAudio;
    valVideo;
    btnTogglePlay;
    sliderAudio;
    sliderVideo;
    safeSetHTML(element, html) {
      if (window.trustedTypes && window.trustedTypes.createPolicy) {
        if (!window._cvPolicy) {
          try {
            window._cvPolicy = window.trustedTypes.createPolicy("cv-policy-bypass", {
              createHTML: (s) => s
            });
          } catch (e) {
          }
        }
        if (window._cvPolicy) {
          element.innerHTML = window._cvPolicy.createHTML(html);
          return;
        }
      }
      element.innerHTML = html;
    }
    render() {
      const template = `
            <style>
                .cv-wrapper {
                    position: fixed !important; bottom: 20px !important; right: 20px !important;
                    z-index: 2147483647 !important; font-family: sans-serif !important; 
                    pointer-events: auto !important; color: #fff !important;
                }
                
                .cv-panel {
                    background: rgba(0,0,0,0.85) !important; border-radius: 10px !important;
                    min-width: 220px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                    display: flex !important; flex-direction: column !important;
                }
                
                .cv-wrapper.collapsed .cv-panel { display: none !important; }

                .cv-header { 
                    font-size: 14px !important; font-weight: bold; background: #2a2a2a !important;
                    padding: 10px 15px !important; border-radius: 10px 10px 0 0 !important;
                    display: flex !important; justify-content: space-between !important; align-items: center !important;
                    cursor: grab !important; user-select: none !important;
                }
                .cv-header div { pointer-events: none !important; }
                .cv-header:active { cursor: grabbing !important; }
                
                .cv-btn-collapse {
                    background: #444 !important; border: none; color: #fff; cursor: pointer; 
                    font-size: 12px; padding: 2px 8px; border-radius: 4px; transition: 0.2s;
                    line-height: 1; font-weight: bold;
                }
                .cv-btn-collapse:hover { background: #666 !important; }
                
                .cv-content { padding: 15px !important; }
                .cv-row { display: flex !important; flex-direction: column !important; gap: 5px !important; margin-bottom: 10px !important; }
                .cv-row label { font-size: 11px !important; color: #bbb !important; display: flex; justify-content: space-between; }
                .cv-slider { width: 100% !important; accent-color: #24c8db !important; cursor: pointer; }
                .cv-btn-group { display: flex !important; gap: 8px !important; margin-bottom: 10px !important; }
                .cv-btn {
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 12px !important;
                    cursor: pointer !important; flex: 1 !important; transition: 0.2s;
                }
                .cv-btn:hover { background: #444 !important; }
                .cv-btn-close {
                    background: #ff5e5e !important; color: #fff !important; border: none !important;
                    padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                    cursor: pointer !important; width: 100% !important; font-size: 13px !important;
                }

                .cv-fab {
                    display: none !important; width: 48px !important; height: 48px !important;
                    background: rgba(0,0,0,0.85) !important; border-radius: 24px !important;
                    align-items: center !important; justify-content: center !important;
                    font-size: 24px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                    cursor: pointer !important; user-select: none !important; border: 2px solid #444 !important;
                    transition: border-color 0.2s !important;
                }
                .cv-fab:hover { border-color: #24c8db !important; }
                
                .cv-wrapper.collapsed .cv-fab { display: flex !important; }
            </style>

            <div class="cv-wrapper" id="cv-wrapper">
                <div class="cv-fab" id="cv-fab" title="Expand CrabVoice">\u{1F980}</div>
                
                <div class="cv-panel" id="cv-panel">
                    <div class="cv-header" id="cv-header" title="Drag to move">
                        <div>\u{1F980} CrabVoice</div>
                        <button class="cv-btn-collapse" id="cv-btn-collapse" title="Minimize">_</button>
                    </div>
                    <div class="cv-content">
                        <div style="font-size:12px; margin-bottom: 12px; text-align:center;">
                            <span id="cv-status" style="color:#FFC131">Searching video...</span>
                        </div>
                        
                        <div class="cv-row">
                            <label>Translation Vol: <span id="cv-val-audio">100%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-audio" min="0" max="100" value="100">
                        </div>
                        
                        <div class="cv-row">
                            <label>Original Vol: <span id="cv-val-video">15%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-video" min="0" max="100" value="15">
                        </div>

                        <div class="cv-btn-group">
                            <button class="cv-btn" id="cv-toggle-play">\u23F8 Pause</button>
                            <button class="cv-btn" id="cv-refresh">\u{1F504} Refresh</button>
                        </div>

                        <button class="cv-btn-close" id="cv-close-full">\u2B05 Back to App</button>
                    </div>
                </div>
            </div>
        `;
      this.safeSetHTML(this.shadow, template);
      this.wrapper = this.shadow.getElementById("cv-wrapper");
      this.panel = this.shadow.getElementById("cv-panel");
      this.fab = this.shadow.getElementById("cv-fab");
      this.statusEl = this.shadow.getElementById("cv-status");
      this.valAudio = this.shadow.getElementById("cv-val-audio");
      this.valVideo = this.shadow.getElementById("cv-val-video");
      this.btnTogglePlay = this.shadow.getElementById("cv-toggle-play");
      this.sliderAudio = this.shadow.getElementById("cv-vol-audio");
      this.sliderVideo = this.shadow.getElementById("cv-vol-video");
    }
    toggleCollapse(collapsed) {
      this.isCollapsed = collapsed;
      if (collapsed) this.wrapper.classList.add("collapsed");
      else this.wrapper.classList.remove("collapsed");
    }
    bindEvents() {
      this.shadow.getElementById("cv-close-full").onclick = () => this.callbacks.onClose();
      this.shadow.getElementById("cv-btn-collapse").onclick = () => this.toggleCollapse(true);
      this.fab.onclick = () => {
        if (this.isCollapsed) this.toggleCollapse(false);
      };
      this.sliderAudio.oninput = (e) => {
        const val = e.target.value;
        this.valAudio.innerText = `${val}%`;
        this.callbacks.onAudioVolume(val / 100);
      };
      this.sliderVideo.oninput = (e) => {
        const val = e.target.value;
        this.valVideo.innerText = `${val}%`;
        this.callbacks.onVideoVolume(val / 100);
      };
      this.btnTogglePlay.onclick = () => {
        this.translationPaused = !this.translationPaused;
        this.setPlayPauseState(this.translationPaused);
        this.callbacks.onTogglePlay(this.translationPaused);
      };
      this.shadow.getElementById("cv-refresh").onclick = () => {
        this.setPlayPauseState(false);
        this.callbacks.onRefresh();
      };
    }
    setupDraggable() {
      const header = this.shadow.getElementById("cv-header");
      let isDragging = false;
      let startX = 0, startY = 0;
      let initialLeft = 0, initialTop = 0;
      const onMouseDown = (e) => {
        const target = e.target;
        const isButton = target.tagName.toLowerCase() === "button";
        const isHeaderArea = header.contains(target);
        const isFab = target === this.fab;
        if (isButton || !isHeaderArea && !isFab) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = this.wrapper.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        this.wrapper.style.setProperty("bottom", "auto", "important");
        this.wrapper.style.setProperty("right", "auto", "important");
        this.wrapper.style.setProperty("left", `${initialLeft}px`, "important");
        this.wrapper.style.setProperty("top", `${initialTop}px`, "important");
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
      const onMouseMove = (e) => {
        if (!isDragging) return;
        let newLeft = initialLeft + (e.clientX - startX);
        let newTop = initialTop + (e.clientY - startY);
        const maxLeft = window.innerWidth - this.wrapper.offsetWidth;
        const maxTop = window.innerHeight - this.wrapper.offsetHeight;
        this.wrapper.style.setProperty("left", `${Math.max(0, Math.min(newLeft, maxLeft))}px`, "important");
        this.wrapper.style.setProperty("top", `${Math.max(0, Math.min(newTop, maxTop))}px`, "important");
      };
      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      header.addEventListener("mousedown", onMouseDown);
      this.fab.addEventListener("mousedown", onMouseDown);
    }
    updateStatus(text, color = "#fff") {
      this.statusEl.innerText = text;
      this.statusEl.style.color = color;
    }
    setVideoVolumeSlider(val) {
      this.sliderVideo.value = (val * 100).toString();
      this.valVideo.innerText = `${Math.round(val * 100)}%`;
    }
    setPlayPauseState(paused) {
      this.translationPaused = paused;
      this.btnTogglePlay.innerText = paused ? "\u25B6\uFE0F Play" : "\u23F8 Pause";
    }
  };

  // src/injector.ts
  var invokeLog = (source, msg) => {
    if (window.__TAURI__) {
      window.__TAURI__.core.invoke("log_message", { source, msg }).catch(() => {
      });
    }
  };
  var appLog = (msg) => {
    console.log("[CrabVoice Injector]", msg);
    invokeLog("info", msg);
  };
  var originalError = console.error;
  console.error = (...args) => {
    originalError(...args);
    const msg = args.map((a) => {
      if (a instanceof Error) return `${a.name}: ${a.message}
${a.stack}`;
      if (typeof a === "object") return JSON.stringify(a, null, 2);
      return String(a);
    }).join(" ");
    invokeLog("error", msg);
  };
  if (window.location.href.includes("access_token=")) {
    const hashOrSearch = window.location.hash ? window.location.hash.replace(/^#/, "") : window.location.search.replace(/^\?/, "");
    const params = new URLSearchParams(hashOrSearch);
    const token = params.get("access_token");
    if (token && window.__TAURI__) {
      try {
        window.stop();
      } catch (e) {
      }
      document.documentElement.innerHTML = "<body style='background:#121212;'><h2 style='color: #4CAF50; text-align: center; margin-top: 50px; font-family: sans-serif;'>\u2705 Login successful!<br><br><span style='color: #aaa; font-size: 16px;'>Returning to CrabVoice...</span></h2></body>";
      window.__TAURI__.core.invoke("save_yandex_token", { token }).then(() => {
        const homeUrl = localStorage.getItem("cv_home_url");
        setTimeout(() => {
          if (homeUrl) window.location.href = homeUrl;
          else window.history.go(-(window.history.length - 1));
        }, 1e3);
      });
    }
  }
  if (!window._cvInitialized) {
    let updateStatus = function(text, color) {
      if (panelInstance) {
        panelInstance.updateStatus(text, color || "#fff");
      }
    }, syncAudio = function() {
      if (!mainVideo || !audioObj) return;
      if (sponsorSegments.length > 0 && !mainVideo.paused) {
        const ct = mainVideo.currentTime;
        for (let seg of sponsorSegments) {
          if (ct >= seg.start && ct < seg.end) {
            mainVideo.currentTime = seg.end;
            appLog(`SponsorBlock: Skipped ${seg.category} (${seg.start.toFixed(1)}s -> ${seg.end.toFixed(1)}s)`);
            updateStatus(`Skipped ${seg.category} \u23E9`, "#FFD700");
            setTimeout(() => updateStatus("Linked & Translated \u2705", "#4CAF50"), 3e3);
            break;
          }
        }
      }
      if (mainVideo.volume !== userVideoVolume) {
        mainVideo.volume = userVideoVolume;
      }
      audioObj.volume = userAudioVolume;
      if (translationPaused || mainVideo.paused || mainVideo.ended) {
        audioObj.pause();
      } else if (audioObj.paused) {
        audioObj.play().catch(() => {
        });
      }
      if (Math.abs(audioObj.currentTime - mainVideo.currentTime) > 0.3) {
        audioObj.currentTime = mainVideo.currentTime;
      }
      if (audioObj.playbackRate !== mainVideo.playbackRate) {
        audioObj.playbackRate = mainVideo.playbackRate;
      }
    };
    updateStatus2 = updateStatus, syncAudio2 = syncAudio;
    window._cvInitialized = true;
    const isHome = window.location.hostname === "localhost" || window.location.hostname === "tauri.localhost" || window.location.protocol === "tauri:";
    if (isHome) {
      localStorage.setItem("cv_home_url", window.location.href);
    } else {
      appLog(`CrabVoice Injector attached to ${window.location.hostname}`);
    }
    let mainVideo = null;
    let audioObj = null;
    let isTranslating = false;
    let currentVideoUrl = "";
    let countdownInterval = null;
    let appSettings = null;
    let translationPaused = false;
    let userAudioVolume = 1;
    let userVideoVolume = 0.15;
    let panelInstance = null;
    let sponsorSegments = [];
    async function requestTranslation(v, forceRefresh = false) {
      if (isTranslating && !forceRefresh) return;
      isTranslating = true;
      currentVideoUrl = window.location.href;
      let attempts = 0;
      if (!appSettings && window.__TAURI__) {
        try {
          appSettings = await window.__TAURI__.core.invoke("get_settings");
          userVideoVolume = appSettings.volume_ducking;
          if (panelInstance) panelInstance.setVideoVolumeSlider(userVideoVolume);
        } catch (e) {
          console.error("CrabVoice: Failed to fetch settings", e);
        }
      }
      try {
        const services = getService();
        if (!services.length) {
          console.error("\u0421\u0435\u0440\u0432\u0438\u0441 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D \u0434\u043B\u044F \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B");
          throw new Error("Unknown service");
        }
        const service = services[0];
        appLog("Extracting video data via VOT.js");
        updateStatus("VOT.js extracting... \u{1F50D}", "#24c8db");
        const videoData = await getVideoData(service);
        const duration = videoData?.duration || v.duration || 344;
        if (window.location.hostname.includes("youtube.com")) {
          const urlObj = new URL(window.location.href);
          const videoId = urlObj.searchParams.get("v");
          if (videoId && window.__TAURI__) {
            try {
              sponsorSegments = await window.__TAURI__.core.invoke("get_skip_segments", { videoId });
              if (sponsorSegments.length > 0) {
                appLog(`SponsorBlock: Loaded ${sponsorSegments.length} segments`);
              }
            } catch (e) {
            }
          }
        }
        const pollTranslation = async () => {
          if (window.location.href !== currentVideoUrl) {
            isTranslating = false;
            return;
          }
          if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
          }
          updateStatus("Requesting Yandex... \u23F3", "#FFC131");
          try {
            const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
            if (!invoke) return;
            appLog("Sent translation request to Rust backend");
            const res = await invoke("translate", { url: window.location.href, duration });
            if (res.status === 1 && res.url) {
              appLog("Translation successful! Playing native audio...");
              updateStatus("Linked & Translated \u2705", "#4CAF50");
              if (audioObj) {
                audioObj.pause();
                audioObj.src = "";
              }
              audioObj = new Audio(res.url);
              translationPaused = false;
              if (panelInstance) panelInstance.setPlayPauseState(false);
              const events = ["play", "pause", "playing", "waiting", "seeking", "seeked", "ratechange", "timeupdate"];
              events.forEach((e) => v.addEventListener(e, syncAudio));
              syncAudio();
            } else {
              attempts++;
              if (attempts > 30) {
                updateStatus("Timeout \u274C", "#ff5e5e");
                isTranslating = false;
                return;
              }
              let timeLeft = res.remaining_time && res.remaining_time > 0 ? res.remaining_time : 15;
              updateStatus(`Processing... (~${timeLeft}s) \u23F3`, "#FFC131");
              countdownInterval = setInterval(() => {
                if (window.location.href !== currentVideoUrl) {
                  clearInterval(countdownInterval);
                  return;
                }
                timeLeft--;
                if (timeLeft > 0) {
                  updateStatus(`Processing... (~${timeLeft}s) \u23F3`, "#FFC131");
                } else {
                  clearInterval(countdownInterval);
                  pollTranslation();
                }
              }, 1e3);
            }
          } catch (e) {
            appLog(`Rust Error: ${e.toString()}`);
            console.error("CrabVoice Rust Error:", e);
            updateStatus(e.toString().substring(0, 30) + " \u26A0\uFE0F", "#ff5e5e");
            isTranslating = false;
          }
        };
        pollTranslation();
      } catch (error) {
        updateStatus("VOT.js Parse Error \u274C", "#ff5e5e");
        isTranslating = false;
      }
    }
    const walkDOMForVideo = (root) => {
      let node = root.querySelector("video");
      if (node && node.duration > 0 && node.offsetWidth > 100) return node;
      let els = root.querySelectorAll("*");
      for (let el of els) {
        if (el.shadowRoot) {
          let res = walkDOMForVideo(el.shadowRoot);
          if (res) return res;
        }
      }
      return null;
    };
    const checkAndInject = () => {
      if (isHome) return;
      if (mainVideo && (!mainVideo.isConnected || window.location.href !== currentVideoUrl)) {
        mainVideo = null;
        if (audioObj) {
          audioObj.pause();
          audioObj = null;
        }
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
        isTranslating = false;
        updateStatus("Searching new video...", "#FFC131");
      }
      let panelHost = document.getElementById("cv-panel-host");
      if (!panelHost && !panelInstance) {
        panelInstance = new CrabPanel({
          onClose: () => {
            const homeUrl = localStorage.getItem("cv_home_url");
            if (homeUrl) window.location.href = homeUrl;
            else window.history.go(-(window.history.length - 1));
          },
          onAudioVolume: (val) => {
            userAudioVolume = val;
            if (audioObj) audioObj.volume = userAudioVolume;
          },
          onVideoVolume: (val) => {
            userVideoVolume = val;
            if (mainVideo) mainVideo.volume = userVideoVolume;
          },
          onTogglePlay: (paused) => {
            translationPaused = paused;
            syncAudio();
          },
          onRefresh: () => {
            if (audioObj) {
              audioObj.pause();
              audioObj.src = "";
            }
            if (countdownInterval) {
              clearInterval(countdownInterval);
              countdownInterval = null;
            }
            translationPaused = false;
            if (panelInstance) panelInstance.setPlayPauseState(false);
            if (mainVideo) requestTranslation(mainVideo, true);
          }
        });
        document.documentElement.appendChild(panelInstance.host);
      }
      if (!mainVideo && !isTranslating) {
        let v = document.querySelector(".html5-video-container video, video.vjs-tech, .fp-player video");
        if (!v || v.duration === 0) v = walkDOMForVideo(document);
        if (v && v.duration > 0 && v.offsetWidth > 100) {
          mainVideo = v;
          requestTranslation(v);
        }
      }
    };
    setInterval(checkAndInject, 1e3);
  }
  var updateStatus2;
  var syncAudio2;
})();
