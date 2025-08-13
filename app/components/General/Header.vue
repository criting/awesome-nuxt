<template>
  <UContainer class="relative">
    <UHeader
      :ui="{
        root: 'bg-white dark:bg-neutral-900 border rounded-xl border-neutral-200 dark:border-neutral-800 mt-4'
      }"
    >
      <template #title
        ><div class="flex items-center gap-2">
          <UColorModeImage
            light="/logo-light.svg"
            dark="/logo-dark.svg"
            class="w-10 h-10"
            alt="Logo"
          />
          Awesome Nuxt
        </div></template
      >

      <UNavigationMenu
        :items="items"
        variant="link"
        content-orientation="vertical"
        class="w-full justify-center"
      >
        <template #components-trailing>
          <UBadge label="soon" variant="subtle" size="sm" />
        </template>
      </UNavigationMenu>

      <template #right>
        <UColorModeButton />
        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/criting/awesome-nuxt"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>

      <template #body>
        <UNavigationMenu orientation="vertical" :items="items" class="-mx-2.5" variant="link" />
      </template>
    </UHeader>
  </UContainer>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Contibute',
    to: 'https://github.com/criting/awesome-nuxt#-contributing',
    target: '_blank'
  }
]);
</script>
