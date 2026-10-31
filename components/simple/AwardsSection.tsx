import { ArrowUpRight, Trophy } from 'lucide-react'
import { Award } from '@/data/awards'
import { Section } from './Section'

export function AwardsSection({ awards }: { awards: Award[] }) {
  return (
    <Section id="awards" command="cat awards.md">
      <ul className="space-y-3">
        {awards.map((award) => (
          <li
            key={award.title}
            className="relative overflow-hidden rounded-xl border border-yellow/25 bg-gradient-to-br from-yellow/[0.07] via-base/50 to-mantle/40 p-5"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-yellow/30 bg-yellow/10 text-yellow">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-base font-semibold text-fg">
                    {award.title}
                  </h3>
                  <span className="font-mono text-[11px] text-faint">
                    {award.date}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted">
                  Issued by{' '}
                  {award.url ? (
                    <a
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-blue transition-colors hover:text-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                    >
                      {award.issuer}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    award.issuer
                  )}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {award.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
