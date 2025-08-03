import { writeFile } from 'fs/promises'
import { projects } from '@@/data/all'
import type { Project } from '@@/types/project'

function formatStars(stars?: number) {
  return stars ? `⭐ ${stars}` : ''
}

function formatDate(date?: string) {
  return date ? `🕒 Updated: ${date.slice(0, 10)}` : ''
}

function escapeMarkdown(text: string) {
  return text.replace(/\*/g, '\\*').replace(/_/g, '\\_')
}

function groupByCategory(projects: Project[]) {
  const grouped: Record<string, Project[]> = {}
  for (const project of projects) {
    const category = project.category || 'other'
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(project)
  }
  return grouped
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateMarkdown() {
  const lines: string[] = []

  lines.push('# Awesome Nuxt Projects\n')
  lines.push('A curated list of real-world projects built with Nuxt.')
  lines.push('> **Note:** This excludes Nuxt modules. Visit [modules.nuxt.com](https://modules.nuxt.com) for official modules.\n')

  const grouped = groupByCategory(projects)

  for (const [category, items] of Object.entries(grouped)) {
    lines.push(`## ${capitalize(category)}\n`)
    for (const project of items) {
      lines.push(
        `- [${project.name}](${project.url})  \n  *${escapeMarkdown(project.description)}*  \n  ${[
          formatStars(project.stars),
          formatDate(project.lastUpdated)
        ]
          .filter(Boolean)
          .join(' | ')}\n`
      )
    }
  }

  return lines.join('\n')
}

export default defineTask({
  meta: {
    name: 'Generate README.md',
    description: 'Builds a markdown file from the project list.',
  },
  async run() {
    const markdown = generateMarkdown()
    await writeFile('README.md', markdown)
    console.log('✅ README.md generated')
    return { result: undefined }
  },
})