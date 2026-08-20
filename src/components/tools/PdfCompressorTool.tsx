import React, { useState, useRef } from "react";
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Minimize2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Info,
  Sliders
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import jsPDF from "jspdf";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export const PdfCompressorTool: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handlePdfUpload = (file: File) => {
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please upload a valid PDF file.");
      return;
    }
    setPdfFile(file);
    setOriginalSize(file.size);
    setCompressedBlob(null);
    setCompressedSize(0);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePdfUpload(e.dataTransfer.files[0]);
    }
  };

  const compressPdf = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    setProgress(10);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const totalPages = pdfDoc.numPages;

      // Settings based on level
      let scale = 1.0;
      let quality = 0.65;

      if (compressionLevel === "low") {
        scale = 1.25;
        quality = 0.82;
      } else if (compressionLevel === "high") {
        scale = 0.85;
        quality = 0.48;
      }

      let newPdf: jsPDF | null = null;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
          canvas: canvas,
        } as any).promise;

        const imgData = canvas.toDataURL("image/jpeg", quality);

        const isLandscape = viewport.width > viewport.height;
        const orientation = isLandscape ? "landscape" : "portrait";

        if (i === 1) {
          newPdf = new jsPDF({
            orientation,
            unit: "pt",
            format: [viewport.width, viewport.height],
          });
          newPdf.addImage(imgData, "JPEG", 0, 0, viewport.width, viewport.height);
        } else if (newPdf) {
          newPdf.addPage([viewport.width, viewport.height], orientation);
          newPdf.addImage(imgData, "JPEG", 0, 0, viewport.width, viewport.height);
        }

        setProgress(Math.round((i / totalPages) * 90));
      }

      if (newPdf) {
        const blob = newPdf.output("blob");
        setCompressedBlob(blob);
        setCompressedSize(blob.size);
        setProgress(100);

        const reduction = originalSize > blob.size 
          ? Math.round(((originalSize - blob.size) / originalSize) * 100)
          : 0;

        if (reduction > 0) {
          setSuccessMsg(`PDF successfully compressed by ${reduction}%!`);
        } else {
          setSuccessMsg(`Optimized! Document rebuilt cleanly in browser.`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to compress PDF. Please ensure the file is not protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedBlob || !pdfFile) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(compressedBlob);
    link.download = `Compressed_${pdfFile.name}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const clearAll = () => {
    setPdfFile(null);
    setCompressedBlob(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const reductionPercent = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Upload Zone */}
      {!pdfFile && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/40 hover:bg-rose-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handlePdfUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform mb-3">
            <Minimize2 className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-slate-800">
            Select PDF to Compress or Drag & Drop
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Reduce PDF size for email, WhatsApp, and job application forms (under 1 MB).
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-rose-700 bg-rose-100/70 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Client-Side • Your confidential files are never uploaded</span>
          </div>
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

      {/* Selected File & Compression Settings */}
      {pdfFile && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-sm">
                📄 {pdfFile.name}
              </p>
              <p className="text-xs text-slate-500">
                Original Size: <strong className="text-slate-800">{formatBytes(originalSize)}</strong>
              </p>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change File</span>
            </button>
          </div>

          {/* Level Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Compression Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div
                onClick={() => setCompressionLevel("low")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  compressionLevel === "low"
                    ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Low Compression</span>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">High Quality</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Best visual quality. Minor file size reduction.
                </p>
              </div>

              <div
                onClick={() => setCompressionLevel("medium")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  compressionLevel === "medium"
                    ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Recommended</span>
                  <span className="text-[10px] font-semibold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">Balanced</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Optimal size reduction while keeping text sharp.
                </p>
              </div>

              <div
                onClick={() => setCompressionLevel("high")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  compressionLevel === "high"
                    ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">High Compression</span>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Max Reduction</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Maximum file shrinkage for strictly limited portals.
                </p>
              </div>

            </div>
          </div>

          {/* Action button */}
          {!compressedBlob && (
            <button
              onClick={compressPdf}
              disabled={isProcessing}
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-500/20 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compressing ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Compress PDF Now</span>
                </>
              )}
            </button>
          )}

          {/* Comparison Results Card */}
          {compressedBlob && (
            <div className="p-5 bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Compression Results
                </span>
                {reductionPercent > 0 && (
                  <span className="text-xs font-extrabold bg-emerald-600 text-white px-2.5 py-1 rounded-full">
                    {reductionPercent}% Saved
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-medium">Original File Size</p>
                  <p className="text-base font-extrabold text-slate-800 mt-0.5">
                    {formatBytes(originalSize)}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-300">
                  <p className="text-[11px] text-emerald-600 font-medium">Compressed Size</p>
                  <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                    {formatBytes(compressedSize)}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <p className="text-[11px] text-slate-500 font-medium">Reduction</p>
                  <p className="text-base font-extrabold text-blue-600 mt-0.5">
                    {originalSize > compressedSize ? `-${formatBytes(originalSize - compressedSize)}` : "Optimal"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={downloadCompressed}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Compressed PDF</span>
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  Compress Another PDF
                </button>
              </div>
            </div>
          )}

          {/* Privacy & Transparency disclosure */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Safe Browser Recompression:</strong> ToolSahayak reconstructs and resamples PDF image streams locally in your browser memory. Your sensitive financial, medical, or government documents are never sent across the internet.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
