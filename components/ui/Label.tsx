import * as React from "react"

interface LabelProps {
    htmlFor: string
    className?: string
    children: React.ReactNode
}

export function Label({ htmlFor, className, children }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-[#cdd6f4] cursor-pointer select-none ${className}`}
        >
            {children}
        </label>
    )
}