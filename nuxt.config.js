export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kid-down-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/styles/global.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/apiLayer",
    "~/plugins/external",
    "~/plugins/filters",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  styleResources: {
    scss: ["~/assets/styles/variables.scss"]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/style-resources",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "cookie-universal-nuxt",
    "@nuxtjs/device",
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "vue-toastification/nuxt",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
