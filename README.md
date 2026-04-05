# KB — Interactive Learning Modules

> Interactive simulators on crude oil trading mechanics and generative AI engineering.
> Every number derived from scratch — use sliders to simulate your own position.

[![Build](https://img.shields.io/github/actions/workflow/status/your-username/your-repo/deploy.yml?branch=main&style=flat-square&label=build)](https://github.com/your-username/your-repo/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tests](https://img.shields.io/badge/tests-117%20passing-brightgreen?style=flat-square)](./tests)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

---

## Overview

Six fully self-contained HTML simulations embedded as sandboxed iframes — no rewriting, no conversion, full interactivity preserved. The site shell is a Next.js 14 App Router application with static generation, giving you fast load times and zero runtime dependencies.

**Topics covered:**

| Category | Modules |
|---|---|
| 🛢️ Oil Trading | Crude Oil Trading Simulator · Exposure Report · Daily Trading Reports · Freight & Logistics |
| 🤖 GenAI Engineering | Curriculum Phases 1–3 (Python → RAG) · Phases 4–6 (Tool Use → Agents) |

---

## Features

- **Live simulators** — interactive sliders, charts, and calculators in every module
- **Static generation** — all 12 pages pre-rendered at build time, no server required
- **Download any simulator** — one-click download of any HTML file for offline use
- **Fullscreen mode** — expand any simulator to fill the viewport
- **Search & filter** — filter by category, difficulty, or keyword across all modules
- **Dark terminal theme** — custom Tailwind palette matching the simulator aesthetic
- **CI/CD** — GitHub Actions → Vercel auto-deploy on push to `main`
- **117 tests** — Jest + React Testing Library covering lib, hooks, and components

---

## Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router, static export) |
| Language | [TypeScript](https://typescriptlang.org) 5 — strict mode |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3 + CSS custom properties |
| Icons | [lucide-react](https://lucide.dev) |
| Testing | [Jest](https://jestjs.io) 29 + [React Testing Library](https://testing-library.com) 16 |
| Package Manager | [pnpm](https://pnpm.io) 10 |
| Hosting | [Vercel](https://vercel.com) via GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+ (`npm install -g pnpm`)

### Local development

```bash
# Clone
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
pnpm install

# Validate simulation files are all present
pnpm ingest

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
pnpm build          # Production build
pnpm test           # Run 117 tests
pnpm test:coverage  # Coverage report
pnpm ingest         # Validate HTML ↔ registry alignment
pnpm type-check     # TypeScript check without emitting
pnpm lint           # ESLint
```

---

## Project Structure

```
├── public/
│   └── simulations/          # HTML simulator files (static assets)
├── scripts/
│   └── ingest-html.ts        # Validates posts.ts ↔ public/simulations/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Home: hero + search + filtered grid
│   │   ├── oil-trading/      # Category page + [slug] simulator pages
│   │   └── genai/            # Category page + [slug] simulator pages
│   ├── components/
│   │   ├── content/          # PostCard, CategoryFilter, SimulatorFrame, DownloadButton
│   │   ├── layout/           # SiteHeader, SiteFooter
│   │   └── ui/               # Badge, Button, SearchBar
│   ├── hooks/
│   │   └── useFilter.ts      # Client-side filter state
│   └── lib/
│       ├── posts.ts          # Content registry — single source of truth
│       ├── types.ts          # Shared TypeScript types
│       └── utils.ts          # cn(), formatDate(), color maps
├── tests/                    # Jest test suites (lib, hooks, components)
└── docs/
    └── architecture.md       # Mermaid architecture diagrams
```

---

## Adding a New Simulator

1. **Copy your HTML file** into `public/simulations/`

2. **Register it** in `src/lib/posts.ts`:

```ts
{
  slug: 'my-simulator',
  category: 'oil-trading',         // or 'genai'
  title: 'My Simulator',
  subtitle: 'Short technical description',
  description: 'Longer description shown on cards and in metadata.',
  tags: ['Tag1', 'Tag2'],
  simulationFile: '/simulations/my-simulator.html',
  difficulty: 'intermediate',      // 'beginner' | 'intermediate' | 'advanced'
  readTime: 20,
  lastUpdated: '2026-01-01',
  featured: false,
  downloadable: true,
  accentColor: 'accent',           // 'accent' | 'gold' | 'blue' | 'danger' | 'purple' | 'teal'
  icon: '📊',
}
```

3. **Validate**: `pnpm ingest`
4. **Test**: `pnpm dev` → visit the new URL
5. **Deploy**: `git push origin main` — Vercel auto-deploys

---

## Deployment

The site deploys automatically to Vercel on every push to `main`.

### One-time setup

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. In Vercel → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
4. Add these three secrets to **GitHub → Settings → Secrets → Actions**:
   - `VERCEL_TOKEN` — from [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — from `.vercel/project.json` after running `vercel link`
   - `VERCEL_PROJECT_ID` — same file

After that, every `git push main` runs the full pipeline:
`install → ingest → type-check → build → vercel deploy --prod`

Pull requests get an automatic preview URL.

---

## Color Palette

| Token | Hex | Role |
|---|---|---|
| `accent` | `#00c896` | Primary CTA, Oil Trading highlights |
| `gold` | `#f5a623` | Reports, warnings, secondary accent |
| `blue` | `#378ADD` | GenAI, informational |
| `danger` | `#ff4d6d` | Risk metrics, exposure |
| `purple` | `#8b5cf6` | Advanced GenAI modules |
| `bg` | `#0a0e14` | Page background |
| `surface` | `#111820` | Cards, header, toolbar |
| `border` | `#1e3a52` | All borders |

---

## Architecture

See [docs/architecture.md](./docs/architecture.md) for full Mermaid diagrams covering request flow, component tree, data flow, and the CI/CD pipeline.

---

## License

MIT — see [LICENSE](./LICENSE).
