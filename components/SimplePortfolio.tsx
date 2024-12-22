import { useState, useEffect, useRef } from 'react'
import { getProjects, getProjectDetails, getDeveloperInfo, SocialMediaLink } from '@/lib/dataFetcher'
import {Github, Linkedin, LucideMail, VoicemailIcon} from 'lucide-react'
import Image from 'next/image'
import { Project } from "@/data/projects"
import ReactMarkdown from 'react-markdown'
import styles from '@/styles/SimplePortfolio.module.css'

export default function SimplePortfolio() {
  const title = "Nicolás Olmos Portfolio"
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [projectDetails, setProjectDetails] = useState<{ content: string; image?: string } | null>(null)
  const [aboutInfo, setAboutInfo] = useState<string>('')
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([])
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function fetchData() {
      const projectsList = getProjects()
      setProjects(projectsList)
      const { content, info } = getDeveloperInfo()
      setAboutInfo(content)
      setSocialLinks(info)
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

  const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'github':
        return <Github className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'email':
        return <LucideMail className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
      <div className="w-full bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-lg shadow-lg font-mono">
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
                  <SocialIcon platform={link.platform} />
                </a>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-[#89b4fa]">Projects</h2>
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
            <div ref={detailsRef} className={`${styles['project-details']} ${projectDetails ? styles['visible'] : ''}`}>
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