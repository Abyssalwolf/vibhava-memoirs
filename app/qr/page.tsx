"use client";

import { useRouter } from "next/navigation";
import { QrCode } from "lucide-react";

export default function QRHome() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 gradient-background">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 mt-4">
        <button onClick={handleBack} className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Vibhava</h1>
          <div className="ml-1 h-2 w-2 bg-green-400"></div>
          <h2 className="ml-2 text-xl">Innovation Summit</h2>
        </div>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      {/* QR Code Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold mb-6">Welcome to QR Scanner</h1>
        <div className="bg-green-100/50 p-6 rounded-lg shadow-sm">
          <button onClick={() => router.push("/qr/scan")} className="qr-button">
            Scan QR Code
            <QrCode size={24} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto mb-8">
        <h2 className="memoirs-text text-5xl">Memoirs</h2>
      </div>
    </main>
  );
}