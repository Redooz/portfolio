import { ReactNode } from 'react'

interface SectionProps {
  id: string
  command: string
  children: ReactNode
}

export function Section({ id, command, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28 lg:scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <h2 id={`${id}-heading`} className="font-mono text-sm text-muted">
          <span className="text-green" aria-hidden="true">$</span> {command}
        </h2>
        <span className="h-px flex-1 bg-line/60" aria-hidden="true" />
      </div>
      {children}
    </section>
  )
}
