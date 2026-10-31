import { SECTION_LINKS } from '@/lib/sections'

export function MobileNav({ activeSection }: { activeSection: string }) {
  return (
    <nav
      aria-label="Sections"
      className="sticky top-14 z-30 -mx-4 mb-6 border-b border-line/60 bg-crust/85 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden"
    >
      <ul className="flex gap-0.5 overflow-x-auto pb-0.5">
        {SECTION_LINKS.map((section) => {
          const isActive = activeSection === section.id

          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`inline-flex rounded-full px-2 py-2 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust ${
                  isActive
                    ? 'bg-surface text-fg'
                    : 'text-muted hover:bg-surface/50 hover:text-fg'
                }`}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
