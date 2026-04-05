import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    template: '%s | Knowledge Base',
    default: 'Knowledge Base — Oil Trading & GenAI Engineering',
  },
  description:
    'Interactive learning modules on crude oil trading mechanics, risk management, and generative AI engineering. Every concept explained from scratch with live simulators.',
  keywords: [
    'oil trading',
    'crude oil',
    'DV01',
    'VaR',
    'hedging',
    'GenAI',
    'RAG',
    'MCP',
    'LLM',
    'prompt engineering',
  ],
  authors: [{ name: 'Knowledge Base' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Knowledge Base',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e14',
  colorScheme: 'dark',
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="bg-bg text-ink antialiased">
        {/* Global grid background */}
        <div className="grid-bg" aria-hidden="true" />

        {/* Site shell */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
