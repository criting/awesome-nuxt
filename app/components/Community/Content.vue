<template>
  <section class="relative">
    <div
      class="absolute inset-0 bg-linear-to-b from-gray-100 to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:from-primary-900 dark:to-gray-900 rounded-lg dark:opacity-50"
    />

    <div class="grid grid-cols-1 gap-8 lg:gap-12 lg:max-w-6xl lg:mx-auto pt-20">
      <section class="space-y-10 px-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:space-y-18 space-y-10">
          <div class="space-y-4">
            <div class="text-2xl font-bold">Nuxt</div>

            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" /> Website:
                <ULink href="https://nuxt.com/" external target="_blank">nuxt.com</ULink>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-github" /> GitHub:
                <ULink href="https://github.com/nuxt/nuxt" external target="_blank"
                  >github.com/nuxt/nuxt</ULink
                >
              </li>

              <li class="flex items-center gap-2">
                <UIcon name="i-simple-icons-reddit" /> Reddit:
                <ULink href="https://www.reddit.com/r/Nuxt/" external target="_blank"
                  >reddit.com/r/Nuxt</ULink
                >
              </li>

              <li class="flex items-center gap-2">
                <UIcon name="i-simple-icons-discord" /> Discord:
                <ULink href="https://discord.com/invite/nuxt" external target="_blank"
                  >discord.com/invite/nuxt</ULink
                >
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div class="text-2xl font-bold">Nuxt UI</div>

            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" /> Website:
                <ULink href="https://ui.nuxt.com/" external target="_blank">ui.nuxt.com</ULink>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-github" /> GitHub:
                <ULink href="https://github.com/nuxt/ui" external target="_blank"
                  >github.com/nuxt/ui</ULink
                >
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div class="text-2xl font-bold">Nuxt Content</div>

            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" /> Website:
                <ULink href="https://content.nuxt.com/" external target="_blank"
                  >content.nuxt.com</ULink
                >
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-github" /> GitHub:
                <ULink href="https://github.com/nuxt/content" external target="_blank"
                  >github.com/nuxt/content</ULink
                >
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-simple-icons-discord" /> Discord:
                <ULink href="https://discord.gg/sBXDm6e8SP" external target="_blank"
                  >Nuxt Content & Studio</ULink
                >
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div class="text-2xl font-bold">NuxtHub</div>

            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" /> Website:
                <ULink href="https://hub.nuxt.com/" external target="_blank">hub.nuxt.com</ULink>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-github" /> GitHub:
                <ULink href="https://github.com/nuxt-hub" external target="_blank"
                  >github.com/nuxt-hub</ULink
                >
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-simple-icons-discord" /> Discord:
                <ULink href="https://discord.gg/9B57Z6Qp" external target="_blank">NuxtHub</ULink>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <div class="text-2xl font-bold">Docus</div>

            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-globe" /> Website:
                <ULink href="https://docus.dev" external target="_blank">docus.dev</ULink>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-github" /> GitHub:
                <ULink href="https://github.com/nuxt-content/docus" external target="_blank"
                  >github.com/nuxt-content/docus</ULink
                >
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-simple-icons-discord" /> Discord:
                <ULink href="https://discord.gg/vW89dsVqBF" external target="_blank"
                  >Docus - NuxtHub</ULink
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="max-w-md">
          <FeedbackWidget
            :page="{
              title: 'Guide'
            }"
            class="mt-20"
          />
        </div>
      </section>
    </div>
  </section>
</template>
