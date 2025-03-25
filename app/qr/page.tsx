"use client";

import { useRouter } from "next/navigation";

const QRHome = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Welcome to QR Scanner</h1>
      <button
        onClick={() => router.push("/qr/scan")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
      >
        Scan QR Code
      </button>
    </div>
  );
};

export default QRHome;
