# Interactive Learning Modules

**Learn oil trading and AI engineering by doing — not reading.**

Every module is a live simulator. Move sliders, change inputs, and watch every number recalculate in real time. No sign-up, no install, just open and explore.

🌐 **Live site: [advirao.github.io/blog](https://advirao.github.io/blog)**

[![Build](https://img.shields.io/github/actions/workflow/status/Advirao/blog/deploy.yml?branch=main&style=flat-square&label=build)](https://github.com/Advirao/blog/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tests](https://img.shields.io/badge/tests-117%20passing-brightgreen?style=flat-square)](./tests)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)

---

## What's Inside

### 🛢️ Oil Trading
Hands-on simulators covering how physical crude oil is traded, priced, hedged, and reported.

| Module | What you'll learn |
|---|---|
| **Crude Oil Trading Simulator** | Full physical trade walkthrough — buy a cargo, hedge it, price it, read the reports |
| **Exposure Report** | DV01, VaR, limits dashboard, and stress tests — every number derived from scratch |
| **Daily Trading Reports** | All 6 reports every physical trader reads every day, with live sliders |
| **Freight, Pipelines & Storage** | How logistics costs affect your margin — Worldscale, contango trade, pipeline tariffs |

### 🤖 GenAI Engineering
A complete curriculum from Python basics to building production AI agents.

| Module | What you'll learn |
|---|---|
| **Phases 1–3** | Python fundamentals → LLM APIs → tokens → prompting → RAG → embeddings |
| **Phases 4–6** | Tool calling → Model Context Protocol (MCP) → OpenAI Agents SDK → LangGraph |

---

## Features

- **Live simulators** — every module has interactive sliders and real-time calculations
- **Download for offline use** — grab any simulator as a standalone HTML file
- **Fullscreen mode** — expand any simulator to fill your screen
- **Search & filter** — find modules by topic, difficulty, or keyword
- **Fast** — all pages pre-rendered, loads instantly with no server
- **Editorial light theme** — warm ivory palette with serif headings, inspired by Anthropic's design language

---

## For Developers

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) — App Router, fully static export |
| Language | [TypeScript](https://typescriptlang.org) 5 — strict mode |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3 + CSS custom properties — editorial light theme |
| Fonts | [Lora](https://fonts.google.com/specimen/Lora) serif (headings) + IBM Plex Sans / Mono |
| Icons | [lucide-react](https://lucide.dev) |
| Testing | [Jest](https://jestjs.io) 29 + [React Testing Library](https://testing-library.com) 16 — 117 tests |
| Package Manager | [pnpm](https://pnpm.io) 10 |
| Hosting | [GitHub Pages](https://pages.github.com) via GitHub Actions |

### Run locally

```bash
# Clone the repo
git clone https://github.com/Advirao/blog.git
cd blog

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### All commands

```bash
pnpm dev            # Local dev server
pnpm build          # Production build (outputs to ./out/)
pnpm test           # Run 117 tests
pnpm test:coverage  # Test coverage report
pnpm ingest         # Validate simulation files against registry
pnpm type-check     # TypeScript check
pnpm lint           # ESLint
```

### Project structure

```
├── public/simulations/       # Self-contained HTML simulator files
├── src/
│   ├── app/                  # Pages (home, /oil-trading, /genai, + slug pages)
│   ├── components/           # UI, layout, and content components
│   ├── hooks/useFilter.ts    # Search + filter logic
│   └── lib/posts.ts          # Content registry — add new posts here
├── tests/                    # Jest test suites
└── .github/workflows/        # GitHub Actions CI/CD
```

### Adding a new simulator

The easiest way is the `/publish` command inside Claude Code — drop your HTML file in, type `/publish`, and Claude handles the rest interactively.

**Manual steps:**

1. Drop your `.html` file into `public/simulations/`
2. Add an entry to `src/lib/posts.ts`:

```ts
{
  slug: 'my-simulator',
  category: 'oil-trading',       // or 'genai'
  title: 'My Simulator',
  subtitle: 'One-line description',
  description: 'Shown on cards and in page metadata.',
  tags: ['Tag1', 'Tag2'],
  simulationFile: '/simulations/my-simulator.html',
  difficulty: 'intermediate',    // 'beginner' | 'intermediate' | 'advanced'
  readTime: 20,
  lastUpdated: '2026-01-01',
  featured: false,
  downloadable: true,
  accentColor: 'accent',         // 'accent' | 'gold' | 'blue' | 'danger' | 'purple' | 'teal'
  icon: '📊',
}
```

3. Run `pnpm ingest` to validate, then `git push origin main` to deploy.

### Deployment

Hosted on **GitHub Pages**. Every push to `main` automatically:
1. Installs dependencies
2. Validates simulation files (`pnpm ingest`)
3. Type-checks and runs all 117 tests
4. Builds a static export
5. Deploys to [advirao.github.io/blog](https://advirao.github.io/blog)

No secrets or tokens required — GitHub Actions handles everything.

See [docs/architecture.md](./docs/architecture.md) for full architecture diagrams and [docs/design-system.md](./docs/design-system.md) for the color and font reference.

---

## License

MIT — see [LICENSE](./LICENSE).
