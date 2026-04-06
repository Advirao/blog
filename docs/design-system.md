# Design System

This is a plain-language reference for the visual design of the KB interactive learning platform — colors, fonts, spacing, and how they apply across every part of the site.

---

## The Big Idea

The site uses an **editorial light theme** — think a well-designed textbook or a magazine like The Atlantic, not a tech dashboard. It's warm and easy to read, not bright or flashy. The inspiration is Anthropic's own product and docs pages.

**Core feeling:** calm, professional, trustworthy, readable.

---

## Fonts

| Role | Font | Used where |
|---|---|---|
| **Headings** | [Lora](https://fonts.google.com/specimen/Lora) — serif | Page titles, card titles, hero headings |
| **Body text** | [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) | Descriptions, body copy |
| **Code / labels** | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Tags, metadata, breadcrumbs, timestamps |

**Rule of thumb:**
- Anything that feels like a "headline" → Lora (serif, elegant)
- Anything that feels like data, a label, or a small detail → IBM Plex Mono (monospace)
- Everything else → IBM Plex Sans (clean, readable)

The site previously used Bebas Neue (a bold all-caps display font). That was replaced with Lora everywhere.

---

## Colors

### Base palette

These are the building blocks. Every color in the site comes from these.

| Name | Hex code | What it looks like | Used for |
|---|---|---|---|
| `bg` | `#FAF9F7` | Warm off-white / ivory | Page background |
| `surface` | `#FFFFFF` | Pure white | Cards, header, main content panels |
| `surface2` | `#F2EDE6` | Light warm gray/cream | Footer, "related posts" sections, muted areas |
| `border` | `#E5DDD5` | Soft warm beige | All borders and dividers |
| `ink` | `#2D2926` | Near-black, slightly warm | Primary text, headings |
| `ink2` | `#7A6F68` | Warm medium gray | Secondary text, captions, metadata |
| `white` | `#1A1510` | Very dark warm brown | Used internally as the "white" Tailwind token — renders as dark heading color |

> **Note for developers:** In Tailwind config, `white` is remapped to `#1A1510`. So `text-white` in this codebase produces dark text. This is intentional — it lets us keep component markup unchanged while flipping from the old dark theme.

### Accent colors (for categories and badges)

| Name | Hex code | Used for |
|---|---|---|
| `accent` | `#2A6E49` | Oil Trading category — sage/forest green |
| `purple` | `#5E4FA0` | GenAI category — muted lavender/indigo |
| `gold` | `#A8711A` | Intermediate difficulty badges |
| `danger` | `#B83232` | Advanced difficulty badges, errors |
| `blue` | `#2B549A` | Beginner difficulty badges |
| `teal` | `#2A6E6E` | Spare accent, available for future use |

### Category background tints

These are used for the hero banner on each category page and for card backgrounds. They are tints (very light versions) of the accent colors.

| Category | Background color | Hex |
|---|---|---|
| Oil Trading hero banner | Sage green tint | `#DFF0E8` |
| GenAI hero banner | Lavender tint | `#E0DFF0` |
| Oil Trading post cards | Very light green | `#F2F8F4` |
| GenAI post cards | Very light purple | `#F2F2F9` |

---

## Shadows

Very subtle — just enough to lift cards off the background. No heavy drop shadows.

| Token | Used for |
|---|---|
| `shadow-card` | Default card resting state |
| `shadow-card-hover` | Card on hover (slightly more elevated) |

---

## What "no colors" means in practice

Most of the page is neutral. Color appears only in:
1. **Category banners** (the hero strip at the top of /oil-trading and /genai)
2. **Card backgrounds** (a faint tint, barely noticeable)
3. **Badges** (difficulty level pill)
4. **Link hover states** (accent or purple, depending on section)

Everything else — text, borders, backgrounds — stays in the warm neutral range.

---

## Simulator HTML files

The 6 standalone HTML simulator files (`public/simulations/*.html`) each have their own internal `<style>` block. They cannot inherit the blog's CSS — they are self-contained. They use the **same color palette and fonts** as the main site, defined as CSS custom properties inside each file:

```css
:root {
  --bg:       #FAF9F7;   /* page background */
  --surface:  #FFFFFF;   /* panel / card */
  --surface2: #F2EDE6;   /* muted panel */
  --border:   #E5DDD5;   /* border */
  --ink:      #2D2926;   /* primary text */
  --ink2:     #7A6F68;   /* secondary text */
  --accent1:  #2A6E49;   /* green — Oil Trading files */
  --accent1:  #5E4FA0;   /* purple — GenAI files */
  --accent2:  #A8711A;   /* gold */
}
```

Fonts are loaded in each HTML file via a `<link>` to Google Fonts importing Lora, IBM Plex Sans, and IBM Plex Mono.

---

## Design rules — what to always do

1. **Light backgrounds only.** No dark backgrounds, no neon colors, no gradients with bright hues.
2. **Warm neutrals.** Use `#FAF9F7` (warm ivory) for pages, not pure `#FFFFFF`. Pure white is reserved for cards.
3. **Lora for headings.** Any heading that a user reads first → Lora serif.
4. **Monospace for data.** Timestamps, tags, labels, and file paths → IBM Plex Mono.
5. **Subtle borders.** Borders are `#E5DDD5` — visible but not harsh.
6. **No glow effects.** No `box-shadow` glow, no neon outlines. Hover states lift with a soft shadow, not a color glow.
7. **No dark grid backgrounds.** The old theme used a dot-grid overlay. This has been removed everywhere.
8. **Section color follows category.** Green (`#2A6E49`) = Oil Trading. Purple (`#5E4FA0`) = GenAI. Never swap these.

---

## Where each setting lives in code

| What | File |
|---|---|
| CSS custom properties (color tokens) | `src/app/globals.css` |
| Tailwind color + font + shadow config | `tailwind.config.ts` |
| Lora font import (Next.js) | `src/app/layout.tsx` |
| Category card background tints | `src/components/content/PostCard.tsx` |
| Category hero banner colors | `src/app/oil-trading/page.tsx`, `src/app/genai/page.tsx` |
| Simulator CSS variables | Each `public/simulations/*.html` file (inline `<style>` block) |
