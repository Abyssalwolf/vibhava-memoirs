"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically import to avoid SSR issues
const QRScanner = dynamic(() => import("@/components/QRScanner"), { ssr: false });

const ScanPage = () => {
  const [showScanner, setShowScanner] = useState(true);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanComplete = (result: string) => {
    setScanResult(result);
    setShowScanner(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6" style={{ background: 'linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))' }}>
      <h1 className="text-3xl font-semibold mb-6">QR Code Scanner</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {scanResult ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">Scanned Result:</p>
            <p className="bg-gray-200 p-3 rounded-md mt-2 break-words">{scanResult}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowScanner(true)}
            >
              Scan Again
            </button>
          </div>
        ) : (
          showScanner && (
            <QRScanner
              onScanComplete={handleScanComplete}
              onClose={() => setShowScanner(false)}
            />
          )
        )}
      </div>
    </main>
  );
};

export default ScanPage;