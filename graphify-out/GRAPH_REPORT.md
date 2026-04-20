# Graph Report - .  (2026-04-19)

## Corpus Check
- 47 files · ~70,827 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 107 nodes · 107 edges · 39 communities detected
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Theme & iframe Infrastructure|Theme & iframe Infrastructure]]
- [[_COMMUNITY_Static Page Data API|Static Page Data API]]
- [[_COMMUNITY_CICD & Testing Pipeline|CI/CD & Testing Pipeline]]
- [[_COMMUNITY_Content Registry & Publish|Content Registry & Publish]]
- [[_COMMUNITY_Oil Trading Simulators|Oil Trading Simulators]]
- [[_COMMUNITY_Design System & Typography|Design System & Typography]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_HTML Ingest Validator|HTML Ingest Validator]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Download Button|Download Button]]
- [[_COMMUNITY_Simulator Frame Component|Simulator Frame Component]]
- [[_COMMUNITY_Theme Toggle Header|Theme Toggle Header]]
- [[_COMMUNITY_Badge Component|Badge Component]]
- [[_COMMUNITY_Search Bar|Search Bar]]
- [[_COMMUNITY_Filter Hook|Filter Hook]]
- [[_COMMUNITY_Filter Test Helpers|Filter Test Helpers]]
- [[_COMMUNITY_Post Display Layer|Post Display Layer]]
- [[_COMMUNITY_Jest Config|Jest Config]]
- [[_COMMUNITY_Jest Setup|Jest Setup]]
- [[_COMMUNITY_Next.js Types|Next.js Types]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_Global Type Declarations|Global Type Declarations]]
- [[_COMMUNITY_Home Category Page|Home Category Page]]
- [[_COMMUNITY_Oil Trading Page|Oil Trading Page]]
- [[_COMMUNITY_GenAI Page|GenAI Page]]
- [[_COMMUNITY_Claude Code Page|Claude Code Page]]
- [[_COMMUNITY_Category Filter|Category Filter]]
- [[_COMMUNITY_PostCard Component|PostCard Component]]
- [[_COMMUNITY_Site Footer|Site Footer]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Type Definitions|Type Definitions]]
- [[_COMMUNITY_Badge Tests|Badge Tests]]
- [[_COMMUNITY_PostCard Tests|PostCard Tests]]
- [[_COMMUNITY_SimulatorFrame Tests|SimulatorFrame Tests]]
- [[_COMMUNITY_Posts Registry Tests|Posts Registry Tests]]
- [[_COMMUNITY_Utils Tests|Utils Tests]]
- [[_COMMUNITY_Static Site Generation|Static Site Generation]]

## God Nodes (most connected - your core abstractions)
1. `src/lib/posts.ts â€” Content Registry` - 12 edges
2. `KB Interactive Learning Platform` - 10 edges
3. `Shared CSS Variable Pattern in Simulator HTML Files` - 8 edges
4. `Oil Trading Category` - 6 edges
5. `GenAI Engineering Category` - 6 edges
6. `Editorial Light/Dark Theme` - 6 edges
7. `Claude Code Interactive Simulator` - 6 edges
8. `Oil Trading Simulator (Full Trade Walkthrough)` - 6 edges
9. `GenAI Curriculum Phases 1â€“3 (Pythonâ†’LLMâ†’RAGâ†’Embeddings)` - 5 edges
10. `GenAI Curriculum Phases 4â€“6 (Tool Callingâ†’MCPâ†’Agentsâ†’LangGraph)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Accent Purple (#5E4FA0) â€” GenAI / Claude Code` --conceptually_related_to--> `GenAI Engineering Category`  [EXTRACTED]
  docs/design-system.md → README.md
- `Shared CSS Variable Pattern in Simulator HTML Files` --implements--> `Light Mode Color Palette (#FAF9F7 bg, warm ivory)`  [EXTRACTED]
  public/simulations/claude_code_interactive_simulator.html → docs/design-system.md
- `generateStaticParams()` --calls--> `getPostsByCategory()`  [INFERRED]
  src\app\oil-trading\[slug]\page.tsx → src\lib\posts.ts
- `generateMetadata()` --calls--> `getPostBySlug()`  [INFERRED]
  src\app\oil-trading\[slug]\page.tsx → src\lib\posts.ts
- `src/lib/posts.ts â€” Content Registry` --references--> `Oil Trading Simulator (Full Trade Walkthrough)`  [EXTRACTED]
  README.md → public/simulations/oil-trading-simulator.html

## Hyperedges (group relationships)
- **Dark Mode Theme Sync Flow (Header â†’ SimulatorFrame â†’ iframe)** — arch_site_header, arch_simulator_frame, sim_dark_mode_listener, arch_dark_mode, arch_postmessage_bridge [EXTRACTED 1.00]
- **Self-Contained Simulator HTML Pattern (CSS vars + fonts + dark mode)** — sim_shared_css_vars, sim_google_fonts_import, sim_dark_mode_listener, arch_iframe_strategy [EXTRACTED 0.95]
- **Content Publish Pipeline (posts.ts â†’ pnpm ingest â†’ CI/CD â†’ GitHub Pages)** — readme_posts_registry, readme_pnpm_ingest, arch_cicd_pipeline, readme_github_pages [EXTRACTED 1.00]

## Communities

### Community 0 - "Theme & iframe Infrastructure"
Cohesion: 0.13
Nodes (16): Dark Mode Toggle (kb-theme-change event), globals.css (CSS custom properties + .sim-frame), iframe Sandboxed Embedding Strategy, Root Layout (layout.tsx) â€” Anti-flash Script, Mobile Responsiveness (375pxâ€“desktop), postMessage Bridge (open-url + theme), Rationale: iframe over React rewrite for simulators, Rationale: postMessage for external links (COEP sandbox restriction) (+8 more)

### Community 1 - "Static Page Data API"
Cohesion: 0.21
Nodes (4): generateMetadata(), generateStaticParams(), getPostBySlug(), getPostsByCategory()

### Community 2 - "CI/CD & Testing Pipeline"
Cohesion: 0.2
Nodes (10): CI/CD Pipeline (installâ†’validateâ†’testâ†’buildâ†’deploy), deploy.yml â€” GitHub Actions CI/CD Workflow, GitHub Pages Hosting (via GitHub Actions), Jest 29 + React Testing Library, KB Interactive Learning Platform, Next.js 14 (App Router, Static Export), pnpm 10 Package Manager, pnpm ingest â€” Simulation File Validator (+2 more)

### Community 3 - "Content Registry & Publish"
Cohesion: 0.5
Nodes (8): GenAI Engineering Category, src/lib/posts.ts â€” Content Registry, /publish Claude Code Command, html.dark + postMessage Theme Listener Pattern, GenAI Curriculum Phases 1â€“3 (Pythonâ†’LLMâ†’RAGâ†’Embeddings), GenAI Curriculum Phases 4â€“6 (Tool Callingâ†’MCPâ†’Agentsâ†’LangGraph), Ollama: Run AI Locally Simulator, Model Context Protocol (MCP) Simulator

### Community 4 - "Oil Trading Simulators"
Cohesion: 0.57
Nodes (7): Accent Green (#2A6E49) â€” Oil Trading, Oil Trading Category, Exposure Report Simulator (DV01, VaR, Limits), Freight & Logistics Simulator (Worldscale, Contango), Oil Trading Simulator (Full Trade Walkthrough), Shared CSS Variable Pattern in Simulator HTML Files, Trading Reports Explained Simulator (6 Reports)

### Community 5 - "Design System & Typography"
Cohesion: 0.38
Nodes (7): Dark Mode Color Palette (#16151C bg, deep navy-black), Editorial Light/Dark Theme, IBM Plex Mono â€” Labels/Metadata Font, IBM Plex Sans â€” Body Font, Lora (Serif) â€” Headings Font, Light Mode Color Palette (#FAF9F7 bg, warm ivory), Google Fonts Import (Lora + IBM Plex Sans/Mono) in Simulators

### Community 6 - "Utility Functions"
Cohesion: 0.5
Nodes (0): 

### Community 7 - "HTML Ingest Validator"
Cohesion: 1.0
Nodes (2): extractSimulationFiles(), main()

### Community 8 - "Root Layout"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Download Button"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Simulator Frame Component"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Theme Toggle Header"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Badge Component"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Search Bar"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Filter Hook"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Filter Test Helpers"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Post Display Layer"
Cohesion: 1.0
Nodes (2): PostCard Component, useFilter Hook

### Community 17 - "Jest Config"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Jest Setup"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Next.js Types"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Tailwind Config"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Global Type Declarations"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Home Category Page"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Oil Trading Page"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "GenAI Page"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Claude Code Page"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Category Filter"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "PostCard Component"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Site Footer"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Button Component"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Type Definitions"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Badge Tests"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "PostCard Tests"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "SimulatorFrame Tests"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Posts Registry Tests"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Utils Tests"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Static Site Generation"
Cohesion: 1.0
Nodes (1): Fully Static Page Generation (generateStaticParams)

## Knowledge Gaps
- **16 isolated node(s):** `Next.js 14 (App Router, Static Export)`, `TypeScript 5 (Strict Mode)`, `Tailwind CSS 3`, `Jest 29 + React Testing Library`, `pnpm 10 Package Manager` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Root Layout`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Download Button`** (2 nodes): `DownloadButton()`, `DownloadButton.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Simulator Frame Component`** (2 nodes): `SimulatorFrame()`, `SimulatorFrame.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme Toggle Header`** (2 nodes): `toggleTheme()`, `SiteHeader.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge Component`** (2 nodes): `Badge()`, `Badge.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Search Bar`** (2 nodes): `SearchBar()`, `SearchBar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Filter Hook`** (2 nodes): `useFilter.ts`, `useFilter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Filter Test Helpers`** (2 nodes): `useFilter.test.ts`, `makePost()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Post Display Layer`** (2 nodes): `PostCard Component`, `useFilter Hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Jest Config`** (1 nodes): `jest.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Jest Setup`** (1 nodes): `jest.setup.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Types`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tailwind Config`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Global Type Declarations`** (1 nodes): `global.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Category Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Oil Trading Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GenAI Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Claude Code Page`** (1 nodes): `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Category Filter`** (1 nodes): `CategoryFilter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCard Component`** (1 nodes): `PostCard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Footer`** (1 nodes): `SiteFooter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (1 nodes): `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Definitions`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge Tests`** (1 nodes): `Badge.test.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCard Tests`** (1 nodes): `PostCard.test.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SimulatorFrame Tests`** (1 nodes): `SimulatorFrame.test.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Posts Registry Tests`** (1 nodes): `posts.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utils Tests`** (1 nodes): `utils.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Static Site Generation`** (1 nodes): `Fully Static Page Generation (generateStaticParams)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Claude Code Interactive Simulator` connect `Theme & iframe Infrastructure` to `Content Registry & Publish`, `Oil Trading Simulators`, `Design System & Typography`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `src/lib/posts.ts â€” Content Registry` connect `Content Registry & Publish` to `Theme & iframe Infrastructure`, `CI/CD & Testing Pipeline`, `Oil Trading Simulators`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `KB Interactive Learning Platform` connect `CI/CD & Testing Pipeline` to `Theme & iframe Infrastructure`, `Content Registry & Publish`, `Oil Trading Simulators`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Shared CSS Variable Pattern in Simulator HTML Files` (e.g. with `Exposure Report Simulator (DV01, VaR, Limits)` and `Freight & Logistics Simulator (Worldscale, Contango)`) actually correct?**
  _`Shared CSS Variable Pattern in Simulator HTML Files` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js 14 (App Router, Static Export)`, `TypeScript 5 (Strict Mode)`, `Tailwind CSS 3` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Theme & iframe Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._