import { faComment } from "@fortawesome/free-solid-svg-icons";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'snap',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass/style.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/firebase.js' ,{ src: '@/plugins/vee-validate'},
  { src: '~/plugins/moment-filter', ssr: false },
  { src: '~/plugins/infiniteloading', ssr: false }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment'
  ],
  moment: {
    // ここにオプションが記述できる
    locales: ['ja']
},
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    
  ],

  fontawesome: {
    component: "fa",
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons", // Solidアイコン
        icons: ["faHome", "faCaretRight","faUserCircle","faMapMarkerAlt","faTrashAlt","faHeart","faCamera"],
      },
      {
        set: "@fortawesome/free-regular-svg-icons", // Solidアイコン
        icons: [ "faClock","faComment"],
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
