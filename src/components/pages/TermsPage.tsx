import React from "react";
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import { AdPlaceholder } from "../common/AdPlaceholder";

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Terms of Service
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: February 2026 • Effective Worldwide
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <p>
          Welcome to <strong>ToolSahayak</strong>! By accessing and utilizing this website (<a href="https://toolsahayak.com" className="text-emerald-600 underline">https://toolsahayak.com</a>), you agree to comply with and be bound by the following terms and conditions of use.
        </p>

        {/* 1. Free License & Use */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Service License and Acceptable Use</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak provides free, browser-based digital utilities and educational guides for personal, academic, and commercial purposes. You agree not to misuse, scrape, disrupt, or attempt automated high-frequency denial-of-service queries against the site infrastructure.
          </p>
        </section>

        {/* 2. Client-Side Document Responsibility */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Document Conversion & Data Responsibility</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All document and image rendering is performed strictly on your own hardware device (smartphone, computer, or tablet). You maintain 100% ownership and copyright over all files processed through our tools. You are solely responsible for ensuring you have legitimate authorization to convert, resize, or compress files.
          </p>
        </section>

        {/* 3. Disclaimer of Warranties */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Disclaimer of Warranties</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive to maintain 100% mathematical precision across all converters and calculators, ToolSahayak makes no warranties regarding uninterrupted service, portal acceptance of modified photos, or financial outcomes.
          </p>
        </section>

        {/* 4. Third-Party Links & Ads */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Advertising and External Links</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak may contain advertising links served by Google AdSense and informational links to external government or utility websites. We do not endorse or assume liability for third-party websites or services.
          </p>
        </section>

        {/* 5. Contact */}
        <section className="space-y-1 pt-2 border-t border-slate-200">
          <h2 className="text-base font-bold text-slate-900">5. Questions & Legal Inquiries</h2>
          <p className="text-xs text-slate-600">
            For inquiries regarding our terms, please email: <strong className="text-slate-800">{SITE_CONFIG.author.email}</strong>.
          </p>
        </section>

      </div>

      <AdPlaceholder slot="responsive-banner" />

    </div>
  );
};
