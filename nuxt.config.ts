import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s - Queue controller',
    title: 'Horus',
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
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: ['~/plugins/axios.ts'],
  axios: {
    baseURL: process.env.BACKEND_URL,
  },
  css: ['~/assets/variables.scss'],
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          background: "#0D1015",
          primary: "#1E1F24",
          accent: "#FFFFFF",
          secondary: "#961B1B",
          info: "#26A69A",
          warning: "#FFC107",
          error: "#DD2C00",
          success: "#00E676"
        }
      }
    }
  },
  build: {
    postcss: false
  }
}

export default config
