import { useState, useEffect, useRef } from 'react'
import { getProjects, getProjectDetails, getDeveloperInfo, getProfessionalExperience, SocialMediaLink } from '@/lib/dataFetcher'
import Image from 'next/image'
import { Project } from "@/data/projects"
import ReactMarkdown from 'react-markdown'
import portfolioStyles from '@/styles/SimplePortfolio.module.css'
import {ProfessionalExperience} from "@/data/experience";
import { SocialIcon } from './ui/SocialIcon'
import { Github, ExternalLink, Play } from 'lucide-react'

function needsUnoptimized(src?: string) {
  return Boolean(src && (src.endsWith('.gif') || src.endsWith('.svg')))
}

export default function SimplePortfolio() {
  const title = "Nicolás Olmos Portfolio"
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [projectDetails, setProjectDetails] = useState<{ content: string; image?: string; repo?: string; demo?: string; video?: string; tech?: string[] } | null>(null)
  const [aboutInfo, setAboutInfo] = useState<string>('')
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([])
  const [professionalExperience, setProfessionalExperience] = useState<ProfessionalExperience[]>([])
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function fetchData() {
      const projectsList = getProjects()
      setProjects(projectsList)
      const { content, info } = getDeveloperInfo()
      setAboutInfo(content)
      setSocialLinks(info)
      const experienceList = getProfessionalExperience()
      setProfessionalExperience(experienceList)
    }
    fetchData()
  }, [])

  useEffect(() => {
    function fetchProjectDetails() {
      if (selectedProject) {
        const details = getProjectDetails(selectedProject)
        setProjectDetails(details || { content: 'Project details not found.' })
      }
    }
    fetchProjectDetails()
  }, [selectedProject])

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [projectDetails])

  return (
    <div className={`w-full bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg shadow-lg font-mono`}>
      <h1 className="text-2xl font-bold mb-4 text-[#f9e2af]">{title}</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#89b4fa]">About Me</h2>
        <ReactMarkdown className="prose prose-invert max-w-none">
          {aboutInfo}
        </ReactMarkdown>
        <div className="flex mt-4 space-x-4">
          {socialLinks.map((link: SocialMediaLink) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="text-[#cdd6f4] hover:text-[#89b4fa] transition-colors"
            >
              <SocialIcon platform={link.platform}/>
            </a>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#89b4fa]">Professional Experience</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {professionalExperience.map((experience) => (
            <li key={`${experience.company}-${experience.duration}`} className="bg-[#313244] rounded-lg overflow-hidden p-4">
              <h3 className="text-lg font-bold text-[#f9e2af]">{experience.role}</h3>
              <p className="text-sm text-[#cdd6f4]">{experience.company}</p>
              <p className="text-sm text-[#cdd6f4]">{experience.duration}</p>
              <ReactMarkdown className="prose prose-invert max-w-none mt-2">
                {experience.description}
              </ReactMarkdown>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#89b4fa]">Some of my projects</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li key={project.slug} className="bg-[#313244] rounded-lg overflow-hidden flex flex-col">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={400}
                  height={200}
                  unoptimized={needsUnoptimized(project.image)}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <button
                  onClick={() => setSelectedProject(project.slug)}
                  aria-expanded={selectedProject === project.slug}
                  className={`text-left w-full font-bold ${
                    selectedProject === project.slug ? 'text-[#a6e3a1]' : 'hover:text-[#89b4fa]'
                  }`}
                >
                  {project.name}
                </button>
                {project.tech && (
                  <ul className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((tech) => (
                      <li key={tech} className="text-xs px-2 py-1 rounded bg-[#45475a] text-[#bac2de]">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center gap-4 mt-auto pt-3">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#89b4fa] hover:text-[#b4befe] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" aria-hidden="true" /> Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#89b4fa] hover:text-[#b4befe] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Live demo
                    </a>
                  )}
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#89b4fa] hover:text-[#b4befe] transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" aria-hidden="true" /> Watch demo
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedProject && projectDetails && (
        <div ref={detailsRef}
             className={`${portfolioStyles['project-details']} ${projectDetails ? portfolioStyles['visible'] : ''}`}>
          <h2 className="text-xl font-semibold mb-2 text-[#89b4fa]">Project Details</h2>
          {projectDetails.image && (
            <Image
              src={projectDetails.image}
              alt={`${selectedProject} screenshot`}
              width={800}
              height={400}
              unoptimized={needsUnoptimized(projectDetails.image)}
              className="w-full max-w-2xl mb-4 rounded-lg"
            />
          )}
          {(projectDetails.tech || projectDetails.repo || projectDetails.demo || projectDetails.video) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {projectDetails.tech?.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded bg-[#45475a] text-[#bac2de]">
                  {tech}
                </span>
              ))}
              {projectDetails.repo && (
                <a
                  href={projectDetails.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#89b4fa] text-[#11111b] font-bold hover:bg-[#b4befe] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" /> View source
                </a>
              )}
              {projectDetails.demo && (
                <a
                  href={projectDetails.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#a6e3a1] text-[#11111b] font-bold hover:bg-[#94e2d5] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Live demo
                </a>
              )}
              {projectDetails.video && (
                <a
                  href={projectDetails.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#f9e2af] text-[#11111b] font-bold hover:bg-[#f5c2e7] transition-colors"
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" /> Watch demo
                </a>
              )}
            </div>
          )}
          <ReactMarkdown className="prose prose-invert max-w-none">
            {projectDetails.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
