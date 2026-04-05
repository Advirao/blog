# Architecture Diagrams

## Request Flow

```mermaid
graph TD
    U[User Browser] -->|GET /| HP[Home Page<br/>page.tsx — 'use client']
    U -->|GET /oil-trading| OT[Oil Trading Category<br/>oil-trading/page.tsx]
    U -->|GET /genai| GA[GenAI Category<br/>genai/page.tsx]
    U -->|GET /oil-trading/:slug| OTS[Simulator Page<br/>oil-trading/[slug]/page.tsx]
    U -->|GET /genai/:slug| GAS[Simulator Page<br/>genai/[slug]/page.tsx]

    OTS --> SF[SimulatorFrame<br/>components/content/SimulatorFrame.tsx]
    GAS --> SF

    SF -->|iframe src=| SIM[/public/simulations/*.html<br/>Static asset — full JS preserved]

    PR[posts.ts<br/>lib/posts.ts] -->|getPostsByCategory| OT
    PR -->|getPostsByCategory| GA
    PR -->|getAllPosts| HP
    PR -->|getPostBySlug| OTS
    PR -->|getPostBySlug| GAS
```

## Component Tree

```mermaid
graph TD
    L[layout.tsx<br/>RootLayout] --> H[SiteHeader]
    L --> M[main — children]
    L --> F[SiteFooter]

    M --> HP[HomePage]
    HP --> SB[SearchBar]
    HP --> CF[CategoryFilter]
    HP --> PC[PostCard ×N]

    M --> CP[CategoryPage<br/>oil-trading or genai]
    CP --> PC2[PostCard ×N]

    M --> SP[SlugPage]
    SP --> DB[DownloadButton]
    SP --> BA[Badge]
    SP --> SF[SimulatorFrame]
    SP --> PC3[PostCard ×2<br/>related]

    SF --> IF[iframe<br/>sandboxed HTML]
```

## Data Flow

```mermaid
flowchart LR
    subgraph Registry
        PT[posts.ts<br/>Post[]<br/>source of truth]
    end

    subgraph Pages
        HP[Home]
        OT[/oil-trading]
        GA[/genai]
        OS[/oil-trading/:slug]
        GS[/genai/:slug]
    end

    subgraph Static Assets
        SIM[/public/simulations/\n*.html]
    end

    PT -->|getAllPosts| HP
    PT -->|getPostsByCategory| OT
    PT -->|getPostsByCategory| GA
    PT -->|getPostBySlug| OS
    PT -->|getPostBySlug| GS
    OS -->|simulationFile path| SIM
    GS -->|simulationFile path| SIM
```

## CI/CD Pipeline

```mermaid
flowchart LR
    DEV[Developer] -->|git push main| GH[GitHub]
    GH -->|triggers| CI[GitHub Actions]

    subgraph CI Pipeline
        I[pnpm install] --> V[pnpm ingest<br/>validate files]
        V --> T[tsc --noEmit<br/>type check]
        T --> B[pnpm build<br/>Next.js static gen]
    end

    B -->|on main| VD[vercel deploy --prod]
    B -->|on PR| VP[vercel deploy<br/>preview URL]
```

## Content Ingestion

```mermaid
flowchart TD
    NEW[New .html simulator] -->|1. copy| SIM[public/simulations/]
    NEW -->|2. register| PT[posts.ts entry]
    PT -->|3. pnpm ingest| V{Validation}
    V -->|all files match| OK[✅ Ready to commit]
    V -->|missing file| ERR[❌ Error — add HTML first]
    V -->|orphan on disk| WARN[⚠️ Warning — register in posts.ts]
```
