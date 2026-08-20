import React from "react";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-1.5 text-xs text-slate-500 overflow-x-auto py-2 whitespace-nowrap"
    >
      {items.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            {!isFirst && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            
            {item.onClick && !isLast ? (
              <button
                onClick={item.onClick}
                className="flex items-center gap-1 hover:text-emerald-700 font-medium transition-colors cursor-pointer truncate max-w-[200px]"
              >
                {isFirst && <Home className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            ) : (
              <span 
                className={`truncate max-w-[240px] ${isLast ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
