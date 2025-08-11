export default defineAppConfig({
  appName: 'Nuxt World - Build better with Nuxt',
  baseUrl: 'https://nuxt-world.dev',
  logoUrl: 'https://nuxt-world.dev/logo.png',
  appDescription: 'Build better with Nuxt.',
  ui: {
    icons: {
      loading: 'i-lucide-loader-circle'
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    colors: {
      primary: 'neutral',
    },
  },
  seo: {
    title: 'Nuxt World - Build better with Nuxt',
    description: 'Build better with Nuxt.'
  }
});
