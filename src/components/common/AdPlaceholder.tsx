import React, { useRef, useEffect } from "react";

interface AdPlaceholderProps {
  slot?: "header-banner" | "in-content" | "in-article" | "footer-banner" | "sidebar" | "responsive-banner" | "sidebar-rect" | string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = "" }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        background: transparent; 
        overflow: hidden; 
        width: 100%;
        min-height: 80px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      #container-a4bfefbda737d7e73f593dbf2b47cb78 {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div id="container-a4bfefbda737d7e73f593dbf2b47cb78"></div>
    <script async="async" data-cfasync="false" src="https://pl30937753.effectivecpmnetwork.com/a4bfefbda737d7e73f593dbf2b47cb78/invoke.js"></script>
  </body>
</html>`;

    doc.open();
    doc.write(htmlContent);
    doc.close();
  }, []);

  return (
    <div 
      className={`w-full max-w-5xl mx-auto my-3 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <div className="w-full text-center">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Advertisement
        </span>
        <div className="w-full min-h-[90px] sm:min-h-[110px] flex items-center justify-center bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
          <iframe
            ref={iframeRef}
            title="Advertisement Banner"
            className="w-full min-h-[90px] sm:min-h-[110px] border-0"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

