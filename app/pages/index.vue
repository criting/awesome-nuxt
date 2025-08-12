<template>
  <div>
    <ScrollToTop />
    <UModal
      v-if="selectedProject"
      v-model:open="modalOpen"
      fullscreen
      :ui="{ header: 'hidden' }"
      class="light:bg-white"
    >
      <template #body>
        <div
          class="w-full h-full absolute inset-0 bg-[url(/gradient.jpg)] bg-cover mix-blend-multiply -z-10 opacity-20"
        />
        <div class="max-w-3xl mx-auto px-4 py-8">
          <div class="flex gap-2 items-center cursor-pointer group" @click="modalOpen = false">
            <div
              class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
            >
              <UIcon name="i-lucide-arrow-left" class="text-white" />
            </div>
            Go back
          </div>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
            <div class="relative w-full px-12 py-8 group transition-all">
              <div
                class="absolute top-0 w-full h-full bg-[url(/gradient.jpg)] bg-cover left-0 -z-[10] opacity-100 rounded-lg"
              />
              <div
                class="absolute top-0 w-full h-full bg-[url(/gradient-orange.jpg)] bg-cover left-0 -z-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
              />
              <ProjectImage
                :image="selectedProject.image"
                :name="selectedProject.name"
                :description="selectedProject.description"
                class="z-10"
              />
            </div>

            <div>
              <div class="mt-2">
                <h5 class="text-sm font-semibold mb-2">Tags</h5>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in selectedProject.tags"
                    :key="tag"
                    color="secondary"
                    size="sm"
                    variant="soft"
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

                <div v-if="selectedProject.url" class="mt-4">
                  <div class="flex gap-2 items-center cursor-pointer group" @click="openProjectUrl">
                    <div
                      class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
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
    <div class="relative flex flex-col items-center justify-center h-screen bg-no-repeat">
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/hero-bg.svg)] bg-cover bg-no-repeat lg:bg-center"
      />
      <div
        class="absolute top-0 left-0 inset-0 bg-[url(/dots.svg)] bg-contain opacity-[0.03] dark:opacity-10"
      />
      <div
        class="absolute -top-[90px] bg-linear-to-b from-transparent to-white -z-0 h-[100px] w-full bg-no-repeat opacity-50 dark:hidden"
      />
      <div
        class="absolute bottom-0 bg-linear-to-b from-transparent to-white -z-0 h-[300px] w-full bg-no-repeat opacity-50 dark:hidden"
      />

      <UContainer>
        <UPageHero
          :headline="projects.length + ' Projects'"
          title="Nuxt Projects That Deliver"
          description="A curated list of Nuxt projects, templates, and starters that actually work — ready for
          you to use or learn from."
          :ui="{
            container: 'lg:py-60',
            headline:
              'bg-secondary text-white rounded-full px-4 py-2 mb-4 inline-block text-xs font-semibold'
          }"
        >
          <template #links>
            <div class="flex gap-2 items-center cursor-pointer group">
              <div
                class="bg-primary group-hover:bg-secondary flex justify-center p-2 rounded-full transition-colors duration-200"
              >
                <UIcon :name="'i-lucide-arrow-right'" class="text-white" />
              </div>
              Explore projects
            </div>
          </template>
        </UPageHero>
      </UContainer>
    </div>
    <section class="relative">
      <div
        class="absolute inset-0 bg-[url(/gradient.jpg)] bg-cover bg-no-repeat -z-10 mx-auto h-[500px] w-full xl:w-[95%] xl:rounded-lg"
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
                @view="selectProject"
              />
            </div>
          </section>

          <section>
            <UPageSection title="FAQ" description="Have questions? We have answers!" />
            <UPageAccordion :items="faqItems" class="max-w-2xl mx-auto" />
          </section>

          <section class="mt-24">
            <UPageCTA
              title="Know an awesome Nuxt project?"
              description="Share it with the community!"
              :links="ctaLinks"
            />
          </section>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects } from '@@/data/all';
import type { ButtonProps } from '@nuxt/ui';

import type { Project } from '@@/types/project';

const ctaLinks = ref<ButtonProps[]>([
  {
    label: 'Contribute',
    color: 'neutral',
    trailingIcon: 'i-lucide-arrow-right',
    to: 'https://www.figma.com/community/file/1288455405058138934',
    target: '_blank'
  }
]);

const faqItems = ref([
  {
    label: 'What is Awesome Nuxt?',
    content:
      'Awesome Nuxt is a curated collection of high-quality, real-world projects built with Nuxt. Unlike the official modules directory, this site focuses on complete apps, templates, and starters that you can learn from, adapt, or launch.'
  },
  {
    label: 'Does this site include Nuxt modules?',
    content:
      'No. Nuxt modules already have an official directory at modules.nuxt.com. Our focus is on full projects and templates that showcase how Nuxt is used in production or creative builds.'
  },
  {
    label: 'How are projects selected?',
    content:
      'All projects are hand-picked based on quality, usefulness, and inspiration value. We check for active maintenance, clean code, and relevance to the Nuxt ecosystem.'
  },
  {
    label: 'Can I submit my own project?',
    content:
      'Yes! We welcome community contributions. Check the GitHub repository for guidelines on how to submit your project.'
  },
  {
    label: 'Do you show project stats like GitHub stars?',
    content:
      'Yes. We pull GitHub metadata like stars and last updated dates using a cached update process. This helps you see which projects are popular and actively maintained.'
  },
  {
    label: 'Is this an official Nuxt project?',
    content:
      'No. This is an independent, community-driven initiative created to complement the official Nuxt resources by showcasing inspiring real-world projects.'
  },
  {
    label: 'Will you add tips, snippets, and other resources?',
    content:
      'Yes! In the future, we plan to expand the project — adding curated tips, code snippets, and learning resources alongside projects.'
  }
]);

const modalOpen = ref(false);
const allProjects = ref(projects);
const selectedProject = ref<Project | null>(null);
const { category: selectedCategory, tags: selectedTags, search: searchQuery } = useFilterQuery();

function selectProject(project: Project) {
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
