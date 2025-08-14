<template>
  <div v-if="selectedProject" class="relative">
    <div class="flex flex-col gap-4 mt-12">
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
            <span v-if="selectedProject.lastUpdated" class="text-gray-500 text-sm">
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
<script setup lang="ts">
import type { Project } from '~~/types/project';
const toast = useToast();

const config = useRuntimeConfig();

const props = defineProps<{
  selectedProject: Project | null;
}>();

const slugInput = ref(`${config.public.siteUrl}/r/${props.selectedProject?.slug || ''}`);

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({ title: 'Successfully copied to clipboard', color: 'success' });
  });
}
</script>
