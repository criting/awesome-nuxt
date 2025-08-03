<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg">{{ project.name }}</h2>
        <UBadge v-if="project.premium" label="Premium" size="sm" />
      </div>
    </template>

    <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>

    <div class="flex flex-wrap gap-2 mb-3">
      <UBadge v-for="version in project.nuxt" :key="version" color="green" size="xs">
        Nuxt {{ version }}
      </UBadge>

      <UBadge v-for="tag in project.tags" :key="tag" color="gray" size="xs">
        {{ tag }}
      </UBadge>
    </div>

    <UButton
      :to="project.url"
      target="_blank"
      color="primary"
      size="sm"
      icon="i-heroicons-arrow-top-right-on-square"
    >
      View
    </UButton>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  project: {
    type: Object,
    default: () => ({})
  }
});
</script>
