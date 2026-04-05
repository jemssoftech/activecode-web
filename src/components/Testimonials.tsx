'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    position: 'CEO, Themeland Inc.',
    image: '/assets/img/content/client-1.jpg',
    content:
      "We were blown away by Themeland's creativity, professionalism, and attention to detail. The results were beyond our expectations. We couldn't be happier! We would highly recommend Themeland to anyone in need of their services.",
  },
  {
    id: 2,
    name: 'Michael Lee',
    position: 'Chief Marketing Officer, XYZ Corporation',
    image: '/assets/img/content/client-2.jpg',
    content:
      "Working with Themeland was an absolute dream. They brought our vision to life and exceeded all of our expectations. We can't thank them enough! They were able to take our ideas and turn them into a reality that was even better than we had imagined.",
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    position: 'Head of Design, Creative Co.',
    image: '/assets/img/content/client-1.jpg',
    content:
      'It was a privilege to work with Themeland on our project. They demonstrated a deep understanding of our business, our customers, and our goals. Their innovative approach and dedication to excellence resulted in a finished product that exceeded our expectations.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold">
            What Our <span className="text-secondary">Clients Say</span>
          </h3>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="text-center p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h5 className="text-xl font-semibold">{testimonial.name}</h5>
                    <span className="text-white/60">{testimonial.position}</span>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}