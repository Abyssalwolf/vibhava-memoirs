"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Start animation after component mounts
    setAnimate(true)
  }, [])

  const handleButterflyClick = () => {
    router.push("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gradient-background">
      <div className="relative flex flex-col items-center justify-center">
        {/* Vibhava Logo */}
        <div className="mb-4 flex items-center">
          <h1 className="text-4xl font-bold">Vibhavaaaa</h1>
          <div className="ml-1 h-4 w-4 bg-green-400"></div>
        </div>

        {/* Memoirs Text */}
        <h2 className="memoirs-text text-7xl mb-8">Memoirs</h2>

        {/* Animated Butterfly */}
        <div className={`butterfly ${animate ? "butterfly-animate" : ""} mt-1`} onClick={handleButterflyClick}>
          <Image
            src="/images/butterfly-removebg-preview.png"
            alt="Butterfly"
            width={600}
            height={600}
            className="transition-all duration-300 hover:scale-110"
          />
        </div>
      </div>
    </main>
  )
}

