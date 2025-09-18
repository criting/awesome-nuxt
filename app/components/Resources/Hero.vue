<template>
  <section class="hero-section overflow-hidden">
    <div class="relative flex flex-col items-center justify-center lg:h-screen bg-no-repeat">
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
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.03] dark:opacity-10"
      />
      <div
        class="absolute bottom-0 bg-linear-to-b from-transparent to-white -z-0 h-[50px] w-full bg-no-repeat opacity-100 dark:to-gray-900 dark:opacity-100"
      />

      <UContainer>
        <UPageHero
          headline="Fresh Resources"
          title="Resources for Learning Nuxt"
          description="A collection of tutorials, guides, and other resources to help you learn Nuxt effectively."
          :ui="{
            container: 'lg:py-60',
            headline:
              'bg-secondary text-white rounded-full px-4 py-2 mb-4 inline-block text-xs font-semibold',
            links: 'gap-4'
          }"
        >
          <template #links>
            <div
              to="#projects"
              class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              @click="scrollToResources"
            >
              <div
                class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
              >
                <UIcon name="i-lucide-arrow-down" class="text-white" />
              </div>
              Explore resources
            </div>
          </template>
        </UPageHero>
      </UContainer>
    </div>
  </section>
</template>

<script setup>
function scrollToResources() {
  if (import.meta.client) {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
