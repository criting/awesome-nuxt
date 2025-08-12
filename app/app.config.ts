export default defineAppConfig({
  appName: 'Awesome Nuxt - Build better with Nuxt',
  baseUrl: 'https://awesome-nuxt.dev',
  logoUrl: 'https://awesome-nuxt.dev/logo.png',
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
        primary: 'green',
        secondary: 'yellow',
    },
  },
  seo: {
    title: 'Nuxt World - Build better with Nuxt',
    description: 'Build better with Nuxt.'
  }
});
