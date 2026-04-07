import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Lora } from 'next/font/google'
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

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F7' },
    { media: '(prefers-color-scheme: dark)',  color: '#16151C' },
  ],
  colorScheme: 'light dark',
}

// Inline script to apply dark class before first paint — prevents flash of wrong theme.
// Reads localStorage first, then falls back to OS preference.
const themeScript = `(function(){try{var t=localStorage.getItem('kb-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${lora.variable}`}
    >
      <body className="bg-bg text-ink antialiased">
        {/* Theme initialisation — must be first child, runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Site shell */}
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
