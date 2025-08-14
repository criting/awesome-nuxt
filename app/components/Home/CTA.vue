<template>
  <section class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient-shape-11.svg)] w-20 h-20 bg-cover bg-no-repeat top-65 lg:top-50 lg:left-90 left-50 z-10 dark:opacity-70"
    />
    <div
      class="absolute bg-[url(/gradient-shape-4.svg)] w-20 h-20 bg-cover bg-no-repeat -top-[40px] right-[130px] lg:right-120 z-10 dark:opacity-70"
    />
    <UContainer>
      <UPageCTA
        title="Know an awesome Nuxt project?"
        description="Share it with the community!"
        :links="links"
      />
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Contribute',
    color: 'primary',
    trailingIcon: 'i-lucide-arrow-right',
    to: 'https://github.com/criting/awesome-nuxt#-contributing',
    target: '_blank'
  }
]);
</script>
