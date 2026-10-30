import './globals.css'
import { Inter } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Nicolás Olmos — Full-stack Developer",
  description: "Nicolás Olmos, full-stack developer at Wompi. Payment infrastructure, fintech systems and AI agents, with a Linux terminal-inspired portfolio.",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <MotionConfig reducedMotion="user">
        <body className={inter.className}>{children}</body>
      </MotionConfig>
    </html>
  )
}

