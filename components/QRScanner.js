"use client";

import { useCallback, useState } from "react";
import QrReader from "react-qr-reader-es6";

const QRScanner = ({ onScanComplete, onClose }) => {
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  const handleScan = useCallback(
    (data) => {
      if (data) {
        onScanComplete(data);
        onClose();
      }
    },
    [onScanComplete, onClose]
  );

  const handleError = useCallback((err) => {
    console.error("QR Scanner Error:", err);
    setError(err?.message || "Camera access denied");
  }, []);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
    setError(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md flex flex-col items-center" style={{ borderRadius: '16px' }}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 z-10"
        >
          ❌
        </button>
        <h2 className="text-lg font-bold text-center mb-4">Scan QR Code</h2>

        {error ? (
          <div className="text-center p-4">
            <p className="text-green-500 mb-2">{error}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
              <button
                onClick={toggleCamera}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Switch Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-86 relative bg-black flex items-center justify-center rounded-lg overflow-hidden">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              facingMode={facingMode}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
            <div className="absolute bottom-1 left-0 right-0 flex justify-center">
              <button
                onClick={toggleCamera}
                className="px-4 py-2 bg-white bg-opacity-80 text-black rounded-full shadow-md hover:bg-opacity-100"
              >
                {facingMode === "environment" ? "Front Camera" : "Rear Camera"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
