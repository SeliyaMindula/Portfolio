import React from "react";
import { PROJECTS } from "../../data/portfolio";
import AnimatedSection from "../common/AnimatedSection";
import Card from "../ui/Card";
import { Section, SectionHeader, Container } from "../ui/Section";

const ProjectCard = ({ title, subtitle, description, tech, href, featured }) => (
  <Card className={`h-full flex flex-col ${featured ? "ring-2 ring-indigo-500/30 dark:ring-indigo-500/40" : ""}`}>
    {featured && (
      <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
        Featured
      </span>
    )}

    <div className="mb-4">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-brand-light dark:text-indigo-400">{subtitle}</p>
    </div>

    <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">{description}</p>

    <div className="mb-5 flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-indigo-500/10 dark:text-indigo-300"
        >
          {item}
        </span>
      ))}
    </div>

    {href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light transition-all hover:gap-2.5 dark:text-indigo-400"
      >
        Visit project <i className="bx bx-link-external" />
      </a>
    )}
  </Card>
);

const Projects = () => (
  <Section id="projects">
    <SectionHeader title="Projects" subtitle="Recent work" />

    <Container className="grid gap-6 md:grid-cols-2">
      {PROJECTS.map((project, i) => (
        <AnimatedSection key={project.title} delay={0.1 * (i + 1)}>
          <ProjectCard {...project} />
        </AnimatedSection>
      ))}
    </Container>
  </Section>
);

export default Projects;
