import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Upload, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCcw, 
  ScanLine, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Zap,
  Image as ImageIcon
} from "lucide-react";
import jsQR from "jsqr";

export const QrScannerTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"camera" | "upload">("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setIsScanning(true);
        requestAnimationFrame(tickScan);
      }
    } catch (err: any) {
      console.error(err);
      setIsScanning(false);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMsg("Camera permission denied. Please enable camera permission in your browser or use the 'Upload Image' tab below.");
      } else {
        setErrorMsg("Unable to access camera. Please check camera connections or use the image upload option.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animFrameId.current) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
    setIsScanning(false);
  };

  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && code.data) {
          setScanResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    animFrameId.current = requestAnimationFrame(tickScan);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file containing a QR code.");
      return;
    }

    setErrorMsg(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.data) {
          setScanResult(code.data);
        } else {
          setErrorMsg("Could not detect any QR code in this image. Please ensure the QR code is clear and not blurry.");
        }
      }
      URL.revokeObjectURL(url);
    };
  };

  const copyResult = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUrl = scanResult && (scanResult.startsWith("http://") || scanResult.startsWith("https://"));

  const resetAll = () => {
    stopCamera();
    setScanResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Switch Mode Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            setActiveTab("camera");
            setScanResult(null);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "camera"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Live Camera Scan</span>
        </button>

        <button
          onClick={() => {
            stopCamera();
            setActiveTab("upload");
            setScanResult(null);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "upload"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload QR Image / Screenshot</span>
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Camera View Mode */}
      {activeTab === "camera" && !scanResult && (
        <div className="flex flex-col items-center justify-center space-y-4">
          
          <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-700 flex items-center justify-center shadow-inner">
            
            {/* Hidden canvas for decoding */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Video element */}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isScanning ? "block" : "hidden"}`}
            />

            {/* Inactive state */}
            {!isScanning && (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-white">Camera is currently inactive</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Click 'Start Camera' to point your phone or webcam at any QR code for instant decoding.
                </p>
              </div>
            )}

            {/* Active Viewfinder Box & Laser */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                <div className="relative w-56 h-56 border-2 border-amber-400 rounded-2xl shadow-lg">
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-amber-400 rounded-tl-md" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-amber-400 rounded-tr-md" />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-amber-400 rounded-bl-md" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-amber-400 rounded-br-md" />

                  {/* Animated laser line */}
                  <div className="absolute left-2 right-2 h-0.5 bg-amber-400 shadow-md shadow-amber-400/80 animate-laser" />
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {!isScanning ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-500/20 cursor-pointer transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Start Camera Scanner</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <span>Stop Camera</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            🔒 Privacy note: Video frames are decoded locally on your device and are never recorded or uploaded.
          </p>
        </div>
      )}

      {/* Upload Image Mode */}
      {activeTab === "upload" && !scanResult && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleImageFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50/70 rounded-2xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform mb-3">
            <ImageIcon className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-slate-800">
            Upload QR Code Screenshot or Image
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Drag & drop any photo containing a QR code to read its content instantly.
          </p>
        </div>
      )}

      {/* Decoded Result Card */}
      {scanResult && (
        <div className="p-6 bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200 rounded-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                QR Code Successfully Decoded
              </span>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scan Another</span>
            </button>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 break-all font-mono text-sm text-slate-800 shadow-2xs">
            {scanResult}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={copyResult}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Result"}</span>
            </button>

            {isUrl && (
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open URL in New Tab</span>
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
