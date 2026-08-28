import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import profileImg from "../../assets/profile.jpg";
import { useTypewriter } from "../../hooks/useTypewriter";
import CV from "../../assets/SeliyaCV.pdf";
import { SOCIAL_LINKS } from "../../data/portfolio";
import MagneticButton from "../ui/MagneticButton";
import RevealText from "../ui/RevealText";
import AnimatedBackground from "../common/AnimatedBackground";
import { Container } from "../ui/Section";

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.22 21.94C13.04 21.94 11.37 21.1 10.05 17.14L9.33 14.98L7.17 14.26C3.21 12.94 2.38 11.27 2.38 10.09C2.38 8.92 3.21 7.24 7.17 5.91L15.66 3.08C17.78 2.37 19.55 2.58 20.64 3.66C21.73 4.74 21.94 6.52 21.23 8.64L18.4 17.13C17.07 21.1 15.4 21.94 14.22 21.94ZM7.64 7.34C4.86 8.27 3.87 9.37 3.87 10.09C3.87 10.81 4.86 11.91 7.64 12.83L10.16 13.67C10.38 13.74 10.56 13.92 10.63 14.14L11.47 16.66C12.39 19.44 13.5 20.43 14.22 20.43C14.94 20.43 16.04 19.44 16.97 16.66L19.8 8.17C20.31 6.63 20.22 5.37 19.57 4.72C18.92 4.07 17.66 3.99 16.13 4.5L7.64 7.34Z"
      fill="currentColor"
    />
    <path
      d="M10.11 14.71C9.92 14.71 9.73 14.64 9.58 14.49C9.29 14.2 9.29 13.72 9.58 13.43L13.16 9.84C13.45 9.55 13.93 9.55 14.22 9.84C14.51 10.13 14.51 10.61 14.22 10.9L10.64 14.49C10.5 14.64 10.3 14.71 10.11 14.71Z"
      fill="currentColor"
    />
  </svg>
);

const fadeUp = (delay, reduced) => ({
  initial: { opacity: 0, y: reduced ? 0 : 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const typedRole = useTypewriter(
    ["Software Engineer", "Full-Stack Developer", "React Native Developer"],
    80,
    1800
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-28 pb-12">
      <AnimatedBackground />

      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr_1.2fr] md:gap-8">
          <motion.div
            {...fadeUp(0.1, prefersReducedMotion)}
            className="hidden md:flex flex-col gap-4"
          >
            {SOCIAL_LINKS.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white text-zinc-600 transition-all hover:-translate-y-0.5 hover:border-zinc-800 hover:bg-zinc-800 hover:text-white dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl dark:text-slate-400 dark:hover:border-transparent dark:hover:bg-accent-gradient dark:hover:text-ink-950"
              >
                <i className={`uil ${icon}`} />
              </a>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.25, prefersReducedMotion)}
            className="order-1 md:order-none flex justify-center"
          >
            <div
              className={`relative ${prefersReducedMotion ? "" : "animate-float"}`}
            >
              <div className="absolute -inset-3 rounded-full bg-accent-gradient opacity-30 blur-2xl hidden dark:block" />
              <div
                className={`relative h-[200px] w-[200px] md:h-[300px] md:w-[300px] overflow-hidden border-4 border-[#fafafa] bg-white/40 dark:border-ink-950 dark:bg-white/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] ${
                  prefersReducedMotion ? "" : "animate-profile-morph"
                }`}
              >
                <img
                  src={profileImg}
                  alt="Seliya Kumanayaka"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          <div className="order-2 md:order-none">
            <motion.p
              {...fadeUp(0, prefersReducedMotion)}
              className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400"
            >
              Hello, I&apos;m
            </motion.p>
            <h1 className="overflow-visible text-4xl md:text-6xl font-bold tracking-tight leading-[1.2]">
              <RevealText
                text="Seliya Kumanayaka"
                wordClassName="overflow-visible bg-accent-gradient bg-clip-text pb-[0.18em] text-transparent"
              />
            </h1>
            <motion.h2
              {...fadeUp(0.5, prefersReducedMotion)}
              className="mt-2 min-h-[1.5em] text-lg md:text-xl text-zinc-600 dark:text-slate-300"
            >
              <span className="font-medium text-zinc-800 dark:text-slate-100">{typedRole}</span>
              <span className="inline-block w-0.5 h-[1em] ml-0.5 bg-indigo-400 align-text-bottom animate-blink" />
            </motion.h2>
            <motion.p
              {...fadeUp(0.6, prefersReducedMotion)}
              className="mt-4 max-w-md leading-relaxed text-zinc-600 dark:text-slate-400"
            >
              Full-Stack Software Engineer with 4+ years of experience building scalable web and
              mobile applications using React, React Native, Expo, Node.js, NestJS, and MongoDB —
              from concept to production on AWS and modern cloud platforms.
            </motion.p>
            <motion.div {...fadeUp(0.7, prefersReducedMotion)} className="mt-6 flex flex-wrap gap-4">
              <MagneticButton href="#contact">
                Say Hello <SendIcon />
              </MagneticButton>
              <MagneticButton href={CV} download variant="ghost">
                Download CV
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.a
          {...fadeUp(0.9, prefersReducedMotion)}
          href="#about"
          className="hidden md:inline-flex items-center gap-2 mt-16 ml-36 text-sm text-zinc-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 247 390" className="text-zinc-800 dark:text-slate-200">
            <path d="M123.359,79.775l0,72.843" fill="none" stroke="currentColor" strokeWidth="20" className="animate-scroll" />
            <path d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" fill="none" stroke="currentColor" strokeWidth="20" />
          </svg>
          Scroll Down
          <motion.i
            className="uil uil-arrow-down text-indigo-500"
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.a>
      </Container>
    </section>
  );
};

export default Home;
