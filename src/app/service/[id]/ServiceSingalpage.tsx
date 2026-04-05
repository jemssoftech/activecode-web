'use client'
import data from "@/utils/data.json"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'
import CTA from '@/components/CTA'
import Button from "@/components/Button"

// ✅ Updated interfaces to match actual JSON structure
interface ServiceFeature {
  title: string
  description: string
}

interface Technology {
  name: string
  icon?: string
}

interface ProcessStep {
  step?: number
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface Service {
  id: number  // ✅ Changed from string to number
  slug: string
  icon: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  color: string
  gradient: string
  size: string
  features: ServiceFeature[]
  technologies: Technology[]  // ✅ Changed from string[] to Technology[]
  process: ProcessStep[]
  benefits: string[]
  faqs: FAQ[]
}

type PortfolioSingleProps = {
  id: string
}

export default function ServiceSingalpage({ id }: PortfolioSingleProps) {
  const { services } = data

  // ✅ Fix: Find service from array by id or slug
  const service = (services as Service[]).find(
    (s) => s.id?.toString() === id || s.slug === id
  )

  if (!service) {
    return (
      <main className="pt-32 pb-20">
        <div className="container xl:max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-white/60 mb-6">
            The service you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/services" className="text-primary hover:underline">
            View all services
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20">
      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">{feature.title}</span>
                    {feature.description && (
                      <p className="text-white/60 text-sm mt-1">{feature.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <h3 className="text-2xl font-bold mb-6">Technologies We Use</h3>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                  <CheckIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button name="Start Your Project" path="/contact" bg />
        </motion.div>
      </div>

      <div className="mt-20">
        <CTA />
      </div>
    </main>
  )
}