import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

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
        <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>{children}</body>
      </MotionConfig>
    </html>
  )
}
