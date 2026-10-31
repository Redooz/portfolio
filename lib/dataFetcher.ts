import { Project, projects, } from "@/data/projects";
import { devInfo } from "@/data/devInfo";
import { professionalExperience, ProfessionalExperience } from "@/data/experience";
import { awards, Award } from "@/data/awards";

export interface ProjectDetails {
  slug: string;
  name: string;
  summary?: string;
  content: string;
  image?: string;
  repo?: string;
  demo?: string;
  video?: string;
  tech?: string[];
  categories?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SpokenLanguage {
  name: string;
  level: string;
}

export interface DevInfo {
  content: string;
  bio: string[];
  skillGroups: SkillGroup[];
  languages: SpokenLanguage[];
  name: string;
  handle: string;
  role: string;
  company: string;
  location: string;
  availability: string;
  pitch: string;
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
  const { name, summary, content, image, repo, demo, video, tech, categories } = project
  return { slug: project.slug, name, summary, content, image, repo, demo, video, tech, categories }
}

export function getDeveloperInfo(): DevInfo {
  return devInfo;
}

export function getProfessionalExperience(): ProfessionalExperience[] {
  return professionalExperience;
}

export function getAwards(): Award[] {
  return awards;
}
