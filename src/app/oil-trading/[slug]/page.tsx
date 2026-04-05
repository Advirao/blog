import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Clock, Calendar } from 'lucide-react'
import { getPostBySlug, getPostsByCategory, getRelatedPosts } from '@/lib/posts'
import { SimulatorFrame } from '@/components/content/SimulatorFrame'
import { DownloadButton } from '@/components/content/DownloadButton'
import { PostCard } from '@/components/content/PostCard'
import { Badge } from '@/components/ui/Badge'
import { difficultyConfig, formatDate, readTimeLabel } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getPostsByCategory('oil-trading').map((p) => ({ slug: p.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug('oil-trading', params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OilTradingSlugPage({ params }: Props) {
  const post = getPostBySlug('oil-trading', params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post, 2)
  const difficulty = difficultyConfig[post.difficulty]

  return (
    <article className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface px-4 md:px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 flex-wrap">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-[11px] text-ink2 min-w-0">
            <Link href="/" className="hover:text-accent transition-colors shrink-0">
              Home
            </Link>
            <ChevronLeft size={12} className="rotate-180 shrink-0" />
            <Link href="/oil-trading" className="hover:text-accent transition-colors shrink-0">
              🛢️ Oil Trading
            </Link>
            <ChevronLeft size={12} className="rotate-180 shrink-0" />
            <span className="text-white truncate">{post.title}</span>
          </nav>

          {/* Meta chips */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant={difficulty.textClass.replace('text-', '') as never}>
              {difficulty.label}
            </Badge>
            <span className="flex items-center gap-1 font-mono text-[11px] text-ink2">
              <Clock size={11} />
              {readTimeLabel(post.readTime)}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-ink2">
              <Calendar size={11} />
              {formatDate(post.lastUpdated)}
            </span>
            {post.downloadable && (
              <DownloadButton
                simulationFile={post.simulationFile}
                filename={`${post.slug}.html`}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Title strip ─────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-bg px-4 md:px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start gap-4">
            <span className="text-4xl select-none">{post.icon}</span>
            <div className="min-w-0">
              <h1 className="font-bebas text-2xl md:text-3xl text-white tracking-wider leading-none">
                {post.title}
              </h1>
              <p className="font-mono text-[12px] text-ink2 mt-1.5 leading-relaxed">
                {post.subtitle}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 bg-surface2 border border-border rounded text-ink2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Simulator ───────────────────────────────────────────────────── */}
      <div className="flex-1 px-4 md:px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <SimulatorFrame
            src={post.simulationFile}
            title={post.title}
          />
        </div>
      </div>

      {/* ── Related posts ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-border bg-surface px-4 md:px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mono-label mb-5">Related Modules</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
