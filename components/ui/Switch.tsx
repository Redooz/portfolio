import * as React from "react"

interface SwitchProps {
  id: string
  checked: boolean
  onCheckedChange: () => void
  className?: string
}

export function Switch({ id, checked, onCheckedChange, className }: SwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onCheckedChange}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${className} ${
        checked ? 'bg-[#cba6f7]' : 'bg-[#45475a]'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}