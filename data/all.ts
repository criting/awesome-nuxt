import type { Project } from '../types/project'
import { ai } from './ai'
import { portfolio } from './portfolio'
import { starter } from './starter'
import githubMetaJson from './github-meta.json'

const githubMeta = githubMetaJson as Record<string, Partial<Project>>

export const rawProjects: Project[] = [
  ...ai,
  ...portfolio,
  ...starter
]

export const projects: Project[] = rawProjects.map((project) => {
  if (project.url && githubMeta[project.url]) {
    return {
      ...project,
      stars: githubMeta[project.url]?.stars,
      lastUpdated: githubMeta[project.url]?.lastUpdated,
      author: githubMeta[project.url]?.author
    }
  }
  return project
})