<template>
  <div class="pt-6 md:pt-12 px-6 relative">
    <div
      fetchPriority="high"
      class="absolute left-0 top-0 w-full h-full bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover opacity-40 dark:opacity-70 -z-[10]"
    />
    <div v-if="project" class="max-w-3xl mx-auto">
      <NuxtLink class="flex gap-2 items-center cursor-pointer group" to="/">
        <div
          class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
        >
          <UIcon name="i-lucide-arrow-left" class="text-white" />
        </div>
        Go back
      </NuxtLink>
      <ProjectDetails :selected-project="project" />
    </div>

    <section>
      <SimilarProjects :project="project" />
    </section>
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
