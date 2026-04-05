import Link from 'next/link'
import { CATEGORIES } from '@/lib/posts'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-bebas text-xl text-white tracking-wider mb-2">
              Knowledge<span className="text-accent">Base</span>
            </div>
            <p className="text-ink2 text-sm leading-relaxed max-w-xs">
              Interactive learning modules on crude oil trading and generative AI
              engineering. Every number derived from scratch.
            </p>
          </div>

          {/* Topics */}
          <div>
            <div className="mono-label mb-4">Topics</div>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-ink2 hover:text-accent text-sm transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className="mono-label mb-4">About</div>
            <ul className="space-y-2 text-sm text-ink2">
              <li>Built with Next.js 14 + Tailwind CSS</li>
              <li>All simulations run client-side</li>
              <li>No data collected or stored</li>
              <li className="pt-2">
                <span className="text-accent font-mono text-xs">
                  v1.0.0 — 2026
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-[10px] text-ink2 tracking-widest uppercase">
            © 2026 Knowledge Base
          </span>
          <span className="font-mono text-[10px] text-ink2">
            Interactive learning — no assumptions
          </span>
        </div>
      </div>
    </footer>
  )
}
