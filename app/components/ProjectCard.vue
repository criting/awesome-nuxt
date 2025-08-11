<template>
  <div class="transition-transform duration-200 group cursor-pointer">
    <div class="relative">
      <div class="relative w-full px-12 py-8 group transition-all">
        <div
          class="absolute top-0 w-full h-full bg-[url(/gradient.jpg)] bg-cover left-0 -z-[10] opacity-100 rounded-lg"
        />
        <div
          class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        />
        <ProjectImage
          :image="project.image"
          :name="project.name"
          :description="project.description"
          class="z-10"
        />
        <!-- <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 left-0 group-hover:opacity-80 transition-opacity duration-200 rounded-lg"
        >
          <div
            class="absolute bottom-2 text-white hidden group-hover:block w-full left-0 px-4 py-1"
          >
            <div class="flex justify-between">
              <div v-if="project.stars" class="flex items-center text-sm">
                <UIcon name="i-lucide-star" class="text-yellow-500 mr-1" />
                <span>{{ project.stars }} stars</span>
              </div>

              <div v-if="project.author" class="flex items-center text-sm text-white">
                <UIcon name="i-lucide-user" class="mr-1" />
                <span>{{ project.author }}</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  project: {
    type: Object,
    default: () => ({})
  }
});
</script>
