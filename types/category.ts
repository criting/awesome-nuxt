export type CategorySlug =
  | 'starter'
  | 'ai'
  | 'template'

export type ProjectCategory = {
  slug: CategorySlug
  name: string
  icon: string
}

export const PROJECT_CATEGORIES: Record<CategorySlug, ProjectCategory> = {
  starter: { 
        slug: 'starter',
        name: 'Starter Kits',
        icon: 'i-lucide-rocket'
  },
  ai: {
        slug: 'ai',
        name: 'AI & Chatbots',
        icon: 'i-lucide-bot'
  },
  template: {
        slug: 'template',
        name: 'Templates',
        icon: 'i-lucide-file-text'
  },
}