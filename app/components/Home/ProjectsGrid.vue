<template>
  <section id="projects" class="relative">
    <div
      class="absolute inset-0 bg-[url(/gradient.jpg)] dark:bg-[url(/gradient-dark.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full lg:w-[97%] xl:w-[95%] lg:rounded-xl"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[500px] w-full xl:w-[95%] mx-auto bg-no-repeat dark:to-gray-900"
    />
    <UContainer>
      <div class="relative mb-8 pt-24">
        <h1 class="text-3xl font-bold mb-2">Explore Nuxt Projects</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Discover a collection of Nuxt projects, templates, and starters that are ready to use or
          learn from.
        </p>
      </div>
      <div class="grid grid-cols-1">
        <div class="space-y-2 self-start">
          <div class="flex flex-col gap-2 md:flex-row">
            <div class="flex flex-col gap-2">
              <span class="text-gray-500 dark:text-gray-400 text-sm"
                >Search by name or description:</span
              >
              <UInput
                v-model="searchQuery"
                placeholder="Search projects..."
                icon="i-heroicons-magnifying-glass"
                class="w-auto md:w-md lg:w-xl"
                size="lg"
              />
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-gray-500 dark:text-gray-400 text-sm">Filter by tags:</span>
              <TagFilter v-model="selectedTags" :tags="allTags" />
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Filter by category:</span>
            <CategoryFilter v-model="selectedCategory" :categories="allCategories" />
          </div>

          <div class="mt-4">
            <UButton
              variant="subtle"
              size="xs"
              class="text-sm text-gray-500 dark:text-gray-400 w-full md:w-auto flex items-center gap-1 justify-center py-1 px-3"
              @click="
                selectedCategory = 'all';
                selectedTags = [];
                searchQuery = '';
              "
            >
              <UIcon name="i-lucide-refresh-cw" class="mr-1" />
              Reset filters
            </UButton>
          </div>
        </div>

        <section>
          <div class="mb-4 mt-8">
            <p class="text-gray-600 dark:text-gray-400 text-xs">
              {{ filteredProjects.length }} project{{ filteredProjects.length === 1 ? '' : 's' }}
            </p>
          </div>
          <div
            v-if="filteredProjects.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 lg:gap-12 items-stretch auto-rows-[1fr]"
          >
            <NuxtLink
              v-for="project in filteredProjects"
              :key="project.name"
              class="cursor-pointer h-full"
              :to="`/r/${project.slug}`"
            >
              <ProjectCard :project="project" class="h-full" :menu="true" />
            </NuxtLink>
          </div>
          <div v-else class="text-gray-500 dark:text-gray-400">
            No projects found matching your filters.
          </div>
        </section>
      </div>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
import { projects } from '@@/data/all';
import type { Project } from '@@/types/project';
import { PROJECT_CATEGORIES, type CategorySlug } from '~~/types/category';
import type { CategoryOption } from '~~/types/category-ui';

const allProjects = ref(projects);
const { category: selectedCategory, tags: selectedTags, search: searchQuery } = useFilterQuery();

const ALL_OPTION: CategoryOption = { slug: 'all', name: 'All', icon: 'i-lucide-grid' };

const registryOrder = Object.values(PROJECT_CATEGORIES).map((c) => c.slug);

const allCategories = computed<CategoryOption[]>(() => {
  const used = new Set<CategorySlug>();

  for (const p of allProjects.value as Project[]) {
    if (p?.category && p.category in PROJECT_CATEGORIES) {
      used.add(p.category as CategorySlug);
    }
  }

  const usedCategories: CategoryOption[] = registryOrder
    .filter((slug) => used.has(slug))
    .map((slug) => {
      const c = PROJECT_CATEGORIES[slug];
      return { slug: c.slug, name: c.name, icon: c.icon };
    });

  return [ALL_OPTION, ...usedCategories];
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
