<template>
  <div>
    <div class="flex gap-3 flex-wrap">
      <UBadge
        v-for="category in categories"
        :key="category.slug"
        class="rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-200 px-3 py-2"
        :class="{
          'bg-primary text-white hover:bg-primary': model === category.slug,
          'bg-white text-gray-800 hover:bg-gray-100': model !== category.slug
        }"
        size="lg"
        @click="
          model = category.slug;
          scrollToProjects();
        "
      >
        <UIcon :name="category.icon" />
        {{ category.name }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { CategoryOption } from '~~/types/category-ui';

const props = defineProps<{
  categories: CategoryOption[];
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);

function scrollToProjects() {
  if (import.meta.client) {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
