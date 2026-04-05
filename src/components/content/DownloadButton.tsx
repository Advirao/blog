'use client'

import { useState } from 'react'
import { Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DownloadButtonProps {
  simulationFile: string
  filename: string
  label?: string
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function DownloadButton({
  simulationFile,
  filename,
  label = 'Download HTML',
}: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a')
    a.href = `${basePath}${simulationFile}`
    a.download = filename.endsWith('.html') ? filename : `${filename}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2500)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="gap-1.5 text-xs"
    >
      {downloaded ? (
        <>
          <Check size={13} className="text-accent" />
          <span className="text-accent">Saved!</span>
        </>
      ) : (
        <>
          <Download size={13} />
          {label}
        </>
      )}
    </Button>
  )
}
