"use client"

import { useRouter } from "next/navigation"
import { QrCode, Palette, X, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const router = useRouter()
  const [showTeam, setShowTeam] = useState(false)

  const handleButterflyClick = () => {
    router.push("/login")
  }

  const toggleTeamPopup = () => {
    setShowTeam(!showTeam)
  }

  return (
<<<<<<< HEAD
    <>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        
        .team-popup {
          animation: popIn 0.4s ease-out;
        }
        
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .team-member {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .team-icon {
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .team-icon:hover {
          transform: scale(1.15);
        }
        
        .team-icon::after {
          content: '';
          position: absolute;
          top: -3px;
          right: -3px;
          height: 10px;
          width: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
        
        .sparkle {
          position: absolute;
          animation: sparkle 2s infinite;
          color: #10b981;
          opacity: 0;
        }
        
        @keyframes sparkle {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
        }
        
        .role-badge {
          animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards;
        }
        
        @keyframes badgePop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <main 
        className="flex min-h-screen flex-col items-center justify-between p-4" 
        style={{ background: 'linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5)), linear-gradient(to bottom left, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))' }}
      >    
        <div className="relative flex flex-col items-center justify-center flex-1 w-full">
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
        
        {/* Footer */}
        <footer className="w-full py-4 text-center text-sm text-gray-600 mt-auto relative">
          <div className="container mx-auto">
            <p>© {new Date().getFullYear()} Vibhava Memoirs. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-green-700 transition-colors">About</a>
              <a href="#" className="hover:text-green-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-700 transition-colors">Contact</a>
            </div>
          </div>
          
          {/* Team Credits Symbol */}
          <div className="absolute bottom-4 left-4">
            <button 
              onClick={toggleTeamPopup} 
              className="text-green-700 hover:text-green-800 transition-colors p-2 bg-white/80 rounded-full shadow-md team-icon relative"
              aria-label="View design team"
            >
              <Palette size={26} strokeWidth={2} />
              <span className="sparkle" style={{"--tx": "-15px", "--ty": "-15px"} as React.CSSProperties}>
                <Sparkles size={12} />
              </span>
              <span className="sparkle" style={{"--tx": "10px", "--ty": "-18px"} as React.CSSProperties}>
                <Sparkles size={10} />
              </span>
              <span className="sparkle" style={{"--tx": "15px", "--ty": "10px"} as React.CSSProperties}>
                <Sparkles size={12} />
              </span>
              <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-green-100 text-green-800 rounded-full px-[5px] animate-bounce">
                ✦
              </span>
            </button>
          </div>
        </footer>
        
        {/* Team Popup */}
        {showTeam && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div 
              className="team-popup bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(17, 219, 71, 0.15), white 40%, rgba(17, 219, 71, 0.1))' }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
              
              <button 
                onClick={toggleTeamPopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors z-10 bg-white/80 rounded-full p-1.5"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold text-center mb-2 text-green-800 relative z-10">
                <span className="inline-block relative">
                  The Design Team
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400 rounded-full opacity-70"></div>
                </span>
              </h3>
              <p className="text-center text-green-600 mb-6 text-sm relative z-10">Meet the wizards behind Vibhava Memoirs</p>
              
              <div className="space-y-4 relative z-10">
                {[
                  { 
                    name: "Shebin Thomas", 
                    emoji: "⚙️", 
                    color: "bg-blue-100", 
                    role: "Backend Developer",
                    
                  },
                  { 
                    name: "Ashbin P A", 
                    emoji: "🖥️", 
                    color: "bg-purple-100", 
                    role: "Frontend Developer",
                    
                  },
                  { 
                    name: "Sachin Manoj", 
                    emoji: "🔌", 
                    color: "bg-blue-100", 
                    role: "Backend Developer",
                    
                  },
                  { 
                    name: "Ashwin menon", 
                    emoji: "💻", 
                    color: "bg-purple-100", 
                    role: "Frontend Developer",
                    
                  },
                  { 
                    name: "Shuaib", 
                    emoji: "🎭", 
                    color: "bg-pink-100", 
                    role: "Figma Designer",
                   
                  }
                ].map((member, index) => (
                  <div 
                    key={member.name} 
                    className="team-member rounded-lg p-0 overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`group relative flex items-center ${member.color} hover:bg-opacity-80 transition-all duration-300 hover:translate-x-1 rounded-lg`}>
                      <div className="w-14 h-14 flex items-center justify-center mr-3 p-3 relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full transform scale-0 group-hover:scale-100 transition-transform"></div>
                        <span className="text-2xl relative z-10">{member.emoji}</span>
                      </div>
                      <div className="flex flex-col py-3">
                        <span className="text-gray-800 font-medium leading-tight">{member.name}</span>
                        <div className="flex items-center">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/50 text-green-700 mr-2 role-badge">
                            {member.role}
                          </span>
                          <span className="text-xs text-gray-600 italic">{member.tagline}</span>
                        </div>
                      </div>
                      <div className="absolute right-3 transform translate-x-8 group-hover:translate-x-0 transition-transform duration-300 opacity-70">
                        <Sparkles size={16} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative mt-8 py-4 border-t border-green-100 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-white">
                  <Sparkles className="text-green-400" size={16} />
                </div>
                <p className="text-center text-green-600 text-sm mb-2">Together we create memories that last forever!</p>
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:from-green-600 hover:to-teal-600" onClick={toggleTeamPopup}>
                    Back to Memoirs ✨
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
=======
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
>>>>>>> 4ae7b35281a39c789833bd8de77071d2c729d5b3
  )
}