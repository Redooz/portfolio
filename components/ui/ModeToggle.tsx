'use client'

import { FileText, Terminal } from 'lucide-react'

export type PortfolioMode = 'text' | 'terminal'

interface ModeToggleProps {
  mode: PortfolioMode
  onChange: (mode: PortfolioMode) => void
}

const options: { value: PortfolioMode; label: string; icon: typeof FileText }[] = [
  { value: 'text', label: 'Text', icon: FileText },
  { value: 'terminal', label: 'Terminal', icon: Terminal },
]

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Portfolio view"
      className="flex items-center gap-1 rounded-full border border-line/70 bg-base/70 p-1"
    >
      {options.map((option) => {
        const Icon = option.icon
        const isActive = mode === option.value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust ${
              isActive
                ? 'bg-surface text-fg shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sr-only sm:hidden">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
