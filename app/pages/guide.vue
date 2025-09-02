<script setup lang="ts">
useSeoMeta({
  title: 'Your Nuxt Guide - Build better with Nuxt',
  ogTitle: 'Your Nuxt Guide - Build better with Nuxt',
  description: 'A curated list of resources to help you build better applications with Nuxt.',
  ogDescription: 'A curated list of resources to help you build better applications with Nuxt.'
});
</script>

<template>
  <div>
    <GuideHero />
    <GuideContent />
  </div>
</template>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}
</style>
