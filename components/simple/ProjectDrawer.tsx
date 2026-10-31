'use client'

import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, Play, X } from 'lucide-react'
import { ProjectDetails } from '@/lib/dataFetcher'
import { useFocusTrap } from '@/lib/hooks/useFocusTrap'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

function needsUnoptimized(src?: string) {
  return Boolean(src && (src.endsWith('.gif') || src.endsWith('.svg')))
}

export function ProjectDrawer({
  project,
  open,
  onClose,
  onExited,
}: {
  project: ProjectDetails | null
  open: boolean
  onClose: () => void
  onExited: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  const handleClose = useCallback(() => onClose(), [onClose])
  useFocusTrap(dialogRef, open, handleClose)

  if (typeof document === 'undefined') return null

  const markdown = project?.content.replace(/^#\s+.+\n+/, '') ?? ''

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {open && project && (
        <motion.div key="project-drawer" className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-crust/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
            tabIndex={-1}
            initial={isDesktop ? { x: '100%' } : { y: '100%' }}
            animate={isDesktop ? { x: 0 } : { y: 0 }}
            exit={isDesktop ? { x: '100%' } : { y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className={`absolute flex flex-col border-line/70 bg-mantle shadow-2xl shadow-crust/80 ${
              isDesktop
                ? 'inset-y-0 right-0 w-full max-w-xl border-l'
                : 'inset-x-0 bottom-0 max-h-[92vh] rounded-t-2xl border-t'
            }`}
          >
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-line lg:hidden" />

            <div className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-3">
              <span className="truncate font-mono text-xs text-faint">
                ~/projects/{project.slug}
              </span>
              <button
                type="button"
                data-autofocus
                onClick={handleClose}
                aria-label="Close project details"
                className="rounded-md border border-line/60 p-1.5 text-muted transition-colors hover:border-line hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mantle"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-5 pb-10 pt-5 sm:px-6">
              {project.image && (
                <div className="overflow-hidden rounded-lg border border-line/60 bg-base">
                  <Image
                    src={project.image}
                    alt={`${project.name} cover`}
                    width={800}
                    height={450}
                    sizes="(min-width: 1024px) 576px, 100vw"
                    unoptimized={needsUnoptimized(project.image)}
                    className="h-auto w-full"
                  />
                </div>
              )}

              {project.tech && project.tech.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
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

              <h2
                id="project-drawer-title"
                className="mt-4 text-2xl font-semibold tracking-tight text-fg"
              >
                {project.name}
              </h2>
              {project.summary && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue px-3 py-1.5 font-mono text-[11px] font-bold text-crust transition-colors hover:bg-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mantle"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    View source
                  </a>
                )}
                {project.video && (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-yellow px-3 py-1.5 font-mono text-[11px] font-bold text-crust transition-colors hover:bg-peach focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mantle"
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
                    className="inline-flex items-center gap-1.5 rounded-md bg-green px-3 py-1.5 font-mono text-[11px] font-bold text-crust transition-colors hover:bg-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mantle"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Live demo
                  </a>
                )}
              </div>

              <ReactMarkdown className="prose prose-invert prose-portfolio mt-6 max-w-none">
                {markdown}
              </ReactMarkdown>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
