<template>
  <UCard class="hover:bg-gray-50 transition-colors duration-200">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg">{{ project.name }}</h2>
        <UBadge v-if="project.premium" label="Premium" size="sm" />
      </div>
    </template>

    <div class="flex justify-items-end items-end mb-3">
      <p class="text-sm text-gray-600 line-clamp-3">{{ project.description }}</p>

      <UPopover class="mr-1">
        <UButton color="neutral" variant="ghost" icon="i-lucide-info" size="xs" />

        <template #content>
          <div class="max-w-xs p-4">
            <p class="text-sm text-gray-600">{{ project.description }}</p>
          </div>
        </template>
      </UPopover>
    </div>

    <div class="overflow-x-auto w-full">
      <div class="flex flex-row gap-2 min-w-max">
        <UBadge v-for="version in project.nuxt" :key="version" color="primary" size="xs">
          Nuxt {{ version }}
        </UBadge>

        <UBadge v-for="tag in project.tags" :key="tag" color="secondary" size="xs" variant="subtle">
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <USeparator class="py-3" />

    <div>
      <div class="flex items-center text-sm text-gray-600">
        <UIcon v-if="project.stars" name="i-lucide-star" class="text-yellow-500 mr-1" />
        <span v-if="project.stars">{{ project.stars }} stars</span>
      </div>

      <div class="flex items-center text-sm text-gray-600">
        <UIcon v-if="project.author" name="i-lucide-user" class="mr-1" />
        <span v-if="project.author">{{ project.author }}</span>
      </div>

      <div>
        <span v-if="project.lastUpdated" class="text-gray-500 text-sm">
          Last updated: {{ new Date(project.lastUpdated).toLocaleDateString() }}
        </span>
      </div>
    </div>

    <USeparator v-if="project.lastUpdated" class="py-3" />

    <UButton
      :to="project.url"
      target="_blank"
      color="primary"
      size="sm"
      class="w-full p-0"
      variant="link"
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
