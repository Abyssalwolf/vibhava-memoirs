"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!username.trim() || !email.trim()) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    // Clear error and redirect to QR page
    setError("")
    router.push("/qr")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gradient-background">
      <div className="relative w-full max-w-md p-8 border border-green-300 rounded-lg bg-white/10 backdrop-blur-sm">
        {/* Butterfly in top corner */}
        <div className="absolute -top-10 -right-10">
          <Image src="/images/butterfly.png" alt="Butterfly" width={80} height={80} />
        </div>

        {/* Vibhava Memoirs Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">Vibhava</h1>
            <div className="ml-1 h-3 w-3 bg-green-400"></div>
          </div>
          <h2 className="memoirs-text text-5xl mt-2">Memoirs</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end mt-8">
            <button type="submit" className="next-button">
              Next
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

