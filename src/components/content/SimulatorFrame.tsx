'use client'

import { useState, useEffect, useRef } from 'react'
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SimulatorFrameProps {
  src: string
  title: string
  className?: string
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function SimulatorFrame({ src, title, className }: SimulatorFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [key, setKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Open URLs posted from inside the iframe (vault links) in the parent window
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'open-url' && typeof e.data.url === 'string') {
        window.open(e.data.url, '_blank', 'noopener,noreferrer')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Forward theme to the iframe — on load and whenever the toggle fires
  useEffect(() => {
    const iframe = iframeRef.current

    function sendTheme() {
      const dark = document.documentElement.classList.contains('dark')
      iframe?.contentWindow?.postMessage({ type: 'theme', dark }, '*')
    }

    // Send current theme when iframe finishes loading
    iframe?.addEventListener('load', sendTheme)

    // Re-send whenever SiteHeader dispatches a theme change
    window.addEventListener('kb-theme-change', sendTheme)

    return () => {
      iframe?.removeEventListener('load', sendTheme)
      window.removeEventListener('kb-theme-change', sendTheme)
    }
  }, [key]) // re-register when iframe is reloaded (key increments)

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-border overflow-hidden bg-surface',
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-0'
          : 'relative',
        className
      )}
    >
      {/* Frame toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border shrink-0">
        {/* Traffic-light dots (decorative) */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[11px] text-ink2 ml-3 tracking-wide">
            {title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((k) => k + 1)}
            title="Reload simulator"
            className="text-ink2 hover:text-ink transition-colors p-1 rounded"
          >
            <RefreshCw size={13} />
          </button>
          <button
            onClick={() => setIsFullscreen((f) => !f)}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="text-ink2 hover:text-accent transition-colors p-1 rounded"
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* The iframe */}
      <iframe
        ref={iframeRef}
        key={key}
        src={`${basePath}${src}`}
        title={title}
        className="sim-frame flex-1"
        style={isFullscreen ? { minHeight: '100%' } : undefined}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
