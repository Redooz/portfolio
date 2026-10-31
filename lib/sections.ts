export interface SectionLink {
  id: string;
  label: string;
  command: string;
}

export const SECTION_LINKS: SectionLink[] = [
  { id: "about", label: "About", command: "cat about.md" },
  { id: "experience", label: "Experience", command: "git log --experience" },
  { id: "awards", label: "Awards", command: "cat awards.md" },
  { id: "projects", label: "Projects", command: "ls projects/" },
  { id: "contact", label: "Contact", command: "contact" },
];

export const SECTION_IDS = SECTION_LINKS.map((section) => section.id);
