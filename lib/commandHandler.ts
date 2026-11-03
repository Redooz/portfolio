import { getAwards, getDeveloperInfo, getProfessionalExperience, getProjects } from './dataFetcher'
import { closestMatch } from './terminal/fuzzy'
import type { CommandContext, CommandDefinition, CommandResult } from './terminal/types'
import type { Project } from '@/data/projects'

const projects = getProjects()

function findProjects(query: string): Project[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  const exact = projects.filter(
    (project) =>
      project.slug.toLowerCase() === normalized ||
      project.name.toLowerCase() === normalized
  )
  if (exact.length > 0) return exact

  const startsWith = projects.filter(
    (project) =>
      project.slug.toLowerCase().startsWith(normalized) ||
      project.name.toLowerCase().startsWith(normalized)
  )
  if (startsWith.length > 0) return startsWith

  return projects.filter(
    (project) =>
      project.slug.toLowerCase().includes(normalized) ||
      project.name.toLowerCase().includes(normalized)
  )
}

function projectCandidates(): string[] {
  return projects.flatMap((project) => [project.slug, project.name])
}

function projectLinks(project: Project): string[] {
  return [
    project.repo ? `[Source](${project.repo})` : '',
    project.video ? `[Watch demo](${project.video})` : '',
    project.demo ? `[Live demo](${project.demo})` : '',
  ].filter(Boolean)
}

function projectMarkdown(project: Project): string {
  const parts: string[] = []

  if (project.image) {
    parts.push(`![${project.name} cover](${project.image})`)
  }

  parts.push(project.content.trim())

  if (project.tech?.length) {
    parts.push(`**Tech:** ${project.tech.join(' · ')}`)
  }

  const links = projectLinks(project)
  if (links.length > 0) {
    parts.push(links.join(' · '))
  }

  return parts.join('\n\n')
}

function projectLinksMarkdown(project: Project): string {
  const links = projectLinks(project)

  if (links.length === 0) {
    return `### ${project.name}\n\nNo public links for this project.`
  }

  return `### ${project.name}\n\n${links.map((link) => `- ${link}`).join('\n')}`
}

function handleCat(args: string[], linksOnly: boolean): CommandResult {
  const query = args.join(' ').trim()

  if (!query) {
    return {
      type: 'text',
      tone: 'error',
      content: `Usage: ${linksOnly ? 'open' : 'cat'} <slug|name>. Type "ls" to see all projects.`,
    }
  }

  if (!linksOnly) {
    const section = query.toLowerCase().replace(/\.md$/, '')

    if (section === 'about') {
      return { type: 'markdown', content: getDeveloperInfo().content }
    }

    if (section === 'experience') {
      return { type: 'markdown', content: experienceMarkdown() }
    }

    if (section === 'awards') {
      return { type: 'markdown', content: awardsMarkdown() }
    }

    if (section === 'contact') {
      return {
        type: 'markdown',
        content: `## Contact\n\n${socialLinksMarkdown()}`,
      }
    }

    if (section === 'links') {
      return { type: 'markdown', content: socialLinksMarkdown() }
    }
  }

  const matches = findProjects(query)

  if (matches.length === 0) {
    const suggestion = closestMatch(query.toLowerCase(), projectCandidates(), 3)
    return {
      type: 'text',
      tone: 'error',
      content: suggestion
        ? `Project "${query}" not found.\nDid you mean "${suggestion}"?`
        : `Project "${query}" not found. Type "ls" to see all projects.`,
    }
  }

  if (matches.length > 1) {
    return {
      type: 'text',
      tone: 'warning',
      content: `Multiple projects match "${query}":\n${matches
        .map((project) => `  ${project.slug.padEnd(40)} ${project.name}`)
        .join('\n')}\n\nUse a more specific slug.`,
    }
  }

  const project = matches[0]
  return {
    type: 'markdown',
    content: linksOnly ? projectLinksMarkdown(project) : projectMarkdown(project),
  }
}

function findCommand(name: string): CommandDefinition | undefined {
  const normalized = name.toLowerCase()
  return commands.find(
    (command) =>
      command.name === normalized || command.aliases?.includes(normalized)
  )
}

function commandCandidates(): string[] {
  return commands
    .filter((command) => !command.hidden)
    .flatMap((command) => [command.name, ...(command.aliases ?? [])])
}

function helpText(): string {
  const rows = commands
    .filter((command) => !command.hidden)
    .map((command) => {
      const label = [command.name, ...(command.aliases ?? [])].join(', ')
      return `  ${label.padEnd(26)} ${command.description}`
    })
    .join('\n')

  return `Available commands:

${rows}

Shortcuts:
  Tab / Shift+Tab         Complete or cycle suggestions
  ↑ / ↓                   Command history
  Ctrl+L / Ctrl+Shift+L   Clear terminal (Ctrl+L may be reserved by the browser)
  Ctrl+C / Ctrl+U         Cancel or clear the current line
  Ctrl+W                  Delete the previous word
  Esc                     Dismiss suggestions

Tip: "help <command>" shows usage and examples.`
}

function commandHelp(command: CommandDefinition): string {
  const lines = [command.usage ?? command.name, command.description]

  if (command.aliases?.length) {
    lines.push('', `Aliases: ${command.aliases.join(', ')}`)
  }

  if (command.examples?.length) {
    lines.push('', 'Examples:', ...command.examples.map((example) => `  ${example}`))
  }

  return lines.join('\n')
}

function handleHelp(args: string[]): CommandResult {
  const query = args.join(' ').trim()

  if (!query) {
    return { type: 'text', content: helpText() }
  }

  const command = findCommand(query)

  if (!command) {
    const suggestion = closestMatch(query.toLowerCase(), commandCandidates(), 2)
    return {
      type: 'text',
      tone: 'error',
      content: suggestion
        ? `Unknown command: ${query}\nDid you mean "${suggestion}"?`
        : `Unknown command: ${query}. Type "help" to see all commands.`,
    }
  }

  return { type: 'text', content: commandHelp(command) }
}

function socialLinksMarkdown(): string {
  const labels: Record<string, string> = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  }

  return getDeveloperInfo()
    .info.map((link) => {
      const display =
        link.platform === 'email'
          ? link.url.replace(/^mailto:/, '')
          : link.url

      return `- **${labels[link.platform] ?? link.platform}:** [${display}](${link.url})`
    })
    .join('\n')
}

function experienceMarkdown(): string {
  return getProfessionalExperience()
    .map((entry) => {
      const bullets = entry.description
        .split('\n')
        .map((line) => line.replace(/^\*\s*/, '').trim())
        .filter(Boolean)

      const parts = [`### ${entry.role} — ${entry.company}`, `**${entry.duration}**`]

      if (entry.highlights?.length) {
        parts.push(`**Highlights:** ${entry.highlights.join(' · ')}`)
      }

      if (bullets.length > 0) {
        parts.push(bullets.map((bullet) => `- ${bullet}`).join('\n'))
      }

      return parts.join('\n\n')
    })
    .join('\n\n---\n\n')
}

function awardsMarkdown(): string {
  return getAwards()
    .map((award) => {
      const issuer = award.url
        ? `[${award.issuer}](${award.url})`
        : award.issuer

      return `## ${award.title}\n\n**Issued by:** ${issuer} · **Date:** ${award.date}\n\n${award.description}`
    })
    .join('\n\n---\n\n')
}

function handleHistory(args: string[], context: CommandContext): CommandResult {
  if (args[0] === '-c' || args[0] === '--clear') {
    context.clearHistory()
    return { type: 'text', tone: 'success', content: 'Command history cleared.' }
  }

  if (context.history.length === 0) {
    return { type: 'text', tone: 'muted', content: 'No commands in history.' }
  }

  return {
    type: 'text',
    content: context.history
      .map((command, index) => `${String(index + 1).padStart(3)}  ${command}`)
      .join('\n'),
  }
}

function neofetchText(): string {
  const devInfo = getDeveloperInfo()
  const github = devInfo.info.find((link) => link.platform === 'github')?.url
  const linkedin = devInfo.info.find((link) => link.platform === 'linkedin')?.url
  const languages = devInfo.skillGroups.find((group) => group.label === 'Languages')
  const stack = languages?.items.slice(0, 6).join(', ') ?? ''
  const evals = devInfo.skillGroups.find((group) => group.label === 'AI & Evals')

  return [
    `${devInfo.handle.split('-')[0]}@portfolio`,
    '-'.repeat(24),
    `Role       ${devInfo.role}`,
    `Company    ${devInfo.company}`,
    `Location   ${devInfo.location}`,
    `Languages  ${devInfo.languages.map((language) => `${language.name} (${language.level})`).join(', ')}`,
    `Stack      ${stack}`,
    `Evals      ${evals?.items.slice(0, 4).join(', ') ?? 'n/a'}`,
    `GitHub     ${github ?? 'n/a'}`,
    `LinkedIn   ${linkedin ?? 'n/a'}`,
  ].join('\n')
}

const coffee = [
  '      ( (',
  '       ) )',
  '    ........',
  '    |      |]',
  '    \\      /',
  "     `----'",
].join('\n')

const commands: CommandDefinition[] = [
  {
    name: 'help',
    aliases: ['?'],
    description: 'Show this help or details for a command',
    usage: 'help [command]',
    examples: ['help', 'help cat'],
    run: (args) => handleHelp(args),
  },
  {
    name: 'ls',
    aliases: ['projects'],
    description: 'List projects',
    run: () => ({
      type: 'text',
      content: projects
        .map((project) => `${project.slug.padEnd(40)} ${project.name}`)
        .join('\n'),
    }),
  },
  {
    name: 'cat',
    description: 'View a project by slug or name',
    usage: 'cat <slug|name>',
    examples: ['cat zerovnc', 'cat forward chaining', 'cat about.md'],
    run: (args) => handleCat(args, false),
  },
  {
    name: 'about',
    description: 'View the developer profile',
    run: () => ({ type: 'markdown', content: getDeveloperInfo().content }),
  },
  {
    name: 'experience',
    aliases: ['work'],
    description: 'View professional experience',
    run: () => ({ type: 'markdown', content: experienceMarkdown() }),
  },
  {
    name: 'awards',
    description: 'View awards and recognitions',
    run: () => ({ type: 'markdown', content: awardsMarkdown() }),
  },
  {
    name: 'whoami',
    aliases: ['me'],
    description: 'Print identity and current role',
    run: () => {
      const devInfo = getDeveloperInfo()
      return {
        type: 'markdown',
        content: `## ${devInfo.name}\n\n**${devInfo.role}** @ **${devInfo.company}**\n\n${devInfo.location} · ${devInfo.availability}\n\n${devInfo.pitch}`,
      }
    },
  },
  {
    name: 'contact',
    description: 'Show contact links',
    run: () => ({
      type: 'markdown',
      content: `## Contact\n\n${socialLinksMarkdown()}`,
    }),
  },
  {
    name: 'open',
    description: 'Show source and demo links for a project',
    usage: 'open <slug|name>',
    examples: ['open zerovnc'],
    run: (args) => handleCat(args, true),
  },
  {
    name: 'links',
    description: 'View social links',
    run: () => ({ type: 'markdown', content: socialLinksMarkdown() }),
  },
  {
    name: 'history',
    description: 'Show or clear command history',
    usage: 'history [-c]',
    examples: ['history', 'history -c'],
    run: (args, context) => handleHistory(args, context),
  },
  {
    name: 'neofetch',
    description: 'Print a compact profile card',
    run: () => ({ type: 'text', content: neofetchText() }),
  },
  {
    name: 'date',
    description: 'Print the current date',
    run: () => ({ type: 'text', content: new Date().toString() }),
  },
  {
    name: 'pwd',
    description: 'Print the current directory',
    run: () => ({ type: 'text', content: '~/portfolio' }),
  },
  {
    name: 'echo',
    description: 'Print text',
    usage: 'echo <text>',
    examples: ['echo hello'],
    run: (args) => ({ type: 'text', content: args.join(' ') }),
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear the terminal',
    run: () => ({ type: 'clear' }),
  },
  {
    name: 'exit',
    aliases: ['text'],
    description: 'Return to the text portfolio',
    run: () => ({ type: 'exit' }),
  },
  {
    name: 'sudo',
    description: 'Elevate privileges',
    hidden: true,
    run: () => ({
      type: 'text',
      tone: 'warning',
      content: 'Nice try. This incident has been reported.',
    }),
  },
  {
    name: 'coffee',
    description: 'Brew coffee',
    hidden: true,
    run: () => ({ type: 'text', tone: 'warning', content: coffee }),
  },
  {
    name: 'rm',
    description: 'Remove files',
    hidden: true,
    run: () => ({
      type: 'text',
      tone: 'error',
      content: 'Permission denied: this portfolio is read-only.',
    }),
  },
]

export function getCommandDefinitions(): CommandDefinition[] {
  return commands
}

export async function executeCommand(
  input: string,
  context: CommandContext
): Promise<CommandResult> {
  const trimmed = input.trim()
  const [name, ...args] = trimmed.split(/\s+/)
  const command = findCommand(name)

  if (!command) {
    const suggestion = closestMatch(name.toLowerCase(), commandCandidates(), 2)
    return {
      type: 'text',
      tone: 'error',
      content: suggestion
        ? `Command not found: ${name}\nDid you mean "${suggestion}"?`
        : `Command not found: ${name}. Type "help" to see available commands.`,
    }
  }

  try {
    return await command.run(args, context)
  } catch {
    return {
      type: 'text',
      tone: 'error',
      content: 'Something went wrong while running that command.',
    }
  }
}
