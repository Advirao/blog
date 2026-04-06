import type { Post, CategoryMeta, Category } from './types'

// ─── Category Metadata ────────────────────────────────────────────────────────
export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'oil-trading',
    label: 'Oil Trading',
    description: 'Physical crude trading mechanics, risk management, pricing, and daily reports — built from scratch with interactive simulators.',
    icon: '🛢️',
    accentColor: 'accent',
  },
  {
    slug: 'genai',
    label: 'GenAI Engineering',
    description: 'From Python fundamentals to production-grade AI systems — tokens, RAG, tool use, MCP, and agentic SDKs.',
    icon: '🤖',
    accentColor: 'blue',
  },
]

// ─── Post Registry ─────────────────────────────────────────────────────────────
// Add new posts here. Run `pnpm ingest` to validate after adding.
export const posts: Post[] = [
  // ── Oil Trading ──────────────────────────────────────────────────────────────
  {
    slug: 'oil-trading-simulator',
    category: 'oil-trading',
    title: 'Crude Oil Trading Simulator',
    subtitle: 'Physical Trade · Pricing · Hedging · Forward Curve · Risk Reports',
    description:
      'Learn by doing. Walk through a complete physical crude trade — from buying a cargo to hedging, pricing mechanics, forward curve analysis, and all five daily reports. Interactive sliders on every tab.',
    tags: ['Physical Trading', 'Hedging', 'Forward Curve', 'DV01', 'VaR', 'MtM'],
    simulationFile: '/simulations/oil-trading-simulator.html',
    difficulty: 'beginner',
    readTime: 45,
    lastUpdated: '2026-03-28',
    featured: true,
    downloadable: true,
    accentColor: 'accent',
    icon: '🛢️',
  },
  {
    slug: 'exposure-report',
    category: 'oil-trading',
    title: 'Exposure Report Explained',
    subtitle: 'DV01 · VaR · Limits Dashboard · Stress Tests',
    description:
      'No assumptions — every number is derived from scratch. Understand DV01 (differential sensitivity), how VaR is built from daily volatility, what a limits dashboard looks like, and how stress tests quantify tail risk.',
    tags: ['DV01', 'VaR', 'Risk Limits', 'Stress Testing', 'Derivatives'],
    simulationFile: '/simulations/exposure-report-clean.html',
    difficulty: 'intermediate',
    readTime: 25,
    lastUpdated: '2026-03-28',
    featured: true,
    downloadable: true,
    accentColor: 'danger',
    icon: '📊',
  },
  {
    slug: 'trading-reports',
    category: 'oil-trading',
    title: 'All Trading Reports Explained',
    subtitle: 'Position · MtM · Commercial Margin · Capital Charges · EOD',
    description:
      'The six reports every physical oil trader reads every day — with full math, interactive sliders, and plain-English explanations. From position report to end-of-day dashboard.',
    tags: ['Position Report', 'Mark-to-Market', 'Commercial Margin', 'Capital Charges', 'EOD'],
    simulationFile: '/simulations/trading-reports-explained.html',
    difficulty: 'intermediate',
    readTime: 35,
    lastUpdated: '2026-03-28',
    featured: false,
    downloadable: true,
    accentColor: 'gold',
    icon: '📋',
  },
  {
    slug: 'freight-logistics',
    category: 'oil-trading',
    title: 'Freight, Pipelines & Storage',
    subtitle: 'Tanker Freight · WS Rates · Pipeline Nominations · Contango Trade',
    description:
      'How logistics costs affect your trade decision and commercial margin. Covers Worldscale freight, pipeline tariffs and nominations, the contango cash-and-carry storage trade, and a full margin waterfall builder.',
    tags: ['Freight', 'Worldscale', 'Pipeline', 'Storage', 'Contango', 'Logistics'],
    simulationFile: '/simulations/freight-logistics-simulator.html',
    difficulty: 'intermediate',
    readTime: 30,
    lastUpdated: '2026-03-28',
    featured: false,
    downloadable: true,
    accentColor: 'blue',
    icon: '🚢',
  },
  // ── GenAI Engineering ────────────────────────────────────────────────────────
  {
    slug: 'claude-code-interactive-simulator',
    category: 'genai',
    title: 'Claude Code Interactive Simulator',
    subtitle: 'Full walkthrough of Claude Code features',
    description:
      'A hands-on guide to Claude Code — from understanding the agentic loop to using hooks, tools, and skills. Each concept includes live simulations, real-world analogies, and interactive examples.',
    tags: ['Claude Code', 'Agentic Loop', 'Tools', 'Hooks', 'Skills', 'SDK'],
    simulationFile: '/simulations/claude_code_interactive_simulator.html',
    difficulty: 'intermediate',
    readTime: 40,
    lastUpdated: '2026-04-06',
    featured: true,
    downloadable: true,
    accentColor: 'purple',
    icon: '🖥️',
  },
  {
    slug: 'genai-phases-1-3',
    category: 'genai',
    title: 'GenAI Engineering — Phases 1–3',
    subtitle: 'Python · APIs · Tokens · Prompting · RAG · Embeddings',
    description:
      'A complete, interactive curriculum from Python fundamentals to production-grade AI systems. Phase 1: foundations. Phase 2: LLM basics (tokens, context windows, prompting). Phase 3: RAG (embeddings, chunking, retrieval). Includes live simulators for each concept.',
    tags: ['Python', 'APIs', 'Tokens', 'Prompting', 'RAG', 'Embeddings', 'Chunking'],
    simulationFile: '/simulations/GenAI_Curriculum_Phases1-3.html',
    difficulty: 'beginner',
    readTime: 60,
    lastUpdated: '2026-04-01',
    featured: true,
    downloadable: true,
    accentColor: 'blue',
    icon: '🧠',
  },
  {
    slug: 'genai-phases-4-6',
    category: 'genai',
    title: 'GenAI Engineering — Phases 4–6',
    subtitle: 'Tool Use · MCP · Agent SDKs · LangChain · LangGraph',
    description:
      'From chatbot to action machine. Phase 4: Tool calling fundamentals. Phase 5: Model Context Protocol (MCP) — the USB-C of AI. Phase 6: OpenAI Agents SDK, LangChain, LangGraph, and LlamaIndex. Includes animated flow diagrams and interactive workflow builders.',
    tags: ['Tool Use', 'MCP', 'Agents SDK', 'LangChain', 'LangGraph', 'LlamaIndex'],
    simulationFile: '/simulations/GenAI_Curriculum_Phases4-6.html',
    difficulty: 'intermediate',
    readTime: 55,
    lastUpdated: '2026-04-01',
    featured: true,
    downloadable: true,
    accentColor: 'purple',
    icon: '🤖',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getAllPosts(): Post[] {
  return posts
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((p) => p.featured)
}

export function getPostsByCategory(category: Category): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getPostBySlug(category: string, slug: string): Post | undefined {
  return posts.find((p) => p.category === category && p.slug === slug)
}

export function getCategoryMeta(slug: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit)
}
