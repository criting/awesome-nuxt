<template>
  <div>
    <div>
      <UBadge
        v-for="category in categories"
        :key="category"
        class="mr-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-200"
        :class="{
          'bg-white text-gray-500': model === category,
          'bg-gray-200 text-gray-800': model !== category
        }"
        size="lg"
        @click="model = category"
      >
        {{ category }}
      </UBadge>
    </div>
  </div>
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
