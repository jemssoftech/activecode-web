"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import data from "@/utils/data.json";

// Types
type SizeType = "large" | "tall" | "wide" | "medium";

interface PortfolioItem {
  id: number;
  slug?: string;
  title: string;
  subtitle?: string;
  description: string;
  fullDescription?: string[];
  image: string;
  gallery?: string[];
  tags: string[];
  year?: string;
  client?: string;
  duration?: string;
  services?: string[];
  technologies?: string[];
  challenge?: string;
  solution?: string;
  results?: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  category?: string;
}

// ✅ Better size pattern for balanced grid
function getAutoSize(filteredIndex: number, totalItems: number): SizeType {
  if (totalItems === 1) return "large";
  if (totalItems === 2) return "large";
  if (totalItems === 3) {
    const pattern: SizeType[] = ["large", "medium", "medium"];
    return pattern[filteredIndex];
  }

  // Balanced pattern for 3-column grid
  const pattern: SizeType[] = [
    "large", // 0 - 2 cols
    "tall", // 1
    "medium", // 2 - 2 rows
    "tall", // 3
    "medium", // 4 - 2 cols
    "medium", // 5
    "medium", // 6
    "tall", // 7 - 2 rows
    "large", // 8
  ];

  return pattern[filteredIndex % pattern.length];
}

// ✅ Infer category from tags
function inferCategory(item: { tags?: string[]; services?: string[] }): string {
  const allTags = [...(item.tags || []), ...(item.services || [])].map((t) =>
    t.toLowerCase(),
  );

  if (
    allTags.some(
      (t) =>
        t.includes("mobile") ||
        t.includes("app") ||
        t.includes("ios") ||
        t.includes("android"),
    )
  ) {
    return "mobile";
  }
  if (
    allTags.some(
      (t) =>
        t.includes("brand") || t.includes("logo") || t.includes("identity"),
    )
  ) {
    return "branding";
  }
  if (
    allTags.some(
      (t) => t.includes("design") || t.includes("ui") || t.includes("ux"),
    )
  ) {
    return "design";
  }
  return "web";
}

// ✅ Process portfolio items
const portfolioItems: PortfolioItem[] = (data.portfolio as any[]).map(
  (item) => ({
    ...item,
    category: item.category || inferCategory(item),
  }),
);

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web" },
  { id: "app", label: "App" },
];

// Custom hook for device detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// ✅ Improved Portfolio Card Component
const PortfolioCard = ({
  item,
  filteredIndex,
  totalItems,
  isMobile,
}: {
  item: PortfolioItem;
  filteredIndex: number;
  totalItems: number;
  isMobile: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const size = isMobile ? "medium" : getAutoSize(filteredIndex, totalItems);

  // ✅ Grid classes - Mobile first
  const sizeClasses: Record<SizeType, string> = {
    large: "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2",
    tall: "col-span-1 row-span-1 sm:row-span-2",
    wide: "col-span-1 sm:col-span-2 row-span-1",
    medium: "col-span-1 row-span-1",
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: Math.min(filteredIndex * 0.05, 0.2),
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${sizeClasses[size]}`}
    >
      <Link href={`/portfolio/${item.id}`} className="block h-full">
        <div
          className="relative h-full min-h-[280px] sm:min-h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer bg-[#111] border border-white/5 hover:border-primary/30 transition-colors duration-300"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onTouchStart={() => isMobile && setIsHovered(true)}
          onTouchEnd={() =>
            isMobile && setTimeout(() => setIsHovered(false), 2000)
          }
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={filteredIndex < 4}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ${
              isHovered && !prefersReducedMotion
                ? "scale-105 brightness-110"
                : "scale-100"
            }`}
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered
                ? "bg-gradient-to-t from-black via-black/70 to-black/30"
                : "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            }`}
          />

          {/* Content Container */}
          <div className="absolute inset-0 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              {/* Number Badge */}
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-primary">
                  {String(filteredIndex + 1).padStart(2, "0")}
                </span>

                {/* Year Badge - Show on hover or always on mobile */}
                {item.year && (
                  <span
                    className={`px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-white/70 transition-all duration-300 ${
                      isHovered || isMobile
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    {item.year}
                  </span>
                )}
              </div>

              {/* Arrow Icon */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-x-0 rotate-0"
                    : "opacity-0 translate-x-2 -rotate-45"
                }`}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="space-y-2.5 sm:space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {item.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > (isMobile ? 2 : 3) && (
                  <span className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-primary/20 rounded-full text-primary">
                    +{item.tags.length - (isMobile ? 2 : 3)}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className={`font-bold text-white leading-snug line-clamp-2 ${
                  size === "large" || size === "wide"
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-base sm:text-lg md:text-xl"
                }`}
              >
                {item.title}
              </h3>

              {/* Description - Show on large/wide cards or on hover */}
              {item.description &&
                (size === "large" || size === "wide" || size === "tall") && (
                  <p
                    className={`text-white/50 text-xs sm:text-sm line-clamp-2 transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    {item.description}
                  </p>
                )}

              {/* View Project Link - Show on hover */}
              <div
                className={`flex items-center gap-2 pt-1 transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <span className="text-xs sm:text-sm text-primary font-medium">
                  View Project
                </span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div
            className={`absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-300 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              boxShadow: "inset 0 0 60px rgba(139, 92, 246, 0.1)",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// ✅ Empty State Component
function EmptyState({ category }: { category: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full py-16 sm:py-20 text-center"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-white/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
        No projects found
      </h3>
      <p className="text-white/50 text-sm sm:text-base max-w-sm mx-auto">
        No projects in the &ldquo;{category}&rdquo; category yet. Check back
        soon!
      </p>
    </motion.div>
  );
}

// ✅ CTA Section
function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative mt-16 sm:mt-20 md:mt-24"
    >
      <div className="relative p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 border border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
        </div>

        <div className="relative text-center max-w-lg mx-auto">
          {/* Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">🚀</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
            Have a project in mind?
          </h2>
          <p className="text-white/50 mb-6 sm:mb-8 text-sm sm:text-base">
            Let&apos;s collaborate and create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-95">
                Start a Project
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full text-sm sm:text-base border border-white/10 transition-all duration-300 active:scale-95">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ✅ Main Portfolio Component
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const isMobile = useIsMobile();

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activeCategoryLabel =
    categories.find((c) => c.id === activeFilter)?.label || activeFilter;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:60px_60px]" />
        <div className="absolute -top-40 -right-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-primary text-sm">✦</span>
              <span className="text-primary/80 text-xs sm:text-sm font-medium">
                Our Creative Works
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            >
              <span className="text-white">Portfolio </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Showcase
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
            >
              Discover our collection of projects that push the boundaries of
              design and technology.
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6 sm:mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
              {categories.map((category) => {
                const count =
                  category.id === "all"
                    ? portfolioItems.length
                    : portfolioItems.filter((i) => i.category === category.id)
                        .length;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`relative px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeFilter === category.id
                        ? "text-black bg-primary shadow-lg shadow-primary/25"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {category.id === "all" ? "All" : category.label}
                    <span
                      className={`ml-1.5 text-[10px] sm:text-xs ${
                        activeFilter === category.id
                          ? "text-black/80"
                          : "text-white/30"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-4 sm:mb-6"
          >
            <p className="text-white/40 text-xs sm:text-sm">
              Showing{" "}
              <span className="text-white/60 font-medium">
                {filteredItems.length}
              </span>{" "}
              project{filteredItems.length !== 1 ? "s" : ""}
              {activeFilter !== "all" && (
                <span className="text-primary"> in {activeCategoryLabel}</span>
              )}
            </p>

            {/* View Toggle - Optional */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/30 text-xs">View:</span>
              <button className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* ✅ Bento Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,1fr)] gap-4 sm:gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    filteredIndex={index}
                    totalItems={filteredItems.length}
                    isMobile={isMobile}
                  />
                ))
              ) : (
                <EmptyState category={activeCategoryLabel} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <CTASection />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
