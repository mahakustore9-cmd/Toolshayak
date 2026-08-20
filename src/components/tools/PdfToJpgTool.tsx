import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  Download, 
  RotateCcw, 
  FileSpreadsheet, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Archive,
  Image as ImageIcon,
  ZoomIn
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";

// Set worker source
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  sizeBytes: number;
}

export const PdfToJpgTool: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [renderScale, setRenderScale] = useState<number>(1.5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handlePdfUpload = async (file: File) => {
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg("Please upload a valid PDF document (.pdf).");
      return;
    }

    setPdfFile(file);
    setErrorMsg(null);
    setSuccessMsg(null);
    setPages([]);
    setIsProcessing(true);
    setProgress(5);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      setTotalPages(pdfDoc.numPages);

      const renderedPages: RenderedPage[] = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: renderScale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page into canvas
        await page.render({
          canvasContext: ctx,
          viewport: viewport,
          canvas: canvas,
        } as any).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9);
        });

        renderedPages.push({
          pageNumber: pageNum,
          dataUrl,
          blob,
          width: viewport.width,
          height: viewport.height,
          sizeBytes: blob.size,
        });

        setProgress(Math.round((pageNum / pdfDoc.numPages) * 95));
      }

      setPages(renderedPages);
      setSelectedPage(1);
      setProgress(100);
      setSuccessMsg(`Extracted ${renderedPages.length} page(s) successfully!`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Error rendering PDF. Please ensure the PDF is not password protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePdfUpload(e.dataTransfer.files[0]);
    }
  };

  const downloadSinglePage = (page: RenderedPage) => {
    const link = document.createElement("a");
    link.href = page.dataUrl;
    link.download = `${pdfFile?.name.replace(".pdf", "") || "Document"}_Page_${page.pageNumber}.jpg`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    if (pages.length === 0) return;
    setIsProcessing(true);

    try {
      const zip = new JSZip();
      const baseName = pdfFile?.name.replace(".pdf", "") || "Document";

      pages.forEach((page) => {
        zip.file(`${baseName}_Page_${page.pageNumber}.jpg`, page.blob);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${baseName}_All_Pages_JPG.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate ZIP file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    setPdfFile(null);
    setPages([]);
    setTotalPages(0);
    setSelectedPage(null);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-slate-800">
            Click to Upload PDF Document or Drag & Drop
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Convert all pages of any PDF into high quality JPG images. 100% private.
          </p>
        </div>
      )}

      {/* Progress & Feedback */}
      {isProcessing && (
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-800">
            Rendering PDF Pages ({progress}%)...
          </p>
          <div className="w-full max-w-md bg-slate-200 h-2 rounded-full mx-auto overflow-hidden">
            <div 
              className="bg-rose-600 h-full transition-all duration-200" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-xs text-slate-500">
            Converting document locally using HTML5 canvas rendering...
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

      {/* Rendered PDF Results View */}
      {pages.length > 0 && (
        <div className="space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 truncate max-w-sm">
                📄 {pdfFile?.name}
              </h3>
              <p className="text-xs text-slate-500">
                {totalPages} Page(s) extracted • {formatBytes(pdfFile?.size || 0)} PDF
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={downloadAllAsZip}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                <Archive className="w-4 h-4" />
                <span>Download All Pages (.ZIP)</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Upload Another</span>
              </button>
            </div>
          </div>

          {/* Grid of Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => (
              <div 
                key={p.pageNumber}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col hover:border-rose-300 transition-all shadow-2xs"
              >
                <div className="relative aspect-3/4 bg-slate-200 rounded-lg overflow-hidden border border-slate-300/80 mb-3 flex items-center justify-center">
                  <img
                    src={p.dataUrl}
                    alt={`Page ${p.pageNumber}`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    Page {p.pageNumber}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                  <span>Resolution: {Math.round(p.width)}×{Math.round(p.height)} px</span>
                  <span className="font-semibold">{formatBytes(p.sizeBytes)}</span>
                </div>

                <button
                  onClick={() => downloadSinglePage(p)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-400 text-slate-800 hover:text-rose-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-rose-600" />
                  <span>Download Page {p.pageNumber} JPG</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
