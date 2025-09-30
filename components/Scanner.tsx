
import React, { useRef, useEffect, useState, useCallback } from 'react';

// This tells TypeScript that we're expecting jsQR to be available globally
declare const jsQR: any;

interface ScannerProps {
  onScan: (data: string | null) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const lastScanTime = useRef<number>(0);
  const animationFrameId = useRef<number>();

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && isScanning) {
      if (canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code && Date.now() - lastScanTime.current > 3000) {
            lastScanTime.current = Date.now();
            onScan(code.data);
            // Vibrate for feedback on mobile devices
            if ('vibrate' in navigator) {
                navigator.vibrate(200);
            }
          }
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(tick);
  }, [isScanning, onScan]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true'); // Required for iOS
          await videoRef.current.play();
          animationFrameId.current = requestAnimationFrame(tick);
        }
      } catch (err) {
        console.error("Camera Error:", err);
        setError("Could not access camera. Please check permissions and refresh.");
      }
    };

    startCamera();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-brand-blue/30 p-4 rounded-lg shadow-xl relative overflow-hidden aspect-square flex items-center justify-center">
      <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Scanner Overlay */}
      <div className="absolute w-2/3 h-2/3 border-4 border-dashed border-brand-lightblue/70 rounded-lg animate-pulse">
         <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-8 w-1 bg-brand-red"></div>
         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-8 w-1 bg-brand-red"></div>
         <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-8 h-1 bg-brand-red"></div>
         <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-8 h-1 bg-brand-red"></div>
      </div>
      
      {error && <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-4 text-brand-red">{error}</div>}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-md">
        Point Camera at Student ID QR Code
      </div>
    </div>
  );
};

export default Scanner;
