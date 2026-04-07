'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/',              label: 'All Topics' },
  { href: '/oil-trading',   label: 'Oil Trading' },
  { href: '/genai',         label: 'GenAI' },
  { href: '/claude-code',   label: 'Claude Code' },
]

export function SiteHeader() {
  const pathname = usePathname()

  const isSimulatorPage =
    pathname.includes('/oil-trading/') || pathname.includes('/genai/') || pathname.includes('/claude-code/')

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-sm',
        isSimulatorPage && 'border-b-0'
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Knowledge Base home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent font-mono text-xs font-semibold border border-accent/20 group-hover:bg-accent/20 transition-colors">
            KB
          </span>
          <span className="font-bebas text-lg text-white tracking-wide leading-none">
            Knowledge<span className="text-accent">Base</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg font-mono text-[11px] tracking-wide uppercase transition-all duration-150',
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/25'
                    : 'text-ink2 hover:text-ink hover:bg-surface2 border border-transparent'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side: module count */}
        <div className="hidden md:flex items-center gap-2">
          <span className="pill bg-surface2 text-ink2 border border-border text-[10px]">
            7 Modules
          </span>
        </div>
      </div>
    </header>
  )
}
