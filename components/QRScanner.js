"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanComplete, onClose }) => {
  const [scanner, setScanner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only initialize if no scanner exists
    if (!scanner) {
      const qrScanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      });

      const successCallback = (decodedText) => {
        onScanComplete(decodedText);
        qrScanner.clear().catch(console.error);
        onClose();
      };

      const errorCallback = (scanError) => {
        console.warn("QR Scan Error:", scanError);
      };

      qrScanner.render(successCallback, errorCallback);
      setScanner(qrScanner);
    }

    // Cleanup function
    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [onScanComplete, onClose, scanner]);

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
        <div id="qr-reader" className="w-full"></div>
      </div>
    </div>
  );
};

export default QRScanner;