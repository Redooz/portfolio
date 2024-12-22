import { getProjects, getProjectDetails, getDeveloperInfo } from './dataFetcher'
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
- cat <project-name>: View details of a specific project
- about: View information about the developer
- links: View social media links
- clear: Clear the terminal
`, 'blue', false)
}

function handleLsCommand(): string {
    const projects = getProjects()
    return colorize(projects.map(p => p.slug).join('\n'), 'yellow', false)
}

async function handleCatCommand(args: string[]): Promise<string> {
    if (args.length === 0) return colorize('Please specify a project name.', 'red', false)
    const projectName = args.join(' ')
    const projectDetails = getProjectDetails(projectName)
    if (projectDetails) {
        const imageHtml = projectDetails.image ? `<img src="${projectDetails.image}" alt="${projectName} screenshot" style="max-width: 100%; height: auto; margin-bottom: 1rem;" />` : ''
        return colorize(`${imageHtml}${projectDetails.content}`, 'green', false)
    } else {
        return colorize(`Project "${projectName}" not found.`, 'red', false)
    }
}

async function handleAboutCommand(): Promise<string> {
    const { content } = getDeveloperInfo()
    // add the following text to the about content
    return colorize( ` ${content}Feel free to explore my projects using the 'ls' and 'cat' commands!`, 'lavender', false)
}

async function handleLinksCommand(): Promise<string> {
    const { info } = getDeveloperInfo()
    return colorize(Object.entries(info).map(([, info]) => `${info.platform}: ${info.url}`).join('\n'), 'blue', true)
}

function handleClearCommand(): string {
    return 'CLEAR_TERMINAL'
}

function handleDefaultCommand(cmd: string): string {
    return colorize(`Command not found: ${cmd}. Type "help" for a list of commands.`, 'red', false)
}