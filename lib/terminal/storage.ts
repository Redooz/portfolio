const HISTORY_KEY = 'portfolio.terminal.history.v1'

export const HISTORY_LIMIT = 100

export function loadHistory(): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((entry): entry is string => typeof entry === 'string')
      .slice(-HISTORY_LIMIT)
  } catch {
    return []
  }
}

export function saveHistory(history: string[]) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(-HISTORY_LIMIT))
    )
  } catch {
    // Storage can be unavailable in private mode or when the quota is full.
  }
}

export function clearStoredHistory() {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(HISTORY_KEY)
  } catch {
    // Ignore storage failures.
  }
}
