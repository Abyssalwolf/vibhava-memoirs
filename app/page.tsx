"use client"

import { useRouter } from "next/navigation"
import { QrCode } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const handleButterflyClick = () => {
    router.push("/login")
  }

  return (
<main className="flex min-h-screen flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))' }}>    
      <div className="relative flex flex-col items-center justify-center">
        {/* Vibhava Logo */}
        <div className="mb-4 flex items-center">
          <img src="/images/vibhava logo 1.png" alt="Vibhava Logo" className="h-10" />
          
        </div>

        {/* Memoirs Text */}
        <h2 className="memoirs-text text-7xl mb-8">Memoirs</h2>

        {/* GIF of a butterfly */}
        <img
          src="/gifs/green.gif"
          alt="Butterfly"
          className="mt-8"
          width={200}
          height={200}
          onClick={handleButterflyClick}
        />
      </div>
    </main>
  )
}