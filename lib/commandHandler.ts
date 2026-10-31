import { getProjects, getProjectDetails, getDeveloperInfo, getProfessionalExperience, getAwards } from './dataFetcher'
import { colorize } from './colorizer'

export async function handleCommand(command: string): Promise<string> {
  const [cmd, ...args] = command.split(' ')

  switch (cmd.toLowerCase()) {
    case 'help':
      return handleHelpCommand()

    case 'ls':
      return handleLsCommand()

    case 'cat':
      return await handleCatCommand(args)

    case 'about':
      return await handleAboutCommand()

    case 'links':
      return await handleLinksCommand()

    case 'experience':
      return await handleExperienceCommand()

    case 'awards':
      return handleAwardsCommand()

    case 'clear':
      return handleClearCommand()

    default:
      return handleDefaultCommand(cmd)
  }
}

function handleHelpCommand(): string {
  return colorize(`
Available commands:
- help: Show this help message
- ls: List all projects
- cat <slug>: View details of a specific project
- about: View information about the developer
- links: View social media links
- experience: View professional experience
- awards: View awards and recognitions
- clear: Clear the terminal
`, 'blue', false)
}

function handleLsCommand(): string {
  const projects = getProjects()
  return colorize(projects.map(p => `${p.slug.padEnd(40)} ${p.name}`).join('\n'), 'yellow', false)
}

async function handleCatCommand(args: string[]): Promise<string> {
  if (args.length === 0) return colorize('Please specify a project slug. Type "ls" to see them.', 'red', false)
  const projectName = args.join(' ')
  const projectDetails = getProjectDetails(projectName)
  if (projectDetails) {
    const imageHtml = projectDetails.image ? `<img src="${projectDetails.image}" alt="${projectName} screenshot" style="max-width: 100%; height: auto; margin-bottom: 1rem;" />` : ''
    const techHtml = projectDetails.tech?.length
      ? `<br /><br />Tech: ${projectDetails.tech.join(' · ')}`
      : ''
    const linksHtml = [
      projectDetails.repo ? `<a href="${projectDetails.repo}" target="_blank" rel="noopener noreferrer" class="text-[#89b4fa] underline">Source: ${projectDetails.repo}</a>` : '',
      projectDetails.demo ? `<a href="${projectDetails.demo}" target="_blank" rel="noopener noreferrer" class="text-[#a6e3a1] underline">Demo: ${projectDetails.demo}</a>` : '',
      projectDetails.video ? `<a href="${projectDetails.video}" target="_blank" rel="noopener noreferrer" class="text-[#f9e2af] underline">Watch demo: ${projectDetails.video}</a>` : '',
    ].filter(Boolean).join('<br />')
    const linksBlock = linksHtml ? `<br /><br />${linksHtml}` : ''
    return colorize(`${imageHtml}${projectDetails.content}${techHtml}${linksBlock}`, 'green', false)
  } else {
    return colorize(`Project "${projectName}" not found.`, 'red', false)
  }
}

async function handleAboutCommand(): Promise<string> {
  const { content } = getDeveloperInfo()
  return colorize(`${content}Feel free to explore my projects using the 'ls' and 'cat' commands!`, 'lavender', false)
}

async function handleLinksCommand(): Promise<string> {
  const { info } = getDeveloperInfo()
  return colorize(Object.entries(info).map(([, info]) => `${info.platform}: ${info.url}`).join('\n'), 'blue', true)
}

async function handleExperienceCommand(): Promise<string> {
  const experience = getProfessionalExperience()
  return colorize(experience.map(exp => `
Role: ${exp.role}
Company: ${exp.company}
Duration: ${exp.duration}
Description: ${exp.description}
`).join('\n'), 'green', false)
}

function handleAwardsCommand(): string {
  const awards = getAwards()
  return colorize(awards.map(award => `
${award.title}
Issued by: ${award.issuer}${award.url ? ` (${award.url})` : ''}
Date: ${award.date}
${award.description}
`).join('\n'), 'yellow', false)
}

function handleClearCommand(): string {
  return 'CLEAR_TERMINAL'
}

function handleDefaultCommand(cmd: string): string {
  return colorize(`Command not found: ${cmd}. Type "help" for a list of commands.`, 'red', false)
}
