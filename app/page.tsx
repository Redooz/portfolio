'use client'

import { useState } from 'react'
import Terminal from '@/components/Terminal'
import SimplePortfolio from '@/components/SimplePortfolio'
import { motion, AnimatePresence } from 'framer-motion'
import { ToggleButton } from '@/components/ToggleButton'

export default function Home() {
  const [isProVersion, setIsProVersion] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11111b] p-4">
      <div className="mb-4">
        <ToggleButton isProVersion={isProVersion} onToggle={() => setIsProVersion(!isProVersion)} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isProVersion ? 'pro' : 'simple'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl"
        >
          {isProVersion ? <Terminal /> : <SimplePortfolio />}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

