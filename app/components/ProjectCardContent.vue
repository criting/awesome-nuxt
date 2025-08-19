<template>
  <div class="transition-transform duration-200 group cursor-pointer h-full project-card">
    <div class="relative h-full">
      <div
        class="relative w-full group transition-all px-12 h-full flex items-center justify-center py-16 pb-10"
      >
        <div
          class="absolute top-0 w-full h-full bg-[url(/gradient.jpg)] bg-cover left-0 -z-[10] opacity-100 rounded-lg"
        />
        <div
          class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg -z-[9]"
        />
        <div
          v-if="project.premium"
          class="text-center opacity-50 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 left-0 right-0 m-auto"
        >
          <UBadge color="neutral" size="sm" variant="outline" class="ring-0 rounded-full"
            >Premium</UBadge
          >
        </div>
        <div
          v-if="project.featured"
          class="text-center opacity-50 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 left-0 right-0 m-auto"
        >
          <UBadge color="neutral" size="sm" variant="outline" class="ring-0 rounded-full"
            >Featured</UBadge
          >
        </div>
        <ProjectImage
          :image="project.image"
          :name="project.name"
          :description="project.description"
          class="z-10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@@/types/project';

defineProps({
  project: {
    type: Object as () => Project,
    default: () => ({})
  }
});
</script>
