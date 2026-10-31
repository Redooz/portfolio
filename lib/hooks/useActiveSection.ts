'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topmost = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0]

        setActive(topmost.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [ids])

  return active
}
