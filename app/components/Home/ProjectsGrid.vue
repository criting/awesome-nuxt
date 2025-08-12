<template>
  <section id="projects" class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full xl:w-[95%] xl:rounded-xl"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:to-gray-900"
    />
    <UContainer>
      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Explore Nuxt Projects</h1>
        <p class="text-gray-600">
          Discover a collection of Nuxt projects, templates, and starters that are ready to use or
          learn from.
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="space-y-2 self-start">
          <div class="flex flex-col gap-2 md:flex-row">
            <div class="flex flex-col gap-2">
              <span class="text-gray-500 text-sm">Search by name or description:</span>
              <UInput
                v-model="searchQuery"
                placeholder="Search projects..."
                icon="i-heroicons-magnifying-glass"
                class="w-auto md:w-md lg:w-xl"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-gray-500 text-sm">Filter by tags:</span>
              <TagFilter v-model="selectedTags" :tags="allTags" />
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <span class="text-gray-500 text-sm">Filter by category:</span>
            <CategoryFilter v-model="selectedCategory" :categories="allCategories" />
          </div>
          <!-- <h5>Tags</h5>
        <TagFilter v-model="selectedTags" :tags="allTags" />
        <h5>Search</h5>
        <UInput
          v-model="searchQuery"
          placeholder="Search projects..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        /> -->
        </div>

        <section>
          <div class="mb-4 mt-8">
            <p class="text-gray-600 text-xs">
              {{ filteredProjects.length }} project{{ filteredProjects.length === 1 ? '' : 's' }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.name"
              :project="project"
              @view="onView(project)"
            />
          </div>
        </section>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import { projects } from '@@/data/all';
import type { Project } from '@@/types/project';

const allProjects = ref(projects);
const { category: selectedCategory, tags: selectedTags, search: searchQuery } = useFilterQuery();

const emit = defineEmits<{
  (e: 'view', project: Project): void;
}>();

function onView(project: Project) {
  emit('view', project);
}

const allCategories = computed(() => {
  const categoriesSet = new Set<string>(['all']);
  allProjects.value.forEach((p) => categoriesSet.add(p.category));
  return [...categoriesSet];
});

const filteredProjects = computed(() => {
  return allProjects.value.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => project.tags?.includes(tag));

    const matchesCategory =
      selectedCategory.value === 'all' || project.category === selectedCategory.value;

    return matchesSearch && matchesTags && matchesCategory;
  });
});

const allTags = computed(() => {
  const tags = new Set<string>();
  allProjects.value.forEach((p) => p.tags?.forEach((t: string) => tags.add(t)));
  return [...tags];
});
</script>
