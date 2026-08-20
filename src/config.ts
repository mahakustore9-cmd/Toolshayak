/**
 * ToolSahayak Global Site Configuration
 */

export const SITE_NAME = "ToolSahayak";
export const SITE_TAGLINE = "Free Online Tools & Simple Guides";
export const SITE_DESCRIPTION = "Fast, 100% free, browser-based online tools for PDF conversion, image compression, QR codes, and everyday calculators. Safe, private, and mobile friendly.";
export const CONTACT_EMAIL = "contact@toolsahayak.com";
export const SITE_URL = "https://toolsahayak.com";
export const CURRENT_YEAR = new Date().getFullYear();

export const SITE_CONFIG = {
  name: "ToolSahayak",
  title: "ToolSahayak - Free Online Tools & Simple Guides",
  tagline: "Free Online Tools & Simple Guides",
  description: "Fast, 100% free, browser-based online tools for PDF conversion, image compression, QR codes, and everyday calculators. Safe, private, and mobile friendly.",
  url: "https://toolsahayak.com",
  author: {
    name: "ToolSahayak Team",
    email: "support@toolsahayak.com",
    twitter: "@ToolSahayak",
  },
  adsense: {
    client: "ca-pub-XXXXXXXXXXXXXXXX", // User can replace with real AdSense ID
    enabled: true,
  },
};

export const CATEGORIES = [
  {
    id: "pdf",
    name: "PDF Tools",
    shortDesc: "Convert, merge & optimize PDF documents right in your browser.",
    icon: "FileSpreadsheet",
    color: "rose",
  },
  {
    id: "image",
    name: "Image Tools",
    shortDesc: "Compress, resize & convert photos with zero quality loss.",
    icon: "Image",
    color: "blue",
  },
  {
    id: "qr",
    name: "QR Tools",
    shortDesc: "Generate customized QR codes or scan instantly with your camera.",
    icon: "QrCode",
    color: "amber",
  },
  {
    id: "calculator",
    name: "Calculators",
    shortDesc: "Instant word counts, exact age calculation & percentage math.",
    icon: "Calculator",
    color: "emerald",
  },
] as const;
