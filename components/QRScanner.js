"use client"; // Required for Next.js since we use browser APIs

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-qr-scanner (to avoid SSR issues)
const QrReader = dynamic(() => import("react-qr-scanner"), { ssr: false });

const QRScanner = ({ onScanComplete, onClose }) => {
  const [error, setError] = useState(null);

  // QR Scan success callback
  const handleScan = (data) => {
    if (data) {
      onScanComplete(data.text); // Return scanned QR code
      onClose(); // Close scanner after successful scan
    }
  };

  // Handle scan errors
  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    setError("Camera access denied or not available.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        >
          ❌
        </button>
        <h2 className="text-lg font-bold text-center">Scan QR Code</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default QRScanner;
