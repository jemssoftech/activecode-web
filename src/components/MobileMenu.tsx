
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import data from "@/utils/data.json"
import { 
  XMarkIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'
import { socialIcons } from './SocialIcons'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About Us', href: '/about' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
]

const services = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Digital Marketing',
]




export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
const { socialLinks,contactInfo } = data 
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-dark transform transition-all duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative flex flex-col h-full overflow-y-auto">
          
          {/* Header with Logo */}
          <div className="sticky top-0 bg-dark z-10 px-6 py-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/logo.png"
                  alt="Codespace Logo"
                  width={140}
                  height={35}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 
                rounded-lg transition-all duration-300"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6">
            
            {/* Navigation Links */}
            <nav className="mb-8">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <li 
                      key={item.name}
                      className={`transform transition-all duration-500 ${
                        isOpen 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: isOpen ? `${100 + index * 50}ms` : '0ms' }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg font-medium">{item.name}</span>
                        <ArrowRightIcon 
                          className={`w-4 h-4 transition-all duration-300 ${
                            isActive 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Services Quick Links */}
            <div 
              className={`mb-8 transform transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
            >
              <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">
                Our Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <span 
                    key={service}
                    className="px-3 py-1.5 text-sm text-white/60 bg-white/5 rounded-full
                    hover:bg-white/10 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div 
              className={`mb-8 p-4 bg-white/5 rounded-xl transform transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}
            >
              <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm">{contactInfo.email}</span>
                </a>
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span className="text-sm">{contactInfo.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-sm">{contactInfo.address}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div 
              className={`transform transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-4 px-6 
                bg-primary hover:bg-primary/90 text-white text-center font-semibold 
                rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Free Quote
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div 
            className={`mt-auto px-6 py-5 border-t border-white/10 transform transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '550ms' : '0ms' }}
          >
            {/* Social Links */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Follow us</span>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="p-2.5 rounded-lg bg-white/5 text-white/60 
                    hover:text-white hover:bg-white/10 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {socialIcons[link.icon.toLowerCase()]}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Copyright */}
            <p className="mt-4 text-xs text-white/30 text-center">
              © {new Date().getFullYear()} Codespace Infotech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}