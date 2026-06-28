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
        brand: {
          light: "rgb(121 0 0)",
          dark: "#6366f1",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "profile-morph": "profile-morph 8s ease-in-out infinite 1s",
        "fade-in-up": "fade-in-up 0.8s ease both",
        "bounce-arrow": "bounce-arrow 2s ease infinite",
        blink: "blink 1s step-end infinite",
        scroll: "scroll 2s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "profile-morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-arrow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scroll: {
          "0%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(3.75rem)" },
        },
      },
    },
  },
  plugins: [],
};
