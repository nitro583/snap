import {
  faComment
} from "@fortawesome/free-solid-svg-icons";
module.exports = {
  // export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SNAP×SNAP',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{
    src: '~/assets/sass/style.scss',
    lang: 'scss'
  }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/firebase.js',
      mode:'server'

    },
    {
      src: '@/plugins/vee-validate',
      mode:'client'
      
      
    },
    {
      src: '~/plugins/moment-filter',
      mode:'client'
      
    },
    {
      src: '~/plugins/infiniteloading',
      mode:'client'
    }

  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment'],
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

  ],
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
