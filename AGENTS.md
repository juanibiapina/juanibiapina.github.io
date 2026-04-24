# AGENTS.md

Personal blog of Juan Ibiapina, built on [AstroPaper v5.5.1](https://github.com/satnaing/astro-paper). Deployed to GitHub Pages via `withastro/action@v5`.

## Reference Site

[steipete.me](https://steipete.me) uses the same AstroPaper theme and served as the design reference for layout, typography, and styling. Its source is at `/Users/juan.ibiapina/workspace/steipete/steipete.me`. When making visual or structural changes, check how steipete.me handles it first.

## New Blog Post Workflow

1. Create file: `src/data/blog/YYYY-MM-DD-slug.md`
2. Store post images in `src/assets/blog/<slug>/`
3. Required frontmatter:

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

### Image Conventions

- Keep markdown posts in `src/data/blog/`
- Keep post images in `src/assets/blog/<slug>/`
- Use `ogImage` for the hero image. It drives the post hero (rendered at the top via Astro `<Image>` as WebP) and social previews. Post lists are text-only; they do not render `ogImage`.
- Keep source images at ≤ 1600 px wide and ≤ ~120 KB; Astro emits responsive WebP at build time.
- Example:

```yaml
ogImage: "../../assets/blog/paper-first/hero.jpg"
```

## Key Files

- `src/config.ts` - Site identity, author, feature flags (`postPerPage`, `lightAndDarkMode`, etc.)
- `src/constants.ts` - Social links and share links
- `astro.config.ts` - Astro/Vite config, markdown plugins, shiki themes
- `src/content.config.ts` - Blog collection schema
- `src/styles/global.css` - Theme colors and base styles
- `src/styles/typography.css` - Prose and code block styling

## Commands

- `npm run dev` - Dev server at localhost:4321
- `npm run build` - Runs `astro build`, then `pagefind --site dist`
- `npm run preview` - Preview production build locally
