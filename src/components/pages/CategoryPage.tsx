import React from "react";
import { 
  FileSpreadsheet, 
  Image as ImageIcon, 
  QrCode, 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";
import { ToolCategory, ToolItem } from "../../types";
import { TOOLS } from "../../data/tools";
import { GUIDES } from "../../data/guides";
import { Breadcrumb } from "../common/Breadcrumb";
import { AdPlaceholder } from "../common/AdPlaceholder";

interface CategoryPageProps {
  category: ToolCategory;
  onNavigateHome: () => void;
  onSelectTool: (slug: string) => void;
  onSelectGuide: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  onNavigateHome,
  onSelectTool,
  onSelectGuide,
}) => {
  const categoryTools = TOOLS.filter((t) => t.category === category);
  const categoryGuides = GUIDES.filter((g) => g.category.toLowerCase().includes(category.toLowerCase()));

  const getCategoryDetails = () => {
    switch (category) {
      case "pdf":
        return {
          title: "Free Online PDF Tools",
          badge: "PDF Utilities",
          desc: "Convert photos to PDF, extract JPGs from PDF pages, and compress documents for online admission & government job applications. 100% private, browser-based.",
          icon: <FileSpreadsheet className="w-8 h-8 text-rose-600" />,
          colorClass: "bg-rose-50 border-rose-200 text-rose-700",
        };
      case "image":
        return {
          title: "Free Online Image Tools",
          badge: "Image Processing",
          desc: "Compress photos under 50 KB or 100 KB, resize images for Indian Passport (3.5x4.5 cm), PAN card, SSC, UPSC, and social media with zero quality loss.",
          icon: <ImageIcon className="w-8 h-8 text-blue-600" />,
          colorClass: "bg-blue-50 border-blue-200 text-blue-700",
        };
      case "qr":
        return {
          title: "Free QR Code Tools",
          badge: "QR Generator & Scanner",
          desc: "Create customized UPI payment QRs, WiFi QRs, and website link codes. Scan QR codes via live camera or upload screenshots with zero storage.",
          icon: <QrCode className="w-8 h-8 text-amber-600" />,
          colorClass: "bg-amber-50 border-amber-200 text-amber-700",
        };
      case "calculator":
      default:
        return {
          title: "Free Online Calculators",
          badge: "Math & Utilities",
          desc: "Calculate exact age with next birthday countdown, calculate percentages, exam marks, discounts, profit/loss, and count words/reading time accurately.",
          icon: <Calculator className="w-8 h-8 text-emerald-600" />,
          colorClass: "bg-emerald-50 border-emerald-200 text-emerald-700",
        };
    }
  };

  const details = getCategoryDetails();

  const breadcrumbs = [
    { label: "Home", onClick: onNavigateHome },
    { label: `${category.toUpperCase()} Tools` },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <Breadcrumb items={breadcrumbs} />

      {/* Hero Category Banner */}
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className={`p-3.5 rounded-xl border ${details.colorClass} shrink-0`}>
          {details.icon}
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {details.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {details.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
            {details.desc}
          </p>
        </div>
      </div>

      <AdPlaceholder slot="responsive-banner" />

      {/* Tools Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Available {category.toUpperCase()} Tools ({categoryTools.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categoryTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.slug)}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group space-y-2.5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                    {tool.category}
                  </span>
                  {tool.isPopular && (
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {tool.name}
                </h3>

                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>100% Client-Side</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Helpful Guides */}
      {categoryGuides.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Helpful Guides & Articles for {details.badge}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {categoryGuides.map((g) => (
              <div
                key={g.id}
                onClick={() => onSelectGuide(g.slug)}
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                    {g.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{g.readTime}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1 leading-snug">
                  {g.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">{g.summary}</p>
                <div className="flex items-center justify-between text-[11px] text-blue-600 font-bold pt-2 border-t border-slate-100 group-hover:text-blue-700">
                  <span className="text-[10px] text-slate-400 font-normal">Step-by-step guide</span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
