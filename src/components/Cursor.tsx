"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

type CursorVariant = "default" | "hover" | "text" | "hidden" | "click" | "drag";

const Cursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse position
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Smooth spring animation for main cursor
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  // Slower spring for outer elements (creates nice lag effect)
  const lagOptions = { damping: 15, stiffness: 150, mass: 0.8 };
  const lagMouse = {
    x: useSpring(mouse.x, lagOptions),
    y: useSpring(mouse.y, lagOptions),
  };

  // Check for touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(hover: none)").matches,
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Mouse move handler
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
      setIsVisible(true);

      // Check if we should hide the cursor
      const target = e.target as HTMLElement;
      if (target && target.closest('[data-hide-cursor="true"]')) {
        setVariant("hidden");
      } else {
        setVariant((prev) => (prev === "hidden" ? "default" : prev));
      }
    },
    [mouse.x, mouse.y],
  );

  // Mouse events
  const onMouseDown = useCallback(() => setVariant("click"), []);
  const onMouseUp = useCallback(
    () => setVariant((prev) => (prev === "click" ? "default" : prev)),
    [],
  );
  const onMouseLeave = useCallback(() => setIsVisible(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Interactive elements detection
    const handleInteractiveElements = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], .clickable',
      );

      const textInputs = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]',
      );

      const customHovers = document.querySelectorAll("[data-cursor]");

      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setVariant("hover");
          const text = el.getAttribute("data-cursor-text");
          if (text) setCursorText(text);
        });
        el.addEventListener("mouseleave", () => {
          setVariant("default");
          setCursorText("");
        });
      });

      textInputs.forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant("text"));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });

      customHovers.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          const cursorType = el.getAttribute("data-cursor") as CursorVariant;
          const text = el.getAttribute("data-cursor-text");
          if (cursorType) setVariant(cursorType);
          if (text) setCursorText(text);
        });
        el.addEventListener("mouseleave", () => {
          setVariant("default");
          setCursorText("");
        });
      });
    };

    handleInteractiveElements();

    const observer = new MutationObserver(() => {
      handleInteractiveElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
    };
  }, [
    isTouchDevice,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onMouseEnter,
  ]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // Cursor size based on variant
  const getSize = () => {
    switch (variant) {
      case "hover":
        return { width: 60, height: 60 };
      case "text":
        return { width: 4, height: 24 };
      case "click":
        return { width: 16, height: 16 };
      case "hidden":
        return { width: 0, height: 0 };
      default:
        return { width: 12, height: 12 };
    }
  };

  const { width, height } = getSize();

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: smoothMouse.x,
          y: smoothMouse.y,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width,
            height,
            marginLeft: -width / 2,
            marginTop: -height / 2,
            opacity: isVisible ? 1 : 0,
            borderRadius: variant === "text" ? "2px" : "50%",
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          <motion.div
            className="w-full h-full bg-white rounded-full"
            style={{
              borderRadius: variant === "text" ? "2px" : "50%",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: lagMouse.x,
          y: lagMouse.y,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          animate={{
            width: variant === "hover" ? 80 : variant === "click" ? 30 : 40,
            height: variant === "hover" ? 80 : variant === "click" ? 30 : 40,
            marginLeft:
              variant === "hover" ? -40 : variant === "click" ? -15 : -20,
            marginTop:
              variant === "hover" ? -40 : variant === "click" ? -15 : -20,
            opacity:
              isVisible && variant !== "text" && variant !== "hidden" ? 0.5 : 0,
            scale: variant === "click" ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 200,
          }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        />
      </motion.div>

      {/* Cursor Text Label */}
      <AnimatePresence>
        {cursorText && variant !== "hidden" && (
          <motion.div
            className="fixed top-0 left-0 z-[10000] pointer-events-none"
            style={{
              x: lagMouse.x,
              y: lagMouse.y,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 mt-12
                px-3 py-1.5 bg-white text-black text-xs font-medium 
                rounded-full whitespace-nowrap shadow-lg"
            >
              {cursorText}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Glow Effect (on hover) */}
      <AnimatePresence>
        {variant === "hover" && (
          <motion.div
            className="fixed top-0 left-0 z-[9997] pointer-events-none"
            style={{
              x: lagMouse.x,
              y: lagMouse.y,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="w-32 h-32 -ml-16 -mt-16 rounded-full 
                bg-gradient-to-r from-primary to-secondary blur-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cursor;
