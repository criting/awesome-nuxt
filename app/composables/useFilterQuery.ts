import { useRoute, useRouter } from 'vue-router'

export function useFilterQuery() {
  const route = useRoute()
  const router = useRouter()

  const category = ref(route.query.category?.toString() || 'all')

  const tags = ref<string[]>(
    Array.isArray(route.query.tags)
      ? route.query.tags.map(String)
      : route.query.tags
      ? [route.query.tags.toString()]
      : []
  )

  const search = ref(route.query.q?.toString() || '')

  watch([category, tags, search], () => {
    const query: Record<string, string | string[]> = {}

    if (category.value !== 'all') query.category = category.value
    if (tags.value.length > 0) query.tags = tags.value
    if (search.value) query.q = search.value

    router.replace({ query })
  })

  return {
    category,
    tags,
    search
  }
}