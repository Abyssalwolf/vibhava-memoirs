"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// ✅ Dynamically import to avoid SSR issues
const QRScanner = dynamic(() => import("@/components/QRScanner"), { ssr: false });

const ScanPage = () => {
  const router = useRouter();
  const [showScanner, setShowScanner] = useState(true);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleScanComplete = (result: string) => {
    setScanResult(result);
    setShowScanner(false);
    setSuccessMessage(true);

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/qr"); // Redirect to the main QR page
    }, 4000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6" style={{ background: 'linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))' }}>
      <div className="flex items-center justify-center w-full max-w-md relative">
        {successMessage ? (
          <div className="bg-green-100 p-6 rounded-lg shadow-md w-full max-w-md relative animate-bounce">
            <h1 className="text-4xl font-bold text-center text-green-600">🎉 Successfully Added! 🎉</h1>
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