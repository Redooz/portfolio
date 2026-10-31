import { MapPin } from 'lucide-react'
import { DevInfo } from '@/lib/dataFetcher'
import { SECTION_LINKS } from '@/lib/sections'
import { SocialIcon } from '../ui/SocialIcon'

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  email: 'Email',
}

export function Sidebar({
  devInfo,
  activeSection,
}: {
  devInfo: DevInfo
  activeSection: string
}) {
  return (
    <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
      <div className="overflow-hidden rounded-xl border border-line/70 bg-base/70 shadow-2xl shadow-crust/50 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line/60 bg-mantle/80 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-green" aria-hidden="true" />
          <span className="ml-2 truncate font-mono text-xs text-faint">
            ~/{devInfo.handle}
          </span>
        </div>

        <div className="p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-mauve">
            whoami
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
            {devInfo.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {devInfo.role} <span className="text-faint">@</span>{' '}
            <span className="text-blue">{devInfo.company}</span>
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2 text-muted">
              <MapPin className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
              {devInfo.location}
            </p>
            <p className="flex items-center gap-2 text-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span className="text-muted">{devInfo.availability}</span>
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {devInfo.pitch}
          </p>

          <nav aria-label="Sections" className="mt-6 hidden lg:block">
            <ul className="space-y-1">
              {SECTION_LINKS.map((section) => {
                const isActive = activeSection === section.id

                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group flex items-center justify-between rounded-md px-2.5 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                        isActive
                          ? 'bg-surface/70 text-fg'
                          : 'text-muted hover:bg-surface/40 hover:text-fg'
                      }`}
                    >
                      <span>
                        <span className="text-green" aria-hidden="true">$</span> cd{' '}
                        {section.id}
                      </span>
                      <span
                        aria-hidden="true"
                        className={isActive ? 'text-blue' : 'text-transparent group-hover:text-faint'}
                      >
                        ›
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-line/60 pt-4">
            {devInfo.info.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform === 'email' ? undefined : '_blank'}
                rel={link.platform === 'email' ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-1.5 rounded-md border border-line/60 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-blue/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                <SocialIcon platform={link.platform} className="h-3.5 w-3.5" />
                {socialLabels[link.platform] ?? link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
