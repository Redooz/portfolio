export type TextTone = 'default' | 'muted' | 'error' | 'warning' | 'success'

export type TerminalEntry =
  | { id: number; kind: 'command'; text: string }
  | { id: number; kind: 'text'; text: string; tone?: TextTone }
  | { id: number; kind: 'markdown'; markdown: string }

export type CommandResult =
  | { type: 'text'; content: string; tone?: TextTone }
  | { type: 'markdown'; content: string }
  | { type: 'clear' }
  | { type: 'exit' }

export interface CommandContext {
  history: string[]
  clearHistory: () => void
}

export interface CommandDefinition {
  name: string
  aliases?: string[]
  description: string
  usage?: string
  examples?: string[]
  hidden?: boolean
  run: (
    args: string[],
    context: CommandContext
  ) => CommandResult | Promise<CommandResult>
}

export interface CompletionMatch {
  value: string
  label: string
  description?: string
  kind: 'command' | 'project' | 'argument'
}
