import React, { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  slot?: "header-banner" | "in-content" | "in-article" | "footer-banner" | "sidebar" | "responsive-banner" | "sidebar-rect" | string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = "" }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = adRef.current;
    if (!target) return;

    // Dynamically inject invoke.js for the Native Banner if not present
    const scriptSrc = "https://pl30937753.effectivecpmnetwork.com/a4bfefbda737d7e73f593dbf2b47cb78/invoke.js";
    
    // Create script tag
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    try {
      target.appendChild(script);
    } catch {
      // safe fallback
    }

    return () => {
      if (target && script.parentNode === target) {
        try {
          target.removeChild(script);
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, []);

  return (
    <div 
      className={`w-full max-w-5xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <div className="w-full text-center">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Advertisement
        </span>
        <div 
          ref={adRef}
          className="w-full min-h-[90px] flex items-center justify-center bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs p-1"
        >
          <div id="container-a4bfefbda737d7e73f593dbf2b47cb78" className="w-full flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

