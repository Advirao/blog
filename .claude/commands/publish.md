# /publish — Publish a new simulator to the blog

## What this does
Full end-to-end publish flow: finds an unregistered HTML file, collects metadata, restyled the HTML to match the design system, wires up the category infrastructure (creating a new category if needed), updates tests, commits all changed files, and pushes live.

---

## Steps to follow when this command is invoked

### 1. Find unpublished HTML files
- Read `src/lib/posts.ts` and collect all `simulationFile` values already registered
- List all `.html` files in `public/simulations/`
- Identify any HTML files NOT yet registered in `posts.ts`
- If none found → tell the user: "No new HTML files found in `public/simulations/` — drop your .html file there first, then run /publish again." and stop.
- If multiple unregistered files found → ask the user which one to publish now.

---

### 2. Collect metadata
Ask the user these questions one at a time (wait for answers). If the user says "you decide" or delegates, use your best judgement based on the HTML content and `docs/design-system.md`.

1. **Title** — e.g. "Crude Oil Trading Simulator"
2. **Subtitle** — one short line, e.g. "Full physical trade walkthrough"
3. **Description** — 1–2 sentences shown on the card and in Google search
4. **Category** — existing: `oil-trading`, `genai`, `claude-code` — or propose a new one if the content clearly belongs to a new domain (see Step 3a)
5. **Tags** — comma-separated, e.g. "Hedging, Crude, Risk"
6. **Difficulty** — `beginner`, `intermediate`, or `advanced`
7. **Read time** — estimated minutes (just a number)
8. **Accent color** — pick one: `accent` (green), `gold`, `blue`, `danger` (red), `purple`, `teal`
9. **Icon** — one emoji, e.g. 🛢️ or 🤖
10. **Featured?** — yes or no (featured posts appear at the top of the home page)

---

### 3. Generate the slug
- Derive from the title: lowercase, spaces → hyphens, remove special chars
- e.g. "Crude Oil Trading Simulator" → `crude-oil-trading-simulator`
- Show the user the slug and confirm before proceeding.

---

### 3a. New category check (run this if the chosen category doesn't exist yet)

If the category slug is NOT already in `src/lib/types.ts` → wire up the full category infrastructure before continuing:

**a. `src/lib/types.ts`**
- Add the new slug to the `Category` union type

**b. `src/lib/posts.ts`**
- Add a new entry to the `CATEGORIES` array:
  ```ts
  {
    slug: '<new-category>',
    label: '<Display Label>',
    description: '<1–2 sentence description>',
    icon: '<emoji>',
    accentColor: '<accent | gold | blue | danger | purple | teal>',
  }
  ```

**c. `src/app/<new-category>/page.tsx`** — create category listing page
- Copy the pattern from `src/app/genai/page.tsx`
- Replace all references to `genai` / `GenAI Engineering` / `#E0DFF0` with the new category values
- Choose banner background: Oil Trading uses `#DFF0E8`, GenAI/Claude Code use `#E0DFF0`. Pick or derive a tint from the accent color.

**d. `src/app/<new-category>/[slug]/page.tsx`** — create the post/simulator page
- Copy the pattern from `src/app/genai/[slug]/page.tsx`
- Replace all `genai` / `GenAI Engineering` / `purple` references with the new category values
- Update `generateStaticParams` to call `getPostsByCategory('<new-category>')`
- Update `getPostBySlug` calls to use `'<new-category>'`
- Update breadcrumb links to `/` → `/<new-category>`

**e. `src/components/layout/SiteHeader.tsx`**
- Add to `navItems`: `{ href: '/<new-category>', label: '<Display Label>' }`
- Add `pathname.includes('/<new-category>/')` to the `isSimulatorPage` check
- Increment the "N Modules" count in the right-side pill

**f. `src/components/content/CategoryFilter.tsx`**
- Add to `CATEGORY_OPTIONS`: `{ value: '<new-category>', label: '<Display Label>', icon: '<emoji>' }`
- Add `'<new-category>': number` to the `postCounts` interface

**g. `src/app/page.tsx`** (home page)
- Add to `postCounts`: `'<new-category>': allPosts.filter((p) => p.category === '<new-category>').length`
- Add a new spotlight card in the `grid` section, following the same pattern as Oil Trading / GenAI / Claude Code
- Increment the "Topics Covered" stat value

**h. `src/lib/utils.ts`**
- Add to `categoryLabels`: `'<new-category>': '<Display Label>'`

**i. `src/components/content/PostCard.tsx`**
- Add to `categoryBg`: `'<new-category>': '<hex>'` (a very light tint of the accent color)

---

### 4. Restyle the HTML to match the design system

**This step is mandatory for every publish.** Simulator HTML files are self-contained and cannot inherit the blog's Tailwind CSS. You must verify and fix the inline `<style>` block.

Read the HTML file. Check for compliance with `docs/design-system.md`. Fix every violation — keep all HTML structure and JavaScript intact, only touch the `<style>` block and the `<link>` for fonts.

**Required fonts `<link>` (replace whatever is there):**
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Required CSS variables in `:root` (replace the full block):**
```css
:root {
  --bg:      #FAF9F7;   /* page background — warm ivory */
  --surface:  #FFFFFF;  /* cards, panels */
  --surface2: #F2EDE6;  /* muted sections */
  --border:   #E5DDD5;  /* all borders */
  --ink:      #2D2926;  /* primary text */
  --ink2:     #7A6F68;  /* secondary / meta text */
  --accent:   /* category accent — see below */
}
```
Accent by category: Oil Trading → `#2A6E49`, GenAI → `#5E4FA0`, Claude Code → `#5E4FA0`. For a new category, derive from its `accentColor`.

**Rules to enforce (violations to remove or replace):**
- ❌ Dark backgrounds (e.g. `#0a0c10`, `#1a1a2e`) → replace with `var(--bg)` or `var(--surface)`
- ❌ Glow effects (`box-shadow` with colored glow, `--glow` variables) → remove entirely
- ❌ Dark grid / dot overlays → remove
- ❌ Non-standard fonts (Syne, JetBrains Mono, Orbitron, etc.) → replace with Lora / IBM Plex Sans / IBM Plex Mono
- ❌ Gradient headers (`background: linear-gradient(...)`) → replace with `background: var(--surface)`
- ✅ Headings → `font-family: 'Lora', serif`
- ✅ Body text → `font-family: 'IBM Plex Sans', sans-serif`
- ✅ Code, labels, tags, metadata → `font-family: 'IBM Plex Mono', monospace`
- ✅ Hover states → use `shadow-card-hover` style lift, not color glow

**Header cleanup:**
- Remove any personal edition labels (e.g. "— Advi Edition", "— John Edition", "v2 Personal")
- If the header says "Interactive Simulator" as a subtype, change it to match the content (e.g. "Learning", "Explorer", "Walkthrough")

---

### 5. Content quality improvements (for concept-learning simulators)

If the simulator is a multi-concept learning module (sidebar navigation, tab panels per concept), apply these improvements:

**a. Replace technology-specific analogies with universal ones**
- Scan all `analogy` objects in the JS data for references to specific enterprise products: SAP, Salesforce, Oracle, Workday, ServiceNow, PeopleSoft, Siebel, etc.
- Replace each `worldA` with a universally understood analogy that anyone can follow — no software background needed.
- Good universal analogies: kitchen/cooking, toolbox, airport, library, game save system, assembly line, TV remote, onboarding guide, phone settings, recipe steps, school hall monitor.
- Keep `worldB` (the Claude Code / tech side) unchanged.
- Update the `pairs` array to match the new analogy.

**b. Add ELI10 tab (Explain Like I'm 10)**
- For each concept object in the JS array, the `renderELI10` function should have an entry in `eli10Data` keyed by `c.id`.
- Each entry: `{ simple: '<plain-English explanation>', analogy: '<real-world analogy a child would understand>' }`
- Add the tab button: `<button class="tab-btn" onclick="switchTab(this,'eli10')"><span class="tab-icon">🧒</span>ELI10</button>`
- Add the panel: `<div id="tab-eli10" class="tab-panel">${renderELI10(c)}</div>`
- Add the `renderELI10` function and `eli10Data` lookup (see Claude Code simulator for reference pattern)
- Add CSS classes: `.eli10-wrap`, `.eli10-header`, `.eli10-icon`

**c. Add Resource Vault tab**
- For each concept, add an entry in `resourceData` keyed by `c.id` with `{ docs: [{title, url}], videos: [{title, url}] }`
- Use real, known documentation URLs (Anthropic docs, GitHub docs, MDN, official library docs)
- For videos, link to official YouTube channels (e.g. `https://www.youtube.com/@anthropic-ai`)
- Add a `sharedResources` array with 3–4 general links (official page, docs hub, GitHub, YouTube)
- Add an `openLink(url)` helper that uses the postMessage bridge: `window.parent.postMessage({ type: 'open-url', url }, '*')` with `window.open(url, '_blank', 'noopener')` as fallback
- Add the tab button: `<button class="tab-btn" onclick="switchTab(this,'resources')"><span class="tab-icon">📚</span>Resources</button>`
- Add the panel: `<div id="tab-resources" class="tab-panel">${renderResources(c)}</div>`
- Add `renderResources` function and CSS classes: `.resource-vault`, `.resource-section-label`, `.resource-list`, `.resource-item`, `.resource-title`, `.resource-url`, `.resource-arrow`

---

### 6. Add entry to posts.ts
- Open `src/lib/posts.ts`
- Add the new entry to the `posts` array, under the correct category section comment
- Set `lastUpdated` to today's date (from `# currentDate` in context, or use `new Date().toISOString().slice(0,10)`)
- Set `downloadable: true`
- Set `simulationFile` to `/simulations/<filename>.html`
- All other fields from the metadata collected in Step 2

---

### 7. Update tests

Open `tests/lib/posts.test.ts` and update every assertion affected by the new post or new category:

**Always check and fix:**
- `'contains N posts'` → increment N
- `'returns all N posts'` → increment N  
- `'returns N <category> posts'` → update count for the affected category
- `expect(post.category).toMatch(/^(oil-trading|genai)$/)` → add the new category to the regex if needed
- Related posts count assertions — if a category now has different post counts, update `toBe(N)`

**If a new category was created, also add:**
- `it('has exactly N categories', ...)` → increment N
- `expect(slugs).toContain('<new-category>')` in the categories test
- `it('returns N <new-category> posts', ...)` in `getPostsByCategory()`
- `it('finds the <slug> post', ...)` in `getPostBySlug()`
- `it('returns undefined for <slug> under wrong category', ...)` in `getPostBySlug()`
- `it('returns <new-category> meta', ...)` in `getCategoryMeta()`

Run `pnpm test` after every test edit. Fix any failures before continuing.

---

### 8. Validate everything
Run these in order and fix any errors before proceeding:

```bash
pnpm ingest       # all simulationFile paths registered and exist
pnpm tsc --noEmit # no TypeScript errors
pnpm test         # all tests pass
```

---

### 9. Commit and push all changed files

Stage **every file that was modified** — not just the HTML and posts.ts:

```bash
git add \
  public/simulations/<filename>.html \
  src/lib/posts.ts \
  src/lib/types.ts \
  src/lib/utils.ts \
  src/app/page.tsx \
  src/app/<category>/page.tsx \
  src/app/<category>/[slug]/page.tsx \
  src/components/layout/SiteHeader.tsx \
  src/components/content/CategoryFilter.tsx \
  src/components/content/PostCard.tsx \
  tests/lib/posts.test.ts

git commit -m "feat: publish <Title> — <category> category"
git push origin main
```

Only include files that were actually changed.

---

### 10. Done — tell the user:
- Post is live after ~2 min GitHub Actions build
- Post URL: `https://advirao.github.io/blog/<category>/<slug>`
- Category URL: `https://advirao.github.io/blog/<category>`
- Watch the build: `https://github.com/Advirao/blog/actions`
- If it's a new category: mention the new nav link is live at `/<category>`
