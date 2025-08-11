<template>
  <UButton
    icon="i-heroicons-arrow-up"
    color="primary"
    size="sm"
    class="fixed bottom-6 right-6 z-50 shadow-lg transition-opacity duration-300"
    :class="{ 'opacity-0 pointer-events-none': !visible, 'opacity-100': visible }"
    aria-label="Scroll to top"
    @click="scrollToTop"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

const handleScroll = () => {
  visible.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
