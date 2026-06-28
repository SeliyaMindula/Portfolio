import React, { useState } from "react";
import "./qualification.css";
import AnimatedSection from "../common/AnimatedSection";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification section" id="qualifications">
      <AnimatedSection>
        <h2 className="section__title">Qualification</h2>
        <span className="section__subtitle">My personal journey</span>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="qualification__container container">
          <div className="qualification__tabs">
            <div
              className={
                toggleState === 1
                  ? "qualification__button qualification__active button--flex"
                  : "qualification__button button--flex"
              }
              onClick={() => toggleTab(1)}
            >
              <i className="uil uil-graduation-cap qualification__icon"></i>
              Education
            </div>

            <div
              className={
                toggleState === 2
                  ? "qualification__button qualification__active button--flex"
                  : "qualification__button button--flex"
              }
              onClick={() => toggleTab(2)}
            >
              <i className="uil uil-briefcase-alt qualification__icon"></i>
              Experience
            </div>
          </div>

          <div className="qualification__sections">
            <div
              className={
                toggleState === 1
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div className="qualification__card">
                  <h3 className="qualification__title">
                    Sri Lanka Institute of Information Technology
                  </h3>
                  <span className="qualification__subtitle">
                    BSc. Special (Hons) – Information Technology
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i>
                    2019 - 2023
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div className="qualification__card">
                  <h3 className="qualification__title">Matara Central College</h3>
                  <span className="qualification__subtitle">
                    GCE Advanced Level
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i>
                    2016 - 2018
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>
            </div>

            <div
              className={
                toggleState === 2
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div className="qualification__card">
                  <h3 className="qualification__title">Equitymatch</h3>
                  <span className="qualification__subtitle">
                    Software Engineer
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i>
                    Jun 2024 - Present
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div className="qualification__card">
                  <h3 className="qualification__title">
                    Yara Technologies (Pvt) Ltd
                  </h3>
                  <span className="qualification__subtitle">
                    Associate Software Engineer
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i>
                    Oct 2022 - Nov 2023
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div className="qualification__card">
                  <h3 className="qualification__title">
                    Bluechip Technologies Asia (Pvt) Ltd
                  </h3>
                  <span className="qualification__subtitle">
                    React Web Developer - Internship
                  </span>
                  <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i>
                    Jul 2021 - Jan 2022
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Qualification;
