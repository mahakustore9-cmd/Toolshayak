import React from "react";
import { 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  ArrowRight, 
  BookOpen,
  Zap,
  Lock,
  RotateCcw
} from "lucide-react";
import { ToolItem } from "../../types";
import { TOOLS } from "../../data/tools";
import { GUIDES } from "../../data/guides";
import { Breadcrumb } from "../common/Breadcrumb";
import { AdPlaceholder } from "../common/AdPlaceholder";

// Import all interactive tool engines
import { JpgToPdfTool } from "../tools/JpgToPdfTool";
import { PdfToJpgTool } from "../tools/PdfToJpgTool";
import { PdfCompressorTool } from "../tools/PdfCompressorTool";
import { ImageCompressorTool } from "../tools/ImageCompressorTool";
import { ImageResizerTool } from "../tools/ImageResizerTool";
import { QrGeneratorTool } from "../tools/QrGeneratorTool";
import { QrScannerTool } from "../tools/QrScannerTool";
import { WordCounterTool } from "../tools/WordCounterTool";
import { PercentageCalculatorTool } from "../tools/PercentageCalculatorTool";
import { AgeCalculatorTool } from "../tools/AgeCalculatorTool";

interface ToolDetailPageProps {
  tool: ToolItem;
  onNavigateHome: () => void;
  onNavigateCategory: (category: string) => void;
  onSelectTool: (slug: string) => void;
  onSelectGuide: (slug: string) => void;
  onOpenBloggerExport: () => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  tool,
  onNavigateHome,
  onNavigateCategory,
  onSelectTool,
  onSelectGuide,
  onOpenBloggerExport,
}) => {
  // Find related tools in same category
  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);
  
  // Find related guides
  const relatedGuides = GUIDES.filter((g) => g.relatedToolSlugs.includes(tool.slug)).slice(0, 2);

  const breadcrumbs = [
    { label: "Home", onClick: onNavigateHome },
    { label: `${tool.category.toUpperCase()} TOOLS`, onClick: () => onNavigateCategory(tool.category) },
    { label: tool.name },
  ];

  // Render proper tool engine based on slug
  const renderToolEngine = () => {
    switch (tool.slug) {
      case "jpg-to-pdf":
        return <JpgToPdfTool />;
      case "pdf-to-jpg":
        return <PdfToJpgTool />;
      case "pdf-compressor":
        return <PdfCompressorTool />;
      case "image-compressor":
        return <ImageCompressorTool />;
      case "image-resizer":
        return <ImageResizerTool />;
      case "qr-code-generator":
        return <QrGeneratorTool />;
      case "qr-code-scanner":
        return <QrScannerTool />;
      case "word-counter":
        return <WordCounterTool />;
      case "percentage-calculator":
        return <PercentageCalculatorTool />;
      case "age-calculator":
        return <AgeCalculatorTool />;
      default:
        return <div className="p-8 text-center text-slate-500">Tool engine loading...</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbs} />

      {/* Top Header Card */}
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              {tool.category} Tool
            </span>
            {tool.isPopular && (
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Popular</span>
              </span>
            )}
          </div>

          <button
            onClick={onOpenBloggerExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-full shadow-2xs transition-colors cursor-pointer"
            title="Export Blogger.com Embed HTML"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Embed in Blogger</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {tool.name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          {tool.longDescription}
        </p>

        {/* Zero-Upload Trust Badge */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-blue-600">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>100% Client-Side Processing</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Zero Server Uploads</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant & Unlimited</span>
          </div>
        </div>
      </div>

      {/* Top Responsive AdSense Unit */}
      <AdPlaceholder slot="responsive-banner" />

      {/* Interactive Tool Main Execution Card */}
      <section id="tool-applet" className="relative">
        {renderToolEngine()}
      </section>

      {/* How to Use Tutorial Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>How to Use {tool.name}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {tool.howToUse.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Middle In-Article Ad Unit */}
      <AdPlaceholder slot="in-article" />

      {/* Key Features & Benefits Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Why Choose ToolSahayak {tool.name}?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {tool.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-slate-700">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3 pt-1">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <h3 className="text-xs font-bold text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Guides & Similar Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Helpful Guides for this Tool</span>
            </div>
            <div className="space-y-2">
              {relatedGuides.map((g) => (
                <div
                  key={g.id}
                  onClick={() => onSelectGuide(g.slug)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                      {g.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">{g.readTime}</p>
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Other Free {tool.category.toUpperCase()} Tools</span>
            </div>
            <div className="space-y-2">
              {relatedTools.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTool(t.slug)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{t.shortDescription}</p>
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
