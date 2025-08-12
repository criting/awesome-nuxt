<template>
  <section class="mt-24">
    <UPageCTA
      title="Know an awesome Nuxt project?"
      description="Share it with the community!"
      :links="links"
    />
  </section>
</template>
<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const links = ref<ButtonProps[]>([
  {
    label: 'Contribute',
    color: 'neutral',
    trailingIcon: 'i-lucide-arrow-right',
    to: 'https://www.figma.com/community/file/1288455405058138934',
    target: '_blank'
  }
]);
</script>
