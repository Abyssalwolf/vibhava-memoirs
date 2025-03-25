"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QrCode } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!username.trim() || !email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      console.log("Sending data to backend...");
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
      });

      console.log("Data has been sent to backend");

      if (response.status === 201) {
        console.log("Registration successful");
        setError("");
        router.push("/qr"); 
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleImageClick = async () => {
    if (!username.trim() || !email.trim()) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email before proceeding.");
      return;
    }

    try {
      console.log("Sending data to backend...");
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
      });

      console.log("Data has been sent to backend");

      if (response.status === 201) {
        console.log("Registration successful");
        setError("");
        router.push("/qr");
      }
    } catch (err) {
      console.error("Error occurred:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))",
      }}
    >
      <div className="relative w-full max-w-md p-8 border border-green-300 rounded-lg bg-white/10 backdrop-blur-sm">
        {/* Butterfly in top corner */}
        <div className="absolute -top-12 -right-10">
          <img src="/gifs/green.gif" alt="Butterfly" width={100} height={100} />
        </div>

        {/* Header */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-8 mt-4">
          <button onClick={handleBack} className="back-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex items-center justify-center w-full">
            <img
              src="/images/vibhava logo 1.png"
              alt="Vibhava Logo"
              className="h-8"
            />
          </div>
          <div className="w-6"></div>
        </div>

        {/* Vibhava Memoirs Logo */}
        <div className="text-center mb-8">
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
            <img
              src="/images/Frame 1.png"
              alt="Frame"
              className="cursor-pointer"
              width={80}
              height={80}
              onClick={handleImageClick} // Corrected to use separate handler
            />
          </div>
        </form>
      </div>
    </main>
  );
}
