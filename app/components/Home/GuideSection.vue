<template>
  <section>
    <UContainer>
      <UPageSection
        title="New project? Start with the Guide"
        description="Pick auth, database, ORM, UI, deployment and more — with realistic trade-offs and up-to-date picks."
      >
        <template #body>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-shield-check" class="h-5 w-5 text-primary" />
                <h3 class="text-lg md:text-xl font-semibold">Auth</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Nuxt Auth Utils for speed, BetterAuth/Lucia when you need custom flows.
              </p>
            </div>
            <div class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-database" class="h-5 w-5 text-primary" />
                <h3 class="text-lg md:text-xl font-semibold">Database</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Cloudflare D1 (edge & cheap) • Supabase (Postgres + Auth) • Turso (libSQL).
              </p>
            </div>
            <div class="rounded-xl border border-gray-200/70 dark:border-gray-800/70 p-4">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-lucide-braces" class="h-5 w-5 text-primary" />
                <h3 class="text-lg md:text-xl font-semibold">ORM & UI</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Drizzle on the edge, Prisma on Postgres. Nuxt UI / Shadcn for a clean UI.
              </p>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink
              to="/guide"
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-primary text-white hover:bg-primary-600 transition"
            >
              Explore the full Guide
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </template>
      </UPageSection>
    </UContainer>
  </section>
</template>
