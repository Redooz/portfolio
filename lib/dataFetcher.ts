import { Project, projects, } from "@/data/projects";
import { devInfo } from "@/data/devInfo";
import { professionalExperience, ProfessionalExperience } from "@/data/experience";

export interface ProjectDetails {
  content: string;
  image?: string;
  repo?: string;
  demo?: string;
  video?: string;
  tech?: string[];
}

export interface DevInfo {
  content: string;
  info: SocialMediaLink[];
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProjectDetails(projectName: string): ProjectDetails | null {
  const project = projects.find(p => p.slug === projectName.toLowerCase())
  if (!project) {
    return null
  }
  const { content, image, repo, demo, video, tech } = project
  return { content, image, repo, demo, video, tech }
}

export function getDeveloperInfo(): DevInfo {
  return devInfo;
}

export function getProfessionalExperience(): ProfessionalExperience[] {
  return professionalExperience;
}
