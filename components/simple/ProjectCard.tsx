import Image from 'next/image'
import { ArrowUpRight, ExternalLink, Github, Play } from 'lucide-react'
import { Project } from '@/data/projects'

function needsUnoptimized(src?: string) {
  return Boolean(src && (src.endsWith('.gif') || src.endsWith('.svg')))
}

export function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: Project
  featured?: boolean
  onOpen: (slug: string) => void
}) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-line/60 bg-base/50 transition duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-xl hover:shadow-crust/60 ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        aria-haspopup="dialog"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue"
      >
        <div className="relative overflow-hidden bg-mantle">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} cover`}
              width={800}
              height={450}
              sizes={featured ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 640px) 50vw, 100vw'}
              unoptimized={needsUnoptimized(project.image)}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                featured ? 'aspect-[1200/630] h-auto' : 'h-48'
              }`}
            />
          ) : (
            <div className="flex h-40 items-center justify-center font-mono text-xs text-faint">
              no preview
            </div>
          )}

          {featured && (
            <span className="absolute right-3 top-3 rounded-full bg-crust/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-yellow ring-1 ring-inset ring-yellow/40">
              Featured
            </span>
          )}
        </div>

        <div className={`p-5 ${featured ? 'pb-4' : 'pb-3'}`}>
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-semibold text-fg ${
                featured ? 'text-xl' : 'text-base'
              }`}
            >
              {project.name}
            </h3>
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-blue"
              aria-hidden="true"
            />
          </div>
          <p
            className={`mt-1.5 text-sm leading-relaxed text-muted ${
              featured ? 'max-w-2xl' : 'line-clamp-2'
            }`}
          >
            {project.summary}
          </p>
        </div>
      </button>

      <div className="mt-auto space-y-3 border-t border-line/40 px-5 py-4">
        {project.tech && project.tech.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-surface/70 px-2 py-0.5 text-[11px] text-muted ring-1 ring-inset ring-line/40"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-4">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Watch demo
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
