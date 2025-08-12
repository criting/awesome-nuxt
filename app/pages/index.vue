<template>
  <div>
    <ScrollToTop />
    <HomeProjectModal v-model:open="modalOpen" :selected-project="selectedProject" />
    <HomeHero />
    <HomeProjectsGrid @view="selectProject" />
    <HomeFAQ />
    <HomeCTA />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@@/types/project';

const modalOpen = ref(false);
const selectedProject = ref<Project | null>(null);

function selectProject(project: Project) {
  selectedProject.value = project;
  modalOpen.value = true;
}
</script>
