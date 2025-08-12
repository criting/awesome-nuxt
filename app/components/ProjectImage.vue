<template>
  <div class="w-full z-10">
    <div v-if="image">
      <img
        :src="image"
        alt="Project Image"
        class="rounded-lg w-full h-48 object-contain group-hover:scale-105 transition-transform duration-200"
      />
      <div
        class="font-semibold text-white mix-blend-overlay text-center group-hover:mix-blend-normal transition-all duration-200 z-10"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white mix-blend-overlay text-center mt-2 line-clamp-2 group-hover:mix-blend-normal"
      >
        {{ description }}
      </div>
    </div>
    <div v-else class="w-full h-66 object-contain flex flex-col items-center justify-center">
      <div class="font-semibold text-white mix-blend-overlay group-hover:mix-blend-normal">
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white mix-blend-overlay text-center mt-2 line-clamp-2 group-hover:mix-blend-normal"
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
  }
});
</script>
