import { writeFile } from 'fs/promises'
import { projects } from '@@/data/all'
import { resources } from '@@/data/resources/resources'
import type { Project } from '@@/types/project'
import { PROJECT_CATEGORIES } from '~~/types/category';
import type { CategorySlug } from '~~/types/category';

const OG_IMAGE = 'https://awesome-nuxt.dev/og-image.png'
const SITE_URL = 'https://awesome-nuxt.dev'

const tutorials = resources
  .filter((resource) => resource.type === 'tutorial')
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

const otherResources = resources
  .filter((resource) => resource.type !== 'tutorial')
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

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

function getCategory(category: CategorySlug) {
  return category
    ? PROJECT_CATEGORIES[category]
    : null;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function tutorialsSection() {
  const lines: string[] = []
  lines.push('## 📚 Tutorials\n')
  lines.push('Curated tutorials, guides, and video resources for Nuxt developers.\n')

  for (const t of tutorials) {
    lines.push(
      `- [${t.title}](${t.url}) \n`
    )
  }
  return lines.join('\n')
}

function resourcesSection() {
  const lines: string[] = []
  lines.push('## 🛠 Resources\n')
  lines.push('Helpful Nuxt resources, articles, and tools.\n')

  for (const r of otherResources) {
    lines.push(
      `- [${r.title}](${r.url}) \n`
    )
  }
  return lines.join('\n')
}

function generateMarkdown() {
  const lines: string[] = []

  lines.push(
    `<a href="${SITE_URL}" target="_blank" rel="noopener noreferrer">` +
    `<img src="${OG_IMAGE}" alt="Awesome Nuxt" width="100%" />` +
    `</a>\n`
  )

  lines.push('# 🚀 Awesome Nuxt\n')
  lines.push('A curated list of Nuxt projects, templates, and starters that actually work — ready for you to use or learn from.')
  lines.push('> **Note:** This excludes Nuxt modules. Visit [https://nuxt.com/modules](https://nuxt.com/modules) for official modules.\n')

  const grouped = groupByCategory(projects)

  for (const [category, items] of Object.entries(grouped)) {
    const cat = getCategory(category as CategorySlug);
    const catName = cat?.name ? capitalize(cat.name) : capitalize(category);
    lines.push(`## ${catName}\n`)
    for (const project of items) {
      lines.push(
        `- [${project.name}](${project.url})  \n  ${escapeMarkdown(project.description)}  \n`
      )
    }
  }

  lines.push('\n')
  lines.push(tutorialsSection())

  lines.push('\n')
  lines.push(resourcesSection())

  return lines.join('\n')
}

export default defineTask({
  meta: {
    name: 'Generate README.md',
    description: 'Builds a markdown file from the project list',
  },
  async run() {
    const markdown = generateMarkdown()
    await writeFile('README.md', markdown)
    console.log('✅ README.md generated')
    return { result: undefined }
  },
})