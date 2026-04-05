import React from 'react'
// app/portfolio/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Portfolio | Web & App Development Projects',
  description: 'View our portfolio of successful projects including websites, mobile apps, e-commerce platforms, and custom software solutions. See how we help businesses grow.',
  keywords: [
    'software development portfolio',
    'web development projects',
    'mobile app projects',
    'Cod Active work',
  ],
}

function Portfolio({
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

export default Portfolio
