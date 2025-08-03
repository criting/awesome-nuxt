<template>
  <URadioGroup
    v-model="model"
    orientation="horizontal"
    variant="list"
    default-value="System"
    :items="categories"
  />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  categories: string[];
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);
const model = useVModel(props, 'modelValue', emit);
</script>
