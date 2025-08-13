<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <GeneralHeader />
    <NuxtPage />
    <GeneralFooter />
  </UApp>
</template>

<script lang="ts" setup>
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
  ogImage: '/og-image.png',
  description:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  ogDescription:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  ogUrl: 'https://awesome-nuxt.dev/',
  twitterTitle: 'Awesome Nuxt - Build better with Nuxt',
  twitterDescription:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.',
  twitterImage: '/og-image.png',
  twitterCard: 'summary_large_image'
});
</script>
