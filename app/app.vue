<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <GeneralHeader />
    <NuxtPage />
    <GeneralFooter />
  </UApp>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Awesome Nuxt - Build better with Nuxt',
  description:
    'A curated list of awesome Nuxt projects, respources, and tools to help you build better applications with Nuxt.'
});
</script>
