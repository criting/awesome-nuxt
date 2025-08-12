<template>
  <section>
    <UPageSection title="FAQ" description="Have questions? We have answers!">
      <template #body>
        <UPageAccordion :items="items" class="max-w-2xl mx-auto" />
      </template>
    </UPageSection>
  </section>
</template>
<script setup lang="ts">
const items = ref([
  {
    label: 'What is Awesome Nuxt?',
    content:
      'Awesome Nuxt is a curated collection of high-quality, real-world projects built with Nuxt. Unlike the official modules directory, this site focuses on complete apps, templates, and starters that you can learn from, adapt, or launch.'
  },
  {
    label: 'Does this site include Nuxt modules?',
    content:
      'No. Nuxt modules already have an official directory at https://nuxt.com/modules. Our focus is on full projects and templates that showcase how Nuxt is used in production or creative builds.'
  },
  {
    label: 'How are projects selected?',
    content:
      'All projects are hand-picked based on quality, usefulness, and inspiration value. We check for active maintenance, clean code, and relevance to the Nuxt ecosystem.'
  },
  {
    label: 'Can I submit my own project?',
    content:
      'Yes! We welcome community contributions. Check the GitHub repository for guidelines on how to submit your project.'
  },
  {
    label: 'Do you show project stats like GitHub stars?',
    content:
      'Yes. We pull GitHub metadata like stars and last updated dates using a cached update process. This helps you see which projects are popular and actively maintained.'
  },
  {
    label: 'Is this an official Nuxt project?',
    content:
      'No. This is an independent, community-driven initiative created to complement the official Nuxt resources by showcasing inspiring real-world projects.'
  },
  {
    label: 'Will you add tips, snippets, and other resources?',
    content:
      'Yes! In the future, we plan to expand the project — adding curated tips, code snippets, and learning resources alongside projects.'
  }
]);
</script>
