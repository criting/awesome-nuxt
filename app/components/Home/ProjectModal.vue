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
        <div class="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
          <NuxtLink
            class="relative w-full px-12 py-8 group transition-all"
            :to="`${selectedProject.url}`"
            target="_blank"
          >
            <div
              class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] rounded-lg"
            />
            <div
              class="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg -z-[9]"
            />
            <div
              v-if="selectedProject.premium"
              class="text-center opacity-100 absolute top-4 left-0 right-0 m-auto"
            >
              <UBadge color="neutral" size="sm" variant="outline" class="ring-0">Premium</UBadge>
            </div>
            <ProjectImage
              :image="selectedProject.image"
              :name="selectedProject.name"
              :description="selectedProject.description"
              class="z-10"
              size="taller"
            />
          </NuxtLink>

          <div>
            <div class="mt-2">
              <h5 class="text-sm font-semibold mb-2">Tags</h5>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  color="primary"
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
                <NuxtLink
                  class="flex gap-2 items-center cursor-pointer group"
                  :to="selectedProject.url"
                  target="_blank"
                >
                  <div
                    class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                    <UIcon name="i-lucide-square-arrow-out-up-right" class="text-white" />
                  </div>
                  View project
                </NuxtLink>
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

defineProps<{
  selectedProject: Project | null;
}>();
</script>
