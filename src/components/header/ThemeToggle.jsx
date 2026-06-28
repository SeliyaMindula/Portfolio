import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <i
        className={`uil ${isDark ? "uil-sun" : "uil-moon"} theme-toggle__icon`}
      ></i>
    </button>
  );
};

export default ThemeToggle;
