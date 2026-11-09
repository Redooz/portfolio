export interface Project {
  name: string;
  slug: string;
  summary?: string;
  categories?: string[];
  featured?: boolean;
  image?: string;
  repo?: string;
  demo?: string;
  video?: string;
  tech?: string[];
  content: string;
}

export const projects: Project[] = [
  {
    name: "role-playing",
    slug: "role-playing",
    summary:
      "An open-source, work-in-progress voice role-play platform where several AI personas talk with one learner — and every behaviour change is gated by evals.",
    categories: ["AI & Agents", "Full-stack"],
    featured: true,
    image: "/projects/role-playing.svg",
    repo: "https://github.com/Redooz/role-playing",
    tech: ["TypeScript", "Node.js", "LiveKit", "OpenRouter", "Langfuse", "Evals"],
    content: `# role-playing
An open-source, work-in-progress platform for practising workplace English and French with several AI personas in one real-time conversation. The distinctive part is the process: every change that affects behaviour has to pass capability and regression evals before it is accepted.

- Status: work in progress. M0–M2 are complete: the eval foundation, single-agent text sessions, and versioned personas and scenarios with \`en\`, \`en-GB\`, \`fr\` and \`fr-CA\` variants.
- The eval harness models tasks, trials and rounds. Capability evals must show a real improvement; regression evals hold the baseline; \`pass^k\` reporting and a model-based grader stop a change from passing by luck.
- A self-hosted Langfuse review layer displays trial traces, per-axis scores and experiment comparisons, while the harness still replays, grades and decides.
- Voice-first design: a cascaded STT → LLM → TTS pipeline where each stage leaves a text checkpoint for evaluation. Streaming transcription carries calibrated confidence and uncertainty gates, so an uncertain transcript never becomes learner feedback. Text sessions ship first; the LiveKit audio path is gated behind the same evals.
- The multi-agent layer is specified around persona judgments with deterministic turn arbitration: at most one grant holder, bounded interjections, immediate user barge-in, and late chunks from revoked grants discarded.
- TypeScript on Node 26 with npm workspaces and Vitest, plus OpenRouter and Groq for generation and grading. Mutation coverage is held at ~95%.

## Technologies Used
- TypeScript / Node.js
- LiveKit
- OpenRouter / Groq
- Langfuse
- Vitest
- Evaluation harnesses and \`pass^k\`
`,
  },
  {
    name: "ZeroVNC",
    slug: "zerovnc",
    summary:
      "An agent that operates API-less business apps over VNC, with verified actions and no per-app setup.",
    categories: ["AI & Agents", "Backend"],
    featured: true,
    image: "/projects/zerovnc.svg",
    repo: "https://github.com/Redooz/zerovnc",
    video:
      "https://raw.githubusercontent.com/Redooz/zerovnc/main/docs/demos/demo-update-patient.gif",
    tech: ["TypeScript", "Bun", "VNC/RFB", "Hexagonal", "OpenRouter", "Evals"],
    content: `# ZeroVNC
An agent that operates API-less business apps the way a new employee would: it looks at the screen over VNC/RFB, figures out where things are, does the task, and checks the result. No per-app setup, no recorded macros, no API access — only what is visible on screen.

- Takes a task in natural language: create or update records, answer filtered counting questions, run exports.
- A perception model turns each capture into controls, labels, values, bounding boxes and disabled states; a separate decision model answers narrow grounding questions ("which button saves this?") and abstains when unsure.
- Acts only through guarded application tools (observe_screen, click_control, select_record, replace_field, scroll_screen, press_key, verify_result). Code — not the model — enforces frame freshness, unambiguous targets, disabled controls and the task deadline.
- Evaluation-first loop: success comes only from verified on-screen evidence, the agent refuses ambiguous or impossible tasks, and it makes only the requested changes.
- Measured with a decision benchmark at 95–100% accuracy across labelled grounding cases with zero wrong groundings, 3/3 disabled-control recall and zero false flags, plus ~400 deterministic offline tests that make no paid model calls.
- In the demo, it updates a patient record in Clínica Los Cerezos, an app it had never seen, in 1 min 46 s.

## How It Is Built
- Bun + TypeScript in strict hexagonal layers: domain, application, adapters and bootstrap. Domain and application code import no adapter types.
- A custom RFB/VNC client with bounded shutdown and deadline-capped release.
- One loop, one source of truth: models propose targets, tools dispose, and only the loop sets done or failed — always from current verification evidence.
- The evals/ suite includes an end-to-end runner, graders for app state, answers, failure reasons and secrets, and component benchmarks with development and held-out labelled cases.

## Technologies Used
- TypeScript / Bun
- VNC / RFB
- Hexagonal Architecture
- OpenRouter
- SQLite
`,
  },
  {
    name: "kirunt",
    slug: "kirunt",
    summary:
      "An agent bundle that delegates large reads, boilerplate and MCP calls to a cheaper worker model.",
    categories: ["AI & Agents"],
    image: "/projects/kirunt.svg",
    repo: "https://github.com/Redooz/kirunt",
    tech: ["Shell", "Kiro CLI", "MCP", "LLM agents", "Evals"],
    content: `# kirunt
An agent bundle that delegates I/O-heavy work — large file reads, boilerplate generation and MCP tool calls — to a cheaper worker model, saving tokens on all three.

- Runs on top of Kiro CLI: Kiro owns the model loop, tool execution and context window, while kirunt supplies the agent configuration, worker agents, hooks, scripts and skills.
- Three layers of delegation: hooks hard-block large reads and redirect to a bulk-reader skill; scripts invoke a dedicated worker agent; skills teach the model when and how to delegate.
- Keeps the main agent's context light by exposing only the read, write, shell and web tool groups. Large reads and MCP responses stay in worker sessions and never enter the main context.
- Installs agent profiles under ~/.kiro/agents/, so both the Kiro IDE and CLI can load them.
- Handles both Kiro CLI V2 and V3 payloads, and keeps model names configurable instead of hardcoding them in scripts.
- Evaluated with 79 offline cases covering hook routing, transport and MCP delegation, six end-to-end behavior scenarios, and live benchmark runs.
- Measured 97% token savings across five benchmark scenarios — 98% on single large files and multi-file reads — using conservative chars/4 estimates.

## Technologies Used
- Shell
- Kiro CLI
- LLM agents
- MCP
- Token optimization
`,
  },
  {
    name: "rm-send",
    slug: "rm-send",
    summary:
      "Clipboard to reMarkable in one keystroke, rendered through Typst and delivered over cloud or USB.",
    categories: ["Backend"],
    image: "/projects/rm-send.svg",
    repo: "https://github.com/Redooz/rm-send",
    tech: ["Python", "Typst", "reMarkable", "SSH"],
    content: `# rm-send
Clipboard → reMarkable tablet, with one keystroke. rm-send watches the system clipboard and delivers its contents — typed text or an image — to a reMarkable 1/2/Paper Pro/Move as a native document.

- Classifies clipboard content automatically: images take precedence, otherwise plain text is used.
- Renders text with Typst in a clean typographic layout, or places images full-page, matching the tablet's 1404 × 1872 pt geometry.
- Delivers through the reMarkable cloud via rmapi, with an offline USB/SSH fallback that writes directly into xochitl's document store.
- Uploads run detached from the invoking session: an immediate "Queued" notification on keypress, then "Delivered" on completion.
- Files land as "zz Inbox · <date time> (text|image)" in the tablet library, ready to paste into any notebook with the built-in selection tool.
- Runs on Linux (Wayland/X11) and macOS, and never modifies the tablet's software.

## Technologies Used
- Python
- Typst
- reMarkable API
- SSH / USB
- Linux & macOS
`,
  },
  {
    name: "Our Hive",
    slug: "our-hive",
    summary:
      "Emotion tracking with microservices, AI models and a shared emotional history.",
    categories: ["Full-stack"],
    image:
      "https://raw.githubusercontent.com/Redooz/personal-project-images/refs/heads/main/Our%20Hive%20Admin%20Panel.png",
    tech: ["Node.js", "Go", "Angular", "Firebase"],
    content: `# Our Hive
App that allows a user to track their emotions with the purpose of fostering emotional intelligence literacy. Users can share their emotional history with other users.

- Microservices developed using Node.js and Go & admin panel's frontend using Angular.
- Integration of AI Models such as Stable Diffusion and Zero Shot Classification.
- Authentication with Guards (Local & JWT)
- Documentation with Swagger.
- MySQL and Firebase Firestore used as databases.

## Technologies Used
- Node.js
- Go
- Angular
- MySQL
- Firebase: Firestore & Storage
- Swagger
- JWT
`,
  },
  {
    name: "OnClass",
    slug: "onclass",
    summary:
      "Bootcamp management platform built with hexagonal microservices and atomic design.",
    categories: ["Full-stack"],
    image:
      "https://raw.githubusercontent.com/Redooz/personal-project-images/refs/heads/main/On%20Class.png",
    tech: ["Java", "Spring", "Angular", "MySQL"],
    repo: "https://github.com/Redooz/On-Class-Bootcamp-Microservice",
    content: `# OnClass

A comprehensive platform for managing bootcamps, designed to streamline the registration process for students, instructors, and courses. The platform includes seamless integration with a curated list of technologies to enhance the learning experience.

- Microservices developed using Java Spring with a hexagonal architecture and frontend built using Angular and atomic design methodology.
- Design of a scalable and robust architecture to support bootcamp management. 

## Technologies Used
- Java Spring
- Angular
- MySQL

## Architectural Patterns
- Hexagonal Architecture
- Atomic Design
`,
  },
  {
    name: "Forward Chaining Inference Engine API",
    slug: "forward-chaining-inference-engine-api",
    summary:
      "A Java Spring API that infers outcomes from rules with a forward chaining engine.",
    categories: ["Backend"],
    image:
      "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/1_forward-chaining-vs-backward-chaining.png",
    tech: ["Java", "Spring"],
    content: `# Forward Chaining Inference Engine API

Implemented a forward chaining inference engine, designed to facilitate logical reasoning and decision-making processes within a Java Spring API environment. Created an API that can infer outcomes from given data and rules, improving the API's performance and logic. I enhanced the API's functionality by smoothly incorporating a forward chaining inference engine, which enables faster and smarter reasoning and creates a more adaptive system.

## Technologies Used
- Java Spring
`,
  },
];
