import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white text-zinc-800 transition-all hover:scale-105 hover:border-brand-light hover:text-brand-light dark:border-slate-700/50 dark:bg-[#161622] dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
    >
      <i className={`uil text-xl ${isDark ? "uil-sun" : "uil-moon"}`} />
    </button>
  );
};

export default ThemeToggle;
