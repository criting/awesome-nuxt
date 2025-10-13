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

type YTOEmbed = {
  title: string
  author_name: string
  thumbnail_url: string
}

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

/** Given a YouTube thumbnail URL (hq or maxres), upgrade to maxres if it exists */
async function headOk(url: string) {
  try {
    const res = await $fetch.raw(url, { method: 'HEAD' })
    return res.status === 200
  } catch { return false }
}

async function bestYouTubeThumbFromId(id: string) {
  const hi = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  if (await headOk(hi)) return hi
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

async function bestYouTubeThumbFromUrl(url: string) {
  // upgrade hq → maxres when available
  const hi = url.replace('/hqdefault.jpg', '/maxresdefault.jpg')
  return (hi !== url && await headOk(hi)) ? hi : url
}

async function fetchHTML(
  url: string
): Promise<{ html: string | null; status?: number; error?: string }> {
  try {
    const res = await $fetch.raw(url, {
      headers: {
        'user-agent': randomUA(),
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache'
      },
      redirect: 'follow',
      responseType: 'text',     // <- important: return text
      timeout: 20000
    })

    if (res.status >= 200 && res.status < 400) {
      // _data is the text body when responseType:'text'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { html: (res as any)._data as string, status: res.status }
    }
    return { html: null, status: res.status, error: res.statusText || `status ${res.status}` }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // ofetch error may carry response/status
    const status = err?.response?.status
    const statusText = err?.response?.statusText
    return { html: null, status, error: statusText || err?.message || 'network error' }
  }
}

/** YouTube oEmbed (title + thumbnail). Thumbnail is upgraded via HEAD check. */
async function fetchYouTubeMeta(videoUrl: string): Promise<{ title?: string; image?: string; author?: string } | null> {
  const id = ytId(videoUrl)

  try {
    const data = await $fetch<YTOEmbed>(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json&hl=en`,
      { headers: { 'user-agent': randomUA(), accept: 'application/json' } }
    )

    let image = data.thumbnail_url
    if (image) image = await bestYouTubeThumbFromUrl(image)
    if (!image && id) image = await bestYouTubeThumbFromId(id)

    return { title: data.title, author: data.author_name, image }
  } catch {
    // fall through to ID-only fallback
  }

  if (id) {
    // oEmbed can fail for shorts/age‑restricted/unlisted/region‑blocked/rate‑limited videos
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
  return age > ms(TTL_DAYS) || !!entry.error
}

export default defineTask({
  meta: { name: 'enrich-resources', description: 'Fetch OG tags w/ cache, logs, throttling + YouTube maxres fallback.' },
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
          console.log(meta || 'YouTube meta', url);
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