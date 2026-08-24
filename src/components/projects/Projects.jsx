import React from "react";
import { PROJECTS } from "../../data/portfolio";
import { StaggerGroup, StaggerItem } from "../common/StaggerGroup";
import GlassCard from "../ui/GlassCard";
import { Section, SectionHeader, Container } from "../ui/Section";

const ProjectCard = ({ title, subtitle, description, tech, href, featured }) => (
  <GlassCard className={`h-full flex flex-col ${featured ? "ring-2 ring-indigo-400/30 dark:ring-indigo-400/40" : ""}`}>
    {featured && (
      <span className="absolute -top-2.5 right-4 overflow-hidden rounded-full bg-accent-gradient px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
        <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.7)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer" />
        <span className="relative">Featured</span>
      </span>
    )}

    <div className="mb-4">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">{subtitle}</p>
    </div>

    <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">{description}</p>

    <div className="mb-5 flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-indigo-400/10 dark:text-indigo-300"
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
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-all hover:gap-2.5 dark:text-indigo-400"
      >
        Visit project <i className="bx bx-link-external" />
      </a>
    )}
  </GlassCard>
);

const Projects = () => (
  <Section id="projects">
    <SectionHeader title="Projects" subtitle="Recent work" />

    <Container>
      <StaggerGroup className="grid gap-6 md:grid-cols-2" staggerDelay={0.12}>
        {PROJECTS.map((project) => (
          <StaggerItem key={project.title}>
            <ProjectCard {...project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Container>
  </Section>
);

export default Projects;
