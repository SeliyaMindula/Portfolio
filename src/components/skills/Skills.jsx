import React from "react";
import "./skills.css";
import Frontend from "./Frontend";
import Backend from "./Backend";
import Databases from "./Databases";
import CloudDevOps from "./CloudDevOps";
import AnimatedSection from "../common/AnimatedSection";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <AnimatedSection>
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My technical level</span>
      </AnimatedSection>

      <div className="skills__container container grid">
        <AnimatedSection delay={0.1}>
          <Frontend />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Backend />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <Databases />
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <CloudDevOps />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
