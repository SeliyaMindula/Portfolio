# Portfolio UI Redesign — Modern Dark-Glass Theme with Advanced Animation

## Context

The current portfolio (`Portfolio` repo) is a React 18 + Tailwind CSS single-page site (`react-scripts`/CRA, deployed via `gh-pages`). It has six content sections rendered from `App.js` (`Home`, `About`, `Skills`, `Projects`, `Qualification`, `Contact`) plus `Header`, `Footer`, and `ScrollUp`. Content is centralized in `src/data/portfolio.js`. Styling uses Tailwind utility classes with a light theme (default) and a `dark` variant selected via `data-theme` attribute (`src/context/ThemeContext.jsx`). Motion today is CSS-only: `tailwind.config.js` keyframes (`float`, `profile-morph`, `fade-in-up`, `bounce-arrow`, `blink`, `scroll`) plus a custom `useInView` hook (`src/hooks/useInView.js`) driving `AnimatedSection` (`src/components/common/AnimatedSection.jsx`) for scroll-triggered fade/slide-in. There is no animation library dependency today. A `Services.jsx` component with its own `services.css` exists but is not imported anywhere in `App.js` — it's dead code and out of scope for this change.

The goal is a full visual and motion overhaul: a modern, dark-glass SaaS aesthetic with a new cyan/teal accent palette, dark-mode as the signature look (light mode as a clean simplified variant), and a richer animation system built on Framer Motion — while preserving all existing content, data, section order, and working integrations (EmailJS contact form, theme toggle, routing-free single-page anchor navigation).

## Goals

- Replace the visual design system (colors, surfaces, typography treatment) with a dark-glass, glow-accented, cyan/teal aesthetic.
- Replace the CSS-keyframe/`useInView` animation approach with Framer Motion, adding: scroll-triggered reveals with stagger/parallax, a hero load-in sequence, magnetic/tilt hover on buttons and cards, a custom animated cursor (desktop only), smooth section-entrance transitions, and an animated gradient-mesh background.
- Preserve all current content, section order, data (`src/data/portfolio.js`), routing/anchors, EmailJS contact flow, and the light/dark theme toggle mechanism.
- Keep light mode functional and clean, but simpler than dark mode (no glass/glow/cursor/mesh effects necessarily at full intensity).
- Respect `prefers-reduced-motion` and disable cursor/tilt/parallax effects on touch devices.

## Non-goals

- No content/copy changes, no reordering or adding new sections (e.g. no testimonials section).
- No routing changes (stays a single-page anchor-scroll site).
- No backend/EmailJS logic changes.
- No revival or removal of the unused `Services.jsx`/`services.css` — left as-is, untouched.
- No new icon library — keep Boxicons/Unicons CDN icons already loaded in `public/index.html`.

## Design system

**Dependency:** add `framer-motion` as the only new runtime dependency.

**Color palette (`tailwind.config.js`):**
- Dark mode (signature): background `#05070d` → `#0a0e1a` gradient base, glass surfaces `bg-white/5` with `backdrop-blur-xl` and `border-white/10`, accent gradient cyan `#22d3ee` → teal `#14b8a6`, text `slate-100`/`slate-400` as today.
- Light mode (simplified variant): white/`zinc-50` surfaces, no blur/glass, same cyan/teal accent used more sparingly (borders, links, icons), no animated mesh background (static subtle gradient or none), reduced-motion-friendly by default.
- Replace the current `brand.light`/`brand.dark` indigo/violet tokens with new `accent.from` (`#22d3ee`) / `accent.to` (`#14b8a6`) tokens; update all `dark:` indigo/violet utility classes across components to the new accent.

**Typography:** keep `Inter` font; increase hero/heading scale slightly and tighten tracking on large headings for a bolder look. No new font is introduced.

**Motion primitives (Framer Motion patterns used throughout):**
- `variants` + `staggerChildren` for section/list entrances
- `whileInView` (with `viewport={{ once: true }}`) for scroll-triggered reveals, replacing `useInView`/`AnimatedSection`
- `useScroll` + `useTransform` for background parallax and the qualification timeline path-draw
- `whileHover`/`whileTap` for magnetic buttons, tilt cards, and link micro-interactions
- `AnimatePresence` for the hero intro sequence and the mobile nav menu

## New/changed UI primitives (`src/components/ui`, `src/components/common`)

- `GlassCard` — replaces `Card.jsx`. Glass surface in dark mode (flat card in light mode), animated gradient border/glow on hover, optional subtle tilt-on-hover (disabled on touch).
- `MagneticButton` — replaces `Button.jsx`. Same API (variant/href/download/props passthrough) but adds cursor-following magnetic pull on desktop pointer move within bounds, spring back on leave, tap scale feedback.
- `GradientText` — inline component for accent-gradient headline text (replaces ad hoc `dark:bg-gradient-to-r ... bg-clip-text` spans).
- `RevealText` — word/character stagger reveal wrapper for key headings (used sparingly: hero name/tagline, section titles).
- `AnimatedBackground` — layered gradient-mesh blobs (absolute-positioned, blurred) that drift continuously and shift slightly with scroll (`useTransform`); blob count/complexity reduced on mobile widths; dark-mode only (light mode gets a much lighter/optional version or none, per "simplified" requirement).
- `CustomCursor` — fixed-position glowing dot + trailing ring, scales up over interactive elements (links/buttons/cards), mounted only when `window.matchMedia("(pointer: fine)")` is true and `prefers-reduced-motion` is not set; hides the native cursor only when active.
- `SectionReveal` — replaces `AnimatedSection.jsx`; same directional-offset API (`up`/`down`/`left`/`right`, `delay`) but implemented with Framer Motion `whileInView`/`variants` instead of the `useInView` hook + CSS transition classes.

`src/hooks/useInView.js` becomes unused once `SectionReveal` lands and can be removed; `AnimatedSection.jsx` is replaced by `SectionReveal.jsx`. Tailwind's CSS-keyframe animations (`float`, `profile-morph`, `fade-in-up`, `bounce-arrow`, `blink`, `scroll`) are removed from `tailwind.config.js` once their usages are ported to Framer Motion equivalents (blink caret and scroll-indicator can stay as lightweight CSS if simpler — decided during implementation, not user-visible either way).

## Global chrome changes

**Hero intro (`Home.jsx`):** On first mount (session-scoped, e.g. `sessionStorage` flag so it doesn't replay on every scroll-back-to-top or anchor nav), play a brief sequence via `AnimatePresence`/`variants`: name reveal → typewriter tagline (existing `useTypewriter` hook kept) → remaining hero content (image, bio, buttons, social rail) staggers in. Total under ~1.5s so it doesn't feel like a blocking splash screen.

**Header (`Header.jsx`):** Keep existing scroll-spy/mobile-menu state logic; restyle the nav as a floating glass pill (dark mode) that blurs/shrinks further on scroll, animate the active-link indicator sliding between links (`layoutId` shared element) instead of the current `after:scale-x-*` CSS trick. Mobile menu panel animates in with slide+stagger via `AnimatePresence`.

**Section transitions:** Since this is a single-page scroller (no route changes), "smooth section/nav transition animations" means: scroll-triggered entrance animation per section (via `SectionReveal`) plus the header's active-state transition — not full page/route transitions.

## Section-by-section treatment

- **Home:** `AnimatedBackground` behind hero, `MagneticButton` CTAs, glass social rail, glowing/animated profile image frame (keep existing profile-morph blob shape, drive via Framer Motion instead of CSS animation), hero intro sequence as above.
- **About:** stat cards (`GlassCard`) get tilt-on-hover and count-up-on-reveal for numeric values embedded in `ABOUT_STATS`; about image gets a subtle parallax drift on scroll.
- **Skills:** skill group cards stagger in via `SectionReveal`; each skill row's level badge gets a small fill/progress animation on reveal (visual flourish only, no new data shape needed).
- **Projects:** project cards (`GlassCard`) get tilt + a cursor-follow glow border on hover; featured badge gets a subtle shimmer/sheen loop.
- **Qualification:** timeline connector line animates as a drawing path tied to scroll progress (`useScroll`/`useTransform`), timeline dots pulse; switching the Education/Experience tab animates as a slide/crossfade instead of an instant swap.
- **Contact:** form inputs get an animated focus glow border; submit button shows a spring/success micro-animation on the existing success/error states (no change to EmailJS logic/handlers).
- **Footer / ScrollUp:** restyled to match the glass/gradient language; `ScrollUp` button gets a magnetic hover to match other buttons.

## Accessibility & performance

- Wrap Framer Motion usage so that when `window.matchMedia("(prefers-reduced-motion: reduce)")` is true, all components fall back to simple opacity fades with no parallax, no cursor-follow, no magnetic pull, and no continuous background motion.
- `CustomCursor`, magnetic buttons, and tilt cards detect touch/coarse-pointer devices (`(pointer: fine)`) and fully disable pointer-follow behavior there (falling back to normal hover/tap states), since these effects don't translate to touch.
- `AnimatedBackground` animates only `transform`/`opacity` (GPU-composited), and renders fewer/simpler blobs below the `md` breakpoint.
- No layout-shifting animations on initial paint beyond the intentional hero intro; hero intro must not delay Lighthouse-relevant content beyond ~1.5s and must not block scrolling/interaction while playing.

## Migration approach

1. Add `framer-motion` dependency.
2. Update `tailwind.config.js` with the new color tokens (remove `brand.light`/`brand.dark`, add `accent.from`/`accent.to`), remove now-superseded keyframes as their consumers are ported.
3. Build new primitives (`GlassCard`, `MagneticButton`, `GradientText`, `RevealText`, `AnimatedBackground`, `CustomCursor`, `SectionReveal`) in `src/components/ui` / `src/components/common`, alongside the existing ones initially.
4. Swap each section (`Home`, `About`, `Skills`, `Projects`, `Qualification`, `Contact`), plus `Header`, `Footer`, `ScrollUp`, over to the new primitives/palette one at a time, verifying visually in both light and dark mode after each.
5. Remove now-dead code: `Card.jsx`, `Button.jsx`, `AnimatedSection.jsx`, `useInView.js` (only after all consumers are migrated), and any now-unused Tailwind keyframes.
6. Leave `src/data/portfolio.js`, `ThemeContext.jsx`, EmailJS env/config, and `Services.jsx` untouched.

## Risks / open items for implementation

- Hero intro session-scoping (`sessionStorage` vs. always-on-first-paint-only) is an implementation detail to finalize during coding; either is acceptable as long as it doesn't replay annoyingly on every anchor click.
- Whether `blink`/`scroll` CSS keyframes are ported to Framer Motion or kept as-is is a minor implementation call with no visible difference to the user.
- Exact blob count/opacity for `AnimatedBackground` and exact magnetic-pull strength/tilt degrees are visual-tuning details to be finalized while implementing, within the spec's intent (subtle/premium, not gaudy).
