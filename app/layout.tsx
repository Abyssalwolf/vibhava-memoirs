import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Properly load Dancing Script font with correct weights
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Vibhava Memoirs",
  description: "Vibhava Innovation Summit",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable}`}>{children}</body>
    </html>
  )
}



import './globals.css'