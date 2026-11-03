export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]

    for (let j = 1; j <= b.length; j += 1) {
      const insertion = current[j - 1] + 1
      const deletion = previous[j] + 1
      const substitution =
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)

      current[j] = Math.min(insertion, deletion, substitution)
    }

    previous = current
  }

  return previous[b.length]
}

export function closestMatch(
  query: string,
  candidates: string[],
  maxDistance = 2
): string | undefined {
  const normalized = query.toLowerCase()
  let best: { value: string; distance: number } | undefined

  for (const candidate of candidates) {
    const distance = levenshtein(normalized, candidate.toLowerCase())

    if (
      distance <= maxDistance &&
      (!best || distance < best.distance)
    ) {
      best = { value: candidate, distance }
    }
  }

  return best?.value
}
