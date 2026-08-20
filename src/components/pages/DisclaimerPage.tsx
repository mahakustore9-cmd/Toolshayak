import React from "react";
import { AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import { AdPlaceholder } from "../common/AdPlaceholder";

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Important Legal Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Disclaimer for ToolSahayak
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: February 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 space-y-1">
            <p className="font-bold">General Information & Utility Purpose</p>
            <p>
              All the tools, calculators, guides, and information on this website (<a href="https://toolsahayak.com" className="underline font-semibold">https://toolsahayak.com</a>) are published in good faith and for general educational, mathematical, and utility purposes only.
            </p>
          </div>
        </div>

        {/* 1. No Official Government Affiliation */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. No Official Government Affiliation</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak is an independent, private utility website. <strong>We are NOT affiliated with, authorized by, or endorsed by any government entity</strong>, including the Government of India, Staff Selection Commission (SSC), Union Public Service Commission (UPSC), National Testing Agency (NTA), Income Tax Department, or UIDAI (Aadhaar).
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            References to dimensions (e.g., "PAN Card Photo 200x200 px" or "SSC Admit Card Dimensions") are provided strictly as educational guidelines based on publicly available exam notifications. Always refer to official government portal notices for authoritative instructions.
          </p>
        </section>

        {/* 2. Accuracy of Calculations */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Calculations & Financial Estimates</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Percentage calculators, discount calculators, and age calculators utilize standard arithmetic formulas. While we thoroughly test all algorithms for numerical accuracy, ToolSahayak does not guarantee that calculations are free from human interpretation discrepancies. For official tax, financial, or legal filings, please consult a qualified Chartered Accountant (CA) or certified legal professional.
          </p>
        </section>

        {/* 3. Consent */}
        <section className="space-y-1 pt-2 border-t border-slate-200">
          <h2 className="text-base font-bold text-slate-900">3. Contact Us</h2>
          <p className="text-xs text-slate-600">
            If you have questions regarding this disclaimer, please contact us at: <strong className="text-slate-800">{SITE_CONFIG.author.email}</strong>.
          </p>
        </section>

      </div>

      <AdPlaceholder slot="responsive-banner" />

    </div>
  );
};
