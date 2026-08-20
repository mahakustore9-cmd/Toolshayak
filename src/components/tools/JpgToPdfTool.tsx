import React, { useState, useRef } from "react";
import { 
  Upload, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  RotateCcw, 
  FileText, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Settings,
  Layers
} from "lucide-react";
import jsPDF from "jspdf";

interface UploadedImage {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  width: number;
  height: number;
}

export const JpgToPdfTool: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState<"none" | "small" | "large">("small");
  const [pdfFileName, setPdfFileName] = useState("ToolSahayak_Document.pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/bmp"];
    const newItems: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      if (!validTypes.includes(file.type.toLowerCase())) {
        setErrorMsg("Please select valid JPG, PNG, or WebP images.");
        return;
      }

      const id = Math.random().toString(36).substring(2, 9);
      const previewUrl = URL.createObjectURL(file);
      
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id,
            file,
            name: file.name,
            size: file.size,
            previewUrl,
            width: img.naturalWidth || 800,
            height: img.naturalHeight || 600,
          }
        ]);
      };
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    setImages((prev) => {
      const copy = [...prev];
      const targetIndex = direction === "left" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      setErrorMsg("Please upload at least one image to convert.");
      return;
    }

    setIsGenerating(true);
    setProgress(10);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Determine jsPDF orientation and format
      const isPortrait = orientation === "portrait";
      let pdf: jsPDF;

      if (pageSize === "fit") {
        // First page size matches first image
        const firstImg = images[0];
        pdf = new jsPDF({
          orientation: firstImg.width >= firstImg.height ? "landscape" : "portrait",
          unit: "pt",
          format: [firstImg.width, firstImg.height],
        });
      } else {
        pdf = new jsPDF({
          orientation: isPortrait ? "portrait" : "landscape",
          unit: "mm",
          format: pageSize === "letter" ? "letter" : "a4",
        });
      }

      // Convert images sequentially
      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        if (i > 0) {
          if (pageSize === "fit") {
            pdf.addPage([item.width, item.height], item.width >= item.height ? "landscape" : "portrait");
          } else {
            pdf.addPage(pageSize === "letter" ? "letter" : "a4", isPortrait ? "portrait" : "landscape");
          }
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate margin
        let marginVal = 0;
        if (pageSize !== "fit") {
          if (margin === "small") marginVal = 10;
          else if (margin === "large") marginVal = 20;
        }

        const usableWidth = pageWidth - marginVal * 2;
        const usableHeight = pageHeight - marginVal * 2;

        // Maintain aspect ratio
        const imgRatio = item.width / item.height;
        let renderWidth = usableWidth;
        let renderHeight = usableWidth / imgRatio;

        if (renderHeight > usableHeight) {
          renderHeight = usableHeight;
          renderWidth = usableHeight * imgRatio;
        }

        const xPos = marginVal + (usableWidth - renderWidth) / 2;
        const yPos = marginVal + (usableHeight - renderHeight) / 2;

        // Add image to PDF using base64 or Image element
        const imgElement = new Image();
        imgElement.src = item.previewUrl;
        await new Promise((resolve) => {
          if (imgElement.complete) resolve(true);
          else imgElement.onload = () => resolve(true);
        });

        // Use canvas to ensure format compatibility
        const canvas = document.createElement("canvas");
        canvas.width = item.width;
        canvas.height = item.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(imgElement, 0, 0);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
          pdf.addImage(dataUrl, "JPEG", xPos, yPos, renderWidth, renderHeight);
        }

        setProgress(Math.round(((i + 1) / images.length) * 90));
      }

      setProgress(100);
      const safeName = pdfFileName.endsWith(".pdf") ? pdfFileName : `${pdfFileName}.pdf`;
      pdf.save(safeName);
      setSuccessMsg(`PDF successfully generated with ${images.length} page(s)!`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to generate PDF. Please ensure images are valid.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] group"
        id="jpg-upload-dropzone"
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
          <Upload className="w-7 h-7" />
        </div>
        <p className="text-base font-bold text-slate-800">
          Click to Select Images or Drag & Drop Photos
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Supports JPG, PNG, and WebP. Select multiple photos to merge into a single PDF.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full">
          <span>🔒 100% Private • Processed in your browser</span>
        </div>
      </div>

      {/* Error / Success Notifications */}
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

      {/* Uploaded Images List & Sequence */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">
                Uploaded Photos ({images.length} Pages)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More</span>
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Grid of reorderable images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img, idx) => (
              <div 
                key={img.id}
                className="relative bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-col group hover:border-blue-400 transition-all shadow-2xs"
              >
                <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center mb-2">
                  <img 
                    src={img.previewUrl} 
                    alt={img.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-1 left-1 bg-slate-900/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Page {idx + 1}
                  </div>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow-xs opacity-90 hover:opacity-100"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] font-medium text-slate-700 truncate px-0.5" title={img.name}>
                  {img.name}
                </p>
                <p className="text-[10px] text-slate-600 px-0.5">
                  {formatFileSize(img.size)}
                </p>

                {/* Move Left / Right Buttons */}
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200">
                  <button
                    onClick={() => moveImage(idx, "left")}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                    title="Move Left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-600">#{idx + 1}</span>
                  <button
                    onClick={() => moveImage(idx, "right")}
                    disabled={idx === images.length - 1}
                    className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                    title="Move Right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PDF Configuration Settings */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Settings className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                PDF Page Settings
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Page Size */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="a4">A4 (Standard 210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="fit">Fit to Original Image Ratio</option>
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Page Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  disabled={pageSize === "fit"}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 font-medium disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="portrait">Portrait (Vertical)</option>
                  <option value="landscape">Landscape (Horizontal)</option>
                </select>
              </div>

              {/* Margins */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Page Margin Padding
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(e.target.value as any)}
                  disabled={pageSize === "fit"}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 font-medium disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="small">Small Margin (10mm - Recommended)</option>
                  <option value="none">No Margin (Full Bleed)</option>
                  <option value="large">Large Margin (20mm)</option>
                </select>
              </div>
            </div>

            {/* Custom PDF File Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 text-xs">
                Output File Name
              </label>
              <input
                type="text"
                value={pdfFileName}
                onChange={(e) => setPdfFileName(e.target.value)}
                className="w-full max-w-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Generate & Download CTA */}
          <div className="pt-2">
            <button
              onClick={generatePdf}
              disabled={isGenerating}
              className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-60 cursor-pointer"
              id="generate-pdf-btn"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Converting ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate & Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
