"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import data from "@/utils/data.json";

// Split for two rows

export default function TechMarquee() {
  const { technologies } = data;
  const row1 = technologies?.slice(0, 10);
  const row2 = technologies?.slice(10, 20);
  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="container xl:max-w-[1320px] mx-auto px-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
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
            Technologies{" "}
            <span className="relative">
              <span className="text-secondary">We Work</span>
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

          <p className="text-[#909dac] mt-4 max-w-xl mx-auto">
            Cutting-edge tools and frameworks we use to build amazing products
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 - Left to Right */}
      <div className="relative mb-6">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row1, ...row1]?.map((tech, index) => (
              <motion.div
                key={`row1-${tech.name}-${index}`}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className={`group flex-shrink-0 w-[180px] h-[180px] md:w-[200px] md:h-[200px] 
                  ${index % 2 === 0 ? "rotate-[3deg]" : "-rotate-[3deg]"}
                  flex flex-col items-center justify-center gap-3
                  bg-white/5 backdrop-blur-sm rounded-2xl 
                  border border-white/10 hover:border-secondary/50 
                  hover:bg-white/10 transition-all duration-300 cursor-pointer`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                <div className="relative">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Tech Name - Shows on Hover */}
                <span className="text-sm font-medium text-white/60 group-hover:text-secondary transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee Row 2 - Right to Left */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row2, ...row2].map((tech, index) => (
              <motion.div
                key={`row2-${tech.name}-${index}`}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className={`group flex-shrink-0 w-[180px] h-[180px] md:w-[200px] md:h-[200px] 
                  ${index % 2 === 0 ? "-rotate-[3deg]" : "rotate-[3deg]"}
                  flex flex-col items-center justify-center gap-3
                  bg-white/5 backdrop-blur-sm rounded-2xl 
                  border border-white/10 hover:border-secondary/50 
                  hover:bg-white/10 transition-all duration-300 cursor-pointer`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                <div className="relative">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={80}
                    height={80}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Tech Name */}
                <span className="text-sm font-medium text-white/60 group-hover:text-secondary transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-dark via-dark/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-dark via-dark/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
