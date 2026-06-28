import React, { useState } from "react";
import { EDUCATION, EXPERIENCE } from "../../data/portfolio";
import AnimatedSection from "../common/AnimatedSection";
import Card from "../ui/Card";
import { Section, SectionHeader, Container } from "../ui/Section";

const TimelineItem = ({ title, subtitle, period, align }) => (
  <div className={`grid grid-cols-[1fr_auto_1fr] gap-6 items-start ${align === "left" ? "" : ""}`}>
    {align === "left" ? (
      <>
        <Card className="!p-5">
          <h3 className="font-medium text-zinc-800 dark:text-slate-100">{title}</h3>
          <p className="mt-1 text-sm text-brand-light dark:text-indigo-400">{subtitle}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-slate-500">
            <i className="uil uil-calendar-alt" /> {period}
          </p>
        </Card>
        <div className="flex flex-col items-center">
          <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow shadow-indigo-500/40" />
          <span className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-indigo-500/40 to-violet-500/40" />
        </div>
        <div />
      </>
    ) : (
      <>
        <div />
        <div className="flex flex-col items-center">
          <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow shadow-indigo-500/40" />
          <span className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-indigo-500/40 to-violet-500/40" />
        </div>
        <Card className="!p-5">
          <h3 className="font-medium text-zinc-800 dark:text-slate-100">{title}</h3>
          <p className="mt-1 text-sm text-brand-light dark:text-indigo-400">{subtitle}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-slate-500">
            <i className="uil uil-calendar-alt" /> {period}
          </p>
        </Card>
      </>
    )}
  </div>
);

const Qualification = () => {
  const [tab, setTab] = useState("education");
  const items = tab === "education" ? EDUCATION : EXPERIENCE;

  const tabClass = (name) =>
    `inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
      tab === name
        ? "bg-zinc-800 text-white border-transparent dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:shadow-lg dark:shadow-indigo-500/30"
        : "bg-white border-black/10 text-zinc-600 hover:border-zinc-400 dark:bg-[#161622] dark:border-slate-700/50 dark:text-slate-400 dark:hover:border-indigo-500/40"
    }`;

  return (
    <Section id="qualifications">
      <SectionHeader title="Qualification" subtitle="My personal journey" />

      <AnimatedSection delay={0.15}>
        <Container className="max-w-3xl">
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <button type="button" className={tabClass("education")} onClick={() => setTab("education")}>
              <i className="uil uil-graduation-cap text-lg" /> Education
            </button>
            <button type="button" className={tabClass("experience")} onClick={() => setTab("experience")}>
              <i className="uil uil-briefcase-alt text-lg" /> Experience
            </button>
          </div>

          <div className="space-y-2 animate-fade-in-up">
            {items.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </AnimatedSection>
    </Section>
  );
};

export default Qualification;
