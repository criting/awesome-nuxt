import type { CategorySlug } from './category'

export type CategoryOption = {
  slug: 'all' | CategorySlug
  name: string
  icon: string
}