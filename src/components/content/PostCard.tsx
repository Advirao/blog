import Link from 'next/link'
import { Clock, BarChart2, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn, accentBorderClass, accentTextClass, accentBgClass, difficultyConfig, formatDate, readTimeLabel, categoryLabels } from '@/lib/utils'
import type { Post, AccentColor } from '@/lib/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const href = `/${post.category}/${post.slug}`
  const difficulty = difficultyConfig[post.difficulty]
  const accent = post.accentColor as AccentColor

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col bg-surface border border-border rounded-xl overflow-hidden',
        'transition-all duration-200',
        'hover:border-opacity-60 hover:-translate-y-0.5',
        accentBorderClass[accent].replace('border-', 'hover:border-'),
        featured ? 'md:col-span-2' : ''
      )}
      style={{
        ['--hover-border' as string]: `var(--${accent === 'accent' ? 'accent' : accent})`,
      }}
    >
      {/* Top accent bar */}
      <div
        className={cn('h-0.5 w-full', accentBgClass[accent].replace('/10', '/60'))}
        style={{ background: `var(--${accent === 'accent' ? 'accent' : accent})` }}
      />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Icon + category */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none select-none">{post.icon}</span>
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-ink2 mb-0.5">
                {categoryLabels[post.category]}
              </div>
              <Badge variant={accent} className="text-[9px]">
                {difficulty.label}
              </Badge>
            </div>
          </div>

          {post.featured && (
            <span className="pill bg-gold/10 text-gold border border-gold/20 text-[9px] shrink-0">
              Featured
            </span>
          )}
        </div>

        {/* Title & subtitle */}
        <div>
          <h2
            className={cn(
              'font-bebas text-xl tracking-wider text-white leading-tight mb-1.5',
              'group-hover:text-opacity-90 transition-colors',
              featured ? 'text-2xl md:text-3xl' : ''
            )}
          >
            {post.title}
          </h2>
          <p className="font-mono text-[11px] text-ink2 tracking-wide leading-relaxed">
            {post.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-ink2 leading-relaxed line-clamp-3 flex-1">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, featured ? 6 : 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 bg-surface2 border border-border rounded text-ink2"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > (featured ? 6 : 4) && (
            <span className="font-mono text-[10px] px-2 py-0.5 text-ink2">
              +{post.tags.length - (featured ? 6 : 4)} more
            </span>
          )}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-ink2">
            <span className="flex items-center gap-1 font-mono text-[10px]">
              <Clock size={11} />
              {readTimeLabel(post.readTime)}
            </span>
            <span className="text-border">·</span>
            <span className="font-mono text-[10px]">
              {formatDate(post.lastUpdated)}
            </span>
          </div>

          <span
            className={cn(
              'flex items-center gap-1 font-mono text-[11px] font-semibold',
              accentTextClass[accent],
              'group-hover:gap-2 transition-all duration-150'
            )}
          >
            Open
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
