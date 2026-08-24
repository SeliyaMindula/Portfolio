import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../../data/portfolio";
import { StaggerGroup, StaggerItem } from "../common/StaggerGroup";
import GlassCard from "../ui/GlassCard";
import { Section, SectionHeader, Container } from "../ui/Section";

const LEVEL_FILL = {
  Advanced: 92,
  Intermediate: 65,
};

const SkillCard = ({ title, skills }) => (
  <GlassCard className="h-full">
    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-accent-gradient scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    <h3 className="mb-5 text-center font-semibold text-zinc-800 dark:text-slate-100">{title}</h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      {skills.map(({ name, level }) => (
        <div key={name} className="transition-transform hover:translate-x-1">
          <div className="flex gap-2">
            <i className="bx bx-badge-check text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-800 dark:text-slate-100">{name}</p>
              <span className="text-[10px] text-zinc-500 dark:text-slate-500 dark:bg-indigo-400/10 dark:px-2 dark:py-0.5 dark:rounded-full">
                {level}
              </span>
            </div>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-accent-gradient"
              initial={{ width: 0 }}
              whileInView={{ width: `${LEVEL_FILL[level] || 50}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

const Skills = () => (
  <Section id="skills">
    <SectionHeader title="Skills" subtitle="My technical level" />

    <Container>
      <StaggerGroup className="grid gap-6 md:grid-cols-2" staggerDelay={0.15}>
        {SKILL_GROUPS.map((group) => (
          <StaggerItem key={group.title}>
            <SkillCard {...group} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);

export default Skills;
