import React from "react";
import { SKILL_GROUPS } from "../../data/portfolio";
import AnimatedSection from "../common/AnimatedSection";
import Card from "../ui/Card";
import { Section, SectionHeader, Container } from "../ui/Section";

const SkillCard = ({ title, skills }) => (
  <Card className="h-full group">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left hidden dark:block" />
    <h3 className="mb-5 text-center font-semibold text-zinc-800 dark:text-slate-100">{title}</h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {skills.map(({ name, level }) => (
        <div key={name} className="flex gap-2 transition-transform hover:translate-x-1">
          <i className="bx bx-badge-check text-indigo-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-zinc-800 dark:text-slate-100">{name}</p>
            <span className="text-[10px] text-zinc-500 dark:text-slate-500 dark:bg-indigo-500/10 dark:px-2 dark:py-0.5 dark:rounded-full">
              {level}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Skills = () => (
  <Section id="skills">
    <SectionHeader title="Skills" subtitle="My technical level" />

    <Container className="grid gap-6 md:grid-cols-2">
      {SKILL_GROUPS.map((group, i) => (
        <AnimatedSection key={group.title} delay={0.1 * (i + 1)}>
          <SkillCard {...group} />
        </AnimatedSection>
      ))}
    </Container>
  </Section>
);

export default Skills;
