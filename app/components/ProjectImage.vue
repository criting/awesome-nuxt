<template>
  <div class="w-full z-10">
    <div v-if="image">
      <img
        :src="image"
        alt="Project Image"
        class="rounded-lg w-full h-48 object-contain group-hover:scale-105 transition-transform duration-200"
        :class="{
          'pt-8 h-60': size === 'taller'
        }"
      />
      <div
        class="font-semibold text-white text-center group-hover:mix-blend-normal transition-all duration-200 z-10"
        :class="{
          'mt-8 mix-blend-normal': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white text-center mt-2 line-clamp-2 group-hover:mix-blend-normal"
        :class="{
          'mix-blend-normal': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ description }}
      </div>
    </div>
    <div v-else class="w-full h-66 object-contain flex flex-col items-center justify-center">
      <div
        class="font-semibold text-white group-hover:mix-blend-normal"
        :class="{
          'mix-blend-normal': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white text-center mt-2 line-clamp-2 group-hover:mix-blend-normal"
        :class="{
          'mix-blend-normal': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'default'
  }
});
</script>
