"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// SVG ICONS (Same as before)
// ============================================
const Icons = {
  FileText: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  CheckCircle: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  ChevronDown: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronUp: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  ArrowLeft: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Mail: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Phone: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  MessageCircle: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Scale: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
  Layers: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  User: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  CreditCard: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  XOctagon: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  Shield: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  RefreshCw: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  AtSign: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
  ),
  AlertTriangle: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Clock: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Code: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Lock: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Globe: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  MapPin: ({
    size = 24,
    className = "",
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

// ============================================
// SECTION COMPONENT (Same as before)
// ============================================
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  children,
  index,
  isOpen,
  onToggle,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="overflow-hidden border rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm"
  >
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 text-left transition-colors lg:p-5 hover:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[var(--active-bgPrimary)]/20">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-white lg:text-lg">
          {title}
        </h2>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-gray-400"
      >
        <Icons.ChevronDown size={20} />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 lg:px-5 lg:pb-5 pt-0">
            <div className="pt-3 border-t border-white/10">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ============================================
// MAIN COMPONENT
// ============================================
const TermsOfService: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // ============================================
  // EXPANDED CONTENT FOR IT COMPANY
  // ============================================
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: (
        <Icons.CheckCircle
          size={20}
          className="text-[var(--active-bgPrimary)]"
        />
      ),
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 leading-relaxed">
            By accessing or using the services provided by{" "}
            <span className="font-semibold text-white">Cod Active</span>{" "}
            (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;), you (&quot;Client,&quot; &quot;you,&quot; or
            &quot;your&quot;) agree to be bound by these Terms of Service
            (&quot;Terms&quot;). These Terms constitute a legally binding
            agreement between you and Cod Active.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If you are entering into these Terms on behalf of a company or other
            legal entity, you represent that you have the authority to bind such
            entity to these Terms. If you do not have such authority, or if you
            do not agree with these Terms, you must not accept these Terms and
            may not use our services.
          </p>
          <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">Important:</span> By
              signing a project proposal, contract, or making any payment, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Service.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Services Provided",
      icon: (
        <Icons.Layers size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Cod Active</span> is a
            professional IT solutions and software development company providing
            comprehensive technology services to businesses worldwide.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium text-white">
              Our Services Include:
            </p>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>
                  Custom Software Development (Web, Mobile, Desktop
                  Applications)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>
                  Mobile App Development (iOS, Android, React Native, Flutter)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>
                  Full-Stack Web Development (React, Next.js, Node.js, PHP,
                  Laravel)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>UI/UX Design, Wireframing & Prototype Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>
                  E-commerce Solutions (Shopify, WooCommerce, Custom Platforms)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>API Development & Third-Party Integrations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>Cloud Services & DevOps (AWS, Azure, Google Cloud)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>IT Consulting, Digital Marketing & SEO Services</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0"
                />
                <span>Maintenance, Support & Software Updates</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            The specific scope of services for each project will be outlined in
            a separate Project Proposal or Statement of Work (SOW) agreed upon
            by both parties before project commencement.
          </p>
        </div>
      ),
    },
    {
      title: "Project Engagement & Process",
      icon: <Icons.Code size={20} className="text-[var(--active-bgPrimary)]" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Our project engagement follows a structured process to ensure
            clarity and successful delivery:
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--active-bgPrimary)]/20 flex items-center justify-center text-xs font-bold text-[var(--active-bgPrimary)]">
                  1
                </span>
                <span className="font-medium text-white">
                  Initial Consultation
                </span>
              </div>
              <p className="text-sm text-gray-400 ml-8">
                Free consultation to understand your requirements, business
                goals, and technical needs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--active-bgPrimary)]/20 flex items-center justify-center text-xs font-bold text-[var(--active-bgPrimary)]">
                  2
                </span>
                <span className="font-medium text-white">
                  Proposal & Agreement
                </span>
              </div>
              <p className="text-sm text-gray-400 ml-8">
                Detailed proposal with scope, timeline, cost breakdown, and
                milestones. Project begins upon acceptance and advance payment.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--active-bgPrimary)]/20 flex items-center justify-center text-xs font-bold text-[var(--active-bgPrimary)]">
                  3
                </span>
                <span className="font-medium text-white">
                  Development & Updates
                </span>
              </div>
              <p className="text-sm text-gray-400 ml-8">
                Agile development with regular progress updates, demos, and
                milestone reviews.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[var(--active-bgPrimary)]/20 flex items-center justify-center text-xs font-bold text-[var(--active-bgPrimary)]">
                  4
                </span>
                <span className="font-medium text-white">
                  Testing & Delivery
                </span>
              </div>
              <p className="text-sm text-gray-400 ml-8">
                Comprehensive QA testing, client UAT, final revisions, and
                project handover with documentation.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Client Responsibilities",
      icon: <Icons.User size={20} className="text-[var(--active-bgPrimary)]" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            To ensure successful project delivery, clients are expected to
            fulfill the following responsibilities:
          </p>

          <div className="grid gap-2">
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Provide accurate and complete project requirements,
                specifications, and business objectives
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Supply all necessary content, images, branding assets, and
                access credentials in a timely manner
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Designate a single point of contact with decision-making
                authority for the project
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Review deliverables and provide feedback within agreed
                timeframes (typically 3-5 business days)
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Attend scheduled meetings, demos, and milestone reviews as
                required
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Make timely payments as per the agreed payment schedule
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Ensure all provided content does not infringe on third-party
                intellectual property rights
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-2">
              <Icons.AlertTriangle
                size={18}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-yellow-300/80">
                <span className="font-medium">Important:</span> Delays in
                providing required information, feedback, or approvals may
                result in extended project timelines. Jems Softech is not
                responsible for delays caused by client-side factors.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Payments & Invoicing",
      icon: (
        <Icons.CreditCard
          size={20}
          className="text-[var(--active-bgPrimary)]"
        />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Services are billed according to the pricing and payment terms
            specified in the agreed proposal or contract.
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-2">
              Standard Payment Structure:
            </p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>• Project Initiation (Advance)</span>
                <span className="text-[var(--active-bgPrimary)]">30-50%</span>
              </div>
              <div className="flex justify-between">
                <span>• Mid-Project Milestone</span>
                <span className="text-[var(--active-bgPrimary)]">25-35%</span>
              </div>
              <div className="flex justify-between">
                <span>• Final Delivery</span>
                <span className="text-[var(--active-bgPrimary)]">25-35%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Payment Terms:</p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Invoices are due within 7-15 days of issuance unless otherwise
                  agreed
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Accepted payment methods: Bank Transfer, UPI, PayPal,
                  Credit/Debit Cards
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Late payments may incur a fee of 2% per month on outstanding
                  amounts
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Work may be paused if payments are overdue by more than 15
                  days
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  All prices are exclusive of applicable taxes (GST/VAT) unless
                  stated otherwise
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-300/80">
              For ongoing maintenance or retainer services, monthly invoices
              will be issued at the beginning of each billing cycle.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Project Timeline & Delivery",
      icon: (
        <Icons.Clock size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Project timelines are estimated based on the agreed scope and are
            outlined in the project proposal.
          </p>

          <div className="grid gap-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Timeline begins after receipt of advance payment and required
                project materials
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Milestones and deadlines will be communicated via project
                management tools or email
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Minor delays due to technical complexities will be communicated
                proactively
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Rush delivery may be available at additional cost (15-25%
                premium)
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-2">
              <Icons.AlertTriangle
                size={18}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-yellow-300/80">
                Scope changes, additional features, or delays in client feedback
                will impact the original timeline. Any timeline extensions will
                be communicated and documented.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Revisions & Change Requests",
      icon: (
        <Icons.RefreshCw size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We include reasonable revisions within the project scope to ensure
            your satisfaction.
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-2">
              Included Revisions:
            </p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  UI/UX Design: 2-3 rounds of revisions per design phase
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Development: Bug fixes and adjustments within original scope
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Final Review: One round of minor revisions after UAT
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30">
            <p className="text-sm font-medium text-white mb-2">
              Change Requests (Outside Original Scope):
            </p>
            <p className="text-sm text-gray-400">
              Requests for new features, significant design changes, or scope
              modifications will be evaluated and quoted separately. A Change
              Request Form will be provided with updated timeline and cost
              estimates for your approval.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Intellectual Property Rights",
      icon: (
        <Icons.FileText size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Intellectual property ownership is an important aspect of our
            working relationship.
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-300 mb-2">
                Client Ownership (Upon Full Payment):
              </p>
              <div className="grid gap-2 text-sm text-green-300/80">
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span>
                    Complete source code developed specifically for your project
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span>
                    Custom design files, graphics, and UI elements created for
                    you
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span>
                    Database structures and content specific to your application
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <span>All documentation and technical specifications</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">
                Jems Softech Retains:
              </p>
              <div className="grid gap-2 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                  />
                  <span>
                    Right to use work samples in portfolio and marketing
                    (anonymized if requested)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                  />
                  <span>
                    Ownership of pre-existing code libraries, frameworks, and
                    tools
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Icons.CheckCircle
                    size={14}
                    className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                  />
                  <span>
                    General knowledge, skills, and methodologies developed
                    during the project
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            IP transfer occurs only after full payment is received. Until then,
            all work remains the property of Jems Softech.
          </p>
        </div>
      ),
    },
    {
      title: "Confidentiality & NDA",
      icon: <Icons.Lock size={20} className="text-[var(--active-bgPrimary)]" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We understand the sensitive nature of your business information and
            maintain strict confidentiality.
          </p>

          <div className="grid gap-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                All project details, business strategies, and proprietary
                information are kept confidential
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Our team members sign internal NDAs before accessing client
                projects
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Source code and credentials are stored securely with restricted
                access
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                We can sign a formal NDA upon client request at no additional
                cost
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Confidentiality obligations survive the termination of our
                business relationship
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">Need a formal NDA?</span>{" "}
              Contact us and we&apos;ll provide a mutual Non-Disclosure
              Agreement for your review and signature.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Warranty & Support",
      icon: (
        <Icons.Shield size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We stand behind our work and provide warranty support after project
            delivery.
          </p>

          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
            <p className="text-sm font-medium text-green-300 mb-2">
              Included Warranty (30-90 Days):
            </p>
            <div className="grid gap-2 text-sm text-green-300/80">
              <div className="flex items-start gap-2">
                <Icons.CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>
                  Bug fixes for issues in delivered code within the original
                  scope
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Minor adjustments to match approved specifications</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Technical support via email during business hours</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-2">
              Not Covered Under Warranty:
            </p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Icons.XOctagon
                  size={14}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <span>Issues caused by client modifications to the code</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.XOctagon
                  size={14}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Problems due to third-party plugins, APIs, or hosting issues
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.XOctagon
                  size={14}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <span>New feature requests or scope additions</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.XOctagon
                  size={14}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <span>
                  Issues arising from outdated browsers or unsupported
                  environments
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Extended maintenance and support packages are available at
            additional cost.
          </p>
        </div>
      ),
    },
    {
      title: "Limitation of Liability",
      icon: (
        <Icons.AlertTriangle
          size={20}
          className="text-[var(--active-bgPrimary)]"
        />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Jems Softech</span>{" "}
            strives to deliver high-quality, error-free solutions. However,
            certain limitations apply:
          </p>

          <div className="grid gap-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                Our total liability shall not exceed the amount paid by the
                client for the specific project
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                We are not liable for indirect, incidental, or consequential
                damages (lost profits, data loss, business interruption)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                We are not responsible for issues caused by third-party
                services, APIs, hosting providers, or plugins
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                Client is responsible for maintaining backups and security of
                their production environment
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-300/80">
              We recommend clients maintain appropriate insurance coverage and
              implement regular backup procedures for their business-critical
              applications.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Termination & Cancellation",
      icon: (
        <Icons.XOctagon size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Either party may terminate the project under the following
            conditions:
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-2">
              Client-Initiated Cancellation:
            </p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>Written notice required via email</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>
                  Payment due for all work completed up to the cancellation date
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>
                  Advance payments are non-refundable once work has commenced
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>
                  Partial deliverables will be provided upon settlement of dues
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-2">
              Jems Softech May Terminate If:
            </p>
            <div className="grid gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>Payments are overdue by more than 30 days</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>
                  Client is unresponsive for more than 30 consecutive days
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>Client requests illegal, unethical, or harmful work</span>
              </div>
              <div className="flex items-start gap-2">
                <Icons.CheckCircle
                  size={14}
                  className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
                />
                <span>Breach of these Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Governing Law & Disputes",
      icon: (
        <Icons.Scale size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            the laws of India.
          </p>

          <div className="grid gap-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                Any disputes shall first be attempted to be resolved through
                good-faith negotiation
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                If negotiation fails, disputes shall be resolved through
                arbitration
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-[var(--active-bgPrimary)] flex-shrink-0 mt-0.5"
              />
              <span>
                The courts of [Your City], India shall have exclusive
                jurisdiction
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30">
            <p className="text-sm text-gray-300">
              We believe in maintaining positive client relationships and will
              always attempt to resolve any concerns amicably before pursuing
              formal dispute resolution.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Changes to Terms",
      icon: (
        <Icons.RefreshCw size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time.
            Updates will be posted on our website with the revised effective
            date.
          </p>
          <div className="grid gap-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Material changes will be communicated via email to active
                clients
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Continued use of our services after changes constitutes
                acceptance
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.CheckCircle
                size={14}
                className="text-green-400 flex-shrink-0 mt-0.5"
              />
              <span>
                Existing projects will be governed by the Terms in effect at
                project start
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: (
        <Icons.AtSign size={20} className="text-[var(--active-bgPrimary)]" />
      ),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            For any questions, concerns, or inquiries regarding these Terms of
            Service, please contact us:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Mail
                  size={16}
                  className="text-[var(--active-bgPrimary)]"
                />
                <span className="text-sm font-medium text-white">Email</span>
              </div>
              <a
                href="mailto:jemssoftech@gmail.com"
                className="text-sm text-[var(--active-bgPrimary)] hover:underline"
              >
                jemssoftech@gmail.com
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Phone
                  size={16}
                  className="text-[var(--active-bgPrimary)]"
                />
                <span className="text-sm font-medium text-white">Phone</span>
              </div>
              <a
                href="tel:+919409427142"
                className="text-sm text-[var(--active-bgPrimary)] hover:underline"
              >
                +919409427142
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Globe
                  size={16}
                  className="text-[var(--active-bgPrimary)]"
                />
                <span className="text-sm font-medium text-white">Website</span>
              </div>
              <a
                href="https://www.codactive.com"
                className="text-sm text-[var(--active-bgPrimary)] hover:underline"
              >
                www.codactive.com
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.MapPin
                  size={16}
                  className="text-[var(--active-bgPrimary)]"
                />
                <span className="text-sm font-medium text-white">Address</span>
              </div>
              <p className="text-sm text-gray-400">
                110 new iskon plaza,chaprapata road,amroli, State, India
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">Business Hours:</span>{" "}
              Monday to Saturday, 9:00 AM - 6:00 PM IST. We typically respond
              within 24-48 business hours.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-gray-900 to-[#0a0a0a]">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "bg-gray-900" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "bg-gray-900" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--active-bgPrimary)] to-[var(--active-bgPrimary)]/50 p-0.5">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                  <Image
                    width={80}
                    height={80}
                    src="/logo.png"
                    alt="Cod Active Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              {/* Glow */}
              <div
                className="absolute inset-0 -z-10 blur-2xl opacity-50 rounded-full"
                style={{ background: "var(--active-bgPrimary)" }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
            >
              Terms of{" "}
              <span className="text-[var(--active-bgPrimary)]">Service</span>
            </motion.h1>

            {/* Company Name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-gray-400 mb-3"
            >
              Cod Active - IT Solutions & Software Development
            </motion.p>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--active-bgPrimary)]/10 border border-[var(--active-bgPrimary)]/30"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--active-bgPrimary)] animate-pulse" />
              <span className="text-sm text-[var(--active-bgPrimary)]">
                Effective Date: February 15, 2025
              </span>
            </motion.div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[var(--active-bgPrimary)]/20 to-[var(--active-bgPrimary)]/5 border border-[var(--active-bgPrimary)]/30"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[var(--active-bgPrimary)]/20">
                <Icons.Scale
                  size={24}
                  className="text-[var(--active-bgPrimary)]"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  Agreement Overview
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  These Terms of Service govern your engagement with Cod
                  Active for IT services, software development, and related
                  projects. By using our services, signing a proposal, or making
                  a payment, you agree to be bound by these terms and
                  conditions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Expand/Collapse All */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end mb-4"
          >
            <button
              onClick={() => {
                if (openSections.length === sections.length) {
                  setOpenSections([]);
                } else {
                  setOpenSections(sections.map((_, i) => i));
                }
              }}
              className="text-sm text-[var(--active-bgPrimary)] hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              {openSections.length === sections.length ? (
                <>
                  <Icons.ChevronUp size={16} />
                  Collapse All
                </>
              ) : (
                <>
                  <Icons.ChevronDown size={16} />
                  Expand All
                </>
              )}
            </button>
          </motion.div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <Section
                key={index}
                title={`${index + 1}. ${section.title}`}
                icon={section.icon}
                index={index}
                isOpen={openSections.includes(index)}
                onToggle={() => toggleSection(index)}
              >
                {section.content}
              </Section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
