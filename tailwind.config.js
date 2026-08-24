/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          from: "#6366f1",
          via: "#7c6df2",
          to: "#8b5cf6",
        },
        ink: {
          light: "#4f46e5",
          950: "#05070d",
          900: "#0a0e1a",
          800: "#0d1220",
        },
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "mesh-gradient":
          "radial-gradient(at 20% 20%, rgba(99,102,241,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.16) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(129,140,248,0.12) 0px, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(99, 102, 241, 0.45)",
        "glow-sm": "0 0 20px -4px rgba(99, 102, 241, 0.35)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scroll: "scroll 2s ease infinite",
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite reverse",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "profile-morph": "profile-morph 8s ease-in-out infinite 1s",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scroll: {
          "0%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(3.75rem)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "profile-morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.97)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
