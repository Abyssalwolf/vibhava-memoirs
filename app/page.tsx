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

        {/* Memoirs Logo */}
        <img 
          src="https://i.ibb.co/pBDLKmxM/wrapped-1.png" 
          alt="Memoirs Logo"
          className="mb-8 w-64 h-auto"
        />

        {/* Pulsating circle container */}
        <div className="relative flex items-center justify-center">
          {/* Pulsating circle effect */}
          
          {/* Second pulsating circle for smoother effect */}
          <div className="absolute animate-ping rounded-full bg-green-100 opacity-50" style={{
            width: '240px',
            height: '240px',
            animationDuration: '1.5s',
            animationDelay: '0s'
          }}></div>

          {/* Butterfly GIF */}
          <img
            src="/gifs/green.gif"
            alt="Butterfly"
            className="relative z-10 cursor-pointer transition-transform hover:scale-105"
            width={200}
            height={200}
            onClick={handleButterflyClick}
          />
        </div>
      </div>
    </main>
  )
}