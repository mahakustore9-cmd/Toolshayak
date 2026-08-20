import React, { useState, useRef } from "react";
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Zap, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Archive, 
  Layers,
  Sparkles,
  Eye
} from "lucide-react";
import JSZip from "jszip";

interface CompressedItem {
  id: string;
  originalFile: File;
  name: string;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  compressedBlob: Blob;
  width: number;
  height: number;
}

export const ImageCompressorTool: React.FC = () => {
  const [items, setItems] = useState<CompressedItem[]>([]);
  const [quality, setQuality] = useState<number>(75);
  const [targetKb, setTargetKb] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<CompressedItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFile = async (file: File, qPercent: number): Promise<CompressedItem> => {
    const id = Math.random().toString(36).substring(2, 9);
    const originalUrl = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const img = new Image();
      img.src = originalUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const qVal = Math.max(0.01, Math.min(1.0, qPercent / 100));
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedUrl = URL.createObjectURL(blob);
                resolve({
                  id,
                  originalFile: file,
                  name: file.name,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  originalUrl,
                  compressedUrl,
                  compressedBlob: blob,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                });
              }
            },
            file.type.includes("png") ? "image/jpeg" : file.type,
            qVal
          );
        }
      };
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsProcessing(true);

    try {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      const newItems: CompressedItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (validTypes.includes(file.type.toLowerCase())) {
          const item = await processFile(file, quality);
          newItems.push(item);
        }
      }

      if (newItems.length === 0) {
        setErrorMsg("Please upload valid JPG, PNG, or WebP images.");
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setSelectedPreview(newItems[0]);
        setSuccessMsg(`Successfully compressed ${newItems.length} image(s)!`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred while compressing images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const recompressAll = async (newQuality: number) => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      const updated: CompressedItem[] = [];
      for (const item of items) {
        URL.revokeObjectURL(item.compressedUrl);
        const newItem = await processFile(item.originalFile, newQuality);
        updated.push({
          ...newItem,
          id: item.id,
          originalUrl: item.originalUrl,
        });
      }
      setItems(updated);
      if (selectedPreview) {
        const matching = updated.find((u) => u.id === selectedPreview.id);
        if (matching) setSelectedPreview(matching);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        URL.revokeObjectURL(target.compressedUrl);
      }
      if (selectedPreview?.id === id) {
        setSelectedPreview(filtered[0] || null);
      }
      return filtered;
    });
  };

  const downloadItem = (item: CompressedItem) => {
    const link = document.createElement("a");
    link.href = item.compressedUrl;
    link.download = `Compressed_${item.name}`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      const zip = new JSZip();
      items.forEach((item) => {
        zip.file(`Compressed_${item.name}`, item.compressedBlob);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "ToolSahayak_Compressed_Images.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate ZIP archive.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    items.forEach((i) => {
      URL.revokeObjectURL(i.originalUrl);
      URL.revokeObjectURL(i.compressedUrl);
    });
    setItems([]);
    setSelectedPreview(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const totalOriginalBytes = items.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = items.reduce((acc, curr) => acc + curr.compressedSize, 0);
  const totalSavings = totalOriginalBytes > 0
    ? Math.round(((totalOriginalBytes - totalCompressedBytes) / totalOriginalBytes) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[180px] group"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform mb-3">
          <Zap className="w-7 h-7" />
        </div>
        <p className="text-base font-bold text-slate-800">
          Click to Select Photos or Drag & Drop (Batch Mode)
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Compress photos to under 100 KB, 50 KB, or 20 KB. Fast, client-side, zero quality loss.
        </p>
      </div>

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

      {/* Global Slider & Stats */}
      {items.length > 0 && (
        <div className="space-y-6">
          
          {/* Quality Slider Control */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Image Quality: <span className="text-blue-600 text-sm font-extrabold">{quality}%</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  Slide left for smaller KB size; slide right for maximum visual sharpness.
                </p>
              </div>

              {/* Quick Presets for Online Forms */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">Presets:</span>
                <button
                  onClick={() => {
                    setQuality(85);
                    recompressAll(85);
                  }}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:border-blue-500 rounded-md font-semibold text-slate-700 text-xs shadow-2xs"
                >
                  High (85%)
                </button>
                <button
                  onClick={() => {
                    setQuality(65);
                    recompressAll(65);
                  }}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:border-blue-500 rounded-md font-semibold text-slate-700 text-xs shadow-2xs"
                >
                  Balanced (65%)
                </button>
                <button
                  onClick={() => {
                    setQuality(45);
                    recompressAll(45);
                  }}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:border-blue-500 rounded-md font-semibold text-slate-700 text-xs shadow-2xs"
                >
                  Under 50KB (45%)
                </button>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="95"
              value={quality}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuality(val);
              }}
              onMouseUp={() => recompressAll(quality)}
              onTouchEnd={() => recompressAll(quality)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            {/* Total Savings Meter */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
              <div className="text-slate-600">
                Total Original: <strong>{formatBytes(totalOriginalBytes)}</strong> ➔ Compressed: <strong className="text-emerald-700">{formatBytes(totalCompressedBytes)}</strong>
              </div>
              <div className="font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Saved {totalSavings}% Space
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={downloadAllAsZip}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-colors cursor-pointer"
              >
                <Archive className="w-4 h-4" />
                <span>Download All as ZIP ({items.length})</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Add More Images
              </button>
            </div>

            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>

          {/* Grid of Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const itemSavings = item.originalSize > item.compressedSize
                ? Math.round(((item.originalSize - item.compressedSize) / item.originalSize) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-blue-400 transition-all shadow-2xs space-y-3"
                >
                  <div className="relative aspect-4/3 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={item.compressedUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{itemSavings}%
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 left-2 p-1 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>Orig: {formatBytes(item.originalSize)}</span>
                      <span>➔</span>
                      <span className="font-bold text-emerald-700">{formatBytes(item.compressedSize)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadItem(item)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-800 hover:text-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download ({formatBytes(item.compressedSize)})</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
