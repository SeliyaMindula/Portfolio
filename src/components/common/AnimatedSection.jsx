import React from "react";
import { useInView } from "../../hooks/useInView";

const offsets = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
};

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
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offsets[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
