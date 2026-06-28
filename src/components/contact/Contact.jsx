import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT_CARDS } from "../../data/portfolio";
import AnimatedSection from "../common/AnimatedSection";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { Section, SectionHeader, Container } from "../ui/Section";

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M14.22 21.94C13.04 21.94 11.37 21.1 10.05 17.14L9.33 14.98L7.17 14.26C3.21 12.94 2.38 11.27 2.38 10.09C2.38 8.92 3.21 7.24 7.17 5.91L15.66 3.08C17.78 2.37 19.55 2.58 20.64 3.66C21.73 4.74 21.94 6.52 21.23 8.64L18.4 17.13C17.07 21.1 15.4 21.94 14.22 21.94ZM7.64 7.34C4.86 8.27 3.87 9.37 3.87 10.09C3.87 10.81 4.86 11.91 7.64 12.83L10.16 13.67C10.38 13.74 10.56 13.92 10.63 14.14L11.47 16.66C12.39 19.44 13.5 20.43 14.22 20.43C14.94 20.43 16.04 19.44 16.97 16.66L19.8 8.17C20.31 6.63 20.22 5.37 19.57 4.72C18.92 4.07 17.66 3.99 16.13 4.5L7.64 7.34Z" fill="currentColor" />
    <path d="M10.11 14.71C9.92 14.71 9.73 14.64 9.58 14.49C9.29 14.2 9.29 13.72 9.58 13.43L13.16 9.84C13.45 9.55 13.93 9.55 14.22 9.84C14.51 10.13 14.51 10.61 14.22 10.9L10.64 14.49C10.5 14.64 10.3 14.71 10.11 14.71Z" fill="currentColor" />
  </svg>
);

const inputClass =
  "w-full rounded-xl border border-black/20 bg-white px-5 py-4 text-zinc-800 outline-none transition-all focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 dark:border-slate-700/50 dark:bg-[#161622] dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_0wgu52u", "template_dmqyceo", form.current, "ugIp_KbdrCcjmY1d5")
      .then(() => e.target.reset());
  };

  return (
    <Section id="contact">
      <SectionHeader title="Get in touch" subtitle="Contact Me" />

      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16 justify-center">
        <AnimatedSection direction="left" delay={0.1}>
          <h3 className="mb-6 text-center text-lg font-semibold text-zinc-800 dark:text-slate-100">
            Talk to me
          </h3>
          <div className="space-y-4 max-w-sm mx-auto">
            {CONTACT_CARDS.map(({ icon, title, value, href, external }) => (
              <Card key={title} className="text-center">
                <i className={`bx ${icon} text-3xl text-brand-light dark:text-indigo-400`} />
                <h4 className="mt-2 text-sm font-medium text-zinc-800 dark:text-slate-100">{title}</h4>
                <p className="my-2 text-xs text-zinc-500 break-all dark:text-slate-500">{value}</p>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-light hover:gap-2 transition-all dark:text-indigo-400"
                  >
                    Write me <i className="bx bx-right-arrow-alt" />
                  </a>
                ) : (
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-light hover:gap-2 transition-all dark:text-indigo-400"
                  >
                    Write me <i className="bx bx-right-arrow-alt" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.2}>
          <h3 className="mb-6 text-center text-lg font-semibold text-zinc-800 dark:text-slate-100">
            Write me your project
          </h3>
          <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto space-y-6">
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Insert your name" },
              { name: "email", label: "Mail", type: "email", placeholder: "Insert your email" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs text-brand-light dark:bg-[#161622] dark:text-indigo-400">
                  {label}
                </label>
                <input type={type} name={name} required placeholder={placeholder} className={inputClass} />
              </div>
            ))}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-1 text-xs text-brand-light dark:bg-[#161622] dark:text-indigo-400">
                Project
              </label>
              <textarea
                name="project"
                rows="8"
                required
                placeholder="Write your project"
                className={`${inputClass} resize-none`}
              />
            </div>
            <Button type="submit" className="w-full justify-center">
              Send Message <SendIcon />
            </Button>
          </form>
        </AnimatedSection>
      </Container>
    </Section>
  );
};

export default Contact;
