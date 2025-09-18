<template>
  <section>
    <UContainer>
      <UPageSection
        title="Check out the simple Nuxt Guide"
        description="Learn about auth, database, ORM, UI, deployment and more — with realistic trade-offs and up-to-date picks."
      >
        <template #body>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink
              to="/guide#auth"
              class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-6 h-[200px] flex flex-col group hover:border-gray-400 transition-all duration-300 cursor-pointer justify-between relative hover:scale-[1.02]"
            >
              <div
                class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.1] dark:opacity-10"
              />
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <UIcon name="i-lucide-shield-check" class="h-7 w-7 text-primary" />
                  <h3 class="text-lg md:text-2xl font-semibold">Auth</h3>
                </div>
                <div class="flex flex-col gap-2">
                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Nuxt Auth Utils or BetterAuth?
                  </p>
                </div>
              </div>
              <div class="flex">
                <div
                  class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div
                    class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                    <UIcon name="i-lucide-arrow-right" class="text-white" />
                  </div>
                  Learn more
                </div>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/guide#db"
              class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-6 h-[200px] flex flex-col justify-between group hover:border-gray-400 transition-all duration-300 cursor-pointer relative hover:scale-[1.02]"
            >
              <div
                class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.1] dark:opacity-10"
              />
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <UIcon name="i-lucide-database" class="h-7 w-7 text-primary" />
                  <h3 class="text-lg md:text-2xl font-semibold">Database</h3>
                </div>
                <div class="flex flex-col gap-2">
                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    CloudFlare D1, Supabase, or Torso?
                  </p>
                </div>
              </div>
              <div class="flex">
                <div
                  class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div
                    class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                    <UIcon name="i-lucide-arrow-right" class="text-white" />
                  </div>
                  Learn more
                </div>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/guide#ui"
              class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-6 h-[200px] flex flex-col justify-between group hover:border-gray-400 transition-all duration-300 cursor-pointer relative hover:scale-[1.02]"
            >
              <div
                class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.1] dark:opacity-10"
              />
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <UIcon name="i-lucide-blocks" class="h-7 w-7 text-primary" />
                  <h3 class="text-lg md:text-2xl font-semibold">UI</h3>
                </div>
                <div class="flex flex-col gap-2">
                  <p
                    class="text-gray-600 dark:text-gray-300 text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Nuxt UI, PrimeVue, or Shadcn?
                  </p>
                </div>
              </div>
              <div class="flex">
                <div
                  class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div
                    class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                  >
                    <UIcon name="i-lucide-arrow-right" class="text-white" />
                  </div>
                  Learn more
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="mt-4 flex flex-col justify-center items-center">
            and many more...
            <div class="flex mt-6">
              <NuxtLink
                to="/guide"
                class="flex gap-2 text-sm items-center cursor-pointer group border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div
                  class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
                >
                  <UIcon name="i-lucide-arrow-right" class="text-white" />
                </div>
                Check out the full Guide
              </NuxtLink>
            </div>
          </div>
        </template>
      </UPageSection>
    </UContainer>
  </section>
</template>
