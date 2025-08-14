import { projects } from '~~/data/all'
import type { Project } from '@@/types/project'

type SimilarOptions = {
  limit?: number
  sameCategoryOnly?: boolean
}

export function useSimilarProjects() {
  function score(a: Project, b: Project) {
    let s = 0

    if (a.category === b.category) s += 10

    const aTags = new Set((a.tags || []).map(t => t.toLowerCase()))
    const bTags = new Set((b.tags || []).map(t => t.toLowerCase()))
    let overlap = 0
    for (const t of aTags) if (bTags.has(t)) overlap++
    s += overlap

    if (typeof b.stars === 'number') s += Math.min(2, Math.floor(b.stars / 1000))

    return s
  }

  function getSimilar(target: Project | null | undefined, opts: SimilarOptions = {}) {
    const limit = opts.limit ?? 4
    if (!target) return []

    const pool = projects.filter(p => p.slug !== target.slug)

    const sameCat = pool.filter(p => p.category === target.category)
    const rankedSame = sameCat.sort((x, y) => score(target, y) - score(target, x))
    const result: Project[] = rankedSame.slice(0, limit)

    if (opts.sameCategoryOnly || result.length >= limit) return result

    const picked = new Set(result.map(p => p.slug))
    const rest = pool.filter(p => !picked.has(p.slug!))
    const rankedRest = rest
      .map(p => ({ p, s: score(target, p) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.p)

    return [...result, ...rankedRest].slice(0, limit)
  }

  function useSimilarComputed(target: Ref<Project | null | undefined>, opts?: SimilarOptions) {
    return computed(() => getSimilar(target.value, opts))
  }

  return { getSimilar, useSimilarComputed }
}