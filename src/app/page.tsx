'use client'

import { getAllPosts } from '@/lib/posts'
import { useFilter } from '@/hooks/useFilter'
import { PostCard } from '@/components/content/PostCard'
import { CategoryFilter } from '@/components/content/CategoryFilter'
import { SearchBar } from '@/components/ui/SearchBar'

const allPosts = getAllPosts()

const postCounts = {
  all: allPosts.length,
  'oil-trading': allPosts.filter((p) => p.category === 'oil-trading').length,
  genai: allPosts.filter((p) => p.category === 'genai').length,
}

export default function HomePage() {
  const { filter, setFilter, filtered } = useFilter(allPosts)

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-border bg-surface2">
          <span className="font-mono text-[11px] text-ink2 tracking-widest uppercase">
            Interactive Learning Modules
          </span>
        </div>

        <h1 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-tight mb-5">
          Learn by <span className="text-accent italic">Doing</span>
        </h1>

        <p className="text-ink2 text-lg max-w-xl mx-auto leading-relaxed">
          Interactive simulators on crude oil trading mechanics and generative AI
          engineering. Every number derived from scratch — use sliders to simulate
          your own position.
        </p>

        {/* Stats strip */}
        <div className="flex items-center justify-center gap-12 mt-12">
          {[
            { label: 'Interactive Modules', value: `${allPosts.length}` },
            { label: 'Live Simulators',     value: '20+' },
            { label: 'Topics Covered',      value: '2' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bebas text-4xl text-accent tracking-wide leading-none">
                {s.value}
              </div>
              <div className="font-mono text-[10px] text-ink2 uppercase tracking-widest mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category spotlights ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
        {/* Oil Trading */}
        <a
          href="/oil-trading"
          className="group relative overflow-hidden rounded-2xl p-8 flex items-end min-h-[160px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          style={{ background: '#DFF0E8' }}
        >
          <div className="relative z-10">
            <div className="font-mono text-[10px] tracking-widest uppercase text-accent/80 mb-2">
              Category
            </div>
            <h2 className="font-bebas text-3xl text-ink tracking-wide leading-tight">
              Oil Trading
            </h2>
            <p className="text-sm text-ink2 mt-1 leading-snug max-w-xs">
              Physical crude mechanics, pricing, risk & daily reports
            </p>
          </div>
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl opacity-25 select-none">
            🛢️
          </span>
        </a>

        {/* GenAI Engineering */}
        <a
          href="/genai"
          className="group relative overflow-hidden rounded-2xl p-8 flex items-end min-h-[160px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          style={{ background: '#E0DFF0' }}
        >
          <div className="relative z-10">
            <div className="font-mono text-[10px] tracking-widest uppercase text-purple/80 mb-2">
              Category
            </div>
            <h2 className="font-bebas text-3xl text-ink tracking-wide leading-tight">
              GenAI Engineering
            </h2>
            <p className="text-sm text-ink2 mt-1 leading-snug max-w-xs">
              Tokens, RAG, tool use, MCP, and production agent systems
            </p>
          </div>
          <span className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl opacity-25 select-none">
            🤖
          </span>
        </a>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section className="mb-8 space-y-4">
        <SearchBar
          value={filter.search}
          onChange={(search) => setFilter((f) => ({ ...f, search }))}
          className="max-w-sm"
        />
        <CategoryFilter
          filter={filter}
          onFilterChange={(update) => setFilter((f) => ({ ...f, ...update }))}
          postCounts={postCounts}
        />
      </section>

      {/* ── Post Grid ────────────────────────────────────────────────────── */}
      <section>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-ink2 text-sm">
              No modules match your filters.{' '}
              <button
                className="text-accent underline"
                onClick={() => setFilter({ category: 'all', difficulty: 'all', search: '' })}
              >
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[11px] text-ink2 uppercase tracking-widest">
                {filtered.length} module{filtered.length !== 1 ? 's' : ''}
                {filter.category !== 'all' || filter.search
                  ? ' — filtered'
                  : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
