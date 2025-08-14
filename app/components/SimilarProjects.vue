<template>
  <div
    class="mt-12 lg:mt-24 mb-12"
    :class="{
      'max-w-3xl mx-auto': similar.length < 3
    }"
  >
    <h2 class="text-3xl font-bold mb-4 lg:mb-12 md:text-center">You might also like</h2>

    <div
      class="grid gap-6 justify-center"
      :class="{
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': similar.length >= 4 || similar.length === 3,
        'grid-cols-1 sm:grid-cols-2': similar.length < 3,
        'grid-cols-1 sm:grid-cols-1': similar.length < 2
      }"
    >
      <NuxtLink v-for="item in similar" :key="item.slug" :to="`/r/${item.slug}`" class="block">
        <ProjectCard :project="item" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Project } from '~~/types/project';

const props = defineProps({
  project: {
    type: Object as () => Project,
    default: () => ({})
  }
});

const { useSimilarComputed } = useSimilarProjects();
const similar = useSimilarComputed(toRef(props, 'project'), { limit: 4, sameCategoryOnly: true });
</script>
