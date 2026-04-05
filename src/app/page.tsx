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
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span className="font-mono text-[11px] text-accent tracking-widest uppercase">
            Interactive Learning Modules
          </span>
        </div>

        <h1 className="font-bebas text-5xl md:text-7xl text-white tracking-wider leading-none mb-4">
          Learn by <span className="text-accent">Doing</span>
        </h1>

        <p className="text-ink2 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Interactive simulators on crude oil trading mechanics and generative AI
          engineering. Every number derived from scratch — use sliders to simulate
          your own position.
        </p>

        {/* Stats strip */}
        <div className="flex items-center justify-center gap-8 mt-10">
          {[
            { label: 'Interactive Modules', value: `${allPosts.length}` },
            { label: 'Live Simulators', value: '20+' },
            { label: 'Topics Covered',   value: '2' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bebas text-3xl text-accent tracking-wider leading-none">
                {s.value}
              </div>
              <div className="font-mono text-[10px] text-ink2 uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
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
