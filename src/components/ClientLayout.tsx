
'use client'

import React, { Suspense } from 'react'
import SmoothScroll from './SmoothScroll'
import Cursor from './Cursor'
import Whatsapp from '@/app/whatsapp'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageTransition from './PageTransition'
import PageLoader from './PageLoader'
import PageOverlay from './PageOverlay'
import ScrollToTopOnRoute from './ScrollToTopOnRoute'

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  )
}

const ClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SmoothScroll>
      {/* Page Loading Indicator */}
      <Suspense fallback={LoadingFallback()}>
        <PageLoader />
      </Suspense>
      
      {/* Page Overlay Animation */}
      <PageOverlay />
      
      {/* Cursor */}
      <Cursor />
      
      {/* WhatsApp Button */}
      <Whatsapp />
      
      {/* Header */}
      <Header />
      
      {/* Main Content with Page Transition */}
      {/* <PageTransition> */}
        <main>{children}</main>
      {/* </PageTransition> */}
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top */}

      <ScrollToTopOnRoute />
    </SmoothScroll>
  )
}

export default ClientLayout