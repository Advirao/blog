# Knowledge Base — Claude Project Context

## Project Overview
Interactive blog/knowledge-base built with Next.js 14 (App Router), Tailwind CSS, and TypeScript.
Hosts interactive HTML simulations on Oil Trading and Generative AI Engineering.

## Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom dark-terminal theme
- **Package manager**: pnpm
- **Language**: TypeScript (strict)
- **Fonts**: IBM Plex Sans, IBM Plex Mono, Bebas Neue (Google Fonts)

## Color Palette (never change these)
```
--bg: #0a0e14        (page background)
--surface: #111820   (card background)
--surface2: #1a2332  (inner card / code bg)
--border: #1e3a52    (all borders)
--accent: #00c896    (green — primary CTA, success)
--gold: #f5a623      (gold — warnings, secondary accent)
--danger: #ff4d6d    (red — errors, risk indicators)
--blue: #378ADD      (blue — informational)
--text: #c8d8e8      (primary text)
--text2: #6a8aaa     (secondary / muted text)
--white: #e8f4ff     (headings, near-white)
```

## Architecture
```
src/
  app/           — Next.js App Router pages
  components/
    layout/      — SiteHeader, SiteFooter
    ui/          — Atomic: Button, Badge, SearchBar
    content/     — Domain: PostCard, CategoryFilter, DownloadButton, SimulatorFrame
  lib/
    posts.ts     — Central content registry (ALL posts defined here)
    types.ts     — Shared TypeScript types
    utils.ts     — cn(), formatDate(), slugify()
  hooks/
    useFilter.ts — Client-side category/tag filtering

public/
  simulations/   — Original HTML simulation files (served statically)

scripts/
  ingest-html.ts — CLI to index new HTML files into the registry
```

## Key Conventions
1. All posts are registered in `src/lib/posts.ts` — single source of truth
2. Simulation files live in `public/simulations/` — served as static assets
3. Article pages use `SimulatorFrame` component to embed via iframe
4. Category slugs: `oil-trading`, `genai` — lowercase-kebab only
5. Never use `dangerouslySetInnerHTML` — use iframes for untrusted HTML
6. All colors via CSS variables or Tailwind custom classes (not arbitrary values)
7. Run `pnpm ingest` after adding new HTML simulation files

## Adding New Content
Quickest way: drop the HTML file in `public/simulations/` and run `/publish` — it handles metadata, posts.ts, validation, commit, and push interactively.

Manual guide: see `.claude/skills/add-post.md`.

## Slash Commands
- `/publish` — interactive workflow to publish a new simulator end-to-end

## Deployment
- GitHub Pages — auto-deploys on push to `main` via GitHub Actions
- Workflow at `.github/workflows/deploy.yml`
- `NEXT_PUBLIC_BASE_PATH=/blog` is set in CI only — do NOT set it locally
