import { PROJECT_CATEGORIES, type CategorySlug, type ProjectCategory } from '@@/types/category'

export function useCategory(slug: CategorySlug | string | undefined) {
  const category = computed<ProjectCategory>(() => {
    const key = (slug || 'other') as CategorySlug
    return PROJECT_CATEGORIES[key] ?? ''
  })
  return { category }
}

export function useCategoryIcon(slug: CategorySlug | string | undefined) {
  const { category } = useCategory(slug)
  const icon = computed(() => category.value.icon)
  const name = computed(() => category.value.name)
  return { icon, name, category }
}

export function useAllCategories() {
  const all = computed<ProjectCategory[]>(() => Object.values(PROJECT_CATEGORIES))
  const bySlug = (s: CategorySlug | string) => PROJECT_CATEGORIES[s as CategorySlug] ?? ''
  return { all, bySlug }
}