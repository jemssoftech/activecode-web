/** @type {import('tailwindcss').Config} */

module.exports = {
  
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B6BCC6",
        secondary: "#a6abb4",
        dark: "#0f0f0f",
        "dark-secondary": "#1a1a1a",
        accent: "#818cf8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 20s infinite linear",
        spinner: "spinner 20s infinite linear",
        bounce: "bounce 3s linear infinite",
        arrowsquare: "arrowsquare 4s linear infinite",
        // ✅ FIXED: Remove 'infinite', add 'linear' and 'forwards'
        shrink: "shrink linear forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      keyframes: {
        zoom: {
          "0%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.5, 1.5)" },
          "100%": { transform: "scale(1, 1)" },
        },
        spinner: {
          "100%": { transform: "translate3d(0px, 0px, 0px) rotateZ(-360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        // ✅ FIXED: Added more properties for better effect
        shrink: {
          "0%": {
            transform: "scale(1)",
            borderRadius: "0px",
          },
          "100%": {
            transform: "scale(0.85)",
            borderRadius: "20px",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20%)" },
        },
        arrowsquare: {
          "0%, 100%": { transform: "translate(0)" },
          "25%,75%": { transform: "translate(30px)" },
          "50%": { transform: "translate(30px,30px)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".animation-timeline-view": {
          "animation-timeline": "view()",
        },
        ".animation-range-cover": {
          "animation-range": "cover 0% cover 50%",
        },
        ".animation-range-entry": {
          "animation-range": "entry 0% entry 100%",
        },
        ".animation-range-exit": {
          "animation-range": "exit 0% exit 100%",
        },
      });
    },
  ],
};
