<template>
  <div>
    <ScrollToTop />
    <UModal
      v-if="selectedProject"
      v-model:open="modalOpen"
      fullscreen
      :ui="{ header: 'hidden' }"
      class="bg-white"
    >
      <template #body>
        <div
          class="w-full h-full absolute inset-0 bg-[url(/gradient.jpg)] bg-cover mix-blend-multiply -z-10 opacity-30"
        />
        <div class="max-w-3xl mx-auto px-4 py-8">
          <div class="flex gap-2 items-center cursor-pointer group" @click="modalOpen = false">
            <div
              class="bg-black group-hover:bg-primary flex justify-center p-2 rounded-full transition-colors duration-200"
            >
              <UIcon name="i-lucide-arrow-left" class="text-white" />
            </div>
            Go back
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <ProjectImage :image="selectedProject.image" :name="selectedProject.name" />
            </div>

            <div>
              <div>
                <h2 class="text-2xl font-bold mb-2">{{ selectedProject.name }}</h2>
                <p class="text-sm text-gray-600">{{ selectedProject.description }}</p>
              </div>

              <div class="mt-4">
                <h5 class="text-sm font-semibold mb-2">Tags</h5>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in selectedProject.tags"
                    :key="tag"
                    color="secondary"
                    size="sm"
                    variant="subtle"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
              </div>

              <div v-if="selectedProject.stars" class="mt-4">
                <h5 class="text-sm font-semibold mb-2">Project</h5>
              </div>

              <div class="gap-2 flex flex-col w-auto items-start">
                <div class="flex items-center text-sm text-gray-600">
                  <UIcon
                    v-if="selectedProject.stars"
                    name="i-lucide-star"
                    class="text-yellow-500 mr-1"
                  />
                  <span v-if="selectedProject.stars">{{ selectedProject.stars }} GitHub stars</span>
                </div>

                <div class="flex items-center text-sm text-gray-600">
                  <UIcon v-if="selectedProject.author" name="i-lucide-user" class="mr-1" />
                  <a :href="`https://github.com/${selectedProject.author}`" target="_blank">
                    <span v-if="selectedProject.author">{{ selectedProject.author }}</span>
                  </a>
                </div>

                <div>
                  <span v-if="selectedProject.lastUpdated" class="text-gray-500 text-sm">
                    Last updated: {{ new Date(selectedProject.lastUpdated).toLocaleDateString() }}
                  </span>
                </div>

                <div v-if="selectedProject.url">
                  <div class="flex gap-2 items-center cursor-pointer group" @click="openProjectUrl">
                    <div
                      class="bg-black group-hover:bg-primary flex justify-center p-2 rounded-full transition-colors duration-200"
                    >
                      <UIcon name="i-lucide-square-arrow-out-up-right" class="text-white" />
                    </div>
                    View project
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>
    <UContainer>
      <UPageHero
        title="Nuxt Projects That Deliver"
        description="A curated list of Nuxt projects, templates, and starters that actually work — ready for
          you to use or learn from."
        headline="New release"
      />
    </UContainer>
    <section class="relative">
      <div
        class="absolute inset-0 bg-[url(/gradient.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[300px] w-[95%] rounded-lg"
      />
      <div
        class="absolute inset-0 bg-linear-to-b from-transparent to-white -z-10 h-[300px] w-[95%] mx-auto bg-no-repeat"
      />
      <UContainer>
        <div class="relative mb-8 pt-12">
          <h1 class="text-3xl font-bold mb-2">Explore Nuxt Projects</h1>
          <p class="text-gray-600">
            Discover a collection of Nuxt projects, templates, and starters that are ready to use or
            learn from.
          </p>
        </div>
        <div class="grid grid-cols-1">
          <div class="space-y-2 self-start">
            <div class="flex items-center gap-2">
              <div>
                <UBadge class="rounded-full flex" size="lg">
                  <UIcon name="i-lucide-filter" />
                  <span class="text-gray-200">More filters</span>
                </UBadge>
              </div>
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
                @click="() => selectProject(project)"
              />
            </div>
          </section>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects } from '@@/data/all';
import type { Project } from '@@/types/project';

const modalOpen = ref(false);
const allProjects = ref(projects);
const selectedProject = ref<Project | null>(null);
const { category: selectedCategory, tags: selectedTags, search: searchQuery } = useFilterQuery();

function selectProject(project: Project) {
  console.log('Selected project:', project);
  selectedProject.value = project;
  modalOpen.value = true;
}

function openProjectUrl() {
  if (selectedProject.value?.url) {
    window.open(selectedProject.value.url, '_blank');
  }
}

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
