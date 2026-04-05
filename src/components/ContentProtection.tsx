"use client";

import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // ==========================================
    // 1. KEYBOARD SHORTCUT BLOCKING
    // ==========================================
    const preventInspect = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "i"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["J", "j"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["C", "c"].includes(e.key)) ||
        (e.ctrlKey && ["u", "U"].includes(e.key)) ||
        (e.ctrlKey && ["s", "S"].includes(e.key)) ||
        (e.ctrlKey && ["p", "P"].includes(e.key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // ==========================================
    // 2. MOUSE PROTECTION
    // ==========================================
    const preventContext = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventSelect = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
    };

    const preventDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    // ==========================================
    // 3. ATTACH ALL LISTENERS
    // ==========================================
    document.addEventListener("keydown", preventInspect, true);
    document.addEventListener("contextmenu", preventContext, true);
    document.addEventListener("selectstart", preventSelect);
    document.addEventListener("dragstart", preventDrag);

    // ==========================================
    // 4. CSS INJECTION
    // ==========================================
    const style = document.createElement("style");
    style.id = "content-protection-style";
    style.innerHTML = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      img {
        pointer-events: none;
        -webkit-user-drag: none;
      }
    `;
    document.head.appendChild(style);

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      document.removeEventListener("keydown", preventInspect, true);
      document.removeEventListener("contextmenu", preventContext, true);
      document.removeEventListener("selectstart", preventSelect);
      document.removeEventListener("dragstart", preventDrag);

      const existingStyle = document.getElementById("content-protection-style");
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return null;
}
