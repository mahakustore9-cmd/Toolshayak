import React from "react";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  HelpCircle, 
  Wrench,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { GuideItem } from "../../types";
import { GUIDES } from "../../data/guides";
import { TOOLS } from "../../data/tools";
import { Breadcrumb } from "../common/Breadcrumb";
import { AdPlaceholder } from "../common/AdPlaceholder";

interface GuideDetailPageProps {
  guide: GuideItem;
  onNavigateHome: () => void;
  onNavigateGuides: () => void;
  onSelectTool: (slug: string) => void;
  onSelectGuide: (slug: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({
  guide,
  onNavigateHome,
  onNavigateGuides,
  onSelectTool,
  onSelectGuide,
}) => {
  // Find related tools
  const relatedTools = TOOLS.filter((t) => guide.relatedToolSlugs.includes(t.slug));
  const otherGuides = GUIDES.filter((g) => g.id !== guide.id).slice(0, 3);

  const breadcrumbs = [
    { label: "Home", onClick: onNavigateHome },
    { label: "Guides", onClick: onNavigateGuides },
    { label: guide.title },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbs} />

      {/* Main Article Card */}
      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Article Header */}
        <header className="space-y-3 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              {guide.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{guide.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            {guide.summary}
          </p>
        </header>

        {/* Top Ad Unit */}
        <AdPlaceholder slot="responsive-banner" />

        {/* Step-by-Step Sections */}
        <div className="space-y-6 text-slate-800">
          {guide.sections.map((sec, idx) => (
            <section key={idx} className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                  {idx + 1}
                </span>
                <span>{sec.heading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Related Direct Tools Callout Box */}
        {relatedTools.length > 0 && (
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Recommended Free Tools for this Guide:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTools.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onSelectTool(t.slug)}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{t.shortDescription}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Middle Ad Unit */}
        <AdPlaceholder slot="in-article" />

        {/* FAQs */}
        {guide.faqs && guide.faqs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-2.5">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    Q: {faq.question}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Read Next Section */}
      {otherGuides.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Read Next Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherGuides.map((og) => (
              <div
                key={og.id}
                onClick={() => onSelectGuide(og.slug)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-1.5 group"
              >
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  {og.category}
                </span>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                  {og.title}
                </h3>
                <span className="text-[11px] text-slate-400 block">{og.readTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
