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

## Color palette (light editorial theme)

| Token | Hex | Role |
|---|---|---|
| `bg` | `#FAF9F7` | Page background (warm ivory) |
| `surface` | `#FFFFFF` | Cards, header |
| `surface2` | `#F2EDE6` | Footer, muted sections |
| `border` | `#E5DDD5` | All borders |
| `ink` | `#2D2926` | Primary text |
| `ink2` | `#7A6F68` | Secondary / meta text |
| `accent` | `#2A6E49` | Oil Trading (sage green) |
| `purple` | `#5E4FA0` | GenAI (lavender) |
| `gold` | `#A8711A` | Intermediate badge |
| `danger` | `#B83232` | Advanced badge |
| `blue` | `#2B549A` | Beginner badge |

Category banners: Oil Trading `#DFF0E8`, GenAI `#E0DFF0`.  
Card bg tints: Oil Trading `#F2F8F4`, GenAI `#F2F2F9`.

`white` in Tailwind config is remapped to `#1A1510` (dark heading color) so existing `text-white` usage renders correctly on the light theme without touching component markup.

See `docs/design-system.md` for the full plain-language design guide.

---

## Fonts

- **Lora** (serif) — all headings. Class: `font-bebas` in CSS remaps to Lora (no component changes needed).
- **IBM Plex Sans** — body text.
- **IBM Plex Mono** — labels, tags, metadata, breadcrumbs.

---

## Key conventions

- **Content registry** — `src/lib/posts.ts` is the single source of truth. Add all new simulators here.
- **No dark theme** — The site is light-only. No `dark:` Tailwind classes, no dark color variables.
- **No glow effects** — Hover states use `shadow-card-hover`, not color glows.
- **Simulator HTML files** — `public/simulations/*.html` are self-contained and carry their own `<style>` block with matching CSS variables. They cannot inherit the blog's Tailwind CSS.
- **Links** — Always use `<Link>` from `next/link` for internal navigation, never plain `<a>`. Plain `<a>` bypasses `basePath` and causes 404s on GitHub Pages.
- **postMessage bridge** — Simulators with external vault links must use `window.parent.postMessage({ type: 'open-url', url })` to open links from the parent context. See `docs/architecture.md`.
- **basePath** — Set only in CI via `NEXT_PUBLIC_BASE_PATH=/blog`. Local dev runs at `/`.

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
