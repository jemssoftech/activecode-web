"use client";

import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time: number) {
      // @ts-ignore
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
