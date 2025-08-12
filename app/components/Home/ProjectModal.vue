<template>
  <UModal
    v-if="selectedProject"
    v-model:open="open"
    fullscreen
    :ui="{ header: 'hidden' }"
    class="light:bg-white"
  >
    <template #body>
      <div
        class="w-full h-full absolute inset-0 bg-[url(/gradient.jpg)] bg-cover mix-blend-multiply -z-10 opacity-20"
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
        <div class="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
          <div class="relative w-full px-12 py-8 group transition-all">
            <div
              class="absolute top-0 w-full h-full bg-[url(/gradient.jpg)] bg-cover left-0 -z-[10] opacity-100 rounded-lg"
            />
            <div
              class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
            />
            <ProjectImage
              :image="selectedProject.image"
              :name="selectedProject.name"
              :description="selectedProject.description"
              class="z-10"
            />
          </div>

          <div>
            <div class="mt-2">
              <h5 class="text-sm font-semibold mb-2">Tags</h5>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  color="secondary"
                  size="sm"
                  variant="soft"
                >
                  {{ tag }}
                </UBadge>
              </div>
            </div>

            <div v-if="selectedProject.stars" class="mt-4">
              <h5 class="text-sm font-semibold mb-2">Project</h5>
            </div>

            <div class="gap-2 flex flex-col w-auto items-start">
              <div class="flex items-center text-sm text-gray-600">
                <UIcon
                  v-if="selectedProject.stars"
                  name="i-lucide-star"
                  class="text-yellow-500 mr-1"
                />
                <span v-if="selectedProject.stars">{{ selectedProject.stars }} GitHub stars</span>
              </div>

              <div class="flex items-center text-sm text-gray-600">
                <UIcon v-if="selectedProject.author" name="i-lucide-user" class="mr-1" />
                <a :href="`https://github.com/${selectedProject.author}`" target="_blank">
                  <span v-if="selectedProject.author">{{ selectedProject.author }}</span>
                </a>
              </div>

              <div>
                <span v-if="selectedProject.lastUpdated" class="text-gray-500 text-sm">
                  Last updated: {{ new Date(selectedProject.lastUpdated).toLocaleDateString() }}
                </span>
              </div>

              <div v-if="selectedProject.url" class="mt-4">
                <div class="flex gap-2 items-center cursor-pointer group" @click="openProjectUrl">
                  <div
                    class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                    <UIcon name="i-lucide-square-arrow-out-up-right" class="text-white" />
                  </div>
                  View project
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import type { Project } from '~~/types/project';

const open = defineModel<boolean>('open', { default: false });

const props = defineProps<{
  selectedProject: Project | null;
}>();

function openProjectUrl() {
  if (props.selectedProject?.url) window.open(props.selectedProject.url, '_blank');
}
</script>
