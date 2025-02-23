import { useState, useEffect, useRef } from 'react'
import { getProjects, getProjectDetails, getDeveloperInfo, getProfessionalExperience, SocialMediaLink } from '@/lib/dataFetcher'
import Image from 'next/image'
import { Project } from "@/data/projects"
import ReactMarkdown from 'react-markdown'
import portfolioStyles from '@/styles/SimplePortfolio.module.css'
import {ProfessionalExperience} from "@/data/experience";
import { SocialIcon } from './ui/SocialIcon'

export default function SimplePortfolio() {
  const title = "Nicolás Olmos Portfolio"
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [projectDetails, setProjectDetails] = useState<{ content: string; image?: string } | null>(null)
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
            <li key={experience.company} className="bg-[#313244] rounded-lg overflow-hidden p-4">
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
            <li key={project.slug} className="bg-[#313244] rounded-lg overflow-hidden">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              )}
              <button
                onClick={() => setSelectedProject(project.slug)}
                className={`text-left w-full p-4 ${
                  selectedProject === project.slug ? 'bg-[#45475a] text-[#a6e3a1]' : 'hover:bg-[#45475a]'
                }`}
              >
                {project.name}
              </button>
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
              className="w-full max-w-2xl mb-4 rounded-lg"
            />
          )}
          <ReactMarkdown className="prose prose-invert max-w-none">
            {projectDetails.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}