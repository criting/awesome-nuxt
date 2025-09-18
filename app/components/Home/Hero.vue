<template>
  <section class="hero-section overflow-hidden">
    <div class="relative flex flex-col items-center justify-center lg:h-screen bg-no-repeat">
      <div>
        <div
          v-gsap.whenVisible.from="{
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }"
          v-gsap.whenVisible.to="{
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            scale: 1.15
          }"
          fetchPriority="high"
          class="absolute -top-[80px] left-0 inset-0 bg-[url(/hero-bg.svg)] dark:bg-[url(/hero-bg-dark.svg)] bg-cover bg-no-repeat lg:bg-center light:opacity-40 light:md:opacity-100"
        />
      </div>
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.03] dark:opacity-10"
      />
      <div
        class="absolute bottom-0 bg-linear-to-b from-transparent to-white -z-0 h-[50px] w-full bg-no-repeat opacity-100 dark:to-gray-900 dark:opacity-100"
      />

      <UContainer class="flex items-center h-full">
        <UPageHero
          v-gsap.whenVisible.delay-1000.stagger.from="{ scale: 1.5, x: -40 }"
          headline="Community-powered"
          title="Build better with Nuxt"
          description="Your Nuxt best friend! A curated, fast-growing hub: check out the Guide, start from proven open-source projects, and learn with fresh, high-quality resources."
          :ui="{
            headline:
              'bg-secondary text-white rounded-full px-4 py-1.5 mb-4 inline-block text-[11px] font-semibold tracking-wide',
            links: 'gap-3',
            container: 'lg:py-60'
          }"
        >
          <template #title>
            <div class="flex items-center justify-center gap-5">
              <span>Build better with Nuxt</span>
            </div>
          </template>
          <template #links>
            <NuxtLink
              class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
