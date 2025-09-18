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
    'nuxt-link-checker',
    '@nuxt/icon',
    'v-gsap-nuxt',
  ],

  hub: {
    database: true,
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
    },
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

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Awesome Nuxt' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://awesome-nuxt.dev/",
            "name": "Awesome Nuxt",
            "description": "A curated list of Nuxt projects, tutorials, and resources to help you build better with Nuxt.",
            "publisher": {
              "@type": "Organization",
              "name": "Awesome Nuxt",
              "logo": "https://awesome-nuxt.dev/logo.png"
            }
          })
        }
      ]
    }
  },

  nitro: {
    experimental: {
      tasks: true
    },
    rollupConfig: {
      plugins: [vue()]
    },
    routeRules: {
      '/': { prerender: true }
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