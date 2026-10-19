"use client";
import { useEffect, useState } from "react";
import s from "./story-scenes.module.css";

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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const book = document.getElementById("book-experience");
    const bookObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive("");
    });
    if (book) bookObserver.observe(book);
    return () => {
      observer.disconnect();
      bookObserver.disconnect();
    };
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
