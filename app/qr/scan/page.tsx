"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

const QRScanner = dynamic(() => import("@/components/QRScanner"), { ssr: false });

const ScanPage = () => {
  const router = useRouter();
  const [showScanner, setShowScanner] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const handleScanComplete = async (result: string) => {
    if (!isScanning) return;
    setIsScanning(false);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post("https://backend-recapped.onrender.com/api/scan", {
        user_id: userId,
        project_id: result
      });

      if (response.status === 200) {
        setPopup({
          type: "success",
          message: "🎉 Successfully Added!",
          show: true
        });
        
        // Auto-close popup and redirect
        setTimeout(() => {
          setPopup(p => ({ ...p, show: false }));
          router.push("/qr");
        }, 3000);
      }
    } catch (err: any) {
      let errorMessage = "Scan failed. Please try again.";
      
      if (err.response) {
        switch (err.response.status) {
          case 400: errorMessage = "Missing required fields"; break;
          case 404: errorMessage = "Invalid project ID"; break;
          case 409: errorMessage = "Project already scanned"; break;
        }
      } else if (err.message === "User not authenticated") {
        errorMessage = "Session expired. Please login again.";
        setTimeout(() => router.push("/"), 2000);
      }

      setPopup({
        type: "error",
        message: errorMessage,
        show: true
      });
      setIsScanning(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6" 
          style={{ background: 'linear-gradient(to top right, rgba(17, 219, 71, 0.5), white, rgba(17, 219, 71, 0.5))' }}>
      
      {/* Custom Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${
            popup.type === "success" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          } p-6 rounded-lg max-w-md w-full mx-4 text-center`}>
            <h3 className="text-lg font-bold mb-2">
              {popup.type === "success" ? "Success!" : "Error!"}
            </h3>
            <p>{popup.message}</p>
            <button
              onClick={() => {
                setPopup({ ...popup, show: false });
                if (popup.type === "success") router.push("/qr");
              }}
              className={`mt-4 ${
                popup.type === "success" 
                  ? "bg-green-500 hover:bg-green-600" 
                  : "bg-red-500 hover:bg-red-600"
              } text-white px-4 py-2 rounded`}
            >
              {popup.type === "success" ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      )}

      {/* Scanner Content */}
      <div className="flex items-center justify-center w-full max-w-md relative">
        {showScanner && (
          <QRScanner
            onScanComplete={handleScanComplete}
            onClose={() => router.push("/qr")}
          />
        )}
      </div>
    </main>
  );
};

export default ScanPage;