"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./learning-guide.module.css";

const chapters = [
  ["learning-tools", "Learning system"],
  ["exam-practice", "Exam practice"],
  ["parent-preview", "Parent view"],
  ["future-skills", "Future skills"],
] as const;

export function LearningGuide() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(chapters[0][0]);
  useEffect(() => {
    const guide = root.current;
    const section = guide?.closest<HTMLElement>("#products");
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!guide || !section || !header) return;
    const targets = chapters.map(([id]) => document.getElementById(id));
    let frame = 0;
    const update = () => {
      const headerHeight = header.getBoundingClientRect().height;
      const offset = headerHeight + guide.getBoundingClientRect().height + 24;
      guide.style.setProperty("--guide-top", `${headerHeight}px`);
      section.style.setProperty("--chapter-offset", `${offset}px`);
      section.style.setProperty(
        "--page-scroll-padding",
        `${parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0}px`,
      );
      let current: string = chapters[0][0];
      targets.forEach((target) => {
        if (target && target.getBoundingClientRect().top <= offset + 32)
          current = target.id;
      });
      setActive(current);
      frame = 0;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(request);
    observer.observe(header);
    observer.observe(guide);
    observer.observe(section);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      section.style.removeProperty("--chapter-offset");
      section.style.removeProperty("--page-scroll-padding");
    };
  }, []);

  const follow = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    target.focus({ preventScroll: true });
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      ref={root}
      className={styles.guide}
      aria-label="Explore the learning experience"
    >
      {chapters.map(([id, label], index) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={(event) => follow(event, id)}
        >
          <span aria-hidden="true">0{index + 1}</span>
          <strong>{label}</strong>
        </a>
      ))}
    </nav>
  );
}
