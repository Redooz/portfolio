'use client'

import { useCallback, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/data/projects'
import { getProjectDetails } from '@/lib/dataFetcher'
import { ProjectCard } from './ProjectCard'
import { ProjectDrawer } from './ProjectDrawer'
import { Section } from './Section'

const FILTERS = ['All', 'AI & Agents', 'Fintech', 'Full-stack', 'Backend'] as const
type Filter = (typeof FILTERS)[number]

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.categories?.includes(filter)),
    [filter, projects]
  )

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: projects.length }
    FILTERS.slice(1).forEach((category) => {
      result[category] = projects.filter((project) =>
        project.categories?.includes(category)
      ).length
    })
    return result
  }, [projects])

  const selectedProject = useMemo(
    () => (selectedSlug ? getProjectDetails(selectedSlug) : null),
    [selectedSlug]
  )

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const clearDrawer = useCallback(() => setSelectedSlug(null), [])
  const openProject = useCallback((slug: string) => {
    setSelectedSlug(slug)
    setDrawerOpen(true)
  }, [])

  const featured = visible.find((project) => project.featured)
  const rest = visible.filter((project) => project.slug !== featured?.slug)

  return (
    <Section id="projects" command="ls projects/">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1.5"
        >
          {FILTERS.map((category) => {
            const isActive = filter === category
            const count = counts[category] ?? 0

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(category)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust ${
                  isActive
                    ? 'border-blue/60 bg-blue/15 text-blue'
                    : 'border-line/60 bg-base/40 text-muted hover:border-line hover:text-fg'
                }`}
              >
                {category}
                <span className={isActive ? 'text-blue/70' : 'text-faint'}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <span className="font-mono text-[11px] text-faint">
          {visible.length} project{visible.length === 1 ? '' : 's'}
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-line/70 bg-base/40 p-8 text-center">
          <p className="font-mono text-xs text-faint">
            $ ls projects/{filter.toLowerCase()}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            {filter === 'Fintech'
              ? 'Fintech work lives under NDA. I build payouts, open banking and POS platforms at Wompi.'
              : 'No public projects in this category yet. More experiments live on GitHub.'}
          </p>
          <a
            href={filter === 'Fintech' ? '#experience' : 'https://github.com/Redooz'}
            target={filter === 'Fintech' ? undefined : '_blank'}
            rel={filter === 'Fintech' ? undefined : 'noopener noreferrer'}
            className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-blue transition-colors hover:text-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust"
          >
            {filter === 'Fintech' ? 'See the Wompi experience' : 'Browse GitHub'}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featured && (
            <ProjectCard
              project={featured}
              featured
              onOpen={openProject}
            />
          )}
          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={openProject}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <a
          href="https://github.com/Redooz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-crust"
        >
          All repositories
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <ProjectDrawer
        project={selectedProject}
        open={drawerOpen}
        onClose={closeDrawer}
        onExited={clearDrawer}
      />
    </Section>
  )
}
