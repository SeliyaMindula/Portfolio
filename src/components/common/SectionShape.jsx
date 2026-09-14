import React, { Suspense, lazy, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const MorphBlobCanvas = lazy(() => import("./MorphBlobCanvas"));

/**
 * Small morphing 3D blob anchored in a section corner. The canvas is
 * lazy-created the first time the section approaches the viewport, and
 * its render loop pauses while the section is off screen. Desktop only.
 */
const SectionShape = ({ flip = false, kind = "blob" }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: "300px" });
  const active = useInView(ref, { margin: "150px" });
  const { theme } = useTheme();

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute hidden md:block h-52 w-52 lg:h-64 lg:w-64 ${
        flip ? "left-[3%] bottom-8" : "right-[3%] top-8"
      }`}
    >
      {seen && (
        <Suspense fallback={null}>
          <MorphBlobCanvas dark={theme === "dark"} flip={flip} active={active} kind={kind} />
        </Suspense>
      )}
    </div>
  );
};

export default SectionShape;
