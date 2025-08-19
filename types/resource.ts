type PlatformSlug =
  | 'youtube'
  | 'devto'
  | 'medium'
  | 'other'
  ;

export type ResourcePlatform = {
  slug: PlatformSlug
  name: string
  icon: string
}

export const RESOURCE_PLATFORMS: Record<PlatformSlug, ResourcePlatform> = {
  youtube: { 
    slug: 'youtube',
    name: 'YouTube',
    icon: 'i-custom-youtube-logo'
  },
  devto: {
    slug: 'devto',
    name: 'Dev.to',
    icon: 'i-custom-dev-logo'
  },
  medium: {
    slug: 'medium',
    name: 'Medium',
    icon: 'i-custom-medium-logo'
  },
  other: {
    slug: 'other',
    name: 'Other',
    icon: 'i-lucide-globe'
  }
}


export type Resource = {
  url: string
  title?: string
  description?: string
  image?: string
  author?: string,
  featured?: boolean
  platform?: PlatformSlug
  lastChecked?: string
  type?: 'tutorial' | 'read'
}