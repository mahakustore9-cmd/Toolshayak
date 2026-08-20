export type ToolCategory = "pdf" | "image" | "qr" | "calculator";
export type CategoryId = "pdf" | "image" | "qr" | "calculator" | "pdf-tools" | "image-tools" | "qr-tools" | "calculators" | "guides";

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  isPopular?: boolean;
  howToUse: string[];
  features: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  publishedDate: string;
  relatedToolSlugs: string[];
  sections: GuideSection[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}
