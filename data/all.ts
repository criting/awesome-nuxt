import type { Project } from '../types/project'
import { ai } from './ai'
import { template } from './template'
import { starter } from './starter'
import githubMetaJson from './github-meta.json'

const githubMeta = githubMetaJson as Record<string, Partial<Project>>

function slugifyName(name: string) {
  const baseSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${baseSlug}`
}


export const rawProjects: Project[] = [
  ...ai,
  ...template,
  ...starter
]

export const projects: Project[] = rawProjects.map((project) => {
  let finalImage = project.image;
  const githubData = project.url && githubMeta[project.url] ? githubMeta[project.url] : {}
  const slug = slugifyName(project.name)

  if (!finalImage && project.url && project.url.includes('github.com')) {
    finalImage = '/' + githubData?.image
  }

  return {
    ...project,
    slug,
    stars: githubData?.stars,
    lastUpdated: githubData?.lastUpdated,
    author: githubData?.author,
    image: finalImage
  }
})