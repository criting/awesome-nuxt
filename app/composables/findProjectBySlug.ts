import { projects } from '@@/data/all';

export function findProjectBySlug(slug: string) {
    return projects.find(project => project.slug === slug);
}