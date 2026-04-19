# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Context — KB Interactive Learning Platform

Live site: **advirao.github.io/blog**

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 — App Router, fully static export |
| Language | TypeScript 5 — strict mode |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Fonts | Lora (serif, headings) + IBM Plex Sans + IBM Plex Mono |
| Icons | lucide-react |
| Testing | Jest 29 + React Testing Library — 121 tests |
| Package manager | pnpm 10 |
| Hosting | GitHub Pages via GitHub Actions |

---

## Commands

```bash
pnpm dev           # Start local dev server (basePath not set — runs at /)
pnpm build         # Static export (set NEXT_PUBLIC_BASE_PATH=/blog for prod)
pnpm type-check    # TypeScript strict check without emitting
pnpm test          # Run Jest suite
pnpm test:watch    # Jest watch mode
jest tests/lib/posts.test.ts  # Run a single test file
pnpm ingest        # Validate posts.ts ↔ public/simulations/ HTML files are in sync
pnpm lint          # ESLint via Next.js
pnpm format        # Prettier write
```

---

## Architecture

The app is a **fully static Next.js 14 App Router** site. All pages use `generateStaticParams` and are exported at build time — there is no runtime server.

**Routing pattern:** Each category has three files: `src/app/<category>/page.tsx` (index), `src/app/<category>/[slug]/page.tsx` (simulator detail), and all three category detail pages share identical structure — copy the genai one as a template.

**Data flow:**
1. `src/lib/posts.ts` → single source of truth for all `Post` objects
2. Category pages call `getPostsByCategory(slug)` → render `PostCard` grid
3. Slug pages call `getPostBySlug(category, slug)` → render `SimulatorFrame` + metadata
4. `SimulatorFrame` (`src/components/content/SimulatorFrame.tsx`) wraps each HTML file in an iframe with a browser-chrome toolbar, forwards the current theme via `postMessage`, and opens external links via `postMessage` to escape the sandbox.

**Filtering:** `useFilter` hook (`src/hooks/useFilter.ts`) drives the home page search/filter UI — filter state is local to `page.tsx` (`'use client'`), the hook returns a `filtered` array.

**Simulator HTML files** (`public/simulations/*.html`) are completely standalone — they cannot import from the Next.js app. They must include their own CSS vars for theming and listen for `window.addEventListener('message', ...)` to receive `{ type: 'theme', dark }` from the parent.

**Theme event:** `SiteHeader` dispatches `new CustomEvent('kb-theme-change')` on `window` when the user toggles. `SimulatorFrame` listens for this and re-sends `postMessage` to the iframe. The localStorage key is `'kb-theme'`.

**`pnpm ingest`** parses `posts.ts` with a regex and cross-checks every `simulationFile` path against `public/simulations/`. Run it after adding any new post or HTML file — it is a pre-deploy gate.

---

## Color palette (light / dark themes)

The site supports **light and dark mode** toggled by the `☀/🌙` button in the header. Choice is persisted to `localStorage`. On first visit the OS preference is used. An anti-flash inline script in `layout.tsx` applies the class before first paint.

Colors are defined as CSS custom properties in `globals.css` under `:root` (light) and `html.dark` (dark). Tailwind reads them via `rgb(var(--rgb-X)/<alpha-value>)` — so opacity modifiers like `bg-accent/10` work in both themes with no component changes.

### Light palette
| Token | Hex | Role |
|---|---|---|
| `bg` | `#FAF9F7` | Page background (warm ivory) |
| `surface` | `#FFFFFF` | Cards, header |
| `surface2` | `#F2EDE6` | Footer, muted sections |
| `border` | `#E5DDD5` | All borders |
| `ink` | `#2D2926` | Primary text |
| `ink2` | `#7A6F68` | Secondary / meta text |
| `accent` | `#2A6E49` | Oil Trading (sage green) |
| `purple` | `#5E4FA0` | GenAI / Claude Code (lavender) |
| `gold` | `#A8711A` | Intermediate badge |
| `danger` | `#B83232` | Advanced badge |
| `blue` | `#2B549A` | Beginner badge |

### Dark palette
| Token | Hex | Role |
|---|---|---|
| `bg` | `#16151C` | Page background |
| `surface` | `#201F29` | Cards, header |
| `surface2` | `#1A1924` | Footer, muted sections |
| `border` | `#2E2D3C` | All borders |
| `ink` | `#E8E3DC` | Primary text |
| `ink2` | `#9B9399` | Secondary / meta text |
| `accent` | `#3D9A6C` | Brightened green for dark bg |
| `purple` | `#7B6BBD` | Brightened purple for dark bg |

Category banner and card-tint vars (`--cat-oil-banner`, `--cat-ai-banner`, `--cat-oil-card`, `--cat-ai-card`) switch automatically in `html.dark`.

`white` in Tailwind is remapped to `#1A1510` (light) / `#F0EAE0` (dark) so `text-white` renders as the correct heading colour in both modes.

See `docs/design-system.md` for the full design guide.

---

## Fonts

- **Lora** (serif) — all headings. Class: `font-bebas` in CSS remaps to Lora (no component changes needed).
- **IBM Plex Sans** — body text.
- **IBM Plex Mono** — labels, tags, metadata, breadcrumbs.

---

## Key conventions

- **Content registry** — `src/lib/posts.ts` is the single source of truth. Add all new simulators here.
- **Dark mode** — Toggled via `☀/🌙` button in `SiteHeader`. Class `dark` on `<html>`, persisted to `localStorage`, initialised by anti-flash script. All colors use CSS vars — no `dark:` Tailwind prefix needed. Simulator iframes receive theme via `postMessage({ type:'theme', dark })` from `SimulatorFrame`.
- **No glow effects** — Hover states use `shadow-card-hover`, not color glows.
- **Simulator HTML files** — `public/simulations/*.html` are self-contained and carry their own `<style>` block with matching CSS variables. They cannot inherit the blog's Tailwind CSS.
- **Links** — Always use `<Link>` from `next/link` for internal navigation, never plain `<a>`. Plain `<a>` bypasses `basePath` and causes 404s on GitHub Pages.
- **postMessage bridge** — Two message types flow between `SimulatorFrame` and simulator HTML:
  - `{ type: 'open-url', url }` — iframe → parent, opens external links outside the sandbox
  - `{ type: 'theme', dark: boolean }` — parent → iframe, syncs light/dark on toggle and on load
- **basePath** — Set only in CI via `NEXT_PUBLIC_BASE_PATH=/blog`. Local dev runs at `/`.
- **Mobile-first** — All new UI must work at 375px. Use responsive padding (`p-4 md:p-8`), `flex-wrap`, and `hidden sm:flex` to hide non-critical elements on small screens. The SiteHeader uses a hamburger menu on mobile. The simulator iframe height is CSS-driven (60vh mobile / 85vh desktop via `.sim-frame` in globals.css).
- **Simulator HTML mobile** — Any new simulator HTML must include a responsive `@media (max-width: 768px)` block. If it has a sidebar, implement a slide-in drawer pattern with overlay (see claude_code_interactive_simulator.html as reference).

---

## Content categories

| Category slug | Theme color | Accent token |
|---|---|---|
| `oil-trading` | Sage green | `accent` |
| `genai` | Lavender | `purple` |
| `claude-code` | Lavender | `purple` |

---

## Publishing a new simulator

Use the `/publish` command inside Claude Code, or follow the manual steps in `README.md`.

Quick version:
1. Drop HTML file in `public/simulations/`
2. Add entry in `src/lib/posts.ts`
3. `pnpm ingest` → `git push origin main`

---

## Difficulty levels

| Key | Label | Badge color |
|---|---|---|
| `beginner` | Beginner | Blue |
| `intermediate` | Intermediate | Gold |
| `advanced` | Advanced | Danger (red) |
