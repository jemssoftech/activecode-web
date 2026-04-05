"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  HeartIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  CloudIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  BuildingStorefrontIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

import data from "@/utils/data.json";
import { useRouter } from "next/navigation";

// ✅ FIXED: Icon mapping with proper SVG props support
const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  CurrencyDollarIcon,
  HeartIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  CloudIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  BuildingStorefrontIcon,
  EllipsisHorizontalIcon,
};

export default function Industries() {
  const router = useRouter();
  const { sectionHeader, items } = data.industries;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-secondary to-secondary/50 rounded-full mx-auto mb-6"
          />

          <h3 className="text-3xl md:text-5xl font-bold">
            {sectionHeader.title}{" "}
            <span className="relative">
              <span className="text-secondary">{sectionHeader.highlight}</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 7 Q 50 0, 100 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-secondary/30"
                />
              </svg>
            </span>
          </h3>

          {sectionHeader.description && (
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              {sectionHeader.description}
            </p>
          )}
        </motion.div>

        {/* Industries Grid */}
        <div className="flex flex-wrap justify-center">
          {items.map((industry: any, index: number) => {
            const IconComponent = iconMap[industry.icon];

            return (
              <button
                onClick={() => router.push(`/industries/${industry.slug}`)}
                key={industry.id}
                className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full mb-4 px-3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-secondary/30 overflow-hidden h-full transition-all duration-300 cursor-pointer"
                >
                  {/* Hover Background Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${
                        industry.color || "#8b5cf6"
                      }15 0%, transparent 50%)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="relative mb-4">
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundColor: `${industry.color || "#8b5cf6"}30`,
                      }}
                    />

                    <div
                      className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${industry.color || "#8b5cf6"}15`,
                      }}
                    >
                      {IconComponent && (
                        <IconComponent
                          className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            color: industry.color || "#8b5cf6",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h5 className="relative text-lg lg:text-xl font-medium transition-colors duration-300 group-hover:text-secondary">
                    {industry.name}
                  </h5>

                  {/* Description */}
                  {industry.description && (
                    <p className="text-sm text-white/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {industry.description}
                    </p>
                  )}

                  {/* Bottom Line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300"
                    style={{
                      background: `linear-gradient(to right, transparent, ${
                        industry.color || "#8b5cf6"
                      }, transparent)`,
                    }}
                  />
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
