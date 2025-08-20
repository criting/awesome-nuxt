import { $fetch } from 'ofetch'
import { join } from 'pathe'
import fsExtra from 'fs-extra'
import { projects } from '@@/data/all'

const { writeFile, readFile, existsSync, ensureDir } = fsExtra

export default defineTask({
  meta: {
    name: 'Update GitHub metadata',
    description: 'Fetch stars, lastUpdated, author and download OG image for projects with GitHub repos',
  },
  async run () {
    const token = process.env.GITHUB_TOKEN
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

    const cachePath = join('data', 'github-meta.json')
    const cache: Record<string, {
      stars: number
      lastUpdated: string
      author: string
      image?: string
    }> = existsSync(cachePath)
      ? JSON.parse(await readFile(cachePath, 'utf8'))
      : {}

    const ogDir = join('public', 'og-images')
    await ensureDir(ogDir)

    async function fetchMetadata(repoUrl: string) {
      const [, owner, repo] = new URL(repoUrl).pathname.split('/')
      try {
        const data = await $fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
        const ogUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`

        const filename = `${owner}-${repo}.png`
        const filepath = join(ogDir, filename)

        if (!existsSync(filepath)) {
          console.log(`⬇️ Downloading OG image for ${owner}/${repo}`)
          const res = await $fetch.raw(ogUrl, { responseType: 'arrayBuffer' })
          if (res._data && res._data instanceof ArrayBuffer) {
            await fsExtra.writeFile(filepath, Buffer.from(new Uint8Array(res._data)))
          } else {
            throw new Error('Failed to download OG image: response data is not an ArrayBuffer')
          }
        }

        return {
          stars: data.stargazers_count,
          lastUpdated: data.updated_at,
          author: data.owner?.login || '',
          image: `og-images/${filename}`, // relative path for frontend
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