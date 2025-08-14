<template>
  <div @click="selectProject(project)">
    <UContextMenu
      size="sm"
      :items="items"
      :ui="{
        content: 'w-48'
      }"
    >
      <div class="transition-transform duration-200 group cursor-pointer">
        <div class="relative">
          <div class="relative w-full px-12 py-8 group transition-all">
            <div
              class="absolute top-0 w-full h-full bg-[url(/gradient.jpg)] bg-cover left-0 -z-[10] opacity-100 rounded-lg"
            />
            <div
              class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
            />
            <div
              class="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg -z-[9]"
            />
            <div
              v-if="project.premium"
              class="text-center opacity-50 group-hover:opacity-100 transition-opacity duration-200 absolute top-4 left-0 right-0 m-auto"
            >
              <UBadge color="neutral" size="sm" variant="outline" class="ring-0 rounded-full"
                >Premium</UBadge
              >
            </div>
            <ProjectImage
              :image="project.image"
              :name="project.name"
              :description="project.description"
              class="z-10"
            />
          </div>
        </div>
      </div>
    </UContextMenu>
  </div>
</template>

<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui';
import type { Project } from '@@/types/project';

const emit = defineEmits<{
  (e: 'view', project: Project): void;
}>();

function selectProject(project: Project) {
  emit('view', project);
}

const items = ref<ContextMenuItem[]>([
  {
    label: 'View Project',
    icon: 'i-lucide-eye',
    onSelect() {
      emit('view', props.project);
    }
  }
]);

const props = defineProps({
  project: {
    type: Object as () => Project,
    default: () => ({})
  }
});

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
</script>
