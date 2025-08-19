import type { CategorySlug } from './category'

export type Project = {
  slug?: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: CategorySlug;
  image?: string;
  premium?: boolean;
  stars?: number;
  lastUpdated?: string;
  author?: string;
  featured?: boolean;
};