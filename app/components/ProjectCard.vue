<template>
  <div>
    <UContextMenu
      v-if="menu"
      size="sm"
      :items="items"
      :ui="{
        content: 'w-48'
      }"
    >
      <ProjectCardContent :project="project" />
    </UContextMenu>

    <ProjectCardContent v-else :project="project" />
  </div>
</template>

<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui';
import type { Project } from '@@/types/project';

const items = ref<ContextMenuItem[]>([]);

const props = defineProps<{
  project: Project
  menu?: boolean
}>()

const menu = computed(() => props.menu !== false);

if (menu.value) {
  if (props.project.premium) {
    items.value.push({
      label: 'Premium',
      icon: 'i-lucide-star',
      disabled: true
    });
  }

  if (props.project.stars) {
    items.value.push({
      label: 'GitHub Repo',
      icon: 'i-lucide-github',
      onSelect() {
        window.open(`${props.project.url}`, '_blank');
      }
    });
  }

  if (props.project.stars) {
    items.value.push({
      label: `${props.project.stars} stars`,
      icon: 'i-lucide-star',
      disabled: true
    });
  }
}
</script>
