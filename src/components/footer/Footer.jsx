import React from "react";
import { FOOTER_LINKS, FOOTER_SOCIAL } from "../../data/portfolio";
import { Container } from "../ui/Section";

const Footer = () => (
  <footer className="border-t border-black/10 bg-white py-8 dark:border-white/10 dark:bg-ink-900">
    <Container className="text-center">
      <ul className="flex justify-center gap-6 mb-6">
        {FOOTER_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-sm text-zinc-800 hover:text-indigo-600 transition-colors dark:text-slate-100 dark:hover:text-indigo-400"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 mb-8">
        {FOOTER_SOCIAL.map(({ href, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-white transition-all hover:bg-black dark:bg-white/5 dark:border dark:border-white/10 dark:hover:bg-accent-gradient dark:hover:text-ink-950 dark:hover:border-transparent"
          >
            <i className={`bx ${icon}`} />
          </a>
        ))}
      </div>

      <p className="text-xs text-zinc-500 dark:text-slate-500">
        &copy; {new Date().getFullYear()} Seliya Kumanayaka. All rights reserved.
      </p>
    </Container>
  </footer>
);

export default Footer;
