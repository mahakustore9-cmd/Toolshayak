import React from "react";
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { GUIDES } from "../../data/guides";
import { GuideItem } from "../../types";
import { AdPlaceholder } from "../common/AdPlaceholder";

interface GuidesListPageProps {
  onSelectGuide: (slug: string) => void;
}

export const GuidesListPage: React.FC<GuidesListPageProps> = ({ onSelectGuide }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Knowledge Base & Help Center
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Simple Step-by-Step Guides & Tech Tutorials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Learn how to resize photos for government exam forms, compress PDFs under 200 KB, generate UPI payment QRs, and calculate percentages easily.
        </p>
      </div>

      <AdPlaceholder slot="responsive-banner" />

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {GUIDES.map((guide) => (
          <article
            key={guide.id}
            onClick={() => onSelectGuide(guide.slug)}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                  {guide.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                {guide.title}
              </h2>

              <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                {guide.summary}
              </p>
            </div>

            <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                {guide.publishedDate}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
