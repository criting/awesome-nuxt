<template>
  <USelectMenu
    v-model="model"
    :items="tags"
    multiple
    placeholder="Filter by tags"
    icon="i-heroicons-tag"
    class="w-full sm:w-60"
  />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  tags: string[];
  modelValue: string[];
}>();

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);
</script>
