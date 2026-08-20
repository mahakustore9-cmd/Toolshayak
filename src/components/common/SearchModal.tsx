import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  X, 
  ArrowRight, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  QrCode, 
  Calculator, 
  BookOpen, 
  Sparkles 
} from "lucide-react";
import { TOOLS } from "../../data/tools";
import { GUIDES } from "../../data/guides";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
  onSelectGuide: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectTool,
  onSelectGuide
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingTools = TOOLS.filter((tool) => {
    if (!normalizedQuery) return true;
    return (
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.shortDescription.toLowerCase().includes(normalizedQuery) ||
      tool.category.toLowerCase().includes(normalizedQuery) ||
      tool.metaTitle.toLowerCase().includes(normalizedQuery)
    );
  }).slice(0, 6);

  const matchingGuides = GUIDES.filter((guide) => {
    if (!normalizedQuery) return true;
    return (
      guide.title.toLowerCase().includes(normalizedQuery) ||
      guide.summary.toLowerCase().includes(normalizedQuery) ||
      guide.category.toLowerCase().includes(normalizedQuery) ||
      guide.slug.toLowerCase().includes(normalizedQuery)
    );
  }).slice(0, 6);

  const getToolIcon = (cat: string) => {
    switch (cat) {
      case "pdf":
        return <FileSpreadsheet className="w-4 h-4 text-rose-500" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case "qr":
        return <QrCode className="w-4 h-4 text-amber-500" />;
      default:
        return <Calculator className="w-4 h-4 text-emerald-500" />;
    }
  };

  const handleToolClick = (slug: string) => {
    onSelectTool(slug);
    onClose();
  };

  const handleGuideClick = (slug: string) => {
    onSelectGuide(slug);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools & guides (e.g. 'JPG to PDF', 'Compress 50 KB', 'Age')..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-300 rounded-md shadow-2xs cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          
          {/* Tools Section */}
          {matchingTools.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Online Tools ({matchingTools.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {matchingTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleToolClick(tool.slug)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center shrink-0 shadow-2xs">
                        {getToolIcon(tool.category)}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 truncate">
                            {tool.name}
                          </p>
                          {tool.isPopular && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Section */}
          {matchingGuides.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Articles & Guides ({matchingGuides.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {matchingGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => handleGuideClick(guide.slug)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-200 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 truncate">
                          {guide.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {guide.summary}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 ml-2">
                      {guide.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingTools.length === 0 && matchingGuides.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm font-semibold">No tools or guides found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for 'PDF', 'Compress', 'Passport', or 'QR'</p>
            </div>
          )}

        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Search over all free browser-based tools and tutorials without leaving the page
        </div>
      </div>
    </div>
  );
};
