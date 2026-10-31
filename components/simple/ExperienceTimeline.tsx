'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ProfessionalExperience } from '@/data/experience'
import { Section } from './Section'

function getBullets(description: string) {
  return description
    .split('\n')
    .map((line) => line.replace(/^\*\s*/, '').trim())
    .filter(Boolean)
}

export function ExperienceTimeline({
  experience,
}: {
  experience: ProfessionalExperience[]
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <Section id="experience" command="git log --experience">
      <ol className="space-y-0">
        {experience.map((entry, index) => {
          const key = `${entry.company}-${entry.duration}`
          const bullets = getBullets(entry.description)
          const isExpanded = expanded.has(key)
          const visibleBullets = isExpanded ? bullets : bullets.slice(0, 3)
          const hiddenCount = bullets.length - 3

          return (
            <li key={key} className="relative pb-8 pl-7 last:pb-0 sm:pl-8">
              {index !== experience.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[5px] top-5 w-px bg-line/60"
                />
              )}

              <span className="absolute left-0 top-1.5 flex h-3 w-3">
                {entry.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/50 motion-reduce:animate-none" />
                )}
                <span
                  className={`relative inline-flex h-3 w-3 rounded-full border-2 border-crust ${
                    entry.current ? 'bg-green' : 'bg-blue'
                  }`}
                />
              </span>

              <div className="rounded-xl border border-line/50 bg-base/40 p-4 transition-colors hover:border-line sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-fg">{entry.role}</h3>
                  <span className="font-mono text-[11px] text-faint">
                    {entry.duration}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-blue">{entry.company}</p>

                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-full border border-line/60 bg-crust/50 px-2.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {visibleBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-faint"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={isExpanded}
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-blue transition-colors hover:text-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                  >
                    {isExpanded ? 'Show less' : `Show ${hiddenCount} more`}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
