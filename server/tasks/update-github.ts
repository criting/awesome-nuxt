import { $fetch } from 'ofetch'
import { join } from 'pathe'
import fsExtra from 'fs-extra'
import { projects } from '@@/data/all'

const { writeFile, readFile, existsSync } = fsExtra

export default defineTask({
  meta: {
    name: 'Update GitHub metadata',
    description: 'Fetch stars and lastUpdated for projects with GitHub repos',
  },
async run() {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

  const cachePath = join('data', 'github-meta.json')
  const cache: Record<string, { stars: number; lastUpdated: string }> = existsSync(cachePath)
    ? JSON.parse(await readFile(cachePath, 'utf8'))
    : {}

  async function fetchMetadata(repoUrl: string) {
    const [, owner, repo] = new URL(repoUrl).pathname.split('/')
    try {
      const data = await $fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      return {
        stars: data.stargazers_count,
        lastUpdated: data.updated_at,
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`❌ ${repoUrl}: ${error?.response?._data?.message || error.message}`)
      return null
    }
  }

  for (const project of projects) {
    if (!project.url || !project.url.includes('github.com')) {
      continue
    }

    if (cache[project.url]) {
      console.log(`✔ Cached: ${project.url}`)
      continue
    }

    const meta = await fetchMetadata(project.url)
    if (meta) {
      cache[project.url] = meta
      console.log(`✅ Updated: ${project.url}`)
    }
  }

  await writeFile(cachePath, JSON.stringify(cache, null, 2))
  console.log(`\n💾 Cached ${Object.keys(cache).length} repos to ${cachePath}`)
  return { result: undefined }
},
})

