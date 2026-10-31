'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { DevInfo } from '@/lib/dataFetcher'
import { Section } from './Section'

export function ContactSection({ devInfo }: { devInfo: DevInfo }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const emailLink = devInfo.info.find((link) => link.platform === 'email')
  const githubLink = devInfo.info.find((link) => link.platform === 'github')
  const linkedinLink = devInfo.info.find((link) => link.platform === 'linkedin')
  const email = emailLink?.url.replace(/^mailto:/, '') ?? ''

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copyEmail = async () => {
    if (!email) return

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section id="contact" command="contact">
      <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-gradient-to-br from-surface/60 via-base/60 to-mantle/60 p-6 sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue/10 blur-3xl"
          aria-hidden="true"
        />

        <p className="font-mono text-[11px] uppercase tracking-widest text-mauve">
          $ whoami
        </p>
        <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-fg text-balance">
          Let&apos;s build something that matters.
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          I&apos;m open to new opportunities and challenges. The fastest way to
          reach me is email.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-blue px-3.5 py-2 font-mono text-xs font-bold text-crust transition-colors hover:bg-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email me
            </a>
          )}

          {email && (
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-md border border-line/70 bg-base/40 px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-line hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          )}

          {linkedinLink && (
            <a
              href={linkedinLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line/70 bg-base/40 px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-line hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
          )}

          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line/70 bg-base/40 px-3.5 py-2 font-mono text-xs text-muted transition-colors hover:border-line hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/50 pt-4 font-mono text-[11px] text-faint">
          <span>{devInfo.location}</span>
          <span aria-hidden="true">·</span>
          <span>
            {devInfo.languages.map((language) => language.name).join(' · ')}
          </span>
        </div>
      </div>
    </Section>
  )
}
