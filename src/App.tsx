import React, { useState, useEffect } from "react";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { SearchModal } from "./components/common/SearchModal";
import { BloggerCodeModal } from "./components/common/BloggerCodeModal";

// Pages
import { HomePage } from "./components/pages/HomePage";
import { CategoryPage } from "./components/pages/CategoryPage";
import { ToolDetailPage } from "./components/pages/ToolDetailPage";
import { GuidesListPage } from "./components/pages/GuidesListPage";
import { GuideDetailPage } from "./components/pages/GuideDetailPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PrivacyPolicyPage } from "./components/pages/PrivacyPolicyPage";
import { TermsPage } from "./components/pages/TermsPage";
import { DisclaimerPage } from "./components/pages/DisclaimerPage";

import { ToolCategory, ToolItem } from "./types";
import { TOOLS } from "./data/tools";
import { GUIDES } from "./data/guides";
import { SITE_CONFIG } from "./config";

type PageType = 
  | "home"
  | "category"
  | "tool"
  | "guides"
  | "guide-detail"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("pdf");
  const [selectedToolSlug, setSelectedToolSlug] = useState<string>("jpg-to-pdf");
  const [selectedGuideSlug, setSelectedGuideSlug] = useState<string>("how-to-resize-photo-for-exam-forms");
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState(false);

  // Hash router sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash || hash === "/" || hash === "home") {
        setCurrentPage("home");
      } else if (hash.startsWith("category/")) {
        const cat = hash.replace("category/", "") as ToolCategory;
        setSelectedCategory(cat);
        setCurrentPage("category");
      } else if (hash.startsWith("tool/")) {
        const slug = hash.replace("tool/", "");
        const match = TOOLS.find((t) => t.slug === slug);
        if (match) {
          setSelectedToolSlug(slug);
          setCurrentPage("tool");
        }
      } else if (hash === "guides") {
        setCurrentPage("guides");
      } else if (hash.startsWith("guide/")) {
        const slug = hash.replace("guide/", "");
        const match = GUIDES.find((g) => g.slug === slug);
        if (match) {
          setSelectedGuideSlug(slug);
          setCurrentPage("guide-detail");
        }
      } else if (hash === "about") {
        setCurrentPage("about");
      } else if (hash === "contact") {
        setCurrentPage("contact");
      } else if (hash === "privacy") {
        setCurrentPage("privacy");
      } else if (hash === "terms") {
        setCurrentPage("terms");
      } else if (hash === "disclaimer") {
        setCurrentPage("disclaimer");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update document title for SEO
  useEffect(() => {
    let title = SITE_CONFIG.title;
    if (currentPage === "home") {
      title = `${SITE_CONFIG.name} - Free Online Tools & Simple Guides`;
    } else if (currentPage === "category") {
      title = `${selectedCategory.toUpperCase()} Tools Online Free - ${SITE_CONFIG.name}`;
    } else if (currentPage === "tool") {
      const tool = TOOLS.find((t) => t.slug === selectedToolSlug);
      if (tool) title = `${tool.metaTitle} | ${SITE_CONFIG.name}`;
    } else if (currentPage === "guides") {
      title = `Help Guides & Step-by-Step Tutorials | ${SITE_CONFIG.name}`;
    } else if (currentPage === "guide-detail") {
      const guide = GUIDES.find((g) => g.slug === selectedGuideSlug);
      if (guide) title = `${guide.title} | ${SITE_CONFIG.name}`;
    } else if (currentPage === "about") {
      title = `About Us | ${SITE_CONFIG.name}`;
    } else if (currentPage === "contact") {
      title = `Contact & Support | ${SITE_CONFIG.name}`;
    } else if (currentPage === "privacy") {
      title = `Privacy Policy | ${SITE_CONFIG.name}`;
    } else if (currentPage === "terms") {
      title = `Terms & Conditions | ${SITE_CONFIG.name}`;
    } else if (currentPage === "disclaimer") {
      title = `Disclaimer | ${SITE_CONFIG.name}`;
    }
    document.title = title;
  }, [currentPage, selectedCategory, selectedToolSlug, selectedGuideSlug]);

  // Global keydown for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation handlers
  const navigateTo = (page: PageType, hashVal?: string) => {
    setCurrentPage(page);
    window.location.hash = hashVal || page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTool = (slug: string) => {
    setSelectedToolSlug(slug);
    navigateTo("tool", `tool/${slug}`);
  };

  const handleSelectCategory = (category: ToolCategory) => {
    setSelectedCategory(category);
    navigateTo("category", `category/${category}`);
  };

  const handleSelectGuide = (slug: string) => {
    setSelectedGuideSlug(slug);
    navigateTo("guide-detail", `guide/${slug}`);
  };

  const currentToolObj = TOOLS.find((t) => t.slug === selectedToolSlug) || TOOLS[0];
  const currentGuideObj = GUIDES.find((g) => g.slug === selectedGuideSlug) || GUIDES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Main Navigation Header */}
      <Header
        onNavigateHome={() => navigateTo("home", "")}
        onNavigateCategory={handleSelectCategory}
        onNavigateGuides={() => navigateTo("guides", "guides")}
        onNavigateAbout={() => navigateTo("about", "about")}
        onNavigateContact={() => navigateTo("contact", "contact")}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        activeCategory={currentPage === "category" ? selectedCategory : undefined}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {currentPage === "home" && (
          <HomePage
            onSelectTool={handleSelectTool}
            onSelectCategory={handleSelectCategory}
            onSelectGuide={handleSelectGuide}
            onNavigateGuides={() => navigateTo("guides", "guides")}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentPage === "category" && (
          <CategoryPage
            category={selectedCategory}
            onNavigateHome={() => navigateTo("home", "")}
            onSelectTool={handleSelectTool}
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentPage === "tool" && (
          <ToolDetailPage
            tool={currentToolObj}
            onNavigateHome={() => navigateTo("home", "")}
            onNavigateCategory={handleSelectCategory}
            onSelectTool={handleSelectTool}
            onSelectGuide={handleSelectGuide}
            onOpenBloggerExport={() => setIsBloggerModalOpen(true)}
          />
        )}

        {currentPage === "guides" && (
          <GuidesListPage
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentPage === "guide-detail" && (
          <GuideDetailPage
            guide={currentGuideObj}
            onNavigateHome={() => navigateTo("home", "")}
            onNavigateGuides={() => navigateTo("guides", "guides")}
            onSelectTool={handleSelectTool}
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentPage === "about" && <AboutPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "privacy" && <PrivacyPolicyPage />}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "disclaimer" && <DisclaimerPage />}

      </main>

      {/* Global Footer */}
      <Footer
        onNavigateHome={() => navigateTo("home", "")}
        onNavigateCategory={handleSelectCategory}
        onSelectTool={handleSelectTool}
        onNavigateGuides={() => navigateTo("guides", "guides")}
        onNavigateAbout={() => navigateTo("about", "about")}
        onNavigateContact={() => navigateTo("contact", "contact")}
        onNavigatePrivacy={() => navigateTo("privacy", "privacy")}
        onNavigateTerms={() => navigateTo("terms", "terms")}
        onNavigateDisclaimer={() => navigateTo("disclaimer", "disclaimer")}
      />

      {/* Instant Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectTool}
        onSelectGuide={handleSelectGuide}
      />

      {/* Blogger Deployment Code Exporter Modal */}
      <BloggerCodeModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
        activeTool={currentPage === "tool" ? currentToolObj : undefined}
      />

    </div>
  );
}
