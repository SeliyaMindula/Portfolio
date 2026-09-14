import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionReveal from "../common/SectionReveal";
import FloatingShapes from "../common/FloatingShapes";
import SectionShape from "../common/SectionShape";

const SECTION_SHAPES = {
  about: { kind: "blob", flip: false },
  skills: { kind: "torus", flip: true },
  projects: { kind: "knot", flip: false },
  qualifications: { kind: "octa", flip: true },
  contact: { kind: "dodeca", flip: false },
};

export const Section = ({ id, children, className = "", decor = true }) => {
  const shape = SECTION_SHAPES[id] || { kind: "blob", flip: false };
  return (
    <section id={id} className={`relative overflow-hidden py-16 md:py-24 ${className}`}>
      {decor && <FloatingShapes flip={shape.flip} />}
      {decor && <SectionShape flip={shape.flip} kind={shape.kind} />}
      {children}
    </section>
  );
};

export const SectionHeader = ({ title, subtitle }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [24, -24]
  );

  return (
    <SectionReveal>
      <motion.div ref={ref} style={{ y }} className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-slate-100">
          {title}
        </h2>
        <span className="block mt-3 text-sm text-zinc-500 dark:text-slate-500 dark:uppercase dark:tracking-widest">
          {subtitle}
        </span>
        <motion.div
          className="w-14 h-1 mx-auto mt-3 rounded-full bg-accent-gradient origin-center"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </SectionReveal>
  );
};

export const Container = ({ children, className = "" }) => (
  <div className={`max-w-5xl mx-auto px-6 md:px-8 ${className}`}>{children}</div>
);
