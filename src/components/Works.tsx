// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
// import data from "@/utils/data.json";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function StackCards() {
//   const { portfolio: works } = data;
//   const containerRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
//   const activeIndexRef = useRef(0);
//   const counterRef = useRef<HTMLSpanElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();

//     let timeout: NodeJS.Timeout;
//     const debouncedCheck = () => {
//       clearTimeout(timeout);
//       timeout = setTimeout(checkMobile, 200);
//     };

//     window.addEventListener("resize", debouncedCheck);
//     return () => {
//       window.removeEventListener("resize", debouncedCheck);
//       clearTimeout(timeout);
//     };
//   }, []);

//   // ✅ Fewer cards on mobile = less work per frame
//   const displayWorks = isMobile ? works.slice(0, 4) : works.slice(0, 6);
//   const totalCards = displayWorks.length + 1;

//   const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
//     cardsRef.current[index] = el;
//   }, []);

//   const setOverlayRef = useCallback(
//     (el: HTMLDivElement | null, index: number) => {
//       overlaysRef.current[index] = el;
//     },
//     [],
//   );

//   // ============ GSAP — ZERO REACT RE-RENDERS ON SCROLL ============
//   useEffect(() => {
//     const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
//     const overlays = overlaysRef.current.filter(Boolean) as HTMLDivElement[];
//     const container = containerRef.current;
//     const counterEl = counterRef.current;

//     if (!container || cards.length === 0) return;

//     ScrollTrigger.getAll().forEach((st) => st.kill());

//     let lastIndex = -1;

//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: container,
//         start: "top top",
//         end: () => `+=${cards.length * (isMobile ? 100 : 80)}%`,
//         pin: true,
//         // ✅ Higher scrub = smoother interpolation on slow GPUs
//         scrub: isMobile ? 2.5 : 1,
//         // ✅ Disable anticipatePin on mobile — saves layout calc
//         anticipatePin: isMobile ? 0 : 1,
//         onUpdate: (self) => {
//           const progress = self.progress * (cards.length - 1);
//           const currentIdx = Math.min(Math.round(progress), cards.length - 1);

//           // ✅ DOM counter update only when index changes — NO setState
//           if (currentIdx !== lastIndex) {
//             lastIndex = currentIdx;
//             activeIndexRef.current = currentIdx;
//             if (counterEl) {
//               counterEl.textContent = String(
//                 Math.min(currentIdx + 1, totalCards),
//               ).padStart(2, "0");
//             }
//           }

//           // ✅ Direct style manipulation — no gsap.set overhead
//           for (let i = 0; i < cards.length; i++) {
//             const card = cards[i];
//             const overlay = overlays[i];
//             if (!card) continue;

//             let yPos = 0;
//             let scale = 1;
//             let overlayOpacity = 0;

//             if (i === 0) {
//               const p = Math.min(1, Math.max(0, progress));
//               scale = 1 - p * 0.08;
//               overlayOpacity = p * 0.5;
//             } else {
//               const cardProgress = Math.min(1, Math.max(0, progress - (i - 1)));
//               yPos = isMobile
//                 ? 120 - cardProgress * 120
//                 : 140 - cardProgress * 140;

//               if (progress > i) {
//                 const exitProgress = Math.min(1, progress - i);
//                 scale = 1 - exitProgress * 0.08;
//                 overlayOpacity = exitProgress * 0.5;
//               }
//             }

//             // ✅ translate3d forces GPU layer — no repaints
//             card.style.transform = `translate3d(0,${yPos}%,0) scale3d(${scale},${scale},1)`;
//             card.style.zIndex = `${i + 1}`;

//             // ✅ Opacity overlay instead of filter:brightness — 10x cheaper
//             if (overlay) {
//               overlay.style.opacity = `${overlayOpacity}`;
//             }
//           }
//         },
//       });
//     }, container);

//     return () => ctx.revert();
//   }, [totalCards, isMobile]);

//   return (
//     <>
//       {/* ================= HEADER SECTION ================= */}
//       <div className="py-4 md:py-8 shrink-0 relative z-20 bg-[#050505]">
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 container xl:max-w-[1320px] mx-auto px-4">
//           <div className="flex-1">
//             <span
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full
//                 bg-primary/10 border border-primary/20 text-xs text-primary mb-2"
//             >
//               {/* ✅ Removed animate-pulse — saves compositing on old GPUs */}
//               <span className="w-1.5 h-1.5 rounded-full bg-primary" />
//               Our Portfolio
//             </span>

//             <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
//               Selected{" "}
//               <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Works
//               </span>
//             </h2>
//           </div>

//           {/* Header Controls */}
//           <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto mt-2 lg:mt-0">
//             {/* ✅ Counter via ref — ZERO re-renders */}
//             <div className="flex items-center gap-2 text-sm font-mono text-white/50">
//               <span ref={counterRef} className="text-white">
//                 01
//               </span>
//               <span className="w-8 h-[1px] bg-white/20" />
//               <span>{String(totalCards).padStart(2, "0")}</span>
//             </div>

//             <Link
//               href="/portfolio"
//               className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
//             >
//               <span className="font-medium text-xs md:text-sm">View All</span>
//               <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ================= CARDS SECTION ================= */}
//       <section
//         ref={containerRef}
//         className="relative !h-[844px] lg:!h-screen bg-[#050505] text-white overflow-hidden flex flex-col lg:pt-[80px]"
//       >
//         {/* ✅ Background blurs removed on mobile via md: prefix */}
//         <div className="absolute inset-0 -z-10 pointer-events-none">
//           <div className="hidden md:block absolute top-1/4 -left-32 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
//           <div className="hidden md:block absolute bottom-1/4 -right-32 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[100px]" />
//           <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
//         </div>

//         <div className="container xl:max-w-[1320px] mx-auto px-4 h-full flex flex-col z-10">
//           <div className="relative flex-1 w-full flex items-center justify-center pb-4 md:pb-10 overflow-visible">
//             <div className="relative w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[80vw] aspect-[3/4] md:aspect-video">
//               {displayWorks.map((work, index) => (
//                 <div
//                   key={work.id}
//                   ref={(el) => setCardRef(el, index)}
//                   className="absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10"
//                   style={{
//                     backgroundColor: "#0a0a0a",
//                     transformOrigin: "center top",
//                     willChange: "transform",
//                     backfaceVisibility: "hidden",
//                     // 👇 Yeh add karein: Pehla card (0) ka zIndex sabse high hoga
//                     zIndex: displayWorks.length - index,
//                     // 👇 Initial position: Pehle card ko chhod kar baaki niche hide rahein
//                     transform:
//                       index === 0
//                         ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
//                         : "translate3d(0, 100%, 0) scale3d(1, 1, 1)",
//                   }}
//                 >
//                   {/* ✅ DARKNESS OVERLAY — replaces filter:brightness() */}
//                   <div
//                     ref={(el) => setOverlayRef(el, index)}
//                     className="absolute inset-0 bg-black z-30 pointer-events-none"
//                     style={{ opacity: 0 }}
//                   />

//                   <Link
//                     href={`/portfolio/${work.id}`}
//                     className="relative w-full h-full block group"
//                   >
//                     {/* Image */}
//                     <div className="absolute inset-0 overflow-hidden">
//                       <Image
//                         src={work.image}
//                         alt={work.title}
//                         fill
//                         className="object-cover md:group-hover:scale-105 md:transition-transform md:duration-700"
//                         sizes="(max-width: 768px) 95vw, 85vw"
//                         // ✅ Only prioritize first 2
//                         priority={index < 2}
//                         // ✅ Lower quality on old devices
//                         quality={isMobile ? 60 : 80}
//                       />
//                     </div>

//                     {/* ✅ Simplified gradient — single gradient instead of complex */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

//                     {/* Content */}
//                     <div className="absolute bottom-0 left-0 w-full p-5 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
//                       <div className="w-full">
//                         <div className="flex items-center gap-2 mb-2">
//                           <span className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-white/10 border border-white/10">
//                             {work.year}
//                           </span>
//                           <span
//                             style={{
//                               color: work.color || "#8B5CF6",
//                             }}
//                             className="text-[10px] md:text-sm font-bold uppercase tracking-wider"
//                           >
//                             {work.category}
//                           </span>
//                         </div>

//                         <h3 className="text-2xl md:text-5xl font-bold mb-2 leading-tight">
//                           {work.title}
//                         </h3>

//                         <p className="text-white/70 text-sm md:text-base max-w-lg line-clamp-2 mb-3">
//                           {work.description}
//                         </p>

//                         {/* ✅ Tags hidden on mobile — saves DOM nodes */}
//                         <div className="hidden md:flex flex-wrap gap-2">
//                           {work.tags.slice(0, 3).map((tag) => (
//                             <span
//                               key={tag}
//                               className="text-xs px-2 py-1 rounded bg-white/5 text-white/60 border border-white/5"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="absolute top-4 right-4 md:static">
//                         {/* ✅ Removed backdrop-blur — solid bg instead */}
//                         <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-black/60 md:bg-white/10 md:backdrop-blur-md md:group-hover:bg-white md:group-hover:text-black transition-colors">
//                           <ArrowUpRightIcon className="w-4 h-4 md:w-6 md:h-6" />
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import data from "@/utils/data.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StackCards() {
  const { portfolio: works } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    let timeout: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 200);
    };

    window.addEventListener("resize", debouncedCheck);
    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeout);
    };
  }, []);

  const displayWorks = isMobile ? works.slice(0, 4) : works.slice(0, 6);
  const totalCards = displayWorks.length + 1;

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  }, []);

  const setOverlayRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      overlaysRef.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const overlays = overlaysRef.current.filter(Boolean) as HTMLDivElement[];
    const container = containerRef.current;
    const counterEl = counterRef.current;

    if (!container || cards.length === 0) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    let lastIndex = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${cards.length * (isMobile ? 100 : 80)}%`,
        pin: true,
        scrub: isMobile ? 2.5 : 1,
        anticipatePin: isMobile ? 0 : 1,
        onUpdate: (self) => {
          const progress = self.progress * (cards.length - 1);
          const currentIdx = Math.min(Math.round(progress), cards.length - 1);

          if (currentIdx !== lastIndex) {
            lastIndex = currentIdx;
            activeIndexRef.current = currentIdx;
            if (counterEl) {
              counterEl.textContent = String(
                Math.min(currentIdx + 1, totalCards),
              ).padStart(2, "0");
            }
          }

          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const overlay = overlays[i];
            if (!card) continue;

            let yPos = 0;
            let scale = 1;
            let overlayOpacity = 0;

            if (i === 0) {
              const p = Math.min(1, Math.max(0, progress));
              scale = 1 - p * 0.08;
              overlayOpacity = p * 0.5;
            } else {
              const cardProgress = Math.min(1, Math.max(0, progress - (i - 1)));
              yPos = isMobile
                ? 120 - cardProgress * 120
                : 140 - cardProgress * 140;

              if (progress > i) {
                const exitProgress = Math.min(1, progress - i);
                scale = 1 - exitProgress * 0.08;
                overlayOpacity = exitProgress * 0.5;
              }
            }

            card.style.transform = `translate3d(0,${yPos}%,0) scale3d(${scale},${scale},1)`;
            card.style.zIndex = `${i + 1}`;

            if (overlay) {
              overlay.style.opacity = `${overlayOpacity}`;
            }
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [totalCards, isMobile]);

  return (
    <>
      {/* ================= HEADER SECTION ================= */}
      <div className="pt-4 md:pt-8 shrink-0 relative z-20 bg-[#050505]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 container xl:max-w-[1320px] mx-auto px-4">
          <div className="flex-1">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                bg-primary/10 border border-primary/20 text-xs text-primary mb-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Our Portfolio
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Selected{" "}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto mt-2 lg:mt-0">
            <div className="flex items-center gap-2 text-sm font-mono text-white/50">
              <span ref={counterRef} className="text-white">
                01
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span>{String(totalCards).padStart(2, "0")}</span>
            </div>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
            >
              <span className="font-medium text-xs md:text-sm">View All</span>
              <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= CARDS SECTION ================= */}
      <section
        ref={containerRef}
        // ✅ Mobile height increased for 9:16 ratio
        className="relative h-screen  bg-[#050505] text-white overflow-hidden flex flex-col lg:pt-[80px]"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="hidden md:block absolute top-1/4 -left-32 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="hidden md:block absolute bottom-1/4 -right-32 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container xl:max-w-[1320px] mx-auto justify-center items-center px-4 h-full flex flex-col z-10">
          <div className="relative  w-full flex items-center justify-center py-4 md:pb-10 overflow-visible">
            {/* ✅ CHANGED: Mobile = 9:16 ratio, Desktop = video (16:9) */}
            <div
              className="relative w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[85vw] lg:max-w-[80vw] md:aspect-video"
              style={{
                // Mobile: 9:16 aspect ratio using max-height constraint
                aspectRatio: isMobile ? "9 / 16" : undefined,
                maxHeight: isMobile ? "calc(100svh - 180px)" : undefined,
              }}
            >
              {displayWorks.map((work, index) => (
                <div
                  key={work.id}
                  ref={(el) => setCardRef(el, index)}
                  className="absolute inset-0 w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10"
                  style={{
                    backgroundColor: "#0a0a0a",
                    transformOrigin: "center top",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    zIndex: displayWorks.length - index,
                    transform:
                      index === 0
                        ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
                        : "translate3d(0, 100%, 0) scale3d(1, 1, 1)",
                  }}
                >
                  <div
                    ref={(el) => setOverlayRef(el, index)}
                    className="absolute inset-0 bg-black z-30 pointer-events-none"
                    style={{ opacity: 0 }}
                  />

                  <Link
                    href={`/portfolio/${work.id}`}
                    className="relative w-full h-full block group"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        // ✅ object-position adjusted for 9:16 portrait view
                        className="object-cover object-center md:group-hover:scale-105 md:transition-transform md:duration-700"
                        sizes="(max-width: 768px) 85vw, 85vw"
                        priority={index < 2}
                        quality={isMobile ? 60 : 80}
                      />
                    </div>

                    {/* ✅ Stronger gradient for 9:16 to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:from-black/95 md:via-black/40" />

                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-white/10 border border-white/10">
                            {work.year}
                          </span>
                          <span
                            style={{
                              color: work.color || "#8B5CF6",
                            }}
                            className="text-[10px] md:text-sm font-bold uppercase tracking-wider"
                          >
                            {work.category}
                          </span>
                        </div>

                        {/* ✅ Slightly smaller title on mobile for 9:16 */}
                        <h3 className="text-xl sm:text-2xl md:text-5xl font-bold mb-2 leading-tight">
                          {work.title}
                        </h3>

                        <p className="text-white/70 text-xs sm:text-sm md:text-base max-w-lg line-clamp-2 mb-3">
                          {work.description}
                        </p>

                        <div className="hidden md:flex flex-wrap gap-2">
                          {work.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded bg-white/5 text-white/60 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 md:static">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-black/60 md:bg-white/10 md:backdrop-blur-md md:group-hover:bg-white md:group-hover:text-black transition-colors">
                          <ArrowUpRightIcon className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
