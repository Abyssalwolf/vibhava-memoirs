"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

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

        {/* GIF of a butterfly */}
        <img
          src="/gifs/borboletas-butterfly.gif"
          alt="Butterfly"
          className="mt-8"
          onClick={handleButterflyClick}
        />
      </div>
    </main>
  )
}

