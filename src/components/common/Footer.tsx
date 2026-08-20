import React from "react";
import { 
  Wrench, 
  ShieldCheck, 
  Heart, 
  Mail, 
  Globe, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  QrCode, 
  Calculator, 
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import { SITE_NAME, SITE_TAGLINE, CURRENT_YEAR, CONTACT_EMAIL } from "../../config";
import { ToolCategory } from "../../types";

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: ToolCategory) => void;
  onSelectTool: (slug: string) => void;
  onNavigateGuides: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onSelectTool,
  onNavigateGuides,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms,
  onNavigateDisclaimer,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={onNavigateHome}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {SITE_NAME}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Free, lightning-fast, client-side online tools for PDF conversion, photo compression, QR codes, and everyday arithmetic. Built specifically for students, applicants, and digital workers.
            </p>

            <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Server Upload Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Your private photos, Aadhaar/PAN cards, and resumes are processed purely inside your device's browser memory.
              </p>
            </div>
          </div>

          {/* PDF & Image Tools */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              PDF & Image Tools
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectTool("jpg-to-pdf")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  JPG to PDF Converter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("pdf-to-jpg")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  PDF to JPG Extractor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("pdf-compressor")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  PDF Compressor (KB/MB)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("image-compressor")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Photo Compressor (Under 50KB)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("image-resizer")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Passport & PAN Resizer
                </button>
              </li>
            </ul>
          </div>

          {/* QR & Calculators */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              QR & Calculators
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectTool("qr-code-generator")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  UPI & WiFi QR Generator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("qr-code-scanner")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  QR Scanner (Camera/Upload)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("age-calculator")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Exact Age Calculator (DOB)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("percentage-calculator")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Percentage & Marks Calc
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTool("word-counter")}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Word & Character Counter
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Information & Legal
            </p>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={onNavigateGuides}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Help Guides & Tutorials
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateAbout}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateContact}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigatePrivacy}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateTerms}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateDisclaimer}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {CURRENT_YEAR} <strong className="text-slate-200">{SITE_NAME}</strong> • Free Online Tools & Simple Guides
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-slate-400">All systems operational</span>
            </div>
            <span>•</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-blue-400 transition-colors">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
