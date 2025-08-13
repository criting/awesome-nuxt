import vue from '@vitejs/plugin-vue';

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxthub/core',
    '@nuxt/image',
  ],

  hub: {
    cache: true,
  },

  image: {
    provider: 'cloudflare',
    cloudflare: {
      baseURL: 'https://awesome-nuxt.dev'
    },
    format: ['webp'],
    quality: 50,

    screens: {
      xs: 100,
      sm: 200,
      md: 300,
      lg: 400,
      xl: 500,
      xxl: 600,
    }
  },

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