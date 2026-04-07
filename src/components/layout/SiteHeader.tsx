'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/',              label: 'All Topics' },
  { href: '/oil-trading',   label: 'Oil Trading' },
  { href: '/genai',         label: 'GenAI' },
  { href: '/claude-code',   label: 'Claude Code' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex pill bg-surface2 text-ink2 border border-border text-[10px]">
            7 Modules
          </span>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-ink2 hover:text-ink hover:bg-surface2 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-sm px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-lg font-mono text-[12px] tracking-wide uppercase transition-all duration-150',
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/25'
                    : 'text-ink2 hover:text-ink hover:bg-surface2 border border-transparent'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
