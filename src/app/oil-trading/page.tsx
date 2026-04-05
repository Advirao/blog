import type { Metadata } from 'next'
import { getPostsByCategory, getCategoryMeta } from '@/lib/posts'
import { PostCard } from '@/components/content/PostCard'

export const metadata: Metadata = {
  title: 'Oil Trading',
  description:
    'Physical crude trading mechanics, risk management, pricing, and daily reports — interactive simulators built from scratch.',
}

export default function OilTradingPage() {
  const posts = getPostsByCategory('oil-trading')
  const meta = getCategoryMeta('oil-trading')!

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 pb-20">
      {/* Category hero */}
      <section className="py-14 border-b border-border mb-10">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-5xl">{meta.icon}</span>
          <div>
            <div className="font-mono text-[11px] text-accent tracking-widest uppercase mb-1">
              Category
            </div>
            <h1 className="font-bebas text-4xl md:text-5xl text-white tracking-wider leading-none">
              {meta.label}
            </h1>
          </div>
        </div>
        <p className="text-ink2 text-base max-w-2xl leading-relaxed">
          {meta.description}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <span className="pill bg-accent/10 text-accent border border-accent/20">
            {posts.length} modules
          </span>
          <span className="pill bg-surface2 text-ink2 border border-border">
            Interactive simulators
          </span>
        </div>
      </section>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
