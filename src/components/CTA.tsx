
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import data from "@/utils/data.json";


export default function CTA() {
      const { socialLinks } = data;
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Top Border with Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container xl:max-w-[1320px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-8"
          />

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let us know your
          </h2>

          {/* Requirements + CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative text-3xl md:text-5xl lg:text-6xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Requirements
              </span>
              {/* Underline */}
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
                  className="text-primary/30"
                />
              </svg>
            </motion.span>

            {/* Animated Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 64, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden sm:block h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
            />

            {/* Button with Glow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button name="Get In Touch!" path="/contact" bg />
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative pt-8"
          >
            {/* Top Border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <p className="text-sm text-[#909dac] uppercase tracking-wider mb-6">
              Follow Us
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />

                    <span className="relative text-white/70 group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>

                    <ArrowRightIcon className="relative w-4 h-4 text-white/50 group-hover:text-primary -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  )
}