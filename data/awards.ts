export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export const awards: Award[] = [
  {
    title: "1st Place Winner – Houston Hack Camp 2026",
    issuer: "gethouston.ai",
    date: "Jun 2026",
    description:
      "Winner out of 60 developers for building an AI-assisted development system integrated directly into Houston's codebase and UI. Inspired by Claude Code's workflow engine, the system embeds context-aware task execution and automated workflows into the core developer interface.",
    url: "https://gethouston.ai",
  },
];
