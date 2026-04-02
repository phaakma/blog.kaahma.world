'use client'

import { useEffect, useId, useState } from 'react'
import mermaid from 'mermaid'

let mermaidInitialized = false

function initializeMermaid() {
  if (mermaidInitialized) {
    return
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'default',
  })

  mermaidInitialized = true
}

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState('')
  const [failed, setFailed] = useState(false)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    let mounted = true

    async function renderChart() {
      try {
        initializeMermaid()
        const renderResult = await mermaid.render(`mermaid-${id}`, chart.trim())
        if (mounted) {
          setSvg(renderResult.svg)
          setFailed(false)
        }
      } catch {
        if (mounted) {
          setFailed(true)
          setSvg('')
        }
      }
    }

    renderChart()

    return () => {
      mounted = false
    }
  }, [chart, id])

  if (failed) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    )
  }

  if (!svg) {
    return <div className="my-6 text-sm text-gray-500 dark:text-gray-400">Rendering diagram...</div>
  }

  return (
    <div
      className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
