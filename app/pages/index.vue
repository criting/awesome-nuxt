<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Awesome Nuxt Projects</h1>

    <div class="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-24">
      <aside class="space-y-2 lg:sticky top-8 self-start h-fit">
        <h2 class="text-xl font-semibold mb-4">Filters</h2>

        <h5>Categories</h5>
        <CategoryFilter v-model="selectedCategory" :categories="allCategories" />

        <h5>Tags</h5>
        <TagFilter v-model="selectedTags" :tags="allTags" />
        <h5>Search</h5>
        <UInput
          v-model="searchQuery"
          placeholder="Search projects..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </aside>

      <section>
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Projects</h2>
          <p class="text-gray-600">
            {{ filteredProjects.length }} project{{ filteredProjects.length === 1 ? '' : 's' }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard v-for="project in filteredProjects" :key="project.name" :project="project" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from '@@/data/all';

const allProjects = ref(projects);
const { category: selectedCategory, tags: selectedTags, search: searchQuery } = useFilterQuery();

const allTags = computed(() => {
  const tags = new Set<string>();
  allProjects.value.forEach((p) => p.tags?.forEach((t: string) => tags.add(t)));
  return [...tags];
});

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
</script>
