<template>
  <section id="projects" class="relative mt-24 learn-section">
    <div
      v-gsap.whenVisible.from="{
        trigger: '.learn-section',
        start: 'top-=500 top',
        end: 'bottom+=200 top',
        scrub: true
      }"
      v-gsap.whenVisible.to="{
        trigger: '.learn-section',
        start: 'top-=500 top',
        end: 'bottom+=200 bottom',
        scrub: true,
        width: '100%',
        borderRadius: '0'
      }"
      class="absolute inset-0 bg-[url(/gradient.jpg)] dark:bg-[url(/gradient-dark.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full lg:w-[97%] xl:w-[95%] lg:rounded-xl"
    />
    <div
      v-gsap.whenVisible.from="{
        trigger: '.learn-section',
        start: 'top-=500 top',
        end: 'bottom+=200 top',
        scrub: true
      }"
      v-gsap.whenVisible.to="{
        trigger: '.learn-section',
        start: 'top-=500 top',
        end: 'bottom+=200 bottom',
        scrub: true,
        width: '100%'
      }"
      class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:to-gray-900"
    />
    <UContainer>
      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Learn with Nuxt Resources</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Discover a collection of Nuxt resources like tutorials, courses, and articles to help you
          learn and grow.
        </p>
      </div>
      <div class="grid grid-cols-1">
        <section>
          <div
            v-if="featured.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 lg:gap-12 items-stretch auto-rows-[1fr]"
          >
            <div v-for="tutorial in featured" :key="tutorial.title" class="cursor-pointer">
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
                      description: tutorial.description || '',
                      image: tutorial.image,
                      url: tutorial.url || '',
                      tags: [],
                      featured: false,
                      category: 'other'
                    }"
                    :menu="false"
                    class="h-full"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            No projects found matching your filters.
          </div>
        </section>
      </div>
      <div class="mt-12 flex justify-center">
        <NuxtLink
          to="/projects"
          class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <div
            class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
          >
            <UIcon name="i-lucide-arrow-right" class="text-white" />
          </div>
          Explore all resources
        </NuxtLink>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import { RESOURCE_PLATFORMS } from '@@/types/resource';
import { resources } from '@@/data/resources/resources';

const featured = computed(() => {
  const f = resources.filter((p) => p.featured).slice(0, 3);
  return f.length ? f : resources.slice(0, 3);
});

function getPlatformIcon(platform: string): string {
  return RESOURCE_PLATFORMS[platform as keyof typeof RESOURCE_PLATFORMS]?.icon || 'i-lucide-folder';
}
</script>
