"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// SVG ICONS
// ============================================
const Icons = {
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
  Eye: ({
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Database: ({
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Share: ({
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  UserCheck: ({
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
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
  AlertCircle: ({
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
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Server: ({
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
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
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
  Cloud: ({
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
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  Key: ({
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
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  Trash: ({
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 8l7-5 7 5" />
      <path d="M5 16l7 5 7-5" />
    </svg>
  ),
  Briefcase: ({
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
  ExternalLink: ({
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

// ============================================
// SECTION COMPONENT
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
    transition={{ delay: index * 0.05 }}
    className="overflow-hidden border rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm"
  >
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 text-left transition-colors lg:p-5 hover:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/20">{icon}</div>
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
          <div className="px-4 pb-5 lg:px-5 lg:pb-6 pt-0">
            <div className="pt-4 border-t border-white/10">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ============================================
// LIST COMPONENT
// ============================================
interface ListProps {
  items: React.ReactNode[];
}

const List: React.FC<ListProps> = ({ items }) => (
  <ul className="space-y-3 mt-3">
    {items.map((item, idx) => (
      <motion.li
        key={idx}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.05 }}
        className="flex items-start gap-3"
      >
        <Icons.CheckCircle
          size={18}
          className="text-primary mt-0.5 flex-shrink-0"
        />
        <span className="text-gray-300 text-sm lg:text-base leading-relaxed">
          {item}
        </span>
      </motion.li>
    ))}
  </ul>
);

// ============================================
// INFO CARD COMPONENT
// ============================================
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "highlight" | "warning";
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  variant = "default",
}) => {
  const variants = {
    default: "bg-white/5 border-white/10",
    highlight: "bg-primary/10 border-primary/30",
    warning: "bg-yellow-500/10 border-yellow-500/30",
  };

  return (
    <div className={`p-4 rounded-xl border ${variants[variant]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium text-white">{title}</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const PrivacyPolicy: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const sections = [
    {
      title: "Introduction & Overview",
      icon: <Icons.FileText size={20} className="text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-white">Jems Softech</span>{" "}
            (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). We are a leading
            IT solutions and software development company committed to
            protecting the privacy and security of our clients, partners, and
            website visitors.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you:
          </p>
          <List
            items={[
              "Visit our website (www.jemssoftech.com)",
              "Engage with our software development services",
              "Use our web applications, mobile apps, or SaaS products",
              "Communicate with us via email, phone, or contact forms",
              "Participate in our consultations, demos, or workshops",
              "Subscribe to our newsletters or marketing communications",
            ]}
          />
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mt-4">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">
                Please read this policy carefully.
              </span>{" "}
              By using our services or website, you consent to the practices
              described in this Privacy Policy. If you do not agree with these
              terms, please do not access our services.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Information We Collect",
      icon: <Icons.Database size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-400">
            We collect various types of information to provide and improve our
            IT services:
          </p>

          {/* Personal Information */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.UserCheck size={18} className="text-primary" />
              Personal Information
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={<Icons.UserCheck size={16} className="text-primary" />}
                title="Identity Information"
                description="Full name, job title, company name, and professional credentials."
              />
              <InfoCard
                icon={<Icons.Mail size={16} className="text-primary" />}
                title="Contact Details"
                description="Email address, phone number, business address, and social media profiles."
              />
              <InfoCard
                icon={<Icons.Briefcase size={16} className="text-primary" />}
                title="Business Information"
                description="Company size, industry, business requirements, and project specifications."
              />
              <InfoCard
                icon={<Icons.Key size={16} className="text-primary" />}
                title="Account Credentials"
                description="Username, password (encrypted), and authentication tokens for client portals."
              />
            </div>
          </div>

          {/* Technical Information */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Server size={18} className="text-primary" />
              Technical Information
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={<Icons.Globe size={16} className="text-primary" />}
                title="Device & Browser Data"
                description="IP address, browser type, operating system, device identifiers, and screen resolution."
              />
              <InfoCard
                icon={<Icons.Code size={16} className="text-primary" />}
                title="Usage Analytics"
                description="Pages visited, time spent, click patterns, referral sources, and navigation paths."
              />
              <InfoCard
                icon={<Icons.Server size={16} className="text-primary" />}
                title="Log Data"
                description="Server logs, error reports, access timestamps, and API request logs."
              />
              <InfoCard
                icon={<Icons.Cloud size={16} className="text-primary" />}
                title="Application Data"
                description="Feature usage, performance metrics, and integration configurations."
              />
            </div>
          </div>

          {/* Project Related Information */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Briefcase size={18} className="text-primary" />
              Project-Related Information
            </h4>
            <List
              items={[
                "Project requirements documents, wireframes, and technical specifications",
                "Source code, databases, and proprietary business logic shared for development",
                "API credentials, third-party service integrations, and authentication keys",
                "Testing data, user acceptance criteria, and feedback documentation",
                "Communication records including emails, meeting notes, and project updates",
                "Financial information for billing including payment details and invoicing data",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: <Icons.Eye size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-400">
            Jems Softech uses collected information for the following purposes:
          </p>

          {/* Service Delivery */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Code size={18} className="text-primary" />
              Service Delivery & Development
            </h4>
            <List
              items={[
                "Develop custom software solutions including web applications, mobile apps, and enterprise systems",
                "Provide UI/UX design services, wireframing, and prototype development",
                "Execute full-stack development using React, Next.js, Node.js, Python, and other technologies",
                "Implement database architecture, API development, and system integrations",
                "Conduct quality assurance testing, bug fixes, and performance optimization",
                "Deploy applications to cloud platforms (AWS, Azure, Google Cloud) and manage hosting",
              ]}
            />
          </div>

          {/* Communication */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Mail size={18} className="text-primary" />
              Communication & Support
            </h4>
            <List
              items={[
                "Respond to inquiries, consultation requests, and project proposals",
                "Provide project updates, milestone notifications, and delivery reports",
                "Send technical documentation, user guides, and training materials",
                "Offer post-launch support, maintenance updates, and troubleshooting assistance",
                "Share relevant industry insights, technology updates, and best practices (with consent)",
              ]}
            />
          </div>

          {/* Business Operations */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Briefcase size={18} className="text-primary" />
              Business Operations
            </h4>
            <List
              items={[
                "Process payments, generate invoices, and manage billing cycles",
                "Create and manage client accounts in our project management systems",
                "Analyze service usage to improve our offerings and user experience",
                "Comply with legal obligations, tax requirements, and industry regulations",
                "Protect against fraud, unauthorized access, and security threats",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Data Security Measures",
      icon: <Icons.Lock size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            At Jems Softech, we implement industry-leading security measures to
            protect your confidential business data, source code, and personal
            information. Security is at the core of everything we do.
          </p>

          {/* Security Highlights */}
          <div className="p-5 rounded-xl bg-primary/10 border border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Icons.Shield size={28} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">
                  Enterprise-Grade Security
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We maintain SOC 2 Type II compliance standards and follow
                  OWASP security guidelines for all software development
                  projects. Your data is protected by multiple layers of
                  security.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Security */}
          <div>
            <h4 className="font-medium text-white mb-3">
              Technical Security Controls
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={<Icons.Lock size={16} className="text-primary" />}
                title="Encryption"
                description="AES-256 encryption for data at rest, TLS 1.3 for data in transit, and encrypted database connections."
                variant="highlight"
              />
              <InfoCard
                icon={<Icons.Key size={16} className="text-primary" />}
                title="Access Control"
                description="Role-based access control (RBAC), multi-factor authentication, and principle of least privilege."
                variant="highlight"
              />
              <InfoCard
                icon={<Icons.Server size={16} className="text-primary" />}
                title="Infrastructure Security"
                description="Secure cloud hosting with AWS/Azure, firewalls, intrusion detection, and DDoS protection."
                variant="highlight"
              />
              <InfoCard
                icon={<Icons.Database size={16} className="text-primary" />}
                title="Backup & Recovery"
                description="Automated daily backups, geo-redundant storage, and disaster recovery procedures."
                variant="highlight"
              />
            </div>
          </div>

          {/* Organizational Security */}
          <div>
            <h4 className="font-medium text-white mb-3">
              Organizational Security Measures
            </h4>
            <List
              items={[
                "Mandatory Non-Disclosure Agreements (NDAs) for all employees and contractors",
                "Regular security training and awareness programs for our development team",
                "Background verification for all team members handling sensitive data",
                "Secure development lifecycle (SDLC) with code reviews and security audits",
                "Dedicated security team monitoring for threats and vulnerabilities 24/7",
                "Incident response procedures and breach notification protocols",
                "Regular penetration testing and vulnerability assessments",
              ]}
            />
          </div>

          {/* Code Security */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Icons.Code size={18} className="text-primary" />
              Source Code Protection
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              We understand the critical value of your intellectual property.
              Our source code protection includes:
            </p>
            <List
              items={[
                "Private Git repositories with access logging and audit trails",
                "Code encryption during transfer and storage",
                "Secure development environments isolated from production",
                "Complete source code handover upon project completion",
                "No retention of proprietary code after project delivery (unless contracted for maintenance)",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Data Sharing & Third Parties",
      icon: <Icons.Share size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          {/* No Sale Notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <Icons.CheckCircle
              size={24}
              className="text-green-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 className="font-medium text-green-300 mb-1">
                We Never Sell Your Data
              </h4>
              <p className="text-green-300/80 text-sm">
                Jems Softech does not sell, rent, or trade your personal
                information or business data to third parties for marketing or
                any other purposes.
              </p>
            </div>
          </div>

          <p className="text-gray-400">
            We may share your information only in the following limited
            circumstances:
          </p>

          {/* Service Providers */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3">
              Trusted Service Providers
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              We work with carefully vetted third-party providers who assist in
              delivering our services:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={<Icons.Cloud size={16} className="text-primary" />}
                title="Cloud Infrastructure"
                description="AWS, Google Cloud, Microsoft Azure for secure hosting and deployment."
              />
              <InfoCard
                icon={<Icons.Database size={16} className="text-primary" />}
                title="Development Tools"
                description="GitHub, GitLab, Jira, and other project management platforms."
              />
              <InfoCard
                icon={<Icons.Mail size={16} className="text-primary" />}
                title="Communication"
                description="Email services, video conferencing, and collaboration tools."
              />
              <InfoCard
                icon={<Icons.Briefcase size={16} className="text-primary" />}
                title="Payment Processing"
                description="Secure payment gateways for invoice and subscription payments."
              />
            </div>
            <p className="text-sm text-gray-400 mt-3">
              All service providers are bound by data processing agreements and
              are required to maintain the confidentiality and security of your
              information.
            </p>
          </div>

          {/* Legal Disclosure */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3">
              Legal & Compliance Disclosure
            </h4>
            <List
              items={[
                "When required by law, court order, or government regulation",
                "To protect our legal rights, safety, or property",
                "To investigate potential violations of our terms of service",
                "In connection with a merger, acquisition, or sale of assets (with notice)",
              ]}
            />
          </div>

          {/* With Consent */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <h4 className="font-medium text-white mb-2">
              With Your Explicit Consent
            </h4>
            <p className="text-sm text-gray-300">
              We may share information when you explicitly authorize us to do
              so, such as when requesting references, case studies, or
              testimonials that include your company information.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Your Rights & Choices",
      icon: <Icons.UserCheck size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-400">
            You have significant rights regarding your personal data. Jems
            Softech is committed to honoring these rights in accordance with
            applicable data protection laws.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Eye size={18} className="text-primary" />
                <span className="font-medium text-white">Right to Access</span>
              </div>
              <p className="text-sm text-gray-400">
                Request a copy of personal data we hold about you and
                information about how it&apos;s processed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.RefreshCw size={18} className="text-primary" />
                <span className="font-medium text-white">
                  Right to Rectification
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Request correction of inaccurate or incomplete personal
                information.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Trash size={18} className="text-primary" />
                <span className="font-medium text-white">Right to Erasure</span>
              </div>
              <p className="text-sm text-gray-400">
                Request deletion of your personal data (subject to legal
                retention requirements).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Lock size={18} className="text-primary" />
                <span className="font-medium text-white">
                  Right to Restrict
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Request limitation of processing under certain circumstances.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.Database size={18} className="text-primary" />
                <span className="font-medium text-white">
                  Right to Portability
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Receive your data in a structured, machine-readable format.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Icons.AlertCircle size={18} className="text-primary" />
                <span className="font-medium text-white">Right to Object</span>
              </div>
              <p className="text-sm text-gray-400">
                Object to processing based on legitimate interests or direct
                marketing.
              </p>
            </div>
          </div>

          {/* How to Exercise */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <h4 className="font-medium text-white mb-2">
              How to Exercise Your Rights
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              To exercise any of these rights, please contact us using the
              information provided in the Contact section. We will respond to
              your request within 30 days.
            </p>
            <p className="text-sm text-gray-400">
              Please note that we may need to verify your identity before
              processing certain requests, and some rights may be limited based
              on legal obligations or legitimate business interests.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Cookies & Tracking Technologies",
      icon: <Icons.Globe size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            Our website uses cookies and similar tracking technologies to
            enhance your browsing experience, analyze website traffic, and
            understand user behavior.
          </p>

          {/* Types of Cookies */}
          <div>
            <h4 className="font-medium text-white mb-3">
              Types of Cookies We Use
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">
                    Essential Cookies
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    Required
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Necessary for website functionality including navigation,
                  secure areas, and basic features.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">
                    Analytics Cookies
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Help us understand how visitors interact with our website
                  using Google Analytics and similar tools.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">
                    Functional Cookies
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Remember your preferences such as language, region, and
                  display settings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">
                    Marketing Cookies
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Used to deliver relevant advertisements and track campaign
                  effectiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <Icons.AlertCircle
                size={20}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-medium text-yellow-300 mb-1">
                  Managing Your Cookie Preferences
                </h4>
                <p className="text-sm text-yellow-300/80">
                  You can manage cookie preferences through your browser
                  settings. Note that disabling certain cookies may affect
                  website functionality. Most browsers allow you to block or
                  delete cookies in their privacy settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Retention",
      icon: <Icons.Clock size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            We retain your information only for as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, unless a longer
            retention period is required by law.
          </p>

          <div className="grid gap-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Project Data</span>
                <span className="text-sm text-primary">
                  Duration of Project + 2 Years
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Source code, documentation, and project files are retained for
                the project duration plus 2 years for support purposes, unless
                you request earlier deletion.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">
                  Client Account Data
                </span>
                <span className="text-sm text-primary">Active + 5 Years</span>
              </div>
              <p className="text-sm text-gray-400">
                Account information is retained while active and for 5 years
                after account closure for legal and tax compliance purposes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">
                  Financial Records
                </span>
                <span className="text-sm text-primary">7 Years</span>
              </div>
              <p className="text-sm text-gray-400">
                Invoices, payment records, and financial documents are retained
                for 7 years as required by tax and accounting regulations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">
                  Website Analytics
                </span>
                <span className="text-sm text-primary">26 Months</span>
              </div>
              <p className="text-sm text-gray-400">
                Anonymous website usage data is retained for 26 months for trend
                analysis and service improvement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">Marketing Data</span>
                <span className="text-sm text-primary">Until Opt-Out</span>
              </div>
              <p className="text-sm text-gray-400">
                Newsletter subscriptions and marketing preferences are retained
                until you unsubscribe or request deletion.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-white">
                Data Deletion Requests:
              </span>{" "}
              You can request deletion of your data at any time. We will process
              deletion requests within 30 days, subject to legal retention
              requirements.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "International Data Transfers",
      icon: <Icons.Globe size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            As a global IT services provider, Jems Softech may transfer your
            data across international borders to deliver our services
            effectively.
          </p>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3">
              Our Data Transfer Safeguards
            </h4>
            <List
              items={[
                "Standard Contractual Clauses (SCCs) approved by relevant data protection authorities",
                "Data Processing Agreements (DPAs) with all international partners and vendors",
                "Encryption of data during international transfers",
                "Assessment of data protection laws in destination countries",
                "Regular audits of international data handling practices",
              ]}
            />
          </div>

          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <Icons.AlertCircle
                size={20}
                className="text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm text-yellow-300/80">
                By using our services, you consent to the transfer of your
                information to countries outside your residence, where data
                protection laws may differ. We ensure appropriate safeguards are
                in place to protect your data regardless of location.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Children's Privacy",
      icon: <Icons.Shield size={20} className="text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Jems Softech&apos;s services are designed for businesses and
            professionals. We do not knowingly collect personal information from
            children under the age of 16.
          </p>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-400">
              If we discover that we have inadvertently collected information
              from a child under 16, we will delete that information
              immediately. If you believe we have collected information from a
              child, please contact us immediately at{" "}
              <a
                href="mailto:privacy@jemssoftech.com"
                className="text-primary hover:underline"
              >
                privacy@jemssoftech.com
              </a>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Policy Updates",
      icon: <Icons.RefreshCw size={20} className="text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technologies, legal requirements, or
            business operations.
          </p>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-3">
              How We Notify You of Changes
            </h4>
            <List
              items={[
                "Update the 'Effective Date' at the top of this policy",
                "Post prominent notice on our website for significant changes",
                "Send email notification to clients for material changes affecting their data",
                "Maintain a changelog of previous policy versions upon request",
              ]}
            />
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <p className="text-sm text-gray-300">
              We encourage you to review this Privacy Policy periodically to
              stay informed about how we protect your information. Your
              continued use of our services after changes constitutes acceptance
              of the updated policy.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Us",
      icon: <Icons.Mail size={20} className="text-primary" />,
      content: (
        <div className="space-y-5">
          <p className="text-gray-300 leading-relaxed">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please don&apos;t hesitate to
            contact us:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icons.Briefcase size={20} className="text-primary" />
                </div>
                <span className="font-semibold text-white">Jems Softech</span>
              </div>
              <p className="text-sm text-gray-400">
                Your Trusted IT Solutions Partner
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icons.Mail size={20} className="text-primary" />
                </div>
                <span className="font-medium text-white">Email</span>
              </div>

              <a
                href="mailto: jemssoftech@gmail.com"
                className="text-sm text-primary hover:underline"
              >
                jemssoftech@gmail.com
              </a>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icons.Phone size={20} className="text-primary" />
                </div>
                <span className="font-medium text-white">Phone</span>
              </div>
              <a
                href="tel:+919409427142"
                className="text-sm text-primary hover:underline"
              >
                +919409427142
              </a>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icons.MapPin size={20} className="text-primary" />
                </div>
                <span className="font-medium text-white">Address</span>
              </div>
              <p className="text-sm text-gray-400">
                110 new iskon plaza,chaprapata road,amroli, State, India
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Icons.Clock size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Response Time</h4>
                <p className="text-sm text-gray-300">
                  We aim to respond to all privacy-related inquiries within{" "}
                  <strong>48 business hours</strong>. For urgent matters, please
                  call our support line directly.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection Officer */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">
              Data Protection Inquiries
            </h4>
            <p className="text-sm text-gray-400">
              For specific data protection concerns or to exercise your rights
              under GDPR or other data protection regulations, please email our
              dedicated privacy team at{" "}
              <a
                href="mailto:jemssoftech@gmail.com"
                className="text-primary hover:underline"
              >
                jemssoftech@gmail.com
              </a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl bg-primary" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 lg:py-16 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary to-primary/50 p-0.5">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden">
                  <Image
                    width={80}
                    height={80}
                    src="/canva_1.png"
                    alt="Jems Softech Logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
              </div>
              <div className="absolute inset-0 -z-10 blur-2xl opacity-50 rounded-full bg-primary" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Privacy <span className="text-primary">Policy</span>
            </motion.h1>

            {/* Company Name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-gray-400 mb-4"
            >
              Jems Softech - IT Solutions & Software Development
            </motion.p>

            {/* Date Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary">
                Last Updated: February 15, 2025
              </span>
            </motion.div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20 flex-shrink-0">
                <Icons.Shield size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-2">
                  Your Privacy is Our Priority
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  At Jems Softech, we understand that your data, source code,
                  and business information are critical assets. This policy
                  outlines our commitment to protecting your privacy and
                  maintaining the highest standards of data security in all our
                  IT services and software development projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
          >
            {[
              {
                icon: <Icons.Lock size={20} />,
                label: "Encrypted",
                value: "AES-256",
              },
              {
                icon: <Icons.Shield size={20} />,
                label: "Compliant",
                value: "GDPR",
              },
              {
                icon: <Icons.Clock size={20} />,
                label: "Response",
                value: "48hrs",
              },
              {
                icon: <Icons.CheckCircle size={20} />,
                label: "NDA",
                value: "Always",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-primary mb-1 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-lg font-semibold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
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
              className="text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30"
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

export default PrivacyPolicy;
