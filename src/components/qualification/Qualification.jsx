import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { EDUCATION, EXPERIENCE } from "../../data/portfolio";
import SectionReveal from "../common/SectionReveal";
import GlassCard from "../ui/GlassCard";
import { Section, SectionHeader, Container } from "../ui/Section";

const TimelineItem = ({ title, subtitle, period, align }) => {
  const card = (
    <GlassCard tilt={false} className="!p-5">
      <h3 className="font-medium text-zinc-800 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">{subtitle}</p>
      <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-slate-500">
        <i className="uil uil-calendar-alt" /> {period}
      </p>
    </GlassCard>
  );

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
      {align === "left" ? (
        <>
          {card}
          <div className="flex justify-center pt-1.5">
            <motion.span
              className="h-3.5 w-3.5 rounded-full bg-accent-gradient shadow shadow-indigo-500/40"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div />
        </>
      ) : (
        <>
          <div />
          <div className="flex justify-center pt-1.5">
            <motion.span
              className="h-3.5 w-3.5 rounded-full bg-accent-gradient shadow shadow-indigo-500/40"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          {card}
        </>
      )}
    </div>
  );
};

const Timeline = ({ items }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative space-y-8">
      <div className="absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-zinc-200 dark:bg-white/10" />
      <motion.div
        className="absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 origin-top bg-accent-gradient"
        style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
      />
      {items.map((item) => (
        <TimelineItem key={item.title} {...item} />
      ))}
    </div>
  );
};

const Qualification = () => {
  const [tab, setTab] = useState("education");
  const items = tab === "education" ? EDUCATION : EXPERIENCE;

  const tabClass = (name) =>
    `inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
      tab === name
        ? "bg-accent-gradient text-white border-transparent shadow-lg shadow-indigo-500/20 dark:shadow-glow-sm"
        : "bg-white border-black/10 text-zinc-600 hover:border-zinc-400 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:border-indigo-400/40"
    }`;

  return (
    <Section id="qualifications">
      <SectionHeader title="Qualification" subtitle="My personal journey" />

      <SectionReveal delay={0.15}>
        <Container className="max-w-3xl">
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <button type="button" className={tabClass("education")} onClick={() => setTab("education")}>
              <i className="uil uil-graduation-cap text-lg" /> Education
            </button>
            <button type="button" className={tabClass("experience")} onClick={() => setTab("experience")}>
              <i className="uil uil-briefcase-alt text-lg" /> Experience
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Timeline items={items} />
            </motion.div>
          </AnimatePresence>
        </Container>
      </SectionReveal>
    </Section>
  );
};

export default Qualification;
