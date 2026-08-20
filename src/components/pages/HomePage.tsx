import React, { useState } from "react";
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  QrCode, 
  Calculator,
  ChevronRight,
  TrendingUp,
  FileText,
  Minimize2,
  Scan,
  Maximize2,
  Percent,
  Calendar,
  Layers
} from "lucide-react";
import { ToolCategory, ToolItem } from "../../types";
import { TOOLS } from "../../data/tools";
import { GUIDES } from "../../data/guides";
import { AdPlaceholder } from "../common/AdPlaceholder";
import { TrustSection } from "../common/TrustSection";

interface HomePageProps {
  onSelectTool: (slug: string) => void;
  onSelectCategory: (category: ToolCategory) => void;
  onSelectGuide: (slug: string) => void;
  onNavigateGuides: () => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTool,
  onSelectCategory,
  onSelectGuide,
  onNavigateGuides,
  onOpenSearch,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | ToolCategory>("all");

  const filteredTools = activeTab === "all" 
    ? TOOLS 
    : TOOLS.filter((t) => t.category === activeTab);

  const popularTools = TOOLS.filter((t) => t.isPopular);

  const getToolIconAndTheme = (slug: string) => {
    switch (slug) {
      case "jpg-to-pdf":
        return {
          icon: <FileSpreadsheet className="w-4 h-4" />,
          colorClass: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white",
        };
      case "image-compressor":
        return {
          icon: <ImageIcon className="w-4 h-4" />,
          colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        };
      case "qr-code-generator":
        return {
          icon: <QrCode className="w-4 h-4" />,
          colorClass: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
        };
      case "age-calculator":
        return {
          icon: <Calendar className="w-4 h-4" />,
          colorClass: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
        };
      case "word-counter":
        return {
          icon: <FileText className="w-4 h-4" />,
          colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
        };
      case "pdf-to-jpg":
        return {
          icon: <Layers className="w-4 h-4" />,
          colorClass: "bg-slate-100 text-slate-600 group-hover:bg-slate-600 group-hover:text-white",
        };
      case "image-resizer":
        return {
          icon: <Maximize2 className="w-4 h-4" />,
          colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        };
      case "qr-code-scanner":
        return {
          icon: <Scan className="w-4 h-4" />,
          colorClass: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
        };
      case "percentage-calculator":
        return {
          icon: <Percent className="w-4 h-4" />,
          colorClass: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
        };
      case "pdf-compressor":
        return {
          icon: <Minimize2 className="w-4 h-4" />,
          colorClass: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
        };
      default:
        return {
          icon: <Calculator className="w-4 h-4" />,
          colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        };
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Hero Section */}
      <section className="px-6 sm:px-8 py-8 sm:py-10 bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl shadow-xs">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight tracking-tight">
            Free Online Tools for Everyday Work
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mb-6 leading-relaxed">
            Convert, compress, resize, calculate and create — simple, fast, and free. No account required.
          </p>
          
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-6">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-2xs">
              ✓ Browser-Based
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-2xs">
              ✓ Privacy First
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-2xs">
              ✓ Always Free
            </span>
          </div>

          {/* Quick Search Bar Trigger */}
          <div className="max-w-md mx-auto">
            <div
              onClick={onOpenSearch}
              className="flex items-center justify-between bg-white border border-slate-300 hover:border-blue-500 rounded-full px-4 py-2.5 text-slate-400 text-xs shadow-xs cursor-pointer transition-all hover:shadow-md group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-slate-500 text-xs">Search tools (e.g. JPG to PDF, Age, QR, Resize...)</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-mono border border-slate-200">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Quick Trending Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Trending:</span>
            {popularTools.slice(0, 4).map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.slug)}
                className="bg-white border border-slate-200 hover:border-blue-400 text-slate-600 hover:text-blue-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span>{tool.name}</span>
                <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Top Banner AdSense Slot */}
      <AdPlaceholder slot="responsive-banner" />

      {/* High Density Tools Catalog Grid */}
      <section className="space-y-5">
        
        {/* Category Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              All Free Online Tools
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-speed, 100% client-side utilities with zero server file storage
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({TOOLS.length})
            </button>
            <button
              onClick={() => setActiveTab("pdf")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "pdf"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              PDF Tools
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "image"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "qr"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              QR Codes
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-white text-blue-600 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Calculators
            </button>
          </div>
        </div>

        {/* 5-Column High Density Tools Grid */}
        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5 items-stretch">
          {filteredTools.map((tool) => {
            const { icon, colorClass } = getToolIconAndTheme(tool.slug);

            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.slug)}
                className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 ${colorClass} rounded-lg flex items-center justify-center transition-colors shrink-0`}>
                      {icon}
                    </div>
                    {tool.isPopular && (
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 mb-3 line-clamp-1 leading-snug">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="text-[11px] font-bold text-blue-600 flex items-center justify-between pt-2 border-t border-slate-100 group-hover:text-blue-700">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </main>

      </section>

      {/* Middle In-Article Ad Slot */}
      <AdPlaceholder slot="in-article" />

      {/* 3-Step "How It Works" Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Simple & Transparent
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How ToolSahayak Works
          </h2>
          <p className="text-xs text-slate-500">
            No registration, no software downloads, and zero server file uploads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-xs">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Choose Your Tool</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select any PDF converter, photo compressor, calculator, or QR generator directly in your browser.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-xs">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Processed in Browser</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculations and image rendering occur locally in your browser memory. Your files never travel across the web.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm mx-auto shadow-xs">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Download Instantly</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Download your resized photos, compressed PDFs, or generated QR codes with a single click. No watermark.
            </p>
          </div>

        </div>
      </section>

      {/* Knowledge Base & Guides Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Featured Guides & Tutorials
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simple explanations for common digital exam forms and daily tasks
            </p>
          </div>

          <button
            onClick={onNavigateGuides}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            <span>View All Guides</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {GUIDES.slice(0, 3).map((guide) => (
            <article
              key={guide.id}
              onClick={() => onSelectGuide(guide.slug)}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                    {guide.category}
                  </span>
                  <span className="text-slate-400 font-medium">{guide.readTime}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1 leading-snug">
                  {guide.title}
                </h3>

                <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600 group-hover:text-blue-700">
                <span className="text-[10px] text-slate-400 font-normal">{guide.publishedDate}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust & FAQ Section */}
      <TrustSection />

    </div>
  );
};
