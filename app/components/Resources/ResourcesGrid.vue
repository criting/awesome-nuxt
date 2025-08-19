<template>
  <section id="resources" class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient.jpg)] dark:bg-[url(/gradient-dark.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full lg:w-[97%] xl:w-[95%] lg:rounded-xl"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:to-gray-900"
    />
    <UContainer>
      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Tutorials</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Explore our curated list of tutorials to enhance your skills and knowledge.
        </p>
      </div>
      <div>
        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 lg:gap-12 items-stretch mt-18"
        >
          <div v-for="tutorial in tutorials" :key="tutorial.title" class="cursor-pointer">
            <div class="relative h-full">
              <div
                class="absolute -top-4 left-4 bg-white dark:bg-gray-200 rounded-lg p-2 leading-0"
              >
                <UIcon :name="getPlatformIcon(tutorial.platform || '')" class="text-black" />
              </div>
              <NuxtLink
                :to="tutorial.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block h-full"
              >
                <ProjectCard
                  :project="{
                    name: tutorial.title || '',
                    description: '',
                    image: tutorial.image,
                    url: tutorial.url || '',
                    tags: [],
                    featured: tutorial.featured || false,
                    category: 'other'
                  }"
                  :menu="false"
                  class="h-full"
                />
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>

      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Other Resources</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Check out additional resources that can help you in your learning journey.
        </p>
      </div>
      <div>
        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 lg:gap-12 items-stretch mt-18"
        >
          <div v-for="resource in otherResources" :key="resource.title" class="cursor-pointer">
            <div class="relative h-full">
              <div
                class="absolute -top-4 left-4 bg-white dark:bg-gray-200 rounded-lg p-2 leading-0"
              >
                <UIcon :name="getPlatformIcon(resource.platform || '')" />
              </div>
              <NuxtLink
                :to="resource.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block h-full"
              >
                <ProjectCard
                  :project="{
                    name: resource.title || '',
                    description: '',
                    image: resource.image,
                    url: resource.url || '',
                    tags: [],
                    category: 'other'
                  }"
                  class="h-full"
                />
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import { RESOURCE_PLATFORMS } from '@@/types/resource';
import { resources } from '@@/data/resources/resources';

const tutorials = resources
  .filter((resource) => resource.type === 'tutorial')
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

const otherResources = resources
  .filter((resource) => resource.type !== 'tutorial')
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

function getPlatformIcon(platform: string): string {
  return RESOURCE_PLATFORMS[platform as keyof typeof RESOURCE_PLATFORMS]?.icon || 'i-lucide-folder';
}
</script>
