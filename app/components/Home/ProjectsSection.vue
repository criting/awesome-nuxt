<template>
  <section id="projects" class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient.jpg)] dark:bg-[url(/gradient-dark.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full lg:w-[97%] xl:w-[95%] lg:rounded-xl"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:to-gray-900"
    />
    <UContainer>
      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Explore Nuxt Projects</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Discover a collection of Nuxt projects, templates, and starters that are ready to use or
          learn from.
        </p>
      </div>
      <div class="grid grid-cols-1">
        <section>
          <div
            v-if="featured.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 lg:gap-12 items-stretch auto-rows-[1fr]"
          >
            <NuxtLink
              v-for="project in featured"
              :key="project.name"
              class="cursor-pointer h-full"
              :to="`/r/${project.slug}`"
            >
              <ProjectCard :project="project" class="h-full" :menu="true" />
            </NuxtLink>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            No projects found matching your filters.
          </div>
        </section>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { Project } from '@@/types/project';
import { projects } from '@@/data/all';

const featured = computed<Project[]>(() => {
  const f = projects.filter((p) => p.featured).slice(0, 3);
  return f.length ? f : projects.slice(0, 3);
});
</script>
