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

      <UContainer class="relative">
        <UPageHero
          headline="Nuxt ecosystem"
          title="Your Nuxt Guide"
          description="Tools you’ll actually use with Nuxt—beyond the official modules. Auth, databases, ORMs, UI,
        validation, testing, deployment, security, analytics, and more."
          :ui="{
            headline:
              'bg-secondary text-white rounded-full px-4 py-1.5 mb-4 inline-block text-[11px] font-semibold tracking-wide',
            links: 'gap-3',
            container: 'lg:py-60'
          }"
        />
      </UContainer>
    </div>
  </section>
</template>
