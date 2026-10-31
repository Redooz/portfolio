import { DevInfo } from "@/lib/dataFetcher";

const bio = [
  "Hi! I'm Nicolás, a full-stack developer based in Bogotá, Colombia. I build payment infrastructure at Wompi, one of Colombia's leading fintech platforms, where I work on payouts, open banking and POS transactions used by more than 40,000 merchants.",
  "My day-to-day is TypeScript, Node.js, NestJS and Ruby on the backend, with React, React Native, Next.js and Vue on the frontend, running on AWS (EKS, SQS, DynamoDB, S3). I care about clean architecture — hexagonal boundaries, SOLID principles, and tests that let teams move quickly.",
  "Outside of work I build AI agents and developer tooling: a VNC-driven agent that operates apps with no API, an agent bundle that cuts LLM token usage, and MCP servers that connect assistants to real tools.",
  "I was honored with a Platzi Scholarship during the 'Future Global Technologists' program and recognized as a Digital Academy Ambassador for Colombia by Blanc Labs, which reflects how much I value continuous learning and sharing what I learn.",
];

const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript / JavaScript", "Go", "Java", "Ruby", "Python", "SQL"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Spring", "Sinatra"],
  },
  {
    label: "Frontend",
    items: ["React", "React Native", "Next.js", "Vue", "Angular"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "DynamoDB", "Firestore"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS EKS", "SQS", "S3", "DynamoDB", "Secrets Manager", "CI/CD", "IaC"],
  },
  {
    label: "Practices",
    items: ["Hexagonal architecture", "SOLID", "Unit testing", "MCP & AI agents"],
  },
];

const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "French", level: "Learning" },
];

const content = [
  ...bio,
  "#### Technical Skills",
  ...skillGroups.map((group) => `- ${group.label}: ${group.items.join(", ")}`),
  "I have a professional level of English, I am a native Spanish speaker and I am currently working on improving my French language skills.",
  "I am always open to new opportunities and challenges, so feel free to reach out to me!",
].join("\n\n");

export const devInfo: DevInfo = {
    content,
    bio,
    skillGroups,
    languages,
    name: "Nicolás Olmos",
    handle: "nicolas-olmos",
    role: "Full-stack Developer Ssr",
    company: "Wompi",
    location: "Bogotá, Colombia",
    availability: "Open to opportunities",
    pitch: "I build payment infrastructure at Wompi and AI agents on the side.",
    info: [
        {
            platform: 'github',
            url: 'https://github.com/Redooz'
        },
        {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/in/nicolas-olmos-perez/'
        },
        {
            platform: 'email',
            url: 'mailto:yohannicolas2003@gmail.com'
        }
    ]
}
