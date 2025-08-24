<template>
  <div
    class="w-full z-10 mt-2"
    :class="{
      'max-w-[400px] mx-auto': size === 'taller',
      'min-h-[200px] flex justify-center items-center !mt-0': size == 'taller' && !visible
    }"
  >
    <div v-if="image">
      <img
        v-if="image?.includes('og-images/')"
        :src="image"
        class="rounded-lg w-full object-contain group-hover:scale-105 transition-transform duration-200"
        :class="{
          'mt-8': size === 'taller'
        }"
        sizes="100px sm:150px md:300px"
        loading="lazy"
        alt="Project Image"
      />
      <NuxtImg
        v-else-if="visible"
        :src="image"
        alt="Project Image"
        class="rounded-lg w-full object-contain"
        :class="{
          'group-hover:scale-105 transition-transform duration-200': size !== 'taller',
          'object-contain mx-auto w-[500px] mt-4': size === 'taller'
        }"
        sizes="100px sm:150px md:300px"
        loading="lazy"
        width="600"
        height="300"
        format="webp"
        @error="onError"
      />
      <div
        class="font-semibold text-white text-center group-hover:mix-blend-normal transition-all duration-200 z-10 mt-4"
        :class="{
          'mt-8 mix-blend-normal hidden': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white text-center group-hover:mix-blend-normal"
        :class="{
          'mix-blend-normal mt-4': size === 'taller' && visible,
          'mix-blend-normal mt-0 p-0': size === 'taller' && !visible,
          'mix-blend-overlay line-clamp-1 mt-2': size !== 'taller'
        }"
      >
        {{ description }}
      </div>
    </div>
    <div v-else class="w-full h-full object-contain flex flex-col items-center justify-center">
      <div
        class="font-semibold text-white group-hover:mix-blend-normal text-center"
        :class="{
          'mix-blend-normal': size === 'taller',
          'mix-blend-overlay': size !== 'taller'
        }"
      >
        {{ name }}
      </div>
      <div
        v-if="description"
        class="text-xs text-white text-center mt-2 group-hover:mix-blend-normal"
        :class="{
          'mix-blend-normal': size === 'taller',
          'mix-blend-overlay line-clamp-1': size !== 'taller'
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup>
const visible = ref(true);

function onError() {
  visible.value = false;
}

defineProps({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: false,
    default: ''
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
