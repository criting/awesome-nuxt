## 🤝 Contributing

You can contribute in two ways:

1. Open an **Issue** with the project you want added.
2. Open a **Pull Request** with your changes.

### Local setup

```bash
git clone <your-repo-url>
cd <repo>
pnpm install
```

### Add a project

- Add your project to the appropriate file in `data/` (or create a new one to introduce a new category).
- Ensure entries follow the `Project` type in `types/project.ts`.

### GitHub metadata

Add your token to `.env`:

```bash
GITHUB_TOKEN=ghp_xxx
```

Run the Nitro tasks:

```bash
# Fetch stars + last updated and cache them
pnpm nuxi task update-github

# Regenerate README from data
pnpm nuxi task generate-readme
```

This will pull **stars** and **last updated** from GitHub for GitHub URLs and refresh the **README.md**.

### Submit your PR

Create a Pull Request. We’ll review for quality, relevance, and metadata completeness.
