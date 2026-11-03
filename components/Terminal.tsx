'use client'

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowDown, Eraser } from 'lucide-react'
import { executeCommand } from '@/lib/commandHandler'
import { getCompletions } from '@/lib/terminal/completion'
import {
  clearStoredHistory,
  HISTORY_LIMIT,
  loadHistory,
  saveHistory,
} from '@/lib/terminal/storage'
import type {
  CommandResult,
  CompletionMatch,
  TerminalEntry,
  TextTone,
} from '@/lib/terminal/types'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import styles from '@/styles/Terminal.module.css'

const MAX_ENTRIES = 200
const MAX_SUGGESTIONS = 8

const WELCOME: TerminalEntry[] = [
  {
    id: 1,
    kind: 'text',
    text: 'Welcome to the Terminal Portfolio!',
    tone: 'success',
  },
  {
    id: 2,
    kind: 'text',
    text: 'Type "help" to see what I can do. Tab completes, ↑↓ recalls history.',
    tone: 'muted',
  },
]

const toneClasses: Record<TextTone, string> = {
  default: 'text-green',
  muted: 'text-muted',
  error: 'text-red',
  warning: 'text-yellow',
  success: 'text-green',
}

function Prompt() {
  return (
    <span className="shrink-0 whitespace-nowrap font-mono text-[13px]">
      <span className="text-green">nicolas</span>
      <span className="text-faint">@</span>
      <span className="text-green">portfolio</span>
      <span className="text-faint">:</span>
      <span className="text-blue">~</span>
      <span className="text-yellow">$</span>
    </span>
  )
}

function MarkdownImage({ src, alt }: { src: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      loading="lazy"
      className="my-3 max-h-64 max-w-full rounded-lg border border-line/60 object-contain"
    />
  )
}

function TerminalMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-invert prose-terminal max-w-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            if (!src) return null
            return <MarkdownImage src={src} alt={alt} />
          },
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-lg border border-line/60 bg-crust p-3">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="rounded bg-surface/80 px-1 py-0.5 font-mono text-[0.95em] text-green">
              {children}
            </code>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default function Terminal({ onExit }: { onExit?: () => void }) {
  const [entries, setEntries] = useState<TerminalEntry[]>(WELCOME)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>(loadHistory)
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [suggestions, setSuggestions] = useState<CompletionMatch[]>([])
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [completionBase, setCompletionBase] = useState<string | null>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const entryId = useRef(2)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const nextId = useCallback(() => {
    entryId.current += 1
    return entryId.current
  }, [])

  const resetCompletion = useCallback(() => {
    setSuggestions([])
    setActiveSuggestion(-1)
    setCompletionBase(null)
  }, [])

  useEffect(() => {
    if (isDesktop) inputRef.current?.focus()
  }, [isDesktop])

  useEffect(() => {
    const node = outputRef.current
    if (!node || !isAtBottom) return
    node.scrollTop = node.scrollHeight
  }, [entries, isAtBottom])

  const clearTerminal = useCallback(() => {
    setEntries([])
    setIsAtBottom(true)
    resetCompletion()
    if (outputRef.current) outputRef.current.scrollTop = 0
    inputRef.current?.focus()
  }, [resetCompletion])

  const clearHistory = useCallback(() => {
    setCommandHistory([])
    setHistoryIndex(null)
    setDraft('')
    clearStoredHistory()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const raw = input.trim()
    if (!raw) {
      setInput('')
      return
    }

    setInput('')
    setHistoryIndex(null)
    setDraft('')
    resetCompletion()

    const commandEntry: TerminalEntry = {
      id: nextId(),
      kind: 'command',
      text: raw,
    }

    setEntries((previous) =>
      [...previous, commandEntry].slice(-MAX_ENTRIES)
    )

    const nextHistory =
      commandHistory[commandHistory.length - 1] === raw
        ? commandHistory
        : [...commandHistory, raw].slice(-HISTORY_LIMIT)

    setCommandHistory(nextHistory)
    saveHistory(nextHistory)

    let result: CommandResult

    try {
      result = await executeCommand(raw, { history: nextHistory, clearHistory })
    } catch {
      result = {
        type: 'text',
        tone: 'error',
        content: 'Something went wrong while running that command.',
      }
    }

    if (result.type === 'clear') {
      setEntries([])
      setIsAtBottom(true)
      if (outputRef.current) outputRef.current.scrollTop = 0
      inputRef.current?.focus()
      return
    }

    if (result.type === 'exit') {
      if (onExit) {
        onExit()
      } else {
        const warningEntry: TerminalEntry = {
          id: nextId(),
          kind: 'text',
          tone: 'warning',
          text: 'Use the Text toggle to leave the terminal.',
        }

        setEntries((previous) =>
          [...previous, warningEntry].slice(-MAX_ENTRIES)
        )
      }
      return
    }

    if (result.type === 'markdown') {
      const outputEntry: TerminalEntry = {
        id: nextId(),
        kind: 'markdown',
        markdown: result.content,
      }

      setEntries((previous) =>
        [...previous, outputEntry].slice(-MAX_ENTRIES)
      )
    } else {
      const outputEntry: TerminalEntry = {
        id: nextId(),
        kind: 'text',
        text: result.content,
        tone: result.tone,
      }

      setEntries((previous) =>
        [...previous, outputEntry].slice(-MAX_ENTRIES)
      )
    }

    inputRef.current?.focus()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInput(value)
    setHistoryIndex(null)
    setDraft('')
    setCompletionBase(null)
    setActiveSuggestion(-1)
    setSuggestions(getCompletions(value))
  }

  const chooseSuggestion = (match: CompletionMatch) => {
    setInput(match.value)
    setActiveSuggestion(-1)
    setCompletionBase(null)
    setSuggestions(
      match.value.endsWith(' ') ? getCompletions(match.value) : []
    )
    inputRef.current?.focus()
  }

  const cycleCompletion = (direction: 1 | -1) => {
    const base = completionBase ?? input
    const matches = (completionBase ? suggestions : getCompletions(input)).slice(
      0,
      MAX_SUGGESTIONS
    )

    if (matches.length === 0) return

    const current = completionBase ? activeSuggestion : -1
    const nextIndex =
      direction > 0
        ? (current + 1) % matches.length
        : current <= 0
          ? matches.length - 1
          : current - 1

    const match = matches[nextIndex]
    setCompletionBase(base)
    setSuggestions(matches)
    setActiveSuggestion(nextIndex)
    setInput(match.value)

    if (match.value.endsWith(' ')) {
      setCompletionBase(null)
      setActiveSuggestion(-1)
      setSuggestions(getCompletions(match.value))
    }
  }

  const navigateHistory = (direction: 1 | -1) => {
    if (commandHistory.length === 0) return

    if (direction === -1) {
      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)

      if (historyIndex === null) setDraft(input)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
      resetCompletion()
      return
    }

    if (historyIndex === null) return

    const nextIndex = historyIndex + 1

    if (nextIndex >= commandHistory.length) {
      setHistoryIndex(null)
      setInput(draft)
    } else {
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
    }

    resetCompletion()
  }

  const cancelLine = () => {
    const cancelEntry: TerminalEntry = {
      id: nextId(),
      kind: 'text',
      text: '^C',
      tone: 'muted',
    }

    setEntries((previous) =>
      [...previous, cancelEntry].slice(-MAX_ENTRIES)
    )
    setInput('')
    setHistoryIndex(null)
    setDraft('')
    resetCompletion()
    inputRef.current?.focus()
  }

  const deleteWord = () => {
    setInput((previous) => previous.replace(/\s*\S+\s*$/, ''))
    setHistoryIndex(null)
    setDraft('')
    resetCompletion()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return

    const { key, ctrlKey, metaKey, shiftKey } = event
    const lower = key.toLowerCase()

    if (key === 'Tab') {
      if (input.trim().length === 0 && suggestions.length === 0) return

      const matches = (completionBase ? suggestions : getCompletions(input)).slice(
        0,
        MAX_SUGGESTIONS
      )

      if (matches.length === 0) return

      event.preventDefault()
      cycleCompletion(shiftKey ? -1 : 1)
      return
    }

    if (key === 'ArrowUp') {
      event.preventDefault()
      navigateHistory(-1)
      return
    }

    if (key === 'ArrowDown') {
      event.preventDefault()
      navigateHistory(1)
      return
    }

    if (key === 'Escape') {
      if (suggestions.length > 0) {
        event.preventDefault()
        resetCompletion()
      }
      return
    }

    if ((ctrlKey || metaKey) && lower === 'l') {
      event.preventDefault()
      clearTerminal()
      return
    }

    if (metaKey && lower === 'k') {
      event.preventDefault()
      clearTerminal()
      return
    }

    if (ctrlKey && lower === 'c') {
      event.preventDefault()
      cancelLine()
      return
    }

    if (ctrlKey && lower === 'u') {
      event.preventDefault()
      setInput('')
      resetCompletion()
      return
    }

    if (ctrlKey && lower === 'w') {
      event.preventDefault()
      deleteWord()
    }
  }

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('a, button, input')) return
    if (window.getSelection()?.toString()) return
    inputRef.current?.focus()
  }

  const handleScroll = () => {
    const node = outputRef.current
    if (!node) return
    setIsAtBottom(node.scrollHeight - node.scrollTop - node.clientHeight < 48)
  }

  const jumpToLatest = () => {
    const node = outputRef.current
    if (node) node.scrollTop = node.scrollHeight
    setIsAtBottom(true)
    inputRef.current?.focus()
  }

  const visibleSuggestions = suggestions.slice(0, MAX_SUGGESTIONS)

  return (
    <div
      onClick={handleCardClick}
      className="w-full overflow-hidden rounded-xl border border-line/70 bg-base/80 shadow-2xl shadow-crust/50 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-line/60 bg-mantle/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-green" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-xs text-faint">
          nicolas@portfolio: ~
        </span>
        <button
          type="button"
          onClick={clearTerminal}
          aria-label="Clear terminal"
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-line/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-line hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-mantle"
        >
          <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      <div className="relative">
        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Terminal output"
          tabIndex={0}
          onScroll={handleScroll}
          className={`h-[60vh] min-h-[320px] overflow-y-auto px-4 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue sm:px-5 ${styles['custom-scrollbar']}`}
        >
          <div className="space-y-3">
            {entries.map((entry) => {
              if (entry.kind === 'command') {
                return (
                  <div
                    key={entry.id}
                    className="flex flex-wrap items-baseline gap-x-2"
                  >
                    <Prompt />
                    <span className="min-w-0 break-words font-mono text-[13px] text-fg">
                      {entry.text}
                    </span>
                  </div>
                )
              }

              if (entry.kind === 'markdown') {
                return <TerminalMarkdown key={entry.id} markdown={entry.markdown} />
              }

              return (
                <div
                  key={entry.id}
                  className={`whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed ${
                    toneClasses[entry.tone ?? 'default']
                  }`}
                >
                  {entry.text || '\u00A0'}
                </div>
              )
            })}
          </div>
        </div>

        {!isAtBottom && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-mantle/95 px-3 py-1.5 font-mono text-[11px] text-muted shadow-lg shadow-crust/50 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            Jump to latest
          </button>
        )}
      </div>

      <div className="border-t border-line/60 px-4 py-3 sm:px-5">
        {suggestions.length > 0 && input.trim().length > 0 && (
          <div
            role="group"
            aria-label="Command suggestions"
            className="mb-2 flex flex-wrap gap-1.5"
          >
            {visibleSuggestions.map((match, index) => (
              <button
                key={`${match.kind}-${match.value}`}
                type="button"
                onClick={() => chooseSuggestion(match)}
                aria-label={`Complete to ${match.value}`}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                  index === activeSuggestion
                    ? 'border-blue/60 bg-blue/15 text-blue'
                    : 'border-line/60 bg-base/60 text-muted hover:border-line hover:text-fg'
                }`}
              >
                <span>{match.label}</span>
                {match.description && (
                  <span className="hidden text-faint sm:inline">
                    · {match.description}
                  </span>
                )}
              </button>
            ))}
            {suggestions.length > visibleSuggestions.length && (
              <span className="self-center font-mono text-[10px] text-faint">
                +{suggestions.length - visibleSuggestions.length} more
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command"
            aria-describedby="terminal-hint"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            placeholder="type a command…"
            className="ml-2 min-w-0 flex-1 bg-transparent font-mono text-[13px] text-fg caret-green outline-none placeholder:text-faint"
          />
        </form>

        <p id="terminal-hint" className="sr-only">
          Type a command. Press Tab to complete, up and down arrows for history,
          Control L or Control Shift L to clear, Control C to cancel the line.
        </p>

        <div
          aria-hidden="true"
          className="mt-2 hidden flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-faint sm:flex"
        >
          <span>Tab complete</span>
          <span>↑↓ history</span>
          <span>Ctrl+L clear</span>
          <span>Ctrl+C cancel</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
          <button
            type="button"
            onClick={() => cycleCompletion(1)}
            className="rounded-md border border-line/60 bg-base/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Tab
          </button>
          <button
            type="button"
            onClick={() => navigateHistory(-1)}
            aria-label="Previous command"
            className="rounded-md border border-line/60 bg-base/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => navigateHistory(1)}
            aria-label="Next command"
            className="rounded-md border border-line/60 bg-base/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={clearTerminal}
            className="rounded-md border border-line/60 bg-base/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
