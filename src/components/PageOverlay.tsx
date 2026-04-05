// components/PageOverlay.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageOverlay() {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {isAnimating && (
        <>
          {/* First layer */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="fixed inset-0 z-[999] bg-primary"
          />
          
          {/* Second layer (delayed) */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ originY: 0 }}
            className="fixed inset-0 z-[998] bg-dark"
          />
        </>
      )}
    </AnimatePresence>
  )
}