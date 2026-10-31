'use client'

import {
  getAwards,
  getDeveloperInfo,
  getProfessionalExperience,
  getProjects,
} from '@/lib/dataFetcher'
import { useActiveSection } from '@/lib/hooks/useActiveSection'
import { SECTION_IDS } from '@/lib/sections'
import { AboutSection } from './simple/AboutSection'
import { AwardsSection } from './simple/AwardsSection'
import { ContactSection } from './simple/ContactSection'
import { ExperienceTimeline } from './simple/ExperienceTimeline'
import { MobileNav } from './simple/MobileNav'
import { ProjectsSection } from './simple/ProjectsSection'
import { Sidebar } from './simple/Sidebar'

const devInfo = getDeveloperInfo()
const projects = getProjects()
const experience = getProfessionalExperience()
const awards = getAwards()

export default function SimplePortfolio() {
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <>
      <MobileNav activeSection={activeSection} />

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <Sidebar devInfo={devInfo} activeSection={activeSection} />

        <div className="min-w-0 space-y-16 sm:space-y-20">
          <AboutSection devInfo={devInfo} />
          <ExperienceTimeline experience={experience} />
          <AwardsSection awards={awards} />
          <ProjectsSection projects={projects} />
          <ContactSection devInfo={devInfo} />

          <footer className="flex flex-col items-start justify-between gap-2 border-t border-line/50 pb-2 pt-6 font-mono text-[11px] text-faint sm:flex-row sm:items-center">
            <span>Built with Next.js, TypeScript &amp; Catppuccin Mocha.</span>
            <span>
              <span className="text-green" aria-hidden="true">$</span> exit
            </span>
          </footer>
        </div>
      </div>
    </>
  )
}
