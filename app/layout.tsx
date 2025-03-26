import type React from "react"
import type { Metadata } from "next"
import { Dancing_Script, Inter } from "next/font/google"
import "./globals.css"
import PageTransition from "./components/PageTransition"

const inter = Inter({ subsets: ["latin"] })

// Properly load Dancing Script font with correct weights
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Vibhava ",
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
      <head>
        <style>
          {`
            .page-transition {
              min-height: 100vh;
              width: 100%;
            }
            
            .fadeIn {
              animation: fadeIn 300ms ease-in-out forwards;
            }
            
            .fadeOut {
              animation: fadeOut 300ms ease-in-out forwards;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translate3d(0, 20px, 0); }
              to { opacity: 1; transform: translate3d(0, 0, 0); }
            }
            
            @keyframes fadeOut {
              from { opacity: 1; transform: translate3d(0, 0, 0); }
              to { opacity: 0; transform: translate3d(0, -20px, 0); }
            }
          `}
        </style>
      </head>
      <body className={`${inter.className} ${dancingScript.variable}`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}