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
  description: 'Build better with Nuxt.'
});
</script>
