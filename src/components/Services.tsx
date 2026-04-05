"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  ShoppingCartIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import type { ComponentType, SVGProps } from "react";

import heroData from "@/utils/data.json";

/* ----------------------------------
   TYPES
---------------------------------- */

type ServiceSize = "large" | "medium" | "small";

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
  size: ServiceSize;
}

/* ----------------------------------
   ICON MAP
---------------------------------- */

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  ShoppingCartIcon,
  VideoCameraIcon,
};

/* ----------------------------------
   SIZE CLASS MAP (STRICT)
---------------------------------- */
const gradientMap: Record<string, string> = {
  "indigo-purple": "bg-gradient-to-br from-indigo-500 to-purple-600",
  "violet-purple": "bg-gradient-to-br from-violet-500 to-purple-600",
  "teal-cyan": "bg-gradient-to-br from-teal-500 to-cyan-500",
  "emerald-teal": "bg-gradient-to-br from-emerald-500 to-teal-500",
  "amber-orange": "bg-gradient-to-br from-amber-500 to-orange-500",
  "pink-rose": "bg-gradient-to-br from-pink-500 to-rose-500",
  "red-rose": "bg-gradient-to-br from-red-500 to-rose-500",
};
const sizeClasses: Record<ServiceSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-2 lg:col-span-2",
  small: "md:col-span-1",
};

/* ----------------------------------
   COMPONENT
---------------------------------- */

export default function ServicesBento() {
  const services = heroData.services as Service[];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Services
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              What We{" "}
              <span className="bg-gradient-to-r from-secondary to-purple-400 bg-clip-text text-transparent">
                Do Best
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const gridClass = sizeClasses[service.size]; // ✅ SAFE

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={gridClass}
              >
                <Link href={`/service/${service.id}`} className="block h-full">
                  <article
                    className="relative h-full p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1 group flex flex-col"
                    style={{
                      background: `radial-gradient(circle at top left, ${service.color}08 0%, transparent 50%)`,
                    }}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at bottom right, ${service.color}20 0%, transparent 60%)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientMap[service.gradient]} flex items-center justify-center mb-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white">
                      <ArrowUpRightIcon className="w-4 h-4 group-hover:text-black" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
