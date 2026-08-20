import React from "react";
import { ShieldCheck, Zap, Heart, Users, Globe, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import { AdPlaceholder } from "../common/AdPlaceholder";

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          About ToolSahayak
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Empowering Everyday Users with Fast, 100% Free & Private Online Utilities
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ToolSahayak was built with a simple mission: to make everyday digital tasks—like converting PDFs, compressing job application photos, generating payment QRs, and calculating percentages—effortless and secure for millions of users across India and worldwide.
        </p>
      </div>

      <AdPlaceholder slot="responsive-banner" className="my-6" />

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Zero Server Uploads</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All our image, PDF, and QR utilities execute locally right inside your web browser. Your private IDs, certificates, and salary slips never touch external cloud servers.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">100% Free & No Sign-Up</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            No credit cards, no hidden subscriptions, and no compulsory phone logins. All tools are completely free to use whenever you need them.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Mobile-First for India</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Optimized for 4G/5G mobile browsers, low memory consumption, and standard formats needed for SSC, UPSC, PAN card, and state government job portals.
          </p>
        </div>

      </div>

      {/* Story & Commitment */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Our Story & Vision</h2>
        
        <p className="text-sm text-slate-600 leading-relaxed">
          Every day, students, job seekers, small business owners, and professionals struggle with rigid upload requirements on online portals—such as keeping passport photos strictly under 50 KB, resizing signature images to 400×200 pixels, or combining admit cards into a single PDF.
        </p>

        <p className="text-sm text-slate-600 leading-relaxed">
          Existing commercial utility sites are often cluttered with invasive popups, enforce paywalls after 2 conversions, or upload sensitive documents to unverified foreign servers. We designed <strong>ToolSahayak</strong> to offer a cleaner, safer, and entirely free alternative.
        </p>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-extrabold text-emerald-600">10+</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">High-Speed Tools</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-blue-600">0 KB</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Data Stored on Server</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-purple-600">100%</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Free Forever</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-amber-600">24/7</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Instant Availability</p>
          </div>
        </div>
      </div>

    </div>
  );
};
