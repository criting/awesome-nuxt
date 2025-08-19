export function parseGitHubRepo(url?: string) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com') return null
    const [ , owner, repo ] = u.pathname.replace(/\/+$/,'').split('/')
    if (!owner || !repo) return null
    
    return { owner, repo: repo.replace(/\.git$/,'') }
  } catch { return null }
}

export function githubOgImage(url?: string) {
  const parsed = parseGitHubRepo(url)
  return parsed ? `https://opengraph.githubassets.com/1/${parsed.owner}/${parsed.repo}` : undefined
}