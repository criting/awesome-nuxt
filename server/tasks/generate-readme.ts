import { writeFile } from 'fs/promises'
import { projects } from '@@/data/all'
import type { Project } from '@@/types/project'

const OG_IMAGE = 'https://awesome-nuxt.dev/og-image.png'
const SITE_URL = 'https://awesome-nuxt.dev'

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

function contributingSection() {
  return `
## 🤝 Contributing

You can contribute in two ways:

1) Open an **Issue** with the project you want added.  
2) Open a **Pull Request** with your changes.

### Local setup

\`\`\`bash
git clone <your-repo-url>
cd <repo>
pnpm install
\`\`\`

### Add a project

- Add your project to the appropriate file in \`data/\` (or create a new one to introduce a new category).  
- Ensure entries follow the \`Project\` type in \`types/project.ts\`.

### GitHub metadata

Add your token to \`.env\`:

\`\`\`bash
GITHUB_TOKEN=ghp_xxx
\`\`\`

Run the Nitro tasks:

\`\`\`bash
# Fetch stars + last updated and cache them
pnpm nuxi task update-github

# Regenerate README from data
pnpm nuxi task generate-readme
\`\`\`

This will pull **stars** and **last updated** from GitHub for GitHub URLs and refresh the **README.md**.

### Submit your PR

Create a Pull Request. We’ll review for quality, relevance, and metadata completeness.
`.trim()
}

function generateMarkdown() {
  const lines: string[] = []

  lines.push(
    `<a href="${SITE_URL}" target="_blank" rel="noopener noreferrer">` +
    `<img src="${OG_IMAGE}" alt="Awesome Nuxt" width="1200" />` +
    `</a>\n`
  )

  lines.push('# Awesome Nuxt\n')
  lines.push('A curated list of Nuxt projects, templates, and starters that actually work — ready for you to use or learn from.')
  lines.push('> **Note:** This excludes Nuxt modules. Visit [modules.nuxt.com](https://nuxt.com/modules) for official modules.\n')

  const grouped = groupByCategory(projects)

  for (const [category, items] of Object.entries(grouped)) {
    lines.push(`## ${capitalize(category)}\n`)
    for (const project of items) {
      lines.push(
        `- [${project.name}](${project.url})  \n  ${escapeMarkdown(project.description)}  \n`
      )
    }
  }

  lines.push('\n')
  lines.push(contributingSection())

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