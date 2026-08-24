import React from "react";

/**
 * Inline accent-gradient text for headlines (indigo → violet).
 */
const GradientText = ({ children, className = "", as: Component = "span" }) => (
  <Component
    className={`bg-accent-gradient bg-clip-text text-transparent ${className}`}
  >
    {children}
  </Component>
);

export default GradientText;
