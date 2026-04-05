'use client'


import { motion } from 'framer-motion'
import Button from './Button'

export default function OurWork() {
  return (
    <section className="py-20">
      <div className="container xl:max-w-[1320px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-5xl font-medium mb-6">
            Our <span className="text-secondary">Work</span>
          </h3>
          <p className="text-lg lg:text-[22.2px] text-[#909dac]  mx-auto mb-6">
            If you want to have a sample of all that we do, check out our clients
            and the work, here.
          </p>
          <Button name=' Click to Checkout Our Latest Work' path='/portfolio' border />
          
        </motion.div>
      </div>
    </section>
  )
}