"use client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCodeResult from "@/components/QRCodeResult";
import { motion } from "framer-motion";
import { Camera, CameraOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import jsQR from "jsqr";

declare module "sonner" {
  export function toast(options: { description?: string; title?: string; });
}

const ScanPage = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scanIntervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      stopScanning();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = { 
        video: { 
          facingMode: "user", // Use the front camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraAccess(true);
          startScanning();
          toast.success("Camera access granted", {
            description: "You can now scan QR codes"
          });
        };
      }
    } catch (err) {
      console.error("Error accessing camera", err);
      setError("Camera access denied. Please allow camera access to scan QR codes.");
      toast.error("Camera access denied", {
        description: "Please allow camera access to scan QR codes"
      });
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;
    
    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        setScanResult(code.data);
        return; // Stop scanning once we have a result
      }
    }
    
    if (scanning) {
      scanIntervalRef.current = requestAnimationFrame(scanQRCode);
    }
  };

  useEffect(() => {
    if (cameraAccess) {
      scanQRCode();
    }
  }, [cameraAccess]);

  const handleSuccessfulScan = (result: string) => {
    // Implementation of handleSuccessfulScan
  };

  const handleScanAgain = () => {
    // Implementation of handleScanAgain
  };

  const handleCancel = () => {
    // Implementation of handleCancel
  };

  const handleRetry = () => {
    // Implementation of handleRetry
  };

  if (error) {
    // ... keep existing code (error UI)
  }
  
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
        <p className="text-gray-600 text-center mb-8">
          {cameraAccess ? "Your camera is now active. You can see yourself!" : "Waiting for camera access..."}
        </p>
        
        {scanResult ? (
          <QRCodeResult 
            result={scanResult}
            onScanAgain={handleScanAgain}
            onClose={handleCancel}
          />
        ) : (
          <div className="relative flex flex-col items-center w-full animate-scale-in">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden glass-card">
              {/* Scanner animation overlay */}
              <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden">
                {/* Corner markers for the scanning area */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                
                {/* Scanning line animation */}
                <div className="scanner-line top-0"></div>
              </div>
              
              {/* Camera feed or loading state */}
              <div className={`w-full h-full flex items-center justify-center ${cameraAccess ? "bg-black" : "bg-gray-900"}`}>
                {cameraAccess ? (
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay 
                    playsInline 
                    muted
                  />
                ) : (
                  <div className="animate-pulse flex flex-col items-center justify-center">
                    <Camera className="w-12 h-12 text-white/70 mb-3" />
                    <p className="text-white/70">Accessing camera...</p>
                  </div>
                )}
              </div>
              
              {/* Hidden canvas for processing video frames */}
              <canvas 
                ref={canvasRef} 
                className="hidden"
              />
            </div>
            
            <div className="mt-6 w-full flex justify-between">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="btn-secondary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              
              <Button
                onClick={handleRetry}
                className="btn-primary"
                disabled={!cameraAccess}
              >
                <Camera className="mr-2 h-4 w-4" />
                Rescan
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ScanPage;