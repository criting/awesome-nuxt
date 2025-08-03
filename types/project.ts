export type Project = {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  image?: string;
  premium?: boolean;
  stars?: number;
  lastUpdated?: string;
};