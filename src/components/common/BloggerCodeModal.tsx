import React, { useState } from "react";
import { X, Copy, Check, Code2, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE } from "../../config";
import { ToolItem } from "../../types";

interface BloggerCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTool?: ToolItem;
}

export const BloggerCodeModal: React.FC<BloggerCodeModalProps> = ({ 
  isOpen, 
  onClose,
  activeTool 
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"html" | "widget" | "steps">("html");

  if (!isOpen) return null;

  const targetUrl = activeTool 
    ? `https://toolsahayak.com/#/tool/${activeTool.slug}`
    : "https://toolsahayak.com";

  const targetTitle = activeTool
    ? `${activeTool.name} - Free Online Tool`
    : `${SITE_NAME} - Free Online Tools & Guides`;

  const bloggerEmbedCode = `<!-- =======================================================
  ${SITE_NAME.toUpperCase()} - BLOGGER.COM READY RESPONSIVE EMBED
  Tool: ${activeTool ? activeTool.name : "All Tools"}
======================================================= -->
<div id="toolsahayak-embed-root" style="width:100%;min-height:750px;margin:0 auto;padding:0;">
  <iframe 
    src="${targetUrl}" 
    title="${targetTitle}" 
    style="width:100%;height:850px;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06);"
    allow="camera; clipboard-write; clipboard-read"
    loading="lazy">
  </iframe>
</div>`;

  const bloggerWidgetCode = `<!-- ToolSahayak Blogger Sidebar Utility Gadget -->
<div class="ts-sidebar-card" style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;font-family:system-ui,sans-serif;">
  <h4 style="margin:0 0 10px;font-size:15px;color:#0f172a;font-weight:700;">🛠️ Free Online Tools</h4>
  <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2.1;">
    <li>📄 <a href="https://toolsahayak.com/#/tool/jpg-to-pdf" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">JPG to PDF Converter</a></li>
    <li>🗜️ <a href="https://toolsahayak.com/#/tool/pdf-compressor" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">PDF Compressor</a></li>
    <li>🖼️ <a href="https://toolsahayak.com/#/tool/image-compressor" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">Photo Compressor (50KB)</a></li>
    <li>📷 <a href="https://toolsahayak.com/#/tool/image-resizer" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">Passport Photo Resizer</a></li>
    <li>📱 <a href="https://toolsahayak.com/#/tool/qr-code-generator" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">UPI & WiFi QR Generator</a></li>
    <li>🎂 <a href="https://toolsahayak.com/#/tool/age-calculator" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">Exact Age Calculator</a></li>
    <li>📊 <a href="https://toolsahayak.com/#/tool/percentage-calculator" target="_blank" style="color:#059669;text-decoration:none;font-weight:500;">Percentage & Marks Calc</a></li>
  </ul>
</div>`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Blogger.com Embed HTML Code
              </h3>
              <p className="text-xs text-slate-500">
                {activeTool ? `Embed "${activeTool.name}"` : "Deploy full site to Blogger"} • 100% Client-Side
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("html")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "html"
                ? "border-blue-600 text-blue-700 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Full Page Embed Code
          </button>
          <button
            onClick={() => setActiveTab("widget")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "widget"
                ? "border-blue-600 text-blue-700 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Sidebar Gadget Widget
          </button>
          <button
            onClick={() => setActiveTab("steps")}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "steps"
                ? "border-blue-600 text-blue-700 font-bold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Blogger Setup Steps
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === "html" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">
                  Paste into Blogger Post/Page in <strong>&lt;&gt; HTML View</strong>:
                </span>
                <button
                  onClick={() => handleCopy(bloggerEmbedCode)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-blue-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {bloggerEmbedCode}
              </pre>
            </div>
          )}

          {activeTab === "widget" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">
                  Add to <strong>Blogger Layout &gt; Add a Gadget &gt; HTML/JavaScript</strong>:
                </span>
                <button
                  onClick={() => handleCopy(bloggerWidgetCode)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                {bloggerWidgetCode}
              </pre>
            </div>
          )}

          {activeTab === "steps" && (
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-slate-800 space-y-2">
                <p className="font-bold text-sm text-blue-900">How to Publish on Blogger.com:</p>
                <ol className="list-decimal list-inside space-y-1.5 font-medium">
                  <li>Log in to your <strong>Blogger Dashboard</strong> (blogger.com).</li>
                  <li>Click on <strong>Pages</strong> in the left sidebar &gt; <strong>+ New Page</strong>.</li>
                  <li>In the top left of the editor, click the pencil icon and select <strong>&lt;&gt; HTML view</strong>.</li>
                  <li>Paste the <strong>Full Page Embed Code</strong> and set the page title to <em>"{activeTool ? activeTool.name : 'Free Online Tools'}"</em>.</li>
                  <li>Click <strong>Publish</strong>. Your tool is now live on your Blogspot site!</li>
                </ol>
              </div>

              <div className="flex items-center gap-2 text-blue-700 bg-blue-50/60 p-2.5 rounded-lg border border-blue-200 text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
                <span>100% AdSense Safe: Fully compliant with Google AdSense policies and mobile-friendly standards.</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-100 cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
