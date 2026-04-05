"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function ScrollToTopOnRoute() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);

  return null;
}
