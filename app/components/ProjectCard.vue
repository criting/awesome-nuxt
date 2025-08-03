<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg">{{ project.name }}</h2>
        <UBadge v-if="project.premium" label="Premium" size="sm" />
      </div>
    </template>

    <UIcon v-if="project.stars" name="i-lucide-star" class="text-yellow-500 mr-1" />
    <span v-if="project.stars">{{ project.stars }} stars</span>
    <span v-if="project.lastUpdated" class="text-gray-500 text-sm ml-2">
      Last updated: {{ new Date(project.lastUpdated).toLocaleDateString() }}
    </span>

    <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>

    <div class="flex flex-wrap gap-2 mb-3">
      <UBadge v-for="version in project.nuxt" :key="version" color="primary" size="xs">
        Nuxt {{ version }}
      </UBadge>

      <UBadge v-for="tag in project.tags" :key="tag" color="secondary" size="xs">
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
