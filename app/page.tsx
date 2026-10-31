'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Terminal from '@/components/Terminal'
import SimplePortfolio from '@/components/SimplePortfolio'
import { ModeToggle, PortfolioMode } from '@/components/ui/ModeToggle'
import { getDeveloperInfo } from '@/lib/dataFetcher'

const handle = getDeveloperInfo().handle

export default function Home() {
  const [mode, setMode] = useState<PortfolioMode>('text')

  const changeMode = (next: PortfolioMode) => {
    setMode(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="relative min-h-screen bg-crust bg-grid">
      <div
        className="pointer-events-none absolute inset-0 bg-glow"
        aria-hidden="true"
      />

      <a
        href="#portfolio-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-blue focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-crust"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line/60 bg-crust/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#portfolio-content"
            aria-label="Back to top"
            className="inline-flex items-center gap-2 rounded-md font-mono text-sm text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded border border-line/70 bg-base text-xs text-green">
              &gt;
            </span>
            <span className="hidden sm:inline">/{handle}</span>
            <span className="sm:hidden">~/</span>
          </a>

          <ModeToggle mode={mode} onChange={changeMode} />
        </div>
      </header>

      <div
        id="portfolio-content"
        tabIndex={-1}
        className="relative mx-auto w-full max-w-6xl px-4 py-8 focus:outline-none sm:px-6 lg:px-8 lg:py-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {mode === 'terminal' ? (
              <div className="mx-auto max-w-4xl">
                <Terminal />
              </div>
            ) : (
              <SimplePortfolio />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
