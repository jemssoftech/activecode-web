
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  RocketLaunchIcon,
  EyeIcon,
  HeartIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HandRaisedIcon,
  SparklesIcon,
  TrophyIcon,
  GlobeAltIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid'
import {
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import CustomerStats from '@/components/CustomerStats'
import CTA from '@/components/CTA'





const values = [
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'Pushing boundaries and embracing new technologies to deliver cutting-edge solutions.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: HeartIcon,
    title: 'Passion',
    description: 'We love what we do, and it shows in every project we deliver.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Integrity',
    description: 'Honest, transparent, and ethical in all our business dealings.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: HandRaisedIcon,
    title: 'Collaboration',
    description: 'Working together with clients as true partners in success.',
    color: 'from-green-500 to-emerald-500'
  },
]

const milestones = [
  {
    title: 'Strong Foundation',
    description: 'Built on modern technologies, clean architecture, and best development practices.',
    icon: BuildingOffice2Icon
  },
  {
    title: 'Client-First Approach',
    description: 'Focused on understanding business goals and delivering real value.',
    icon: CheckBadgeIcon
  },
  {
    title: 'Modern Tech Stack',
    description: 'Working with the latest frameworks and tools to build scalable products.',
    icon: GlobeAltIcon
  },
  {
    title: 'Quality Driven',
    description: 'Every project goes through strict quality and performance checks.',
    icon: TrophyIcon
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function About() {
  return (
    <main className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        </div>

        <div className="container xl:max-w-[1320px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <UserGroupIcon className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/80">Our Story</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              We Build{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Digital Dreams
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              We are a team of passionate developers, designers, and strategists
              dedicated to creating exceptional digital experiences that drive
              business growth and transform industries.
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
            >
              {[
                { value: '7+', label: 'Years Experience', icon: CalendarDaysIcon },
                { value: '500+', label: 'Projects Completed', icon: CheckBadgeIcon },
                { value: '50+', label: 'Team Members', icon: UserGroupIcon },
                { value: '30+', label: 'Countries Served', icon: GlobeAltIcon },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Mission & Vision */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <RocketLaunchIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  To empower businesses with innovative digital solutions that transform
                  their operations, enhance customer experiences, and drive sustainable
                  growth in the digital age. We believe in creating technology that makes
                  a real difference.
                </p>
                
                {/* Decorative arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Driving Growth</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <EyeIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  To be the leading technology partner for businesses worldwide,
                  recognized for our excellence in innovation, quality, and customer
                  satisfaction. We envision a future where every business can thrive
                  digitally.
                </p>
                
                {/* Decorative badge */}
                <div className="mt-6 flex items-center gap-2 text-secondary">
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Excellence First</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <HeartIcon className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">What We Stand For</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
              Our Core <span className="text-secondary">Values</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <CalendarDaysIcon className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
              Key <span className="text-primary">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full hidden md:block" />

            <div className="space-y-8 md:space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } md:mb-8`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <milestone.icon className="w-5 h-5 text-primary" />
                        </div>
                        
                      </div>
                      <h4 className="text-xl font-bold mt-3">{milestone.title}</h4>
                      <p className="text-white/60 mt-2">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-[#0a0a0a] shadow-lg shadow-primary/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <CustomerStats />
      <CTA />

      {/* Add custom animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  )
}