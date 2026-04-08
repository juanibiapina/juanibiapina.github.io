# AGENTS.md

Personal blog of Juan Ibiapina, built on [AstroPaper v5.5.1](https://github.com/satnaing/astro-paper). Deployed to GitHub Pages via `withastro/action@v5`.

## Reference Site

[steipete.me](https://steipete.me) uses the same AstroPaper theme and served as the design reference for layout, typography, and styling. Its source is at `/Users/juan.ibiapina/workspace/steipete/steipete.me`. When making visual or structural changes, check how steipete.me handles it first.

## New Blog Post Workflow

1. Create file: `src/data/blog/YYYY-MM-DD-slug.md`
2. Required frontmatter:

```yaml
---
title: "Post title"
description: "Short description for SEO and card previews"
pubDatetime: 2025-01-15T00:00:00Z
tags:
  - blog
---
```

Optional frontmatter fields: `author`, `modDatetime`, `featured`, `draft`, `ogImage`, `canonicalURL`, `hideEditPost`, `timezone`.

## Key Files

- `src/config.ts` - Site identity, author, feature flags (`showArchives`, `postPerPage`, etc.)
- `src/constants.ts` - Social links and share links
- `astro.config.ts` - Astro/Vite config, markdown plugins, shiki themes
- `src/content.config.ts` - Blog collection schema
- `src/styles/global.css` - Theme colors and base styles
- `src/styles/typography.css` - Prose and code block styling

## Commands

- `npm run dev` - Dev server at localhost:4321
- `npm run build` - Runs `astro build`, then `pagefind --site dist`
- `npm run preview` - Preview production build locally
