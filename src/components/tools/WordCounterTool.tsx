import React, { useState } from "react";
import { 
  AlignLeft, 
  Copy, 
  Check, 
  RotateCcw, 
  Clock, 
  Volume2, 
  FileText, 
  Sparkles,
  CaseSensitive
} from "lucide-react";

export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Compute metrics
  const trimmed = text.trim();
  const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s/g, "").length;
  
  const sentencesArray = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
  const sentenceCount = sentencesArray.length;

  const paragraphsArray = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0) : [];
  const paragraphCount = paragraphsArray.length;

  // Reading time (200 wpm)
  const readingTimeMin = Math.ceil(wordCount / 200) || (wordCount > 0 ? 1 : 0);
  // Speaking time (130 wpm)
  const speakingTimeMin = Math.ceil(wordCount / 130) || (wordCount > 0 ? 1 : 0);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Live Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
        
        <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Words</p>
          <p className="text-2xl font-extrabold text-blue-900 mt-1">{wordCount}</p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Characters</p>
          <p className="text-2xl font-extrabold text-emerald-900 mt-1">{charWithSpaces}</p>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">No Spaces</p>
          <p className="text-2xl font-extrabold text-indigo-900 mt-1">{charWithoutSpaces}</p>
        </div>

        <div className="bg-purple-50/70 border border-purple-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Sentences</p>
          <p className="text-2xl font-extrabold text-purple-900 mt-1">{sentenceCount}</p>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Paragraphs</p>
          <p className="text-2xl font-extrabold text-amber-900 mt-1">{paragraphCount}</p>
        </div>

        <div className="bg-rose-50/70 border border-rose-200 p-3.5 rounded-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Read Time</p>
          <p className="text-2xl font-extrabold text-rose-900 mt-1">~{readingTimeMin} m</p>
        </div>

      </div>

      {/* Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Type or Paste Your Text Below
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Speaking time: ~{speakingTimeMin} min
          </span>
        </div>
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your essay, blog post, social media caption, or assignment..."
          className="w-full bg-slate-50/50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all leading-relaxed"
        />
      </div>

      {/* Formatting & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        
        {/* Case Converter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 mr-1 hidden sm:inline">Case:</span>
          <button
            onClick={toUppercase}
            disabled={!text}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-40"
          >
            UPPERCASE
          </button>
          <button
            onClick={toLowercase}
            disabled={!text}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-40"
          >
            lowercase
          </button>
          <button
            onClick={toTitleCase}
            disabled={!text}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-40"
          >
            Title Case
          </button>
        </div>

        {/* Copy & Clear */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-40 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>
          <button
            onClick={handleClear}
            disabled={!text}
            className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

      </div>

    </div>
  );
};
