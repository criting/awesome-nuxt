<template>
  <UModal
    v-if="selectedProject"
    v-model:open="open"
    fullscreen
    :ui="{ header: 'hidden' }"
    class="light:bg-white relativ"
    title="Project Details"
    description="Explore the details of the selected Nuxt project."
  >
    <template #body>
      <div
        fetchPriority="high"
        class="absolute left-0 top-0 w-full h-full bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover opacity-40 dark:opacity-70 -z-[10]"
      />
      <div class="max-w-3xl mx-auto px-4 py-8">
        <div class="flex gap-2 items-center cursor-pointer group" @click="open = false">
          <div
            class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
          >
            <UIcon name="i-lucide-arrow-left" class="text-white" />
          </div>
          Go back
        </div>
        <ProjectDetails :selected-project="selectedProject" />
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import type { Project } from '~~/types/project';

const open = defineModel<boolean>('open', { default: false });

defineProps<{
  selectedProject: Project | null;
}>();
</script>
