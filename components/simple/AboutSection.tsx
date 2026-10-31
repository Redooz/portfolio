import { DevInfo } from '@/lib/dataFetcher'
import { Section } from './Section'

export function AboutSection({ devInfo }: { devInfo: DevInfo }) {
  return (
    <Section id="about" command="cat about.md">
      <div className="max-w-[68ch] space-y-4 text-[15px] leading-relaxed text-muted">
        {devInfo.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {devInfo.skillGroups.map((group, index) => (
          <div
            key={group.label}
            className="rounded-xl border border-line/50 bg-base/40 p-4 transition-colors hover:border-line"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-blue">
                {group.label}
              </h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-surface/70 px-2 py-1 text-xs text-muted ring-1 ring-inset ring-line/40"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
          Languages
        </span>
        {devInfo.languages.map((language) => (
          <span
            key={language.name}
            className="rounded-full border border-line/60 bg-base/60 px-3 py-1 text-xs text-muted"
          >
            <span className="text-fg">{language.name}</span> · {language.level}
          </span>
        ))}
      </div>
    </Section>
  )
}
