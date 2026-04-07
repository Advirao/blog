import Link from 'next/link'
import { Mail, Phone, Linkedin } from 'lucide-react'
import { CATEGORIES } from '@/lib/posts'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface2 mt-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">

        {/* Author spotlight */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Avatar / initial */}
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center">
              <span className="font-bebas text-2xl text-accent leading-none">AR</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] tracking-widest uppercase text-ink2 mb-1">
                About the Author
              </div>
              <div className="font-bebas text-xl text-white tracking-wide mb-1">
                Advi Rao
              </div>
              <p className="text-sm text-ink2 leading-relaxed max-w-2xl">
                17 years of IT experience in consulting, architecting, leading teams, and winning proposals.
                AI evangelist bringing data to insights — helping organisations move from raw information
                to decisions that matter.
              </p>

              {/* Contact links */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <a
                  href="mailto:advirao@gmail.com"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-ink2 hover:text-accent transition-colors"
                  aria-label="Email Advi Rao"
                >
                  <Mail size={13} />
                  advirao@gmail.com
                </a>
                <a
                  href="tel:+13463958885"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-ink2 hover:text-accent transition-colors"
                  aria-label="Call Advi Rao"
                >
                  <Phone size={13} />
                  +1 346 395 8885
                </a>
                <a
                  href="https://www.linkedin.com/in/advirao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-ink2 hover:text-accent transition-colors"
                  aria-label="Advi Rao on LinkedIn"
                >
                  <Linkedin size={13} />
                  linkedin.com/in/advirao
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-bebas text-xl text-white tracking-wide mb-2">
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
            © 2026 Advi Rao — Knowledge Base
          </span>
          <span className="font-mono text-[10px] text-ink2">
            Interactive learning — no assumptions
          </span>
        </div>
      </div>
    </footer>
  )
}
