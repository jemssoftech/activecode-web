"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import data from "@/utils/data.json";
import { useState } from "react";
import { socialIcons } from "./SocialIcons";
import Button from "./Button";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Portfolio", href: "/portfolio" },

  { name: "Contact", href: "/contact" },
];

// Newsletter Component
function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setEmail("");
    setIsSubmitting(false);

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent border border-white/10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-white/60 text-sm mb-4">
          Subscribe to our newsletter for the latest updates and insights.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary  font-semibold text-black rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSuccess ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Subscribed!
              </>
            ) : (
              <>
                Subscribe
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

// Animated Link
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
    >
      <span className="w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-4 transition-all duration-300" />
      {children}
    </Link>
  );
}

export default function Footer() {
  const { socialLinks, contactInfo, services, industries } = data;

  return (
    <footer className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Top Wave/Decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container xl:max-w-[1320px] mx-auto px-4 relative">
        {/* CTA Section */}
        <div className="py-16 md:py-20 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                Let&apos;s Build Something
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Amazing Together
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-lg mb-6"
              >
                Transform your digital presence with our expert team
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all group"
                >
                  Start a Project
                  <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Newsletter />
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link
                href="/"
                className="flex-shrink-0 z-10 mb-10 flex items-center"
                aria-label="Go to homepage"
              >
                <Image
                  src="/canva_1.png"
                  alt="Logo"
                  width={180}
                  height={45}
                  className="h-10 md:h-12  w-auto"
                  priority
                />
                <span className="text-[30px]">Cod Active</span>
              </Link>

              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                We are a leading software development company delivering
                innovative digital solutions that transform businesses and drive
                growth.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    <EnvelopeIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm">{contactInfo.email}</span>
                </a>

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    <PhoneIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm">{contactInfo.phone}</span>
                </a>

                <div className="flex items-start gap-3 text-white/60">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm">{contactInfo.address}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition-all"
                    aria-label={link.name}
                  >
                    {socialIcons[link.icon.toLowerCase()]}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.title}>
                    <FooterLink href={`/service/${service?.id}`}>
                      {service.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Industries
              </h4>
              <ul className="space-y-3">
                {industries?.items?.map((industry) => (
                  <li key={industry.id}>
                    <FooterLink href={`/industries/${industry.slug}`}>
                      {industry.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © 2023 Cod Active. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/termsconditons"
                className="text-white/40 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            {/* Made with love */}
            <p className="text-white/40 text-sm flex items-center gap-1">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              in India
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
    </footer>
  );
}
