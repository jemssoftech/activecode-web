
'use client'

import { motion } from 'framer-motion'
import {
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import data from "@/utils/data.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  ClockIcon,
};
export default function CustomerStats() {
    const { stats } = data;
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
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

          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            Customers Love{' '}
            <span className="relative">
              <span className="text-secondary">Our Work</span>
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

          <p className="text-lg text-[#909dac] max-w-2xl mx-auto">
            Our customers have deemed us trustworthy and given us higher ratings.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return(
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative text-center p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`} />

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-7 h-7 md:w-8 md:h-8 ${stat.iconColor}`} />
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-white/10"
                  />
                  {/* Progress Circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className={`stroke-current bg-gradient-to-r ${stat.color}`}
                    style={{
                      stroke: `url(#gradient-${index})`,
                    }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: stat.value / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
                  />
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className={stat.iconColor.replace('text-', 'stop-')} stopColor="currentColor" />
                      <stop offset="100%" className={stat.iconColor.replace('text-', 'stop-')} stopColor="currentColor" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Value */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    className="text-2xl md:text-3xl font-bold"
                  >
                    {stat.value}%
                  </motion.span>
                </div>
              </div>

              {/* Label */}
              <p className="relative text-sm md:text-base text-[#909dac] group-hover:text-white/80 transition-colors duration-300">
                {stat.label}
              </p>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${stat.color} group-hover:w-3/4 transition-all duration-300 rounded-full`} />
            </motion.div>
          )
          })}
        </div>

     
      </div>
    </section>
  )
}