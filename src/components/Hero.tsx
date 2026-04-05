"use client";
import heroData from "@/utils/data.json";
import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  Code2,
  Cloud,
  Cpu,
  Database,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Button from "./Button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// MOBILE DETECTION HOOK (shared across components)
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return isMobile;
};

const renderHighlightedText = (hero: any) => {
  if (!hero?.text) return null;
  const parts = hero.text.split(hero.highlightedWord);
  return (
    <>
      {parts[0]}{" "}
      <span className="text-neutral-200 font-semibold">
        {hero.highlightedWord}
      </span>{" "}
      {parts[1]}
    </>
  );
};

// ============================================
// FLOATING CODE BLOCK — skipped on mobile
// ============================================
interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  delay?: number;
}

const FloatingCodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  className = "",
  delay = 0,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal
      gsap.fromTo(
        blockRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: delay + 0.5,
          ease: "power2.out",
        },
      );

      // Single float animation (combined Y + subtle rotate)
      gsap.to(blockRef.current, {
        y: "+=12",
        rotateY: 2,
        rotateX: -1,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
    }, blockRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={blockRef}
      className={`
        absolute bg-black/90 z-50
        border border-neutral-800/80 rounded-xl p-4
        shadow-2xl shadow-blue-500/5
        transform-gpu
        opacity-0
        ${className}
      `}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800/80">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-neutral-600 font-mono ml-2">
          {language}
        </span>
      </div>
      <pre className="text-xs font-mono leading-relaxed">
        <code className="text-neutral-400">{code}</code>
      </pre>
    </div>
  );
};

// ============================================
// FLOATING TECH ICON — skipped on mobile
// ============================================
interface TechIconProps {
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
}

const FloatingTechIcon: React.FC<TechIconProps> = ({
  icon,
  className = "",
  delay = 0,
  glowColor = "blue",
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const glowColors: Record<string, string> = {
    blue: "shadow-blue-500/20 border-blue-500/20",
    purple: "shadow-purple-500/20 border-purple-500/20",
    cyan: "shadow-cyan-500/20 border-cyan-500/20",
    green: "shadow-green-500/20 border-green-500/20",
  };

  useEffect(() => {
    if (!iconRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: delay + 0.3,
          ease: "back.out(1.7)",
        },
      );
    }, iconRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={iconRef}
      className={`
        absolute p-3 rounded-xl
        bg-black/80
        border shadow-lg
        opacity-0
        ${glowColors[glowColor]}
        ${className}
      `}
    >
      {icon}
    </div>
  );
};

// ============================================
// GLOW ORB — simplified on mobile
// ============================================
interface GlowOrbProps {
  size: number;
  color: string;
  className?: string;
  delay?: number;
  isMobile: boolean;
}

const GlowOrb: React.FC<GlowOrbProps> = ({
  size,
  color,
  className = "",
  delay = 0,
  isMobile,
}) => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        scale: 1.2,
        opacity: 0.4,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });

      gsap.to(orbRef.current, {
        x: `+=${-20 + Math.random() * 40}`,
        y: `+=${-20 + Math.random() * 40}`,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
    }, orbRef);

    return () => ctx.revert();
  }, [delay, isMobile]);

  // Mobile: static, smaller, less blur
  const mobileSize = isMobile ? size * 0.5 : size;
  const blurClass = isMobile ? "blur-[60px]" : "blur-[200px]";

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full ${blurClass} pointer-events-none ${className}`}
      style={{
        width: mobileSize,
        height: mobileSize,
        backgroundColor: color,
        opacity: isMobile ? 0.15 : 0.4,
      }}
    />
  );
};

// ============================================
// UNIQUE SHAPE IMAGE — simplified on mobile (though hidden)
// ============================================
const UniqueShapeImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGSVGElement>(null);
  const innerRingRef = useRef<SVGSVGElement>(null);
  const glowPulseRef = useRef<HTMLDivElement>(null);
  const orbitalDotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container entrance
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.7, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "back.out(1.4)",
        },
      );

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: 0.6,
            ease: "power3.out",
          },
        );
      }

      // Outer ring
      if (outerRingRef.current) {
        gsap.fromTo(
          outerRingRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "power2.out" },
        );
        gsap.to(outerRingRef.current, {
          rotation: 360,
          duration: 30,
          ease: "none",
          repeat: -1,
          transformOrigin: "center center",
        });
      }

      // Inner ring
      if (innerRingRef.current) {
        gsap.fromTo(
          innerRingRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.7, ease: "power2.out" },
        );
        gsap.to(innerRingRef.current, {
          rotation: -360,
          duration: 20,
          ease: "none",
          repeat: -1,
          transformOrigin: "center center",
        });
      }

      // Glow pulse
      if (glowPulseRef.current) {
        gsap.to(glowPulseRef.current, {
          scale: 1.3,
          opacity: 0.15,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Orbital dots — entrance only, rotation via CSS
      if (orbitalDotsRef.current) {
        const dots = orbitalDotsRef.current.querySelectorAll(".orbital-dot");
        dots.forEach((dot, i) => {
          gsap.fromTo(
            dot,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              delay: 1 + i * 0.15,
              ease: "back.out(2)",
            },
          );
        });

        gsap.to(orbitalDotsRef.current, {
          rotation: 360,
          duration: 15,
          ease: "none",
          repeat: -1,
          transformOrigin: "center center",
        });
      }

      // Subtle float
      gsap.to(containerRef.current, {
        y: "+=12",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const hexClip = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] opacity-0"
    >
      {/* Background glow */}
      <div
        ref={glowPulseRef}
        className="absolute inset-0 -m-8"
        style={{
          clipPath: hexClip,
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(236,72,153,0.15))",
          filter: "blur(40px)",
        }}
      />

      {/* Outer ring SVG */}
      <svg
        ref={outerRingRef}
        className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] opacity-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="33%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="66%" stopColor="#ec4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <polygon
          points="200,20 370,110 370,290 200,380 30,290 30,110"
          stroke="url(#ringGrad1)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 12"
        />
        {[
          [200, 20],
          [370, 110],
          [370, 290],
          [200, 380],
          [30, 290],
          [30, 110],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#ec4899"}
            opacity="0.7"
          />
        ))}
      </svg>

      {/* Inner ring SVG */}
      <svg
        ref={innerRingRef}
        className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] opacity-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <polygon
          points="200,35 358,118 358,282 200,365 42,282 42,118"
          stroke="url(#ringGrad2)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Orbital dots */}
      <div
        ref={orbitalDotsRef}
        className="absolute inset-0 w-full h-full"
        style={{ transformOrigin: "center center" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const radius = 52;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          const colors = [
            "bg-blue-400",
            "bg-purple-400",
            "bg-pink-400",
            "bg-cyan-400",
            "bg-blue-500",
            "bg-purple-500",
          ];
          return (
            <div
              key={i}
              className={`orbital-dot absolute w-2 h-2 rounded-full ${colors[i]} opacity-0`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 8px 2px ${
                  i % 2 === 0 ? "rgba(59,130,246,0.4)" : "rgba(139,92,246,0.4)"
                }`,
              }}
            />
          );
        })}
      </div>

      {/* Hexagonal border */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: hexClip,
          background:
            "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4)",
          padding: "2px",
        }}
      >
        <div className="w-full h-full bg-black" style={{ clipPath: hexClip }} />
      </div>

      {/* Main image */}
      <div
        ref={imageRef}
        className="absolute inset-[3px] overflow-hidden opacity-0"
        style={{ clipPath: hexClip }}
      >
        <Image
          src="/mobile-app-img-01.png"
          alt="IT Solutions & Services"
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 40%, transparent 60%, rgba(139,92,246,0.1) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>

      {/* Status badge */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none z-20">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-neutral-700/50">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-neutral-300 font-mono">
            LIVE • BUILDING
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN HERO SECTION
// ============================================
const HeroSection: React.FC = () => {
  const { hero } = heroData;
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const centralImageRef = useRef<HTMLDivElement>(null);

  const headlines = useMemo(() => hero?.heading || [], [hero?.heading]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // ============================================
  // TYPEWRITER — slower tick rate on mobile via requestAnimationFrame
  // ============================================
  const getFullText = useCallback(
    (index: number) => {
      if (!headlines[index]) return "";
      const h = headlines[index];
      return `${h.line1} ${h.line2} ${h.highlight}`;
    },
    [headlines],
  );

  useEffect(() => {
    if (!isLoaded || headlines.length === 0) return;

    const fullText = getFullText(currentIndex);
    // ⚡ Slower speeds on mobile = fewer state updates = less lag
    const typingSpeed = isMobile ? 120 : 80;
    const deletingSpeed = isMobile ? 60 : 40;
    const pauseDuration = 2500;

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (currentText.length > 0) {
        // ⚡ On mobile, delete 2 chars at a time = half the state updates
        const charsToDelete = isMobile ? 2 : 1;
        timeout = setTimeout(() => {
          setCurrentText(
            currentText.slice(
              0,
              Math.max(0, currentText.length - charsToDelete),
            ),
          );
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentIndex,
    getFullText,
    headlines.length,
    isMobile,
    isLoaded,
  ]);

  // ============================================
  // DISPLAY TEXT — memoized to prevent recalc
  // ============================================
  const { displayLine1, displayLine2, displayHighlight } = useMemo(() => {
    if (!headlines[currentIndex]) {
      return { displayLine1: "", displayLine2: "", displayHighlight: "" };
    }

    const h = headlines[currentIndex];
    const l1Len = h.line1.length;
    const l2Start = l1Len + 1;
    const l2Len = h.line2.length;
    const hlStart = l2Start + l2Len + 1;

    let dL1 = "";
    let dL2 = "";
    let dHL = "";

    if (currentText.length <= l1Len) {
      dL1 = currentText;
    } else if (currentText.length <= l2Start + l2Len) {
      dL1 = h.line1;
      dL2 = currentText.slice(l2Start);
    } else {
      dL1 = h.line1;
      dL2 = h.line2;
      dHL = currentText.slice(hlStart);
    }

    return { displayLine1: dL1, displayLine2: dL2, displayHighlight: dHL };
  }, [currentText, currentIndex, headlines]);

  // ============================================
  // GSAP: Grid — fewer lines on mobile
  // ============================================
  useEffect(() => {
    if (!gridRef.current) return;

    const gridLines = gridRef.current.querySelectorAll(".grid-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridLines,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 0.06,
          scaleX: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.5,
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  // ============================================
  // GSAP: Left column entrance
  // ============================================
  useEffect(() => {
    if (!sectionRef.current) return;

    const items = [
      badgeRef.current,
      headingRef.current,
      descriptionRef.current,
      ctaRef.current,
    ].filter(Boolean);

    gsap.set(items, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // ============================================
  // GSAP: Right column (desktop only)
  // ============================================
  useEffect(() => {
    if (!rightColumnRef.current || !sectionRef.current || isMobile) return;

    gsap.set(rightColumnRef.current, { opacity: 0, x: 60 });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(rightColumnRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });

    return () => trigger.kill();
  }, [isMobile]);

  // ============================================
  // GSAP: Central image (desktop only)
  // ============================================
  useEffect(() => {
    if (!centralImageRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        centralImageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, [isMobile]);

  // ============================================
  // GSAP: Scroll indicator
  // ============================================
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: "power2.out" },
      );

      const mouseEl =
        scrollIndicatorRef.current?.querySelector(".scroll-mouse");
      if (mouseEl) {
        gsap.to(mouseEl, {
          y: 6,
          duration: 0.75,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, scrollIndicatorRef);

    return () => ctx.revert();
  }, []);

  // Code snippets
  const codeSnippets = useMemo(
    () => [
      {
        code: `const deploy = async () => {
  await cloud.init();
  return success;
}`,
        language: "typescript",
        className: "top-[15%] right-[5%] lg:right-[8%] w-52",
        delay: 0,
      },
      {
        code: `<AI model="gpt-4">
  <analyze data />
  <optimize />
</AI>`,
        language: "jsx",
        className: "top-[45%] right-[15%] lg:right-[3%] w-44",
        delay: 0.3,
      },
      {
        code: `SELECT innovation
FROM solutions
WHERE quality = 'best'`,
        language: "sql",
        className: "bottom-[20%] right-[8%] lg:right-[12%] w-48",
        delay: 0.6,
      },
    ],
    [],
  );

  // ⚡ How many grid lines to render
  const gridLineCount = isMobile ? 5 : 10;

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen w-full overflow-hidden
        bg-black flex items-center
      "
      style={{
        cursor: isMobile
          ? undefined
          : "url(https://www.vasundhara.io/images/svg/slider-arrow-3.svg), auto",
      }}
      data-hide-cursor="true"
    >
      {/* ============================================ */}
      {/* BACKGROUND ELEMENTS */}
      {/* ============================================ */}

      {/* ⚡ Decorative arrows — desktop only */}
      {!isMobile && (
        <>
          <img
            src="https://www.vasundhara.io/images/svg/slider-arrow-1.svg"
            alt=""
            className="absolute left-[25%] bottom-[50px] z-10 animate-bounce"
            loading="lazy"
          />
          <img
            src="https://www.vasundhara.io/images/svg/slider-arrow-2.svg"
            alt=""
            className="absolute left-[44%] bottom-[170px] z-10 animate-arrowsquare"
            loading="lazy"
          />
        </>
      )}

      {/* ⚡ Grid — fewer lines on mobile */}
      <div
        ref={gridRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(gridLineCount)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"
            style={{ top: `${((i + 1) * 100) / (gridLineCount + 1)}%` }}
          />
        ))}
        {[...Array(gridLineCount)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent"
            style={{ left: `${((i + 1) * 100) / (gridLineCount + 1)}%` }}
          />
        ))}
      </div>

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none" />

      {/* ⚡ Noise texture — skip on mobile (barely visible anyway) */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* ⚡ Glow orbs — pass isMobile for reduced blur + no animation */}
      <GlowOrb
        size={400}
        color="#3b82f6"
        className="-top-20 -left-20 z-0"
        delay={0}
        isMobile={isMobile}
      />
      {!isMobile && (
        <>
          <GlowOrb
            size={350}
            color="#8b5cf6"
            className="top-1/4 right-[10%] z-0"
            delay={0.5}
            isMobile={false}
          />
          <GlowOrb
            size={300}
            color="#06b6d4"
            className="bottom-[10%] left-1/4 z-0"
            delay={1}
            isMobile={false}
          />
        </>
      )}

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN */}
          <div ref={leftColumnRef} className="space-y-8">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-neutral-800 text-sm text-blue-400 font-medium">
                <Sparkles className="w-4 h-4" />
                <span className="text-md sm:text-lg">
                  Trusted by 500+ Companies Worldwide
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <div
              ref={headingRef}
              className="min-h-[100px] sm:min-h-[120px] md:min-h-[160px] lg:min-h-[200px] mb-5 md:mb-8 opacity-0"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight">
                <span className="block text-white">
                  {displayLine1}
                  {displayLine2 === "" && displayHighlight === "" && (
                    <span className="inline-block w-[2px] md:w-[3px] h-[0.85em] bg-blue-500 ml-1 animate-pulse" />
                  )}
                </span>

                {(displayLine2 ||
                  displayHighlight ||
                  currentText.length >
                    (headlines[currentIndex]?.line1?.length || 0)) && (
                  <span className="block mt-1">
                    <span className="text-white">
                      {displayLine2}
                      {displayLine2 &&
                        displayHighlight === "" &&
                        currentText.length <=
                          (headlines[currentIndex]?.line1?.length || 0) +
                            1 +
                            (headlines[currentIndex]?.line2?.length || 0) && (
                          <span className="inline-block w-[2px] md:w-[3px] h-[0.85em] bg-blue-500 ml-1 animate-pulse" />
                        )}
                    </span>
                    {displayLine2 && " "}
                    {(displayHighlight ||
                      currentText.length >
                        (headlines[currentIndex]?.line1?.length || 0) +
                          1 +
                          (headlines[currentIndex]?.line2?.length || 0)) && (
                      <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {displayHighlight}
                          <span className="inline-block w-[2px] md:w-[3px] h-[0.85em] bg-blue-500 ml-1 animate-pulse" />
                        </span>
                        {displayHighlight.length > 0 && (
                          <span className="absolute -bottom-1 left-0 right-0 h-[2px] md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                        )}
                      </span>
                    )}
                  </span>
                )}
              </h1>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-md sm:text-lg text-neutral-400 max-w-xl leading-relaxed opacity-0"
            >
              {renderHighlightedText(hero?.description)}
            </p>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <Button name="Get Started" path="/contact" bg />
            </div>
          </div>

          {/* ---------------------------------------- */}
          {/* RIGHT COLUMN — hidden on mobile (md:block) */}
          {/* ---------------------------------------- */}
          <div
            ref={rightColumnRef}
            className="relative h-[500px] lg:h-[600px] hidden md:block opacity-0"
          >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />

            {/* Central image */}
            <div
              ref={centralImageRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0"
            >
              <UniqueShapeImage />
            </div>

            {/* Floating code blocks */}
            {codeSnippets.map((snippet, index) => (
              <FloatingCodeBlock
                key={index}
                code={snippet.code}
                language={snippet.language}
                className={snippet.className}
                delay={snippet.delay}
              />
            ))}

            {/* Floating tech icons */}
            <FloatingTechIcon
              icon={<Cloud className="w-5 h-5 text-blue-400" />}
              className="top-[8%] left-[20%]"
              delay={0.2}
              glowColor="blue"
            />
            <FloatingTechIcon
              icon={<Cpu className="w-5 h-5 text-purple-400" />}
              className="top-[35%] left-[2%]"
              delay={0.4}
              glowColor="purple"
            />
            <FloatingTechIcon
              icon={<Database className="w-5 h-5 text-cyan-400" />}
              className="bottom-[28%] left-[10%]"
              delay={0.6}
              glowColor="cyan"
            />
            <FloatingTechIcon
              icon={<Globe className="w-5 h-5 text-green-400" />}
              className="bottom-[12%] left-[35%]"
              delay={0.8}
              glowColor="green"
            />

            {/* Dashed lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
              viewBox="0 0 400 500"
            >
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke="#525252"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <line
                x1="0"
                y1="350"
                x2="400"
                y2="350"
                stroke="#525252"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <line
                x1="130"
                y1="0"
                x2="130"
                y2="500"
                stroke="#525252"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <line
                x1="270"
                y1="0"
                x2="270"
                y2="500"
                stroke="#525252"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SCROLL INDICATOR */}
      {/* ============================================ */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 px-4 opacity-0"
      >
        <span className="text-neutral-600 text-[10px] md:text-sm uppercase tracking-widest text-center">
          Scroll to explore
        </span>
        <div className="scroll-mouse w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-neutral-800 flex justify-center pt-1 md:pt-2">
          <div className="scroll-dot w-1 h-2 bg-neutral-600 rounded-full" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
