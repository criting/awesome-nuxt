import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { $fetch } from 'ofetch'
import type { Resource } from '@@/types/resource'

const SEED_PATH = 'data/resources/resources.json'
const OUT_TS = 'data/resources/resources.ts'
const CACHE_PATH = 'data/resources/resources.cache.json'

const TTL_DAYS = Number(process.env.RESOURCES_TTL_DAYS || 7)
const FORCE = process.env.RESOURCES_FORCE === '1'
const THROTTLE_MS = Number(process.env.RESOURCES_THROTTLE_MS || 1000) // 1 req/sec

const UAS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'
]
const randomUA = () => UAS[Math.floor(Math.random() * UAS.length)]

const ms = (days: number) => days * 24 * 60 * 60 * 1000
const sleep = (n: number) => new Promise(r => setTimeout(r, n))

function abs(base: string, src?: string | null) {
  if (!src) return null
  try { return new URL(src, base).toString() } catch { return null }
}

function isYouTube(u: string) {
  try {
    const { hostname, pathname, searchParams } = new URL(u)
    return (/(^|\.)youtube\.com$/).test(hostname) && pathname === '/watch' && searchParams.has('v')
        || (/^([^/]+\.)?youtu\.be$/).test(hostname)
  } catch { return false }
}

function ytId(u: string): string | null {
  try {
    const url = new URL(u)
    if ((/^([^/]+\.)?youtu\.be$/).test(url.hostname)) {
      return url.pathname.split('/')[1] || null
    }
    if ((/(^|\.)youtube\.com$/).test(url.hostname)) {
      return url.searchParams.get('v')
    }
  } catch { /* empty */ }
  return null
}

function normalizeUrl(url: string) {
  try {
    const u = new URL(url)
    if ((/(^|\.)youtube\.com$/).test(u.hostname) && u.searchParams.has('v')) {
      const v = u.searchParams.get('v')!
      u.search = ''
      u.searchParams.set('v', v)
      return u.toString()
    }
    return url
  } catch { return url }
}

/** HEAD check utility: returns true if URL is reachable (2xx) */
async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await $fetch(url, {
      method: 'HEAD',
      headers: { 'user-agent': randomUA() }
    })
    return res.statusCode >= 200 && res.statusCode < 300
  } catch {
    return false
  }
}

/** Given a YouTube thumbnail URL (hq or maxres), upgrade to maxres if it exists */
async function bestYouTubeThumbFromUrl(thumbUrl: string): Promise<string> {
  try {
    const u = new URL(thumbUrl)
    if (u.hostname !== 'i.ytimg.com') return thumbUrl
    const max = thumbUrl.replace('/hqdefault.jpg', '/maxresdefault.jpg')
    return (await urlExists(max)) ? max : thumbUrl
  } catch {
    return thumbUrl
  }
}

/** Given a video id, choose best available thumbnail (maxres then hq) */
async function bestYouTubeThumbFromId(id: string): Promise<string> {
  const max = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  if (await urlExists(max)) return max
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

async function fetchHTML(url: string): Promise<{ html: string | null; status?: number; error?: string }> {
  try {
    const res = await $fetch(url, {
      headers: {
        'user-agent': randomUA(),
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache'
      },
    })
    const status = res.statusCode
    if (status >= 200 && status < 400) {
      return { html: await res.body.text(), status }
    }
    return { html: null, status, error: `status ${status}` }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { html: null, error: err?.message || 'network error' }
  }
}

/** YouTube oEmbed (title + thumbnail). Thumbnail is upgraded via HEAD check. */
async function fetchYouTubeMeta(videoUrl: string): Promise<{ title?: string; image?: string; author?: string } | null> {
  try {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json&hl=en`
    const res = await $fetch(oembed, {
      headers: { 'user-agent': randomUA(), 'accept': 'application/json' },
    })
    if (res.statusCode >= 200 && res.statusCode < 400) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json = await res.body.json() as any
      let image = json?.thumbnail_url as string | undefined
      if (image) image = await bestYouTubeThumbFromUrl(image)
      // If for some reason that failed, try via id
      if (!image) {
        const id = ytId(videoUrl)
        if (id) image = await bestYouTubeThumbFromId(id)
      }
      return {
        title: json?.title,
        image,
        author: json?.author_name
      }
    }
  } catch { /* ignore */ }

  // Fallback only by ID
  const id = ytId(videoUrl)
  if (id) {
    return { image: await bestYouTubeThumbFromId(id) }
  }
  return null
}

function pick(html: string, base: string) {
  const q = (re: RegExp) => html.match(re)?.[1]?.trim()

  const title =
    q(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
    q(/<meta[^>]+name=["']title["'][^>]+content=["']([^"']+)["']/i) ||
    q(/<title[^>]*>([^<]+)<\/title>/i) ||
    q(/<h1[^>]*>(.*?)<\/h1>/i)?.replace(/<[^>]+>/g, '')

  const desc =
    q(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
    q(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    q(/<p[^>]*>(.*?)<\/p>/i)?.replace(/<[^>]+>/g, '')

  const img = abs(
    base,
    q(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    q(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i)
  )

  // Keep as-is here; YouTube pages are handled via oEmbed path

  return { title, desc, img }
}

type CacheEntry = Resource & { cachedAt: string; error?: string }
type CacheMap = Record<string, CacheEntry>

function shouldRefresh(entry?: CacheEntry) {
  if (FORCE || !entry) return true
  const age = Date.now() - new Date(entry.cachedAt).getTime()
  return age > ms(TTL_DAYS)
}

export default defineTask({
  meta: { name: 'enrich-resources', description: 'Fetch OG tags w/ cache, logs, throttling + YouTube maxres fallback' },
  async run() {
    const raw = await readFile(SEED_PATH, 'utf8')
    const seed: Array<Pick<Resource, 'url' | 'featured' | 'type'>> = JSON.parse(raw)
    if (!Array.isArray(seed)) throw new Error('Seed must be an array')

    const cache: CacheMap = existsSync(CACHE_PATH)
      ? JSON.parse(await readFile(CACHE_PATH, 'utf8'))
      : {}

    const out: Resource[] = []
    let skipped = 0, refreshed = 0, failed = 0
    const failures: Array<{ url: string; reason: string }> = []

    for (const item of seed) {
      const url = normalizeUrl(item.url)
      const featured = item.featured
      const type = item.type || 'read'
      const cached = cache[url]

      if (!shouldRefresh(cached)) {
        out.push({
          url,
          type: cached?.type,
          featured: cached?.featured || false,
          title: cached.title,
          description: cached.description,
          image: cached.image,
          platform: cached.platform,
          lastChecked: cached.lastChecked
        })
        skipped++
        continue
      }

      let title: string | undefined
      let description: string | undefined
      let image: string | undefined
      const platform: Resource['platform'] =
        /youtube\.com|youtu\.be/.test(url) ? 'youtube'
      : /dev\.to/.test(url) ? 'devto'
      : /medium\.com/.test(url) ? 'medium'
      : 'other'

      if (isYouTube(url)) {
        const meta = await fetchYouTubeMeta(url)
        if (!meta) {
          failures.push({ url, reason: 'youtube oembed/thumbnail failed' })
        } else {
          title = meta.title || cached?.title
          image = meta.image || cached?.image
          description = cached?.description // oEmbed has no description
        }
      } else {
        const { html, status, error } = await fetchHTML(url)
        if (!html) {
          const reason = error || `status ${status ?? 'unknown'}`
          console.warn(`❌ Fetch failed: ${url} (${reason})`)
          failures.push({ url, reason })

          if (cached) {
            out.push({
              url,
              type: cached.type,
              featured: cached.featured || false,
              title: cached.title,
              description: cached.description,
              image: cached.image,
              platform: cached.platform,
              lastChecked: cached.lastChecked
            })
            cache[url] = {
              ...cached,
              featured: cached.featured || false,
              cachedAt: new Date().toISOString(),
              lastChecked: new Date().toISOString(),
              error: reason
            }
          } else {
            out.push({ url, lastChecked: new Date().toISOString() })
            cache[url] = {
              url,
              type: type,
              featured: featured || false,
              cachedAt: new Date().toISOString(),
              lastChecked: new Date().toISOString(),
              error: reason
            } as CacheEntry
          }
          failed++
          await sleep(THROTTLE_MS)
          continue
        }

        const picked = pick(html, url)
        title = picked.title || cached?.title
        description = picked.desc || cached?.description
        image = picked.img || cached?.image
      }

      const entry: CacheEntry = {
        url,
        type,
        featured,
        title,
        description,
        image,
        platform,
        lastChecked: new Date().toISOString(),
        cachedAt: new Date().toISOString()
      }

      cache[url] = entry
      out.push({
        url,
        type,
        featured,
        title: entry.title,
        description: entry.description,
        image: entry.image,
        platform: entry.platform,
        lastChecked: entry.lastChecked
      })
      refreshed++

      await sleep(THROTTLE_MS)
    }

    await writeFile(
      OUT_TS,
      `import type { Resource } from '../../types/resource'\n` +
      `export const resources: Resource[] = ${JSON.stringify(out, null, 2)}\n`
    )
    await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2))

    if (failures.length) {
      console.log('\n---- Failures ----')
      for (const f of failures) console.log(`- ${f.url} → ${f.reason}`)
      console.log('------------------\n')
    }
    console.log(`✅ resources: ${out.length} | ♻️ refreshed: ${refreshed} | ⏭️ skipped: ${skipped} | ❌ failed: ${failed}`)

    return { result: { total: out.length, refreshed, skipped, failed, failures } }
  }
})