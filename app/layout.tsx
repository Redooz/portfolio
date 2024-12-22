import './globals.css'
import { Inter } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import { ReactNode } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Nicolas Olmos's Portfolio",
  description: "Nicolas Olmos, fullstack developer's portfolio with a Linux terminal-inspired UI",
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

