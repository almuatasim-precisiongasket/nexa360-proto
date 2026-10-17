"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow, Logo } from "./Logo";
import {
  LazyMotion,
  domMax,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { requestConsultation } from "@/lib/business-content";
const links = [
  ["tuition", "GCSE Tuition"],
  ["technical", "Skills Courses"],
  ["pathways", "For Organisations"],
  ["about", "About"],
];
const sectionGroups: Record<string, string> = {
  team: "about",
  collaboration: "pathways",
  initiatives: "about",
  events: "about",
};
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const readingProgress = useMotionValue(0);
  useEffect(() => {
    let frame = 0;
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main>.section"),
    ];
    const learning = document.getElementById("tuition");
    const update = () => {
      setScrolled(window.scrollY > 35);
      let current = "";
      sections.forEach((section) => {
        const r = section.getBoundingClientRect();
        if (r.top < innerHeight * 0.35 && r.bottom > 0) current = section.id;
      });
      setActive(sectionGroups[current] ?? current);
      // The reading indicator follows the service sections, after the route finder.
      if (learning) {
        const start =
          learning.getBoundingClientRect().top + window.scrollY - 80;
        const end = document.documentElement.scrollHeight - innerHeight;
        readingProgress.set(
          Math.min(
            1,
            Math.max(0, (window.scrollY - start) / Math.max(1, end - start)),
          ),
        );
      }
      frame = 0;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    const observer = new ResizeObserver(request);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      observer.disconnect();
    };
  }, [readingProgress]);
  useEffect(() => {
    const media = matchMedia("(max-width: 900px)");
    const sync = () => {
      if (nav.current) nav.current.inert = media.matches && !open;
    };
    sync();
    media.addEventListener("change", sync);
    const focusFrame = requestAnimationFrame(() => {
      if (open && media.matches)
        nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      cancelAnimationFrame(focusFrame);
      media.removeEventListener("change", sync);
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <LazyMotion features={domMax} strict>
      <header
        ref={root}
        className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
      >
        <a href="#home" aria-label="NEXA360 home">
          <Logo />
        </a>
        <nav id="main-navigation" aria-label="Main navigation" ref={nav}>
          {links.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setOpen(false);
                const target = document.getElementById(id);
                if (target) {
                  target.tabIndex = -1;
                  target.focus({ preventScroll: true });
                }
              }}
            >
              {label}
              {active === id && (
                <m.span
                  className="nav-motion-line"
                  layoutId="active-section-line"
                  transition={{
                    duration: reduced ? 0 : 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="header-contact spotlight-surface react-border-glow"
          aria-current={active === "contact" ? "location" : undefined}
          onClick={() => {
            setOpen(false);
            requestConsultation({ category: "", audience: "Individual" });
          }}
        >
          Book Consultation <Arrow />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <m.div
          className="magic-reading-progress"
          style={{ scaleX: readingProgress }}
          aria-hidden="true"
        />
      </header>
    </LazyMotion>
  );
}
