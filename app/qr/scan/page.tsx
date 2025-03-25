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
      

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative" style={{ borderRadius: '16px' }}>
        {scanResult ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">Project ID:</p>
            <div className="bg-gray-200 p-3 rounded-lg mt-2 break-words shadow-md">
              <p>{scanResult}</p>
              {/* If the scanned result includes an image, you can display it here */}
              {/* <img src={imageUrl} alt="Scanned Content" className="mt-2 rounded-lg" /> */}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white hover:bg-green-600"
              style={{ borderRadius: '10px' }}
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