<template>
  <div>
    <div>
      <UBadge
        v-for="category in categories"
        :key="category"
        class="mr-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-200"
        :class="{
          'bg-primary text-white hover:bg-primary': model === category,
          'bg-white text-gray-800 hover:bg-gray-100': model !== category
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
