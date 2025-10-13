<template>
  <section class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient-shape-11.svg)] w-20 h-20 bg-cover bg-no-repeat top-65 lg:top-50 lg:left-90 left-50 z-10 dark:opacity-70"
    />
    <div
      class="absolute bg-[url(/gradient-shape-4.svg)] w-20 h-20 bg-cover bg-no-repeat -top-[40px] right-[130px] lg:right-120 z-10 dark:opacity-70"
    />
    <UContainer>
      <UPageCTA title="Know an awesome Nuxt resource?" description="Share it with the community!">
        <template #links>
          <NuxtLink
            class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            to="https://github.com/criting/awesome-nuxt?tab=contributing-ov-file"
            target="_blank"
          >
            <div
              class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
            >
              <UIcon name="i-simple-icons-github" class="text-white" />
            </div>
            Contribute on GitHub
          </NuxtLink>
        </template>
      </UPageCTA>
    </UContainer>
  </section>
</template>
