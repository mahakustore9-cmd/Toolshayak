import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  Image as ImageIcon, 
  QrCode, 
  Calculator, 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  Wrench,
  ChevronDown,
  Sparkles,
  Code2
} from "lucide-react";
import { SITE_NAME, SITE_TAGLINE, CATEGORIES } from "../../config";
import { ToolCategory } from "../../types";

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateCategory: (category: ToolCategory) => void;
  onNavigateGuides: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onOpenSearch: () => void;
  onOpenBloggerModal: () => void;
  activeCategory?: ToolCategory;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateCategory,
  onNavigateGuides,
  onNavigateAbout,
  onNavigateContact,
  onOpenSearch,
  onOpenBloggerModal,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Tagline */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer group select-none"
            id="header-logo-container"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {SITE_NAME}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md">
                  Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden lg:block font-medium">
                {SITE_TAGLINE}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium" aria-label="Main Navigation">
            
            <button
              onClick={onNavigateHome}
              className={`transition-colors pb-1 cursor-pointer ${
                !activeCategory
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigateCategory("pdf")}
              className={`transition-colors pb-1 cursor-pointer ${
                activeCategory === "pdf"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              PDF Tools
            </button>

            <button
              onClick={() => onNavigateCategory("image")}
              className={`transition-colors pb-1 cursor-pointer ${
                activeCategory === "image"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Images
            </button>

            <button
              onClick={() => onNavigateCategory("qr")}
              className={`transition-colors pb-1 cursor-pointer ${
                activeCategory === "qr"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              QR Codes
            </button>

            <button
              onClick={() => onNavigateCategory("calculator")}
              className={`transition-colors pb-1 cursor-pointer ${
                activeCategory === "calculator"
                  ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Calculators
            </button>

            <button
              onClick={onNavigateGuides}
              className="text-slate-700 hover:text-blue-600 transition-colors pb-1 cursor-pointer"
            >
              Guides
            </button>

          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger Button */}
            <div 
              onClick={onOpenSearch}
              className="relative cursor-pointer group"
              title="Search Tools (Ctrl+K)"
            >
              <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400 group-hover:text-blue-600 transition-colors pointer-events-none" />
              <input
                type="text"
                readOnly
                placeholder="Search tools..."
                className="pl-8 pr-8 py-1.5 bg-slate-100 hover:bg-slate-200/80 border-none rounded-full text-xs text-slate-700 focus:ring-2 focus:ring-blue-500 w-36 sm:w-48 cursor-pointer transition-all placeholder:text-slate-400 select-none"
              />
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1.5 px-1 bg-white border border-slate-300 rounded text-[9px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </div>

            {/* Blogger Code Exporter Button */}
            <button
              onClick={onOpenBloggerModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 transition-colors cursor-pointer"
              title="Get Blogger Embed Code"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Embed Code</span>
            </button>

            {/* Contact Button */}
            <button
              onClick={onNavigateContact}
              className="hidden lg:inline-block bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Contact
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateCategory("pdf");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-800 font-bold text-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-rose-600" />
              <span>PDF Tools</span>
            </button>

            <button
              onClick={() => {
                onNavigateCategory("image");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs"
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>Image Tools</span>
            </button>

            <button
              onClick={() => {
                onNavigateCategory("qr");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs"
            >
              <QrCode className="w-4 h-4 text-amber-600" />
              <span>QR Tools</span>
            </button>

            <button
              onClick={() => {
                onNavigateCategory("calculator");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Calculators</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-1 text-xs font-semibold text-slate-700">
            <button
              onClick={() => {
                onNavigateGuides();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-100 text-left"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Help Guides & Tutorials</span>
            </button>

            <button
              onClick={() => {
                onNavigateAbout();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-slate-100 text-left"
            >
              About Us
            </button>

            <button
              onClick={() => {
                onNavigateContact();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg hover:bg-slate-100 text-left"
            >
              Contact & Support
            </button>

            <button
              onClick={() => {
                onOpenBloggerModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 font-bold rounded-lg text-left"
            >
              <Code2 className="w-4 h-4 text-emerald-600" />
              <span>Blogger Embed HTML Export</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
