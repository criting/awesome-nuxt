<template>
  <section>
    <div class="relative flex flex-col items-center justify-center lg:h-screen bg-no-repeat">
      <div
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
          title="Your Nuxt Guide"
          description="Tools you’ll actually use with Nuxt—beyond the official modules. Auth, databases, ORMs, UI,
        validation, testing, deployment, security, analytics, and more."
        />
      </UContainer>
    </div>
  </section>
</template>
