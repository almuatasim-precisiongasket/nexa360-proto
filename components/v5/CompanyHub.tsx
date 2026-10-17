"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { About, Projects, People, Events } from "./Editorial";
import s from "./v5.module.css";
const sections = [
  { id: "about", name: "About NEXA360" },
  { id: "initiatives", name: "Our projects" },
  { id: "team", name: "Meet the team" },
  { id: "events", name: "Events" },
];
export function CompanyHub() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const choose = (hash: string) => {
      const index = sections.findIndex((x) => `#${x.id}` === hash);
      if (index >= 0) setSelected(index);
    };
    const frame = requestAnimationFrame(() => choose(location.hash));
    const click = (e: MouseEvent) => {
      if (
        !(e.target instanceof Element) ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const hash = e.target
        .closest<HTMLAnchorElement>('a[href^="#"]')
        ?.getAttribute("href");
      if (hash) choose(hash);
    };
    const hash = () => choose(location.hash);
    document.addEventListener("click", click);
    window.addEventListener("hashchange", hash);
    window.addEventListener("popstate", hash);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", click);
      window.removeEventListener("hashchange", hash);
      window.removeEventListener("popstate", hash);
    };
  }, []);
  return (
    <section
      data-v5-dynamic
      id="about"
      className={`section ${s.companyHub}`}
      tabIndex={-1}
    >
      <span id="initiatives" className={s.anchor} />
      <span id="team" className={s.anchor} />
      <span id="events" className={s.anchor} />
      <div className={s.companyNav}>
        <div>
          <span className={s.eyebrow}>GET TO KNOW NEXA360</span>
          <h2>Our company. Our people. Our work.</h2>
        </div>
        <div
          className={s.companyTabs}
          role="group"
          aria-label="Explore company information"
        >
          {sections.map((item, i) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={selected === i}
              aria-controls="company-content"
              onClick={() => setSelected(i)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        id="company-content"
        key={selected}
        initial={reduced ? false : { opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {selected === 0 ? (
          <About sectionId="about-detail" />
        ) : selected === 1 ? (
          <Projects sectionId="projects-detail" />
        ) : selected === 2 ? (
          <People sectionId="team-detail" />
        ) : (
          <Events sectionId="events-detail" />
        )}
      </motion.div>
    </section>
  );
}
