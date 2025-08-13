<template>
  <section>
    <div class="relative flex flex-col items-center justify-center lg:h-screen bg-no-repeat">
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover bg-no-repeat lg:bg-center"
      />
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.03] dark:opacity-10"
      />
      <div
        class="absolute -top-[90px] bg-linear-to-b from-transparent to-white -z-0 h-[100px] w-full bg-no-repeat opacity-50 dark:to-gray-900"
      />
      <div
        class="absolute bottom-0 bg-linear-to-b from-transparent to-white -z-0 h-[300px] w-full bg-no-repeat opacity-50 dark:to-gray-900 dark:opacity-100"
      />

      <UContainer>
        <UPageHero
          :headline="projects.length + ' Projects'"
          title="Nuxt Projects That Deliver"
          description="A curated list of Nuxt projects, templates, and starters that actually work — ready for
          you to use or learn from."
          :ui="{
            container: 'lg:py-60',
            headline:
              'bg-secondary text-white rounded-full px-4 py-2 mb-4 inline-block text-xs font-semibold'
          }"
        >
          <template #links>
            <div
              to="#projects"
              class="flex gap-2 items-center cursor-pointer group"
              @click="scrollToProjects"
            >
              <div
                class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
              >
                <UIcon name="i-lucide-arrow-right" class="text-white" />
              </div>
              Explore projects
            </div>
            <NuxtLink
              class="flex gap-2 items-center cursor-pointer group"
              to="https://github.com/criting/awesome-nuxt"
              target="_blank"
            >
              <div
                class="bg-secondary group-hover:bg-primary flex justify-center p-2 rounded-full transition-colors duration-200"
              >
                <UIcon name="i-simple-icons-github" class="text-white" />
              </div>
              View on GitHub
            </NuxtLink>
          </template>
        </UPageHero>
      </UContainer>
    </div>
  </section>
</template>

<script setup>
import { projects } from '~~/data/all';

function scrollToProjects() {
  if (import.meta.client) {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
