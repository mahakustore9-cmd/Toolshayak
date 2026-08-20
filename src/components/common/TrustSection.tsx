import React from "react";
import { ShieldCheck, Zap, Smartphone, Sparkles, Lock, RefreshCw } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Privacy & Trust
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Why Millions Trust ToolSahayak
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Built for speed, convenience, and absolute privacy. No complex steps, no hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: 100% Free */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              100% Free Forever
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No credit cards, no premium subscriptions, and no trial limits. All tools are open and accessible to everyone.
            </p>
          </div>

          {/* Card 2: 100% Browser Privacy */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Zero Server Uploads
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your PDFs, photos, and personal data are processed directly inside your browser memory using HTML5 Canvas & Web Workers.
            </p>
          </div>

          {/* Card 3: Mobile First */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Optimized for Mobile Users
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Works smoothly on Android phones, iPhones, tablets, and desktops with touch-friendly controls and zero lag.
            </p>
          </div>

          {/* Card 4: Lightning Fast */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Instant Processing Speed
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No waiting in cloud conversion queues or server slowdowns. Conversions and calculations happen in milliseconds.
            </p>
          </div>

          {/* Card 5: No Registration */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              No Sign-Up or Login
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Start working immediately without giving away your phone number, email address, or social account passwords.
            </p>
          </div>

          {/* Card 6: Accurate Formulas */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Verified Calculations & Guides
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step-by-step mathematical breakdowns, exam portal dimension presets, and tested guides.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
