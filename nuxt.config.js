const webpack = require('webpack')
require('dotenv').config()

// path
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = 'SNAP×SNAP'
const siteDesc = 'SNAP×SNAP」はスナップ写真に文字を添えて投稿できるSNSです。'
const siteKeywords = 'スナップ写真,SNAP,SNS,SNAP SNAP'

// images
const iconImages = baseDir + 'img/icons/'
const ogpImages = basePath + 'img/ogp/'

// pwa
const shortName = 'SNAPSNAP'
const manifestIcon = 'img/icons/icon-1024.png'
const splashscreens = baseDir + 'img/splashscreens/'

module.exports = {
  icon: {
    iconFileName: manifestIcon
  },
  router: {
    base: baseDir,
  },
  // export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SNAP×SNAP',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      //pwa ios
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no'
      },

      // SEO関連
      {
        hid: 'description',
        name: 'description',
        content: siteDesc
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: siteKeywords
      },

      // ogp関連
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteName
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: basePath
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: siteName
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.jpg`
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
        
      },
      { rel: 'apple-touch-icon', sizes: '180x180', href: iconImages + 'apple-touch-icon.png' },
      // pwa splash screens
      // Doc: https://appsco.pe/developer/splash-screens
      {
        href: splashscreens + 'iphone5_splash.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'iphone6_splash.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'iphoneplus_splash.png',
        media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'iphonex_splash.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'iphonexr_splash.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'iphonexsmax_splash.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'ipad_splash.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'ipadpro1_splash.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'ipadpro3_splash.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },
      {
        href: splashscreens + 'ipadpro2_splash.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image'
      },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{
    src: '~/assets/sass/style.scss',
    lang: 'scss'
  }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
      src: '@/plugins/firebase.js',
      mode: 'server'

    },
    {
      src: '@/plugins/vee-validate',
      mode: 'client'


    },
    {
      src: '~/plugins/moment-filter',
      mode: 'client'

    },
    {
      src: '~/plugins/infiniteloading',
      mode: 'client'
    }

  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment',
  '@nuxtjs/gtm',

  // '@nuxtjs/google-analytics' ],
  // publicRuntimeConfig: {
  //   googleAnalytics: {
  //     id: process.env.GOOGLE_ANALYTICS_ID
  //   }
  // },

  moment: {
    // ここにオプションが記述できる
    locales: ['ja']
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios

    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',

  ],

  gtm: {
    id: process.env.GTM_ID,
    pageTracking: true,
     // タグマネージャーのid
  },
  manifest: {
    name: 'SNAP×SNAP',
    lang: 'ja',
    short_name: 'SNAP×SNAP',
    description: '「SNAP×SNAP」はスナップ写真に文字を添えて投稿できるSNSです。',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait'
  },
  webfontloader: {
    google: {
      families: ['Noto+Sans+JP:wght@100;300;400;500;700;900', 'Noto+Serif+JP:wght@200;300;400;500;600;700;900', 'Girassol'],
    },
  },

  fontawesome: {
    component: "fa",
    imports: [{
        set: "@fortawesome/free-solid-svg-icons", // Solidアイコン
        icons: ["faHome", "faCaretRight", "faUserCircle", "faMapMarkerAlt", "faTrashAlt", "faHeart", "faCamera"],
      },
      {
        set: "@fortawesome/free-regular-svg-icons", // Solidアイコン
        icons: ["faClock", "faComment"],
      },
      {
        set: "@fortawesome/free-brands-svg-icons", // Brandアイコン
        icons: ["faTwitter"],
      },
    ],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
  }
}
