import { Project, projects } from "@/data/projects";
import { devInfo } from "@/data/devInfo";

export interface ProjectDetails {
    content: string;
    image?: string;
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
    const { content, image } = project
    return { content, image }
}

export function getDeveloperInfo(): DevInfo {
    return devInfo;
}