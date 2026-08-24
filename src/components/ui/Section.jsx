import React from "react";
import SectionReveal from "../common/SectionReveal";

export const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

export const SectionHeader = ({ title, subtitle }) => (
  <SectionReveal>
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-slate-100">
        {title}
      </h2>
      <span className="block mt-3 text-sm text-zinc-500 dark:text-slate-500 dark:uppercase dark:tracking-widest">
        {subtitle}
      </span>
      <div className="w-14 h-1 mx-auto mt-3 rounded-full bg-accent-gradient" />
    </div>
  </SectionReveal>
);

export const Container = ({ children, className = "" }) => (
  <div className={`max-w-5xl mx-auto px-6 md:px-8 ${className}`}>{children}</div>
);
