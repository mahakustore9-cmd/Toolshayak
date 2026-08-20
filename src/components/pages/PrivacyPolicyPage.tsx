import React from "react";
import { ShieldCheck, Lock, Cookie, Eye, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import { AdPlaceholder } from "../common/AdPlaceholder";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Legal & Privacy
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Privacy Policy for ToolSahayak
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: February 2026 • Effective Date: February 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <p>
          At <strong>ToolSahayak</strong> (accessible from <a href="https://toolsahayak.com" className="text-emerald-600 underline">https://toolsahayak.com</a>), the privacy of our visitors is of supreme importance to us. This Privacy Policy document outlines the types of personal and technical information collected and recorded by ToolSahayak and how we use it.
        </p>

        {/* 1. Zero Server Upload Architecture */}
        <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>1. Client-Side Browser Processing (Zero-Upload Guarantee)</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Our primary utility tools (including JPG to PDF converter, PDF to JPG extractor, PDF compressor, Image compressor, Image resizer, QR Code generator & scanner, Word counter, Percentage calculators, and Age calculators) operate <strong>100% locally in your client web browser memory</strong> via JavaScript, Canvas, and WebAssembly.
          </p>
          <p className="text-xs text-slate-700 font-semibold">
            Your uploaded photos, documents, government IDs, resumes, certificates, and scan contents are NEVER transmitted, uploaded, copied, or stored on our servers or any third-party backend servers.
          </p>
        </div>

        {/* 2. Log Files */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Standard Log Files</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Like most modern web hosting platforms and content delivery networks (CDNs), ToolSahayak utilizes standard log files. The information inside log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. This information is not linked to any personally identifiable information and is used solely for analyzing trends, administering the site, and tracking aggregate traffic movements.
          </p>
        </section>

        {/* 3. Cookies and Web Beacons */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cookies and Web Beacons</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak may use cookies to store information about visitors' preferences, record user-specific information on which pages the visitor accesses, and customize webpage content based on visitor browser type.
          </p>
        </section>

        {/* 4. Google AdSense & DoubleClick DART Cookie */}
        <section className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h2 className="text-base font-bold text-slate-900">4. Google AdSense & Third-Party Advertising Partners</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based on their visit to www.toolsahayak.com and other sites on the internet.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Visitors may opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        {/* 5. Children's Information */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Protection of Children's Privacy</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ToolSahayak does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that ToolSahayak has in its database the personal information of a child under 13, please contact us immediately and we will use our best efforts to promptly remove such information.
          </p>
        </section>

        {/* 6. Consent */}
        <section className="space-y-2 pt-2 border-t border-slate-200">
          <h2 className="text-base font-bold text-slate-900">6. Consent</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>

        {/* 7. Contact Us */}
        <section className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">7. Contact Information</h2>
          <p className="text-xs text-slate-600">
            If you have any questions or require more information about our Privacy Policy, please email us directly at: <strong className="text-slate-800">{SITE_CONFIG.author.email}</strong>.
          </p>
        </section>

      </div>

      <AdPlaceholder slot="responsive-banner" />

    </div>
  );
};
