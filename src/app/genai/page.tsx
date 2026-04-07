import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostsByCategory, getCategoryMeta } from '@/lib/posts'
import { PostCard } from '@/components/content/PostCard'

export const metadata: Metadata = {
  title: 'GenAI Engineering',
  description:
    'From Python fundamentals to production-grade AI systems — tokens, RAG, tool use, MCP, and agentic SDKs.',
}

export default function GenAIPage() {
  const posts = getPostsByCategory('genai')
  const meta = getCategoryMeta('genai')!

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pb-20">
      {/* Category hero */}
      <section
        className="rounded-2xl px-8 py-12 mt-8 mb-10 relative overflow-hidden"
        style={{ background: 'var(--cat-ai-banner)' }}
      >
        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-widest uppercase text-purple/70 mb-3">
            Category
          </div>
          <h1 className="font-bebas text-4xl md:text-5xl text-ink tracking-wide leading-none mb-3">
            {meta.label}
          </h1>
          <p className="text-ink2 text-base max-w-xl leading-relaxed">
            {meta.description}
          </p>
          <div className="flex items-center gap-3 mt-5">
            <span className="pill bg-purple/15 text-purple border border-purple/20">
              {posts.length} modules
            </span>
            <span className="pill bg-surface/60 text-ink2 border border-border">
              Live simulators
            </span>
            <span className="pill bg-surface/60 text-ink2 border border-border">
              2026 Edition
            </span>
          </div>
        </div>
        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl opacity-15 select-none pointer-events-none">
          🤖
        </span>
      </section>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-mono text-[11px] text-ink2 mb-6">
        <Link href="/" className="hover:text-purple transition-colors">Home</Link>
        <span>/</span>
        <span className="text-ink">GenAI Engineering</span>
      </nav>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
