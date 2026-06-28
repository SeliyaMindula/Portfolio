import React from "react";
import { useInView } from "../../hooks/useInView";

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll animate-${direction} ${
        isInView ? "in-view" : ""
      } ${className}`}
      style={{ "--delay": `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
