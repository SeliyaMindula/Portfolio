import React from "react";
import AboutImg from "../../assets/about.png";
import CV from "../../assets/SeliyaCV.pdf";
import { ABOUT_STATS } from "../../data/portfolio";
import AnimatedSection from "../common/AnimatedSection";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { Section, SectionHeader, Container } from "../ui/Section";

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M15.25 22.75H9.25C3.82 22.75 1.5 20.43 1.5 15V9C1.5 3.57 3.82 1.25 9.25 1.25H14.25C14.66 1.25 15 1.59 15 2C15 2.41 14.66 2.75 14.25 2.75H9.25C4.64 2.75 3 4.39 3 9V15C3 19.61 4.64 21.25 9.25 21.25H15.25C19.86 21.25 21.5 19.61 21.5 15V10C21.5 9.59 21.84 9.25 22.25 9.25C22.66 9.25 23 9.59 23 10V15C23 20.43 20.68 22.75 15.25 22.75Z" fill="currentColor" />
    <path d="M22.25 10.75H18.25C14.83 10.75 13.5 9.42 13.5 6V2C13.5 1.7 13.68 1.42 13.96 1.31C14.24 1.19 14.56 1.26 14.78 1.47L22.78 9.47C22.99 9.68 23.06 10.01 22.94 10.29C22.82 10.57 22.55 10.75 22.25 10.75ZM15 3.81V6C15 8.58 15.67 9.25 18.25 9.25H20.44L15 3.81Z" fill="currentColor" />
    <path d="M13.25 13.75H7.25C6.84 13.75 6.5 13.41 6.5 13C6.5 12.59 6.84 12.25 7.25 12.25H13.25C13.66 12.25 14 12.59 14 13C14 13.41 13.66 13.75 13.25 13.75Z" fill="currentColor" />
    <path d="M11.25 17.75H7.25C6.84 17.75 6.5 17.41 6.5 17C6.5 16.59 6.84 16.25 7.25 16.25H11.25C11.66 16.25 12 16.59 12 17C12 17.41 11.66 17.75 11.25 17.75Z" fill="currentColor" />
  </svg>
);

const About = () => (
  <Section id="about">
    <SectionHeader title="About Me" subtitle="My introduction" />

    <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <AnimatedSection direction="left" delay={0.1}>
        <img
          src={AboutImg}
          alt="Seliya Kumanayaka"
          className="mx-auto w-64 md:w-80 rounded-2xl transition-transform hover:scale-[1.02]"
        />
      </AnimatedSection>

      <AnimatedSection direction="right" delay={0.2}>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {ABOUT_STATS.map(({ icon, title, value }) => (
            <Card key={title} className="text-center !p-4">
              <i className={`bx ${icon} text-2xl text-brand-light dark:text-indigo-400`} />
              <h3 className="mt-2 text-sm font-medium text-zinc-800 dark:text-slate-100">{title}</h3>
              <span className="text-[10px] text-zinc-500 dark:text-slate-500">{value}</span>
            </Card>
          ))}
        </div>

        <p className="mb-6 leading-relaxed text-zinc-600 dark:text-slate-400 md:text-left text-center">
          Highly motivated and results-oriented Full-Stack Developer with a strong foundation
          in design, integration, and problem-solving. Passionate about translating business
          requirements into technical solutions and successfully implementing and launching new
          projects. I develop and maintain full-stack web applications using React.js, Node.js,
          NestJS, and MongoDB, with experience in Angular, Vue.js, AWS cloud services, and CI/CD
          pipelines.
        </p>

        <div className="flex justify-center md:justify-start">
          <Button href={CV} download>
            Download CV <DownloadIcon />
          </Button>
        </div>
      </AnimatedSection>
    </Container>
  </Section>
);

export default About;
