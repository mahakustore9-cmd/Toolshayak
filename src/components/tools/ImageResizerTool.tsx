import React, { useState, useRef } from "react";
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Maximize2, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Sliders
} from "lucide-react";

interface PresetOption {
  label: string;
  category: string;
  width: number;
  height: number;
}

const PRESETS: PresetOption[] = [
  { label: "Indian Passport Photo (3.5 × 4.5 cm)", category: "Govt / Official", width: 350, height: 450 },
  { label: "PAN Card Photo (200 × 200 px)", category: "Govt / Official", width: 200, height: 200 },
  { label: "PAN Card / SSC Signature (400 × 200 px)", category: "Govt / Official", width: 400, height: 200 },
  { label: "UPSC / SSC Online Photo (138 × 177 px)", category: "Govt / Official", width: 138, height: 177 },
  { label: "Instagram Square Post (1080 × 1080 px)", category: "Social Media", width: 1080, height: 1080 },
  { label: "YouTube Thumbnail (1280 × 720 px)", category: "Social Media", width: 1280, height: 720 },
  { label: "WhatsApp Profile DP (500 × 500 px)", category: "Social Media", width: 500, height: 500 },
  { label: "Facebook Cover Banner (820 × 312 px)", category: "Social Media", width: 820, height: 312 },
];

export const ImageResizerTool: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState<number>(90);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleImageUpload = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageFile(file);
      setImageUrl(url);
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setResizedUrl(null);
      setErrorMsg(null);
      setSuccessMsg(null);
    };
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (preset: PresetOption) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setLockRatio(false);
  };

  const processResize = () => {
    if (!imageUrl || width <= 0 || height <= 0) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        const qVal = Math.max(0.01, Math.min(1.0, quality / 100));
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (resizedUrl) URL.revokeObjectURL(resizedUrl);
              const outUrl = URL.createObjectURL(blob);
              setResizedUrl(outUrl);
              setResizedSize(blob.size);
              setSuccessMsg(`Image resized to ${width}×${height} px successfully!`);
            }
            setIsProcessing(false);
          },
          format,
          qVal
        );
      }
    };
  };

  const downloadResized = () => {
    if (!resizedUrl) return;
    const ext = format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : "webp";
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `Resized_${width}x${height}_${imageFile?.name.replace(/\.[^/.]+$/, "")}.${ext}`;
    link.click();
  };

  const clearAll = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setImageFile(null);
    setImageUrl(null);
    setResizedUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Upload Drop Zone */}
      {!imageUrl && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleImageUpload(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform mb-3">
            <Maximize2 className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-slate-800">
            Select Photo to Resize or Drag & Drop
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Resize by pixel dimensions, passport sizes (3.5x4.5 cm), PAN card, or social media.
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Resizer Interactive Panel */}
      {imageUrl && (
        <div className="space-y-6">
          
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-sm">
                📷 {imageFile?.name}
              </p>
              <p className="text-xs text-slate-500">
                Original Dimensions: <strong className="text-slate-800">{originalWidth} × {originalHeight} px</strong> ({formatBytes(imageFile?.size || 0)})
              </p>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          {/* Presets Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Quick Application Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    width === preset.width && height === preset.height
                      ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                      : "bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-700 hover:border-blue-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            
            {/* Width Input */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Width (Pixels)
              </label>
              <input
                type="number"
                min="10"
                max="8000"
                value={width || ""}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-bold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Height Input */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Height (Pixels)
              </label>
              <input
                type="number"
                min="10"
                max="8000"
                value={height || ""}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-bold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lock Aspect Ratio Toggle */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setLockRatio(!lockRatio)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border font-semibold transition-colors ${
                  lockRatio
                    ? "bg-blue-100 text-blue-800 border-blue-300"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
              >
                {lockRatio ? <Lock className="w-4 h-4 text-blue-600" /> : <Unlock className="w-4 h-4 text-slate-400" />}
                <span>{lockRatio ? "Aspect Ratio Locked" : "Free Dimensions"}</span>
              </button>
            </div>

            {/* Output Format */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Output Image Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500"
              >
                <option value="image/jpeg">JPG / JPEG (Best for photos)</option>
                <option value="image/png">PNG (Best for transparency)</option>
                <option value="image/webp">WebP (Modern compressed)</option>
              </select>
            </div>

          </div>

          {/* Quality Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Output Quality: <strong className="text-blue-600">{quality}%</strong></span>
              <span className="text-slate-500">Higher quality = sharper photo</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Apply Resize Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={processResize}
              disabled={isProcessing || width <= 0 || height <= 0}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{isProcessing ? "Resizing..." : "Apply & Preview Resized Photo"}</span>
            </button>
          </div>

          {/* Preview & Download Area */}
          {resizedUrl && (
            <div className="p-5 bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Resized Result Preview
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                  {width} × {height} px • {formatBytes(resizedSize)}
                </span>
              </div>

              <div className="flex items-center justify-center p-4 bg-white/80 rounded-xl border border-slate-200 min-h-[220px]">
                <img
                  src={resizedUrl}
                  alt="Resized Preview"
                  className="max-h-[300px] object-contain rounded shadow-xs"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={downloadResized}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resized Photo ({width}×{height})</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
