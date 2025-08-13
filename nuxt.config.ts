import vue from '@vitejs/plugin-vue';

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui-pro'],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      {
        name: 'Lato',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700', '800']
      }
    ]
  },

  nitro: {
    experimental: {
      tasks: true
    },
    rollupConfig: {
      plugins: [vue()]
    }
  },
})