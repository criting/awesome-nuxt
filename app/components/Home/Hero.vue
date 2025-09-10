<template>
  <section class="relative h-screen">
    <div
      class="absolute inset-0 bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover bg-no-repeat opacity-50 pointer-events-none"
    />
    <div
      class="absolute inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.03] dark:opacity-10 pointer-events-none"
    />

    <UContainer class="flex items-center h-full">
      <UPageHero
        headline="Community-powered"
        title="Build better with Nuxt"
        description="Your Nuxt best friend! A curated, fast-growing hub: pick your stack with the Guide, start from proven open-source projects, and learn with fresh, high-quality resources."
        :ui="{
          headline:
            'bg-secondary text-white rounded-full px-4 py-1.5 mb-4 inline-block text-[11px] font-semibold tracking-wide',
          links: 'gap-3',
          container: 'lg:py-0 py-0 sm:py-0 md:py-0 m-0'
        }"
      >
        <template #title>
          <div class="flex items-center justify-center gap-5">
            <span>Build better with Nuxt</span>
          </div>
        </template>
        <template #links>
          <NuxtLink
            to="/guide"
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-primary text-white hover:bg-primary-600 transition"
          >
            <UIcon name="i-lucide-compass" class="h-4 w-4" />
            Read the Guide
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <UIcon name="i-lucide-layers" class="h-4 w-4" />
            Browse Projects
          </NuxtLink>
          <NuxtLink
            to="/learn"
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <UIcon name="i-lucide-play-circle" class="h-4 w-4" />
            Start Learning
          </NuxtLink>
        </template>
      </UPageHero>
    </UContainer>
  </section>
</template>
