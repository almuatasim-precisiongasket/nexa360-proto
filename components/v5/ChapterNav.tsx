"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import s from "./story-scenes.module.css";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: "welcome", label: "Choose your path" },
  { id: "tuition", label: "GCSE tuition" },
  { id: "technical", label: "Skills courses" },
  { id: "pathways", label: "Organisations" },
  { id: "contact", label: "Consultation" },
];
export function ChapterNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const update = () => {
      const position = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top + window.scrollY <= position)
          current = section.id;
      }
      setActive(current);
    };
    const tracker = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => tracker.kill();
  }, []);
  return (
    <nav
      className={s.chapterNav}
      aria-label="Learning chapters"
      data-visible={Boolean(active)}
    >
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          aria-current={active === chapter.id ? "location" : undefined}
        >
          <span className={s.navLabel}>{chapter.label}</span>
          <span className={s.navDot}>0{index + 1}</span>
        </a>
      ))}
    </nav>
  );
}
