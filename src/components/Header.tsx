"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Works", href: "/portfolio" },
  { name: "About", href: "/about" },
];

// Custom Hamburger Icon
function MenuIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Also lock html for mobile
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${isScrolled
            ? "bg-dark/95 backdrop-blur-lg h-[75px] shadow-lg shadow-black/10"
            : "bg-transparent h-[75px] lg:h-[100px]"
          }`}
        style={{
          // ✅ Force no overflow issues
          overflow: "visible",
          maxWidth: "100vw",
        }}
      >
        {/* ✅ Container with proper constraints */}
        <div
          className="mx-auto px-4 h-full flex items-center"
          style={{
            maxWidth: "min(1320px, 100% - 16px)",
            width: "100%",
          }}
        >
          {/* ✅ Nav with explicit flex and no overflow */}
          <nav
            className="flex items-center justify-between h-full"
            style={{
              display: "flex",
              width: "100%",
              overflow: "visible",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 z-10 h-full flex items-center"
              aria-label="Go to homepage"
            >
              <Image
                src="/logo.png"
                alt="Cod Active Logo"
                width={120}
                height={30}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-lg font-medium transition-colors duration-300 group ${isActive
                          ? "text-primary"
                          : "text-white/80 hover:text-white"
                        }`}
                    >
                      {item.name}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? "w-6" : "w-0 group-hover:w-6"
                          }`}
                      />
                    </Link>
                  </li>
                );
              })}

              <li className="ml-4">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-black 
                    font-medium rounded-full transition-all duration-300 
                    hover:shadow-lg hover:shadow-primary/25"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* ✅ MOBILE MENU BUTTON - Guaranteed Visible */}
            {/* Mobile Menu Button - Only visible on mobile (below 768px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              className="flex md:hidden items-center justify-center  w-11 h-11 min-w-[44px] min-h-[44px] text-white bg-white/10  border border-white/20 rounded-lg hover:bg-white/20 hover:border-primary/50 transition-colors duration-300 flex-shrink-0 z-50"
            >
              <MenuIcon />
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
