// components/PageLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 100)
    const timer2 = setTimeout(() => setProgress(60), 200)
    const timer3 = setTimeout(() => setProgress(80), 300)
    const timer4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 200)
    }, 400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] h-1"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}