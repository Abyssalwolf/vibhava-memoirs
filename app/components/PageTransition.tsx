"use client"

import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("fadeIn")
  
  useEffect(() => {
    if (pathname) {
      setTransitionStage("fadeOut")
      // After the fade out, update children and fade in
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setTransitionStage("fadeIn")
      }, 300) // Match this timing with the CSS animation duration
      
      return () => clearTimeout(timeout)
    }
  }, [pathname, children])
  
  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  )
} 