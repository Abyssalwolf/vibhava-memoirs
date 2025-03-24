"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QRScanner from "@/components/QRScanner";
import { motion } from "framer-motion";
import { Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ScanPage = () => {
  const router = useRouter();
  const [cameraAccess, setCameraAccess] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScanComplete = (result: string) => {
    setScanResult(result);
    setScanning(false);
    toast.success("QR Code Scanned!", { description: result });
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setScanning(true);
  };

  const handleCancel = () => {
    setScanning(false);
    setScanResult(null);
    router.back(); // Navigate back
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gradient-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-center mb-4">QR Scanner</h1>

        {scanResult ? (
          <div className="p-4 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">QR Code Scanned</h2>
            <p className="text-gray-700 break-words">{scanResult}</p>
            <div className="mt-4 flex justify-center gap-4">
              <Button variant="outline" onClick={handleScanAgain}>
                Scan Again
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Close
              </Button>
            </div>
          </div>
        ) : scanning ? (
          <QRScanner onScanComplete={handleScanComplete} onClose={handleCancel} />
        ) : (
          <div className="flex flex-col items-center">
            <Button onClick={() => setScanning(true)} className="btn-primary">
              <Camera className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ScanPage;
