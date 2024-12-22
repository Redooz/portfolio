import React, {useState, useRef, useEffect, FormEvent} from 'react'
import { handleCommand } from '@/lib/commandHandler'
import styles from '@/styles/Terminal.module.css'

export default function Terminal() {
  const [history, setHistory] = useState<string[]>(['Welcome to the Terminal Portfolio!', 'Type "help" for a list of commands.'])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const clearTerminal = () => {
    setHistory([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newHistory = [...history, `$ ${input}`]
    setHistory(newHistory)
    setInput('')

    const result = await handleCommand(input.trim())
    if (result === 'CLEAR_TERMINAL') {
      clearTerminal();
    }
    else {
      setHistory([...newHistory, result])
    }
  }

  const renderHTML = (html: string) => {
    return { __html: html };
  };

  return (
      <div className="w-full max-w-4xl bg-[#1e1e2e] text-[#a6e3a1] p-4 rounded-lg shadow-lg font-mono">
        <div ref={terminalRef} className={`mb-4 h-[60vh] overflow-y-auto whitespace-pre-wrap ${styles['custom-scrollbar']}`}>
          {history.map((line, index) => (
              <div key={index} dangerouslySetInnerHTML={renderHTML(line)} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <span className="mr-2 text-[#f9e2af]">$</span>
          <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none text-[#cdd6f4]"
              autoFocus
          />
        </form>
      </div>
  )
}