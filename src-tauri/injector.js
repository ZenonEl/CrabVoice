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

  // src/icons.ts
  var Icons = {
    crabLogo: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="100" viewBox="40 -140 350 50">
                    <!-- SVG created with Arrow, by QuiverAI (https://quiver.ai) -->
                    <path d="m253.2 71.09h-17.8c-4.18 0-6.37 5.2-2.28 8.01l15.88 11.75c1.87 1.37 4.52 0.95 5.77-0.96s0.79-4.47-1.12-5.72l-5.55-4.03h4.12c10.48 0 18.11 7.12 20.45 15.7h-24.93c-0.99 0-1.86-0.46-2.41-1.26-1.41-2.14-4.44-2.63-6.51-1.16-2.06 1.47-1.74 4.29-0.27 6.29 2.36 3.31 6.2 5.31 10.31 5.31h24.86v4.12c0 4.8-1.85 6.94-5.75 9.27l-17.85 10.42c-5.16-4.34-11.62-6.82-18.02-7.29v-13.47c0-2.71-1.79-4.05-3.85-4.05-2.33 0-3.9 1.69-3.9 4.05v12.39h-16.13v-12.39c0-2.43-1.64-4.05-3.84-4.05-2.33 0-3.91 1.69-3.91 4.05v13.42c-6.61 0.37-12.54 2.82-17.52 7.16l-17.4-10.24c-4.3-2.54-7.33-4.6-7.33-10.34v-4.12h26.8c4.11 0 7.95-2 10.31-5.31 1.47-2.2 1.19-4.67-0.88-6.02s-4.89-0.76-6.19 1.21c-0.76 1.12-1.96 1.88-3.43 1.88h-25.62c2.94-8.92 10.89-15.57 20.95-15.57h3.23l-6.19 5.29c-1.85 1.63-2.04 4.33-0.47 6.13 1.63 1.96 4.57 1.91 6.43 0.22l14.75-13.06c2.94-2.43 2.04-7.63-2.15-7.63h-18.02c-15.79 0-27.27 13.12-27.27 28.52v8.51c0 8.61 4.89 14.09 11.08 17.65l16.19 9.64c-1.47 2.1-2.72 4.38-3.72 6.75h-10.06l-6.86-3.87c-2.24-1.25-4.48-0.23-5.59 1.46-1.35 2.2-0.18 4.67 2.06 5.92l7.75 4.26c0.6 0.36 1.32 0.54 2.03 0.54h8.36c-0.23 1.36-0.42 2.77-0.51 4.22l-5.15 2.63c-0.55 0.31-1.05 0.69-1.46 1.19l-7.84 9.5c-1.75 2.2-1.3 4.71 0.5 6.12 2.07 1.63 4.67 0.78 6.2-1.23l8.4-8.41 11.4 7.03-9.09 3.61c-0.81 0.36-1.58 0.9-2.17 1.61l-7.26 7.7c-1.75 2.01-1.28 4.43 0.52 5.89 1.95 1.56 4.65 0.85 6.38-1.11l7.54-7.5 10.48-3.6-5.2 5.2c-1.2 1.2-1.79 2.37-1.79 4.11v10.42c0 2.37 1.62 3.93 3.86 3.93 2.34 0 3.91-1.69 3.91-4.06v-6.01l9.23-6.01h30.04l9.91 6.46v6.01c0 2.37 1.62 3.94 3.86 3.94 2.33 0 3.9-1.69 3.9-4.06v-8.56c0-1.74-0.85-3.21-2.31-4.15l-8.96-6.32 7.85-2.99 9.27 3.31 8.45 8.87c1.74 1.91 4.24 1.96 5.99 0.38 1.9-1.74 1.59-4.38-0.27-6.24l-8.44-8.51c-0.67-0.67-1.52-1.26-2.46-1.58l-8.58-3.13 9.27-9.28 6.67 3.41 7.11 8.78c1.63 2.14 4.14 2.09 5.89 0.45 1.95-1.79 1.5-4.48-0.25-6.39l-8.44-9.5c-0.67-0.76-1.48-1.35-2.47-1.72l-6.67-2.7c0-0.94-0.09-2.02-0.23-3.05h9.18c0.81 0 1.62-0.23 2.34-0.64l8.22-4.62c2.24-1.25 2.96-3.8 1.71-5.85-1.31-2.24-4.13-2.56-6.29-1.31l-7.45 4.3h-9.45c-0.99-2.69-2.29-5.2-3.9-7.53l18.98-10.97c5.93-3.35 8.87-8.24 8.87-14.89v-8.01c0-15.4-12-28.52-27.8-28.52zm-1.45 83.97-24.1 23.24h-24.44l-23.64-24.49c0-14.85 10.57-26.1 23.45-26.1h23.21c13.73 0 25.52 11.07 25.52 27.35z" fill="yellow"/>
                </svg>`,
    github: `<svg viewBox="0 0 640 640"><path d="M266.1 392.7C266.1 413.6 255.2 447.8 229.4 447.8C203.6 447.8 192.7 413.6 192.7 392.7C192.7 371.8 203.6 337.6 229.4 337.6C255.2 337.6 266.1 371.8 266.1 392.7zM560 342.2C560 374.1 556.8 407.9 542.5 437.2C504.6 513.8 400.4 512 325.8 512C250 512 139.6 514.7 100.2 437.2C85.6 408.2 80 374.1 80 342.2C80 300.3 93.9 260.7 121.5 228.6C116.3 212.8 113.8 196.2 113.8 179.8C113.8 158.3 118.7 147.5 128.4 128C173.7 128 202.7 137 237.2 164C266.2 157.1 296 154 325.9 154C352.9 154 380.1 156.9 406.3 163.2C440.3 136.5 469.3 128 514.1 128C523.9 147.5 528.7 158.3 528.7 179.8C528.7 196.2 526.1 212.5 521 228C548.5 260.4 560 300.3 560 342.2zM495.7 392.7C495.7 348.8 469 310.1 422.2 310.1C403.3 310.1 385.2 313.5 366.2 316.1C351.3 318.4 336.4 319.3 321.1 319.3C305.9 319.3 291 318.4 276 316.1C257.3 313.5 239 310.1 220 310.1C173.2 310.1 146.5 348.8 146.5 392.7C146.5 480.5 226.9 494 296.9 494L345.1 494C415.4 494 495.7 480.6 495.7 392.7zM413.1 337.6C387.3 337.6 376.4 371.8 376.4 392.7C376.4 413.6 387.3 447.8 413.1 447.8C438.9 447.8 449.8 413.6 449.8 392.7C449.8 371.8 438.9 337.6 413.1 337.6z"/></svg>`,
    mastodon: `<svg viewBox="0 0 640 640"><path d="M529 243.1C529 145.9 465.3 117.4 465.3 117.4C402.8 88.7 236.7 89 174.8 117.4C174.8 117.4 111.1 145.9 111.1 243.1C111.1 358.8 104.5 502.5 216.7 532.2C257.2 542.9 292 545.2 320 543.6C370.8 540.8 399.3 525.5 399.3 525.5L397.6 488.6C397.6 488.6 361.3 500 320.5 498.7C280.1 497.3 237.5 494.3 230.9 444.7C230.3 440.1 230 435.4 230 430.8C315.6 451.7 388.7 439.9 408.7 437.5C464.8 430.8 513.7 396.2 519.9 364.6C529.7 314.8 528.9 243.1 528.9 243.1zM453.9 368.3L407.3 368.3L407.3 254.1C407.3 204.4 343.3 202.5 343.3 261L343.3 323.5L297 323.5L297 261C297 202.5 233 204.4 233 254.1L233 368.3L186.3 368.3C186.3 246.2 181.1 220.4 204.7 193.3C230.6 164.4 284.5 162.5 308.5 199.4L320.1 218.9L331.7 199.4C355.8 162.3 409.8 164.6 435.5 193.3C459.2 220.6 453.9 246.3 453.9 368.3L453.9 368.3z"/></svg>`,
    gpl: `<svg viewBox="0 -960 960 960"><path d="M395-475q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm410-350q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm96.5-143.5Q354-647 354-680t-23.5-56.5Q307-760 274-760t-56.5 23.5Q194-713 194-680t23.5 56.5Q241-600 274-600t56.5-23.5ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>`,
    collapse: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"/></svg>`,
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg> `,
    warn: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    auth: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-key-icon lucide-user-key"><path d="M20 11v6"/><path d="M20 13h2"/><path d="M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578"/><circle cx="10" cy="7" r="4"/><circle cx="20" cy="19" r="2"/></svg>`,
    appLogs: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text-icon lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>`,
    key: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M400 416C497.2 416 576 337.2 576 240C576 142.8 497.2 64 400 64C302.8 64 224 142.8 224 240C224 258.7 226.9 276.8 232.3 293.7L71 455C66.5 459.5 64 465.6 64 472L64 552C64 565.3 74.7 576 88 576L168 576C181.3 576 192 565.3 192 552L192 512L232 512C245.3 512 256 501.3 256 488L256 448L296 448C302.4 448 308.5 445.5 313 441L346.3 407.7C363.2 413.1 381.3 416 400 416zM440 160C462.1 160 480 177.9 480 200C480 222.1 462.1 240 440 240C417.9 240 400 222.1 400 200C400 177.9 417.9 160 440 160z"/></svg>`,
    waypoints: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waypoints-icon lucide-waypoints"><path d="m10.586 5.414-5.172 5.172"/><path d="m18.586 13.414-5.172 5.172"/><path d="M6 12h12"/><circle cx="12" cy="20" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="12" r="2"/></svg>`,
    audioLines: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`,
    videoRedirectShow: `><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clapperboard-icon lucide-clapperboard"><path d="m12.296 3.464 3.02 3.956"/><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m6.18 5.276 3.1 3.899"/></svg>`,
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
    done: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>`,
    return: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-left-icon lucide-arrow-big-left"><path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/></svg>`,
    // SponsorBlock icon placeholder — replace with actual SVG
    sponsorblock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 242">
        <!-- SVG created with Arrow, by QuiverAI (https://quiver.ai) -->
        <path d="m128 5.27h-0.06c-34.22 0-67.67 8.64-97.55 25.4-10.23 5.64-14.5 16.03-14.5 23.55 0 61.86 32.55 125.2 98.55 170.2 4.08 2.82 8.36 3.07 12.95 3.07h0.52c4.59 0 8.87-1.15 12.95-3.97 66-44.32 98.54-106.2 98.54-169.3 0-7.52-4.26-17.91-14.49-23.55-29.88-16.76-62.74-25.4-96.97-25.4h0.06z" fill="#f00"/>
        <path d="m128 221.7c-5 0-9.07-1.4-12.81-4-58.1-39.04-92.13-95.85-92.13-164.9 0-7.09 3.73-13.86 10.13-17.59 28.14-16.14 60.27-25.77 94.81-25.77s66.67 9.63 94.81 25.77c6.4 3.73 10.13 10.5 10.13 17.59 0 68.42-34.03 126.4-92.14 164.9-3.97 2.76-7.82 4-12.8 4z" fill="#212429"/>
        <path d="m128 18.64c-33.81 0-63.69 8.37-89.56 24.52-3.94 2.45-5.12 5.78-5.12 10.25 0 61.6 31.81 118 89.8 155.9 3.05 2.1 7 1.92 10.4-0.37 57.6-37.33 89.16-92.19 89.16-155.5 0-4.47-2.04-7.42-5.13-9.48-26.72-15.66-54.62-25.29-89.55-25.29z" fill="#f00"/>
        <path d="m104.1 62.55v86.88l74.85-42.76-74.85-44.12z" fill="#fff"/>
        </svg>`,
    // Tier badge icons — replace with actual SVG
    tierFree: ``,
    tierSubscribers: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M617.5-587.5Q600-605 600-630t17.5-42.5Q635-690 660-690t42.5 17.5Q720-655 720-630t-17.5 42.5Q685-570 660-570t-42.5-17.5Zm-360 0Q240-605 240-630t17.5-42.5Q275-690 300-690t42.5 17.5Q360-655 360-630t-17.5 42.5Q325-570 300-570t-42.5-17.5Zm180 110Q420-495 420-520t17.5-42.5Q455-580 480-580t42.5 17.5Q540-545 540-520t-17.5 42.5Q505-460 480-460t-42.5-17.5Zm0-220Q420-715 420-740t17.5-42.5Q455-800 480-800t42.5 17.5Q540-765 540-740t-17.5 42.5Q505-680 480-680t-42.5-17.5Zm2 534.5q-20.5-3-39.5-8v-143q0-35 23.5-60.5T480-400q33 0 56.5 25.5T560-314v143q-19 5-39.5 8t-40.5 3q-20 0-40.5-3ZM340-192q-20-8-38.5-18T266-232q-28-20-44.5-52T205-352q0-26-5.5-48.5T180-443q-10-13-37.5-39.5T92-532q-11-11-11-28t11-28q11-11 28-11t28 11l153 145q20 18 29.5 42.5T340-350v158Zm280 0v-158q0-26 10-51t29-42l153-145q12-11 28.5-11t27.5 11q11 11 11 28t-11 28q-23 23-50.5 49T780-443q-14 20-19.5 42.5T755-352q0 36-16.5 68.5T693-231q-16 11-34.5 21T620-192Z"/></svg>`,
    tierPremium: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown-icon lucide-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>`
  };

  // src/locales/en.json
  var en_default = {
    "app.title": "CrabVoice",
    "app.subtitle": "Real-time Native Video Translation",
    "app.version": "CrabVoice v0.6.0 Public Beta",
    "app.crafted_by": "Crafted with \u{1F980} by",
    "url.placeholder": "Paste video URL (YouTube, VK, Vimeo)...",
    "url.open": "Open Video",
    "url.redirecting": "Redirecting... Translation will start automatically.",
    "settings.title": "Settings",
    "settings.translate_to": "Translate to:",
    "settings.volume_ducking": "Video Volume Ducking:",
    "settings.lively_voices": "Use Lively Voices",
    "settings.login_yandex": "Login Yandex",
    "settings.use_proxy": "Use Custom Proxy (HTTP/SOCKS5)",
    "settings.proxy_url": "Proxy URL:",
    "settings.proxy_ping": "Ping",
    "settings.proxy_pinging": "Pinging...",
    "settings.proxy_success": "Success: {ms} ms",
    "settings.proxy_failed": "Failed: {error}",
    "settings.proxy_restart_title": "App Restart Required:",
    "settings.proxy_restart_desc": "Changes to the Proxy URL only take effect after a restart.",
    "settings.proxy_auth_title": "Authentication:",
    "settings.proxy_auth_desc": "Supports standard socks5://user:pass@host:port format.",
    "settings.ui_language": "Interface Language:",
    "settings.theme": "Theme:",
    "auth.authorized": "\u2705 Authorized",
    "auth.not_authorized": "\u274C Not authorized",
    "auth.redirecting": "Redirecting to Yandex...",
    "auth.requesting_code": "Requesting code...",
    "auth.waiting_for_auth": "Waiting for authorization...",
    "auth.code_expired": "\u274C Code expired \u2014 try again",
    "auth.code_request_failed": "\u274C Failed to get code",
    "auth.enter_code": "Enter this code on the page:",
    "auth.open_yandex_device": "Open yandex.ru/device",
    "logs.title": "App Logs",
    "logs.view": "View Logs",
    "logs.export": "Export / Copy Logs",
    "logs.empty": "Logs are empty.",
    "logs.copied": "\u{1F4CB} Logs copied to clipboard!",
    "logs.saved": "\u2705 Logs saved to:\n{path}",
    "logs.copy_failed": "\u274C Failed to copy logs.",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "panel.searching": "Searching video...",
    "panel.translation_vol": "Translation Vol:",
    "panel.original_vol": "Original Vol:",
    "panel.pause": "\u23F8 Pause",
    "panel.play": "\u25B6\uFE0F Play",
    "panel.refresh": "Refresh",
    "panel.back": "Back to App",
    "panel.sb_on": "SponsorBlock: ON",
    "panel.sb_off": "SponsorBlock: OFF",
    "panel.sb_na": "SponsorBlock: N/A",
    "status.searching_new": "Searching new video...",
    "status.extracting": "VOT.js extracting... \u{1F50D}",
    "status.requesting": "Requesting Yandex... \u23F3",
    "status.linked": "Linked & Translated \u2705",
    "status.processing": "Processing... (~{seconds}s) \u23F3",
    "status.timeout": "Timeout \u274C",
    "status.parse_error": "VOT.js Parse Error \u274C",
    "status.skipped": "Skipped {category} \u23E9",
    "status.login_success": "Login successful!",
    "status.returning": "Returning to CrabVoice...",
    "error.network": "Connection failed \u2014 check your network",
    "error.api": "Translation service error",
    "error.parse": "Unexpected response from server",
    "error.config": "Configuration error",
    "error.io": "File operation failed",
    "error.unknown": "Something went wrong",
    "error.settings_save": "Failed to save settings",
    "error.settings_load": "Failed to load settings"
  };

  // src/locales/ru.json
  var ru_default = {
    "app.title": "CrabVoice",
    "app.subtitle": "\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432\u0438\u0434\u0435\u043E",
    "app.version": "CrabVoice v0.6.0 \u041F\u0443\u0431\u043B\u0438\u0447\u043D\u0430\u044F \u0431\u0435\u0442\u0430",
    "app.crafted_by": "\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u0441 \u{1F980} \u043E\u0442",
    "url.placeholder": "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0432\u0438\u0434\u0435\u043E (YouTube, VK, Vimeo)...",
    "url.open": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432\u0438\u0434\u0435\u043E",
    "url.redirecting": "\u041F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435... \u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u043D\u0430\u0447\u043D\u0451\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.",
    "settings.title": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    "settings.translate_to": "\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442\u044C \u043D\u0430:",
    "settings.volume_ducking": "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430:",
    "settings.lively_voices": "\u0416\u0438\u0432\u044B\u0435 \u0433\u043E\u043B\u043E\u0441\u0430",
    "settings.login_yandex": "\u0412\u043E\u0439\u0442\u0438 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441",
    "settings.use_proxy": "\u0421\u0432\u043E\u0439 \u043F\u0440\u043E\u043A\u0441\u0438 (HTTP/SOCKS5)",
    "settings.proxy_url": "URL \u043F\u0440\u043E\u043A\u0441\u0438:",
    "settings.proxy_ping": "\u041F\u0438\u043D\u0433",
    "settings.proxy_pinging": "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430...",
    "settings.proxy_success": "\u0423\u0441\u043F\u0435\u0448\u043D\u043E: {ms} \u043C\u0441",
    "settings.proxy_failed": "\u041E\u0448\u0438\u0431\u043A\u0430: {error}",
    "settings.proxy_restart_title": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A:",
    "settings.proxy_restart_desc": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F URL \u043F\u0440\u043E\u043A\u0441\u0438 \u0432\u0441\u0442\u0443\u043F\u044F\u0442 \u0432 \u0441\u0438\u043B\u0443 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430.",
    "settings.proxy_auth_title": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F:",
    "settings.proxy_auth_desc": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0444\u043E\u0440\u043C\u0430\u0442 socks5://user:pass@host:port.",
    "settings.ui_language": "\u042F\u0437\u044B\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430:",
    "settings.theme": "\u0422\u0435\u043C\u0430:",
    "auth.authorized": "\u2705 \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D",
    "auth.not_authorized": "\u274C \u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D",
    "auth.redirecting": "\u041F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u042F\u043D\u0434\u0435\u043A\u0441...",
    "auth.requesting_code": "\u0417\u0430\u043F\u0440\u043E\u0441 \u043A\u043E\u0434\u0430...",
    "auth.waiting_for_auth": "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438...",
    "auth.code_expired": "\u274C \u041A\u043E\u0434 \u0438\u0441\u0442\u0451\u043A \u2014 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430",
    "auth.code_request_failed": "\u274C \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434",
    "auth.enter_code": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043A\u043E\u0434 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:",
    "auth.open_yandex_device": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C yandex.ru/device",
    "logs.title": "\u041B\u043E\u0433\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
    "logs.view": "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043B\u043E\u0433\u043E\u0432",
    "logs.export": "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 / \u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    "logs.empty": "\u041B\u043E\u0433\u0438 \u043F\u0443\u0441\u0442\u044B.",
    "logs.copied": "\u{1F4CB} \u041B\u043E\u0433\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430!",
    "logs.saved": "\u2705 \u041B\u043E\u0433\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B:\n{path}",
    "logs.copy_failed": "\u274C \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043B\u043E\u0433\u0438.",
    "theme.dark": "\u0422\u0451\u043C\u043D\u0430\u044F",
    "theme.light": "\u0421\u0432\u0435\u0442\u043B\u0430\u044F",
    "panel.searching": "\u041F\u043E\u0438\u0441\u043A \u0432\u0438\u0434\u0435\u043E...",
    "panel.translation_vol": "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430:",
    "panel.original_vol": "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430:",
    "panel.pause": "\u23F8 \u041F\u0430\u0443\u0437\u0430",
    "panel.play": "\u25B6\uFE0F \u0412\u043E\u0441\u043F\u0440.",
    "panel.refresh": "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
    "panel.back": "\u041D\u0430\u0437\u0430\u0434 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    "panel.sb_on": "SponsorBlock: \u0412\u041A\u041B",
    "panel.sb_off": "SponsorBlock: \u0412\u042B\u041A\u041B",
    "panel.sb_na": "SponsorBlock: \u041D/\u0414",
    "status.searching_new": "\u041F\u043E\u0438\u0441\u043A \u043D\u043E\u0432\u043E\u0433\u043E \u0432\u0438\u0434\u0435\u043E...",
    "status.extracting": "VOT.js \u0438\u0437\u0432\u043B\u0435\u043A\u0430\u0435\u0442... \u{1F50D}",
    "status.requesting": "\u0417\u0430\u043F\u0440\u043E\u0441 \u043A \u042F\u043D\u0434\u0435\u043A\u0441\u0443... \u23F3",
    "status.linked": "\u0421\u0432\u044F\u0437\u0430\u043D\u043E \u0438 \u043F\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043D\u043E \u2705",
    "status.processing": "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430... (~{seconds}\u0441) \u23F3",
    "status.timeout": "\u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u274C",
    "status.parse_error": "\u041E\u0448\u0438\u0431\u043A\u0430 VOT.js \u274C",
    "status.skipped": "\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E: {category} \u23E9",
    "status.login_success": "\u0412\u0445\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D!",
    "status.returning": "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u0432 CrabVoice...",
    "error.network": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0435\u0442\u044C",
    "error.api": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430",
    "error.parse": "\u041D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
    "error.config": "\u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
    "error.io": "\u041E\u0448\u0438\u0431\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432\u043E\u0439 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438",
    "error.unknown": "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A",
    "error.settings_save": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    "error.settings_load": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438"
  };

  // src/i18n.ts
  var locales = { en: en_default, ru: ru_default };
  var currentLocale = "en";
  function t(key, params) {
    let text = locales[currentLocale]?.[key] ?? locales["en"]?.[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }
  function setLocale(locale, applyDOM = true) {
    currentLocale = locale;
    if (applyDOM) applyToDOM();
  }
  function applyToDOM(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = t(key);
    });
    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      el.title = t(key);
    });
  }

  // src/injectorPanel.ts
  var CrabPanel = class {
    constructor(callbacks, options) {
      this.callbacks = callbacks;
      this.tier = options?.tier ?? "free";
      this.sponsorBlockEnabled = options?.sponsorBlockEnabled ?? true;
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
    tier;
    sponsorBlockEnabled;
    // UI Элементы
    wrapper;
    fab;
    statusEl;
    valAudio;
    valVideo;
    btnTogglePlay;
    sliderAudio;
    sliderVideo;
    btnSponsorBlock;
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
    getTierStyles() {
      const palettes = {
        free: { accent: "#24c8db", glow: "transparent", headerBg: "#2a2a2a", fabBorder: "#444" },
        subscribers: { accent: "#6366f1", glow: "rgba(99, 102, 241, 0.25)", headerBg: "#1e1e3a", fabBorder: "#6366f1" },
        premium: { accent: "#FFD700", glow: "rgba(255, 215, 0, 0.2)", headerBg: "#2a2518", fabBorder: "#FFD700" }
      };
      const p = palettes[this.tier];
      return `
            --cv-accent: ${p.accent};
            --cv-glow: ${p.glow};
            --cv-header-bg: ${p.headerBg};
            --cv-fab-border: ${p.fabBorder};
        `;
    }
    render() {
      let headerTitle = "\u{1F980} CrabVoice";
      if (this.tier === "subscribers") {
        headerTitle = `\u{1F980} CrabVoice <span class="cv-tier-icon">${Icons.tierSubscribers}</span>`;
      } else if (this.tier === "premium") {
        headerTitle = `\u{1F980} CrabVoice <span class="cv-pro-label"><span class="cv-pro-crown">${Icons.tierPremium}</span>PRO</span>`;
      }
      const template = `
            <style>
                :host {
                    ${this.getTierStyles()}
                }

                .cv-wrapper {
                    position: fixed !important; bottom: 20px !important; right: 20px !important;
                    z-index: 2147483647 !important; font-family: sans-serif !important;
                    pointer-events: auto !important; color: #fff !important;
                }

                .cv-panel {
                    background: rgba(0,0,0,0.85) !important; border-radius: 10px !important;
                    min-width: 220px !important;
                    display: flex !important; flex-direction: column !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 20px var(--cv-glow) !important;
                    border: 1px solid rgba(255,255,255,0.05) !important;
                    transition: box-shadow 0.3s !important;
                }

                .cv-wrapper.collapsed .cv-panel { display: none !important; }

                .cv-header {
                    font-size: 14px !important; font-weight: bold; background: var(--cv-header-bg) !important;
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
                .cv-slider { width: 100% !important; accent-color: var(--cv-accent) !important; cursor: pointer; }
                .cv-btn-group { display: flex !important; gap: 8px !important; margin-bottom: 10px !important; }
                .cv-btn {
                    display: flex; justify-content: center; gap: 2px;
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 12px !important;
                    cursor: pointer !important; flex: 1 !important; transition: 0.2s;
                }
                .cv-btn:hover { background: #444 !important; }
                .cv-btn-close {
                    display: flex; align-items: center; justify-content: center;
                    background: #ff5e5e !important; color: #fff !important; border: none !important;
                    padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                    cursor: pointer !important; width: 100% !important; font-size: 13px !important;
                }

                .cv-fab {
                    display: none !important; width: 48px !important; height: 48px !important;
                    background: rgba(0,0,0,0.85) !important; border-radius: 24px !important;
                    align-items: center !important; justify-content: center !important;
                    font-size: 24px !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 12px var(--cv-glow) !important;
                    cursor: pointer !important; user-select: none !important;
                    border: 2px solid var(--cv-fab-border) !important;
                    transition: border-color 0.2s, box-shadow 0.2s !important;
                }
                .cv-fab:hover { border-color: var(--cv-accent) !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 18px var(--cv-glow) !important; }

                .cv-wrapper.collapsed .cv-fab { display: flex !important; }

                /* Tier icon in header (subscribers) */
                .cv-tier-icon {
                    display: inline-flex; align-items: center; margin-left: 4px;
                }
                .cv-tier-icon svg { width: 16px; height: 16px; fill: #818cf8; filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.5)); }

                /* PRO label with crown (premium) */
                .cv-pro-label {
                    position: relative; display: inline-flex; align-items: baseline;
                    color: #FFD700; font-size: 10px; font-weight: bold; letter-spacing: 1px;
                    margin-left: 6px; text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
                }
                .cv-pro-crown {
                    position: absolute; top: -9px; left: -4px;
                    transform: rotate(-18deg);
                }
                .cv-pro-crown svg { width: 14px; height: 14px; stroke: #FFD700; filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6)); }

                .cv-sb-btn {
                    display: flex; align-items: center; justify-content: center; gap: 4px;
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 11px !important;
                    cursor: pointer !important; width: 100% !important; transition: 0.2s; margin-bottom: 10px !important;
                    box-sizing: border-box !important;
                }
                .cv-sb-btn:hover { background: #444 !important; }
                .cv-sb-btn.active { border-color: #4CAF50 !important; background: #1b3a1b !important; }
                .cv-sb-btn.disabled {
                    opacity: 0.4 !important; cursor: not-allowed !important; pointer-events: none !important;
                }
            </style>

            <div class="cv-wrapper" id="cv-wrapper">
                <div class="cv-fab" id="cv-fab" title="Expand CrabVoice">\u{1F980}</div>
                
                <div class="cv-panel" id="cv-panel">
                    <div class="cv-header" id="cv-header" title="Drag to move">
                        <div style="display:flex;align-items:center;gap:2px;">${headerTitle}</div>
                        <button class="cv-btn-collapse" id="cv-btn-collapse" title="Minimize">${Icons.collapse}</button>
                    </div>
                    <div class="cv-content">
                        <div style="font-size:12px; margin-bottom: 12px; text-align:center;">
                            <span id="cv-status" style="color:#FFC131">${t("panel.searching")}</span>
                        </div>

                        <div class="cv-row">
                            <label>${t("panel.translation_vol")} <span id="cv-val-audio">100%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-audio" min="0" max="100" value="100">
                        </div>

                        <div class="cv-row">
                            <label>${t("panel.original_vol")} <span id="cv-val-video">15%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-video" min="0" max="100" value="15">
                        </div>

                        <button class="cv-sb-btn ${this.tier === "free" ? "disabled" : ""} ${this.sponsorBlockEnabled && this.tier !== "free" ? "active" : ""}" id="cv-sb-toggle">
                            ${Icons.sponsorblock || "\u23ED"} ${this.tier === "free" ? t("panel.sb_na") : this.sponsorBlockEnabled ? t("panel.sb_on") : t("panel.sb_off")}
                        </button>
                        ${this.tier !== "free" ? '<div style="font-size:9px;color:#666;text-align:center;margin-top:-8px;margin-bottom:8px;">(Using <a href="https://sponsor.ajay.app/" target="_blank" style="color:#888;">sponsor.ajay.app</a>)</div>' : ""}

                        <div class="cv-btn-group">
                            <button class="cv-btn" id="cv-toggle-play">${t("panel.pause")}</button>
                            <button class="cv-btn" id="cv-refresh">${Icons.refresh} ${t("panel.refresh")}</button>
                        </div>

                        <button class="cv-btn-close" id="cv-close-full">${Icons.return} ${t("panel.back")}</button>
                    </div>
                </div>
            </div>
        `;
      this.safeSetHTML(this.shadow, template);
      this.wrapper = this.shadow.getElementById("cv-wrapper");
      this.fab = this.shadow.getElementById("cv-fab");
      this.statusEl = this.shadow.getElementById("cv-status");
      this.valAudio = this.shadow.getElementById("cv-val-audio");
      this.valVideo = this.shadow.getElementById("cv-val-video");
      this.btnTogglePlay = this.shadow.getElementById("cv-toggle-play");
      this.sliderAudio = this.shadow.getElementById("cv-vol-audio");
      this.sliderVideo = this.shadow.getElementById("cv-vol-video");
      this.btnSponsorBlock = this.shadow.getElementById("cv-sb-toggle");
    }
    toggleCollapse(collapsed) {
      this.isCollapsed = collapsed;
      if (collapsed) {
        this.wrapper.classList.add("collapsed");
      } else {
        this.wrapper.classList.remove("collapsed");
        requestAnimationFrame(() => {
          const rect = this.wrapper.getBoundingClientRect();
          const panelWidth = this.wrapper.offsetWidth;
          const panelHeight = this.wrapper.offsetHeight;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          let newLeft = rect.left;
          let newTop = rect.top;
          if (newLeft + panelWidth > screenWidth) {
            newLeft = screenWidth - panelWidth - 20;
          }
          if (newLeft < 0) {
            newLeft = 20;
          }
          if (newTop + panelHeight > screenHeight) {
            newTop = screenHeight - panelHeight - 20;
          }
          if (newTop < 0) {
            newTop = 20;
          }
          this.wrapper.style.setProperty("left", `${newLeft}px`, "important");
          this.wrapper.style.setProperty("top", `${newTop}px`, "important");
        });
      }
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
      if (this.btnSponsorBlock && this.tier !== "free") {
        this.btnSponsorBlock.onclick = () => {
          this.sponsorBlockEnabled = !this.sponsorBlockEnabled;
          this.updateSponsorBlockButton();
          this.callbacks.onSponsorBlockToggle(this.sponsorBlockEnabled);
        };
      }
    }
    setupDraggable() {
      const header = this.shadow.getElementById("cv-header");
      let isDragging = false;
      let startX = 0, startY = 0;
      let initialLeft = 0, initialTop = 0;
      const getCoords = (e) => {
        if ("touches" in e) {
          return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
      };
      const onStart = (e) => {
        const target = e.target;
        if (target !== header && !header.contains(target) && target !== this.fab) return;
        if (e.type === "touchstart") {
        }
        isDragging = true;
        const coords = getCoords(e);
        startX = coords.x;
        startY = coords.y;
        const rect = this.wrapper.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        this.wrapper.style.setProperty("bottom", "auto", "important");
        this.wrapper.style.setProperty("right", "auto", "important");
        this.wrapper.style.setProperty("left", `${initialLeft}px`, "important");
        this.wrapper.style.setProperty("top", `${initialTop}px`, "important");
        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("mouseup", onEnd);
        document.addEventListener("touchend", onEnd);
      };
      const onMove = (e) => {
        if (!isDragging) return;
        if (e.type === "touchmove") e.preventDefault();
        const coords = getCoords(e);
        let newLeft = initialLeft + (coords.x - startX);
        let newTop = initialTop + (coords.y - startY);
        const maxLeft = window.innerWidth - this.wrapper.offsetWidth;
        const maxTop = window.innerHeight - this.wrapper.offsetHeight;
        this.wrapper.style.setProperty("left", `${Math.max(0, Math.min(newLeft, maxLeft))}px`, "important");
        this.wrapper.style.setProperty("top", `${Math.max(0, Math.min(newTop, maxTop))}px`, "important");
      };
      const onEnd = () => {
        isDragging = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchend", onEnd);
      };
      header.addEventListener("mousedown", onStart);
      header.addEventListener("touchstart", onStart, { passive: false });
      this.fab.addEventListener("mousedown", onStart);
      this.fab.addEventListener("touchstart", onStart, { passive: false });
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
      this.btnTogglePlay.innerText = paused ? t("panel.play") : t("panel.pause");
    }
    updateSponsorBlockButton() {
      if (!this.btnSponsorBlock || this.tier === "free") return;
      const icon = Icons.sponsorblock || "\u23ED";
      if (this.sponsorBlockEnabled) {
        this.btnSponsorBlock.classList.add("active");
        this.safeSetHTML(this.btnSponsorBlock, `${icon} ${t("panel.sb_on")}`);
      } else {
        this.btnSponsorBlock.classList.remove("active");
        this.safeSetHTML(this.btnSponsorBlock, `${icon} ${t("panel.sb_off")}`);
      }
    }
    setSponsorBlockState(enabled) {
      this.sponsorBlockEnabled = enabled;
      this.updateSponsorBlockButton();
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
  if (!window._cvInitialized) {
    let updateStatus = function(text, color) {
      if (panelInstance) {
        panelInstance.updateStatus(text, color || "#fff");
      }
    }, syncAudio = function() {
      if (!mainVideo || !audioObj) return;
      if (sponsorBlockEnabled && sponsorSegments.length > 0 && !mainVideo.paused) {
        const ct = mainVideo.currentTime;
        for (let seg of sponsorSegments) {
          if (ct >= seg.start && ct < seg.end) {
            mainVideo.currentTime = seg.end;
            appLog(`SponsorBlock: Skipped ${seg.category} (${seg.start.toFixed(1)}s -> ${seg.end.toFixed(1)}s)`);
            updateStatus(t("status.skipped", { category: seg.category }), "#FFD700");
            setTimeout(() => updateStatus(t("status.linked"), "#4CAF50"), 3e3);
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
    const skipDomains = ["oauth.yandex.", "passport.yandex.", "accounts.google.", "login.yandex.", "sso.yandex."];
    const hostname = window.location.hostname;
    const shouldSkipInjection = isHome || skipDomains.some((d) => hostname.includes(d));
    if (!isHome) {
      appLog(`CrabVoice Injector attached to ${window.location.hostname}${shouldSkipInjection ? " (skip mode)" : ""}`);
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
    let appTier = "free";
    let sponsorBlockEnabled = true;
    let sponsorSegments = [];
    async function requestTranslation(v, forceRefresh = false) {
      if (isTranslating && !forceRefresh) return;
      appLog(`Current URL: ${window.location.href}`);
      appLog(`Hostname: ${window.location.hostname}`);
      isTranslating = true;
      currentVideoUrl = window.location.href;
      let attempts = 0;
      if (!appSettings && window.__TAURI__) {
        try {
          appSettings = await window.__TAURI__.core.invoke("get_settings");
          userVideoVolume = appSettings.volume_ducking;
          sponsorBlockEnabled = appSettings.sponsorblock_enabled ?? true;
          if (appSettings.ui_language) {
            setLocale(appSettings.ui_language, false);
          }
          if (panelInstance) {
            panelInstance.setVideoVolumeSlider(userVideoVolume);
            panelInstance.setSponsorBlockState(sponsorBlockEnabled);
          }
        } catch (e) {
          console.error("CrabVoice: Failed to fetch settings", e);
        }
      }
      try {
        const services = getService();
        appLog(`Services found: ${JSON.stringify(services)}`);
        if (!services.length) {
          console.error("\u0421\u0435\u0440\u0432\u0438\u0441 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D \u0434\u043B\u044F \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B");
          throw new Error("Unknown service");
        }
        const service = services[0];
        appLog("Extracting video data via VOT.js");
        updateStatus(t("status.extracting"), "#24c8db");
        const videoData = await getVideoData(service);
        const duration = videoData?.duration || v.duration || 344;
        if (appTier !== "free" && sponsorBlockEnabled && window.location.hostname.includes("youtube.com")) {
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
          updateStatus(t("status.requesting"), "#FFC131");
          try {
            const invoke = window.__TAURI__ ? window.__TAURI__.core.invoke : null;
            if (!invoke) return;
            appLog("Sent translation request to Rust backend");
            const res = await invoke("translate", { url: window.location.href, duration });
            if (res.status === 1 && res.url) {
              appLog("Translation successful! Playing native audio...");
              updateStatus(t("status.linked"), "#4CAF50");
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
                updateStatus(t("status.timeout"), "#ff5e5e");
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
                  updateStatus(t("status.processing", { seconds: timeLeft }), "#FFC131");
                } else {
                  clearInterval(countdownInterval);
                  pollTranslation();
                }
              }, 1e3);
            }
          } catch (e) {
            const errStr = e?.toString() ?? "";
            appLog(`Backend error: ${errStr}`);
            let userMsg = t("error.unknown");
            if (errStr.startsWith("Network error")) userMsg = t("error.network");
            else if (errStr.startsWith("API error")) userMsg = t("error.api");
            else if (errStr.startsWith("Parse error")) userMsg = t("error.parse");
            else if (errStr.startsWith("Config error")) userMsg = t("error.config");
            updateStatus(userMsg + " \u26A0\uFE0F", "#ff5e5e");
            isTranslating = false;
          }
        };
        pollTranslation();
      } catch (error) {
        updateStatus(t("status.parse_error"), "#ff5e5e");
        isTranslating = false;
      }
    }
    const walkDOMForVideo = (root) => {
      const videos = root.querySelectorAll("video");
      if (videos.length > 0) {
        appLog(`Found ${videos.length} video elements in current context.`);
        for (let i = 0; i < videos.length; i++) {
          const v = videos[i];
          appLog(`Checking video #${i}: duration=${v.duration}, width=${v.offsetWidth}, src=${v.src?.substring(0, 30)}...`);
          if (v.duration > 0 && v.offsetWidth > 100) {
            appLog(`SUCCESS: Found valid video at index ${i}`);
            return v;
          }
        }
      }
      const els = root.querySelectorAll("*");
      for (let el of els) {
        if (el.shadowRoot) {
          const res = walkDOMForVideo(el.shadowRoot);
          if (res) return res;
        }
      }
      return null;
    };
    if (window.__TAURI__) {
      window.__TAURI__.core.invoke("get_app_tier").then((tier) => {
        appTier = tier;
        appLog(`App tier: ${appTier}`);
      }).catch(() => {
      });
    }
    const checkAndInject = () => {
      if (shouldSkipInjection) return;
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
        updateStatus(t("status.searching_new"), "#FFC131");
      }
      let panelHost = document.getElementById("cv-panel-host");
      if (!panelHost && !panelInstance) {
        panelInstance = new CrabPanel({
          onClose: () => {
            history.back();
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
          },
          onSponsorBlockToggle: (enabled) => {
            sponsorBlockEnabled = enabled;
            appLog(`SponsorBlock toggled: ${enabled}`);
            if (window.__TAURI__ && appSettings) {
              appSettings.sponsorblock_enabled = enabled;
              window.__TAURI__.core.invoke("save_settings", { newSettings: appSettings }).catch(() => {
              });
            }
          }
        }, { tier: appTier, sponsorBlockEnabled });
        document.documentElement.appendChild(panelInstance.host);
      }
      if (!mainVideo && !isTranslating) {
        let v = document.querySelector(".html5-video-container video, video.vjs-tech, .fp-player video");
        if (!v || v.duration === 0) v = walkDOMForVideo(document);
        appLog(`Found video element: ${!!v}`);
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
