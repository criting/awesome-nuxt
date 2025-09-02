<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <ScrollToTop />
    <GeneralHeader />
    <NuxtPage />
    <GeneralFooter />
  </UApp>
</template>

<script lang="ts" setup>
const cfg = useRuntimeConfig();

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon.svg'
    }
  ]
});
useSeoMeta({
  title: 'Awesome Nuxt - Build better with Nuxt',
  ogTitle: 'Awesome Nuxt - Build better with Nuxt',
  ogImage: cfg.public.siteUrl + '/og-image.png',
  description:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  ogDescription:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  ogUrl: cfg.public.siteUrl,
  twitterTitle: 'Awesome Nuxt - Build better with Nuxt',
  twitterDescription:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  twitterImage: cfg.public.siteUrl + '/og-image.png',
  twitterCard: 'summary_large_image',
  ogType: 'website'
});

useHead({
  meta: [{ property: 'og:logo', content: `${cfg.public.siteUrl}/favicon.svg` }]
});
</script>
