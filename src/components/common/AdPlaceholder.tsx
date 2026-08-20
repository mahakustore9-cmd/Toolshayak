import React from "react";

interface AdPlaceholderProps {
  slot: "header-banner" | "in-content" | "in-article" | "footer-banner" | "sidebar";
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = "" }) => {
  const getSlotDetails = () => {
    switch (slot) {
      case "header-banner":
        return {
          title: "Leaderboard Advertisement Slot (728x90 / Responsive)",
          height: "min-h-[90px]",
          badge: "Top Banner Ad",
        };
      case "in-article":
        return {
          title: "In-Article Native Advertisement Slot",
          height: "min-h-[120px] sm:min-h-[140px]",
          badge: "In-Article Ad",
        };
      case "sidebar":
        return {
          title: "Medium Rectangle Ad Slot (300x250)",
          height: "min-h-[250px]",
          badge: "Sidebar Ad",
        };
      case "footer-banner":
        return {
          title: "Responsive Footer Display Ad Slot",
          height: "min-h-[90px]",
          badge: "Footer Banner Ad",
        };
      case "in-content":
      default:
        return {
          title: "Responsive Content Display Ad Slot",
          height: "min-h-[100px]",
          badge: "Display Ad",
        };
    }
  };

  const details = getSlotDetails();

  return (
    <div 
      className={`w-full max-w-5xl mx-auto my-5 p-4 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center text-slate-400 transition-all select-none ${details.height} ${className}`}
      aria-label="Advertisement Container"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Advertisement Placeholder
      </span>
      <p className="text-[11px] mt-1 text-slate-500 font-medium">
        Managed via Google AdSense • {details.badge}
      </p>
    </div>
  );
};
