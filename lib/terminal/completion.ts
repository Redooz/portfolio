import { getProjects } from '@/lib/dataFetcher'
import { getCommandDefinitions } from '@/lib/commandHandler'
import type { CompletionMatch } from './types'

const COMMANDS_WITH_ARGS = new Set([
  'cat',
  'open',
  'help',
  'history',
  'echo',
  'sudo',
  'rm',
])

function matchCommands(query: string, prefix = ''): CompletionMatch[] {
  const normalized = query.toLowerCase()
  const seen = new Set<string>()
  const matches: CompletionMatch[] = []

  for (const command of getCommandDefinitions()) {
    if (command.hidden) continue

    const aliases = command.aliases ?? []
    const matchesQuery =
      command.name.startsWith(normalized) ||
      aliases.some((alias) => alias.startsWith(normalized))

    if (!matchesQuery) continue

    const value = `${prefix}${command.name}${
      prefix === '' && COMMANDS_WITH_ARGS.has(command.name) ? ' ' : ''
    }`

    if (seen.has(value)) continue
    seen.add(value)

    matches.push({
      value,
      label: command.name,
      description: command.description,
      kind: 'command',
    })
  }

  return matches
}

function matchProjects(command: 'cat' | 'open', query: string): CompletionMatch[] {
  const normalized = query.toLowerCase()
  const projects = getProjects()

  const startsWithMatches = projects.filter(
    (project) =>
      normalized === '' ||
      project.slug.toLowerCase().startsWith(normalized) ||
      project.name.toLowerCase().startsWith(normalized)
  )

  const candidates =
    startsWithMatches.length > 0
      ? startsWithMatches
      : projects.filter(
          (project) =>
            normalized.length > 1 &&
            (project.slug.toLowerCase().includes(normalized) ||
              project.name.toLowerCase().includes(normalized))
        )

  const seen = new Set<string>()
  const matches: CompletionMatch[] = []

  for (const project of candidates) {
    if (seen.has(project.slug)) continue
    seen.add(project.slug)

    matches.push({
      value: `${command} ${project.slug}`,
      label: project.name,
      description: project.slug,
      kind: 'project',
    })
  }

  return matches
}

export function getCompletions(input: string): CompletionMatch[] {
  const trimmedStart = input.replace(/^\s+/, '')
  const endsWithSpace = /\s$/.test(input)
  const tokens = trimmedStart.split(/\s+/).filter(Boolean)

  if (tokens.length === 0) return []

  const command = tokens[0].toLowerCase()

  if (tokens.length === 1 && !endsWithSpace) {
    return matchCommands(command)
  }

  if (command === 'cat' || command === 'open') {
    const query = endsWithSpace ? '' : tokens.slice(1).join(' ')
    return matchProjects(command, query)
  }

  if (command === 'help') {
    const query = endsWithSpace ? '' : tokens.slice(1).join(' ')
    return matchCommands(query, 'help ')
  }

  if (command === 'history') {
    const query = endsWithSpace ? '' : tokens.slice(1).join(' ')
    if (query.length <= 2 && '-c'.startsWith(query.toLowerCase())) {
      return [
        {
          value: 'history -c',
          label: '-c',
          description: 'Clear command history',
          kind: 'argument',
        },
      ]
    }
  }

  return []
}
