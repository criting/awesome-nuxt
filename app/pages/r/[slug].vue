<template>
  <div class="pt-12">
    <div
      fetchPriority="high"
      class="absolute left-0 top-0 w-full h-full bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover opacity-40 dark:opacity-70 -z-[10]"
    />
    <div v-if="project" class="max-w-3xl mx-auto">
      <ProjectDetails :selected-project="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const project = findProjectBySlug(route.params.slug as string);

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project Not Found'
  });
}

useSeoMeta({
  title: project.name + ' - Awesome Nuxt',
  description: project.description,
  ogTitle: project.name,
  ogDescription: project.description
});
</script>
