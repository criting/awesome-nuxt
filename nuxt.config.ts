import vue from '@vitejs/plugin-vue';
import { projects } from './data/all'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxthub/core',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-link-checker'
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
    quality: 80,

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

  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || 'https://awesome-nuxt.dev'
    }
  },

  site: {
    url: process.env.SITE_URL || 'https://awesome-nuxt.dev',
    name: 'Awesome Nuxt'
  },

  sitemap: {
    urls: projects.map(p => ({
      loc: `/r/${p.slug}`,
      lastmod: p.lastUpdated ? p.lastUpdated.slice(0, 10) : undefined,
      changefreq: 'weekly',
      priority: 0.7
    }))
  },
})