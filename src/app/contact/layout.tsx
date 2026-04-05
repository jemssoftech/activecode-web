import React from 'react'
// app/portfolio/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Quote for Your Project',
  description: 'Contact Cod Active for your software development needs. Get a free consultation and quote for website development, mobile app development, and IT solutions.',
  keywords: [
    'contact software company',
    'get quote for website',
    'hire developers surat',
    'IT consultation surat',
  ],
}

function ContactPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  )
}

export default ContactPage
