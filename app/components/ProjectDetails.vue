<template>
  <div v-if="selectedProject" class="relative">
    <div class="flex flex-col gap-4 mt-6 md:mt-12">
      <div>
        <UBadge
          v-if="category"
          color="primary"
          size="sm"
          variant="soft"
          class="rounded-full px-3 py-2"
        >
          <UIcon :name="category.icon" class="mr-1 size-3" />
          {{ category.name }}
        </UBadge>
        <h1 class="text-3xl font-bold mt-2">{{ selectedProject.name }}</h1>
      </div>
      <NuxtLink
        class="relative w-full px-12 py-8 group transition-all"
        :to="`${selectedProject.url}`"
        target="_blank"
      >
        <div
          class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] rounded-lg"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg -z-[9]" />
        <div
          v-if="selectedProject.premium"
          class="text-center opacity-100 absolute top-4 left-0 right-0 m-auto"
        >
          <UBadge color="neutral" size="sm" variant="outline" class="ring-0 rounded-full"
            >Premium</UBadge
          >
        </div>
        <ProjectImage
          :image="selectedProject.image"
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
              class="rounded-full px-3 py-2"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <div v-if="selectedProject.stars" class="mt-4">
          <h5 class="text-sm font-semibold mb-2">Project</h5>
        </div>

        <div class="gap-2 flex flex-col w-auto items-start">
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <UIcon v-if="selectedProject.stars" name="i-lucide-star" class="text-yellow-500 mr-1" />
            <span v-if="selectedProject.stars">{{ selectedProject.stars }} GitHub stars</span>
          </div>

          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <UIcon v-if="selectedProject.author" name="i-lucide-user" class="mr-1" />
            <a :href="`https://github.com/${selectedProject.author}`" target="_blank">
              <span v-if="selectedProject.author">{{ selectedProject.author }}</span>
            </a>
          </div>

          <div>
            <span
              v-if="selectedProject.lastUpdated"
              class="text-gray-500 dark:text-gray-400 text-sm"
            >
              Last updated:
              {{
                new Date(selectedProject.lastUpdated).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
              }}
            </span>
          </div>

          <div class="mt-4">
            <div class="text-sm font-semibold">Share</div>
            <UInput v-model="slugInput" class="mt-2" :ui="{ trailing: 'pr-0.5' }" disabled>
              <template v-if="slugInput?.length" #trailing>
                <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    icon="i-lucide-copy"
                    aria-label="Copy to clipboard"
                    @click="copyToClipboard(slugInput)"
                  />
                </UTooltip>
              </template>
            </UInput>
          </div>

          <div class="flex gap-4 mt-6">
            <div v-if="selectedProject.url">
              <NuxtLink
                class="flex gap-2 items-center cursor-pointer group"
                :to="selectedProject.url"
                target="_blank"
              >
                <div
                  class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                  <UIcon :name="selectedProject.stars ? 'i-lucide-github' : 'i-lucide-square-arrow-out-up-right'" class="text-white" />
                </div>
                  {{ selectedProject.stars ? 'GitHub Repo' : 'View project' }}
              </NuxtLink>
            </div>

            <div v-if="selectedProject.demo">
              <NuxtLink
                class="flex gap-2 items-center cursor-pointer group"
                :to="selectedProject.demo"
                target="_blank"
              >
                <div
                  class="bg-secondary group-hover:bg-primary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                  <UIcon name="i-lucide-eye" class="text-white" />
                </div>
                {{ selectedProject.stars ? 'Demo' : 'View project' }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PROJECT_CATEGORIES } from '~~/types/category';
import type { Project } from '~~/types/project';
const toast = useToast();

const config = useRuntimeConfig();

const props = defineProps<{
  selectedProject: Project | null;
}>();

const slugInput = ref(`${config.public.siteUrl}/r/${props.selectedProject?.slug || ''}`);

const category = computed(() => {
  return props.selectedProject?.category
    ? PROJECT_CATEGORIES[props.selectedProject.category]
    : null;
});

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({ title: 'Successfully copied to clipboard', color: 'success' });
  });
}
</script>
