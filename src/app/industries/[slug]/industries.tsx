"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import data from "@/utils/data.json";
import { useState } from "react";

// Dynamic icon mapping
import * as HeroIcons from "@heroicons/react/24/outline";

type IndustriesSingleProps = {
  slug: string;
};

// Helper to get icon component
const getIcon = (
  iconName: string,
): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  const Icon = (
    HeroIcons as Record<
      string,
      React.ComponentType<React.SVGProps<SVGSVGElement>>
    >
  )[iconName];
  return Icon || HeroIcons.CubeIcon;
};
const Industries = ({ slug }: IndustriesSingleProps) => {
  const { items: industriesData } = data?.industries;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const industry = industriesData.find((item) => item.slug === slug);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Industry Not Found</h1>
          <p className="text-gray-400 mt-2">
            The industry you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary rounded-full text-white"
          >
            View All Industries
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIcon(industry.icon);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* ==================== */}
      {/* Hero Section */}
      {/* ==================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
            style={{ backgroundColor: industry.color }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: industry.color }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container xl:max-w-[1320px] mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div {...fadeInUp}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <span>/</span>
                <span style={{ color: industry.color }}>{industry.name}</span>
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  backgroundColor: `${industry.color}20`,
                  border: `1px solid ${industry.color}40`,
                }}
              >
                <IconComponent
                  className="w-4 h-4"
                  style={{ color: industry.color }}
                />
                <span
                  style={{ color: industry.color }}
                  className="text-sm font-medium"
                >
                  {industry.name} Solutions
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {industry.tagline}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
                {industry.longDescription || industry.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: industry.color }}
                >
                  Start Your Project
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all">
                  <PlayCircleIcon className="w-5 h-5" />
                  Watch Case Study
                </button>
              </div>
            </motion.div>

            {/* Right - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 gap-4"
            >
              {industry.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="text-4xl md:text-5xl font-bold mb-2"
                        style={{ color: industry.color }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </div>
                      <div className="text-white/60">{stat.label}</div>
                    </div>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: `${industry.color}20` }}
                    >
                      <SparklesIcon
                        className="w-8 h-8"
                        style={{ color: industry.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== */}
      {/* Features Section */}
      {/* ==================== */}
      <section className="py-20 md:py-32 bg-dark-light">
        <div className="container xl:max-w-[1320px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: industry.color }}
            >
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              Our {industry.name} Solutions
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Comprehensive solutions tailored for the{" "}
              {industry.name.toLowerCase()} industry
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industry.features.map((feature, index) => {
              const FeatureIcon =
                typeof feature === "object" && feature.icon
                  ? getIcon(feature.icon)
                  : HeroIcons.CheckCircleIcon;
              const featureTitle =
                typeof feature === "object" ? feature.title : feature;
              const featureDesc =
                typeof feature === "object" ? feature.description : "";

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-6 md:p-8 rounded-2xl bg-dark border border-white/10 hover:border-transparent transition-all duration-300"
                  style={{
                    ["--hover-color" as string]: industry.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = industry.color;
                    e.currentTarget.style.boxShadow = `0 0 40px ${industry.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${industry.color}15` }}
                  >
                    <FeatureIcon
                      className="w-7 h-7"
                      style={{ color: industry.color }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {featureTitle}
                  </h3>
                  {featureDesc && (
                    <p className="text-white/50 leading-relaxed">
                      {featureDesc}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== */}
      {/* Benefits Section */}
      {/* ==================== */}
      <section className="py-20 md:py-32">
        <div className="container xl:max-w-[1320px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: industry.color }}
              >
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                Benefits That Drive Results
              </h2>
              <p className="text-xl text-white/50 mb-10">
                Our {industry.name.toLowerCase()} solutions are designed to
                deliver measurable business outcomes.
              </p>

              <div className="space-y-6">
                {industry.benefits.map((benefit, index) => {
                  const benefitTitle =
                    typeof benefit === "object" ? benefit.title : benefit;
                  const benefitDesc =
                    typeof benefit === "object" ? benefit.description : "";

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: industry.color }}
                      >
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {benefitTitle}
                        </h4>
                        {benefitDesc && (
                          <p className="text-white/50 mt-1">{benefitDesc}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="p-8 rounded-3xl"
                style={{ backgroundColor: `${industry.color}10` }}
              >
                <div className="aspect-video rounded-2xl bg-dark flex items-center justify-center border border-white/10 overflow-hidden">
                  {industry.image ? (
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <IconComponent
                        className="w-20 h-20 mx-auto mb-4 opacity-50"
                        style={{ color: industry.color }}
                      />
                      <p className="text-white/30">{industry.name} Solutions</p>
                    </div>
                  )}
                </div>

                {/* Floating Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-dark text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-sm text-white/50">
                      Client Satisfaction
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-dark text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm text-white/50">
                      Support Available
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-50"
                style={{ backgroundColor: industry.color }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== */}
      {/* Technologies Section */}
      {/* ==================== */}
      {industry.technologies && (
        <section className="py-20 md:py-32 bg-dark-light">
          <div className="container xl:max-w-[1320px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: industry.color }}
              >
                Tech Stack
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                Technologies We Use
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto">
                We leverage cutting-edge technologies to build robust{" "}
                {industry.name.toLowerCase()} solutions
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {industry.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-6 py-3 rounded-full bg-dark border border-white/10 text-white font-medium hover:border-white/30 transition-all cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = industry.color;
                    e.currentTarget.style.color = industry.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  {typeof tech === "object" ? tech.name : tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== */}
      {/* FAQ Section */}
      {/* ==================== */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="py-20 md:py-32 bg-dark-light">
          <div className="container xl:max-w-[1320px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: industry.color }}
              >
                FAQs
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {industry.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-dark border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-white/50 transition-transform flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== */}
      {/* Related Industries */}
      {/* ==================== */}
      {industry.relatedIndustries && industry.relatedIndustries.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="container xl:max-w-[1320px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Explore Related Industries
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industry.relatedIndustries.map((relatedSlug) => {
                const related = industriesData.find(
                  (i) => i.slug === relatedSlug,
                );
                if (!related) return null;

                const RelatedIcon = getIcon(related.icon);

                return (
                  <Link
                    key={related.slug}
                    href={`/industries/${related.slug}`}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all group"
                  >
                    <RelatedIcon
                      className="w-10 h-10 mx-auto mb-3 transition-transform group-hover:scale-110"
                      style={{ color: related.color }}
                    />
                    <div className="text-white font-medium">{related.name}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================== */}
      {/* CTA Section */}
      {/* ==================== */}
      <section
        className="py-20 md:py-32 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${industry.color} 0%, ${industry.color}CC 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container xl:max-w-[1320px] mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your {industry.name} Business?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let&apos;s discuss how we can help you build innovative solutions
              and achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full text-dark font-semibold hover:shadow-xl transition-all"
              >
                Get Free Consultation
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                No Hidden Costs
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                24/7 Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
