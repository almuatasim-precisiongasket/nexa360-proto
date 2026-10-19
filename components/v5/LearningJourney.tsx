"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollPageTo } from "@/lib/scroll-controller";
import s from "./story-scenes.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const steps = [
  {
    name: "Find the starting point",
    title: "Start with understanding.",
    copy: "Tell us the subject, the challenges and what your child wants to work towards. The consultation helps shape the right learning arrangement.",
    tag: "01 / YOUR CHILD’S NEEDS",
  },
  {
    name: "Learn by working it through",
    title: "Make room for the ‘why’.",
    copy: "A guided example becomes a chance to ask questions, explain a method and try it independently. Understanding comes before rushing ahead.",
    tag: "02 / GUIDED PRACTICE",
  },
  {
    name: "Keep parents in the picture",
    title: "See the next step together.",
    copy: "Explore how lesson feedback, practice priorities and attendance could sit together in the parent portal preview below.",
    tag: "03 / A CLEARER PICTURE",
  },
];

/** Scroll explains the sequence; every step is also directly selectable. */
export function LearningJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState(false);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-learning-beat]",
            root.current!,
          );
          panels.forEach((panel, index) => {
            ScrollTrigger.create({
              trigger: panel,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setActive(index),
              onEnterBack: () => setActive(index),
            });
          });
          gsap.fromTo(
            "[data-learning-orbit]",
            { rotation: -12 },
            {
              rotation: 18,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            },
          );
        },
      );
      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = root.current?.querySelector<HTMLElement>(`.${s.stage}`);
          const art = root.current?.querySelector<HTMLElement>(
            `.${s.stageArt}`,
          );
          if (!stage || !art) return;
          const x = gsap.quickTo(art, "x", {
            duration: 0.8,
            ease: "power3.out",
          });
          const y = gsap.quickTo(art, "y", {
            duration: 0.8,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            const box = stage.getBoundingClientRect();
            x(((event.clientX - box.left) / box.width - 0.5) * 14);
            y(((event.clientY - box.top) / box.height - 0.5) * 10);
          };
          const reset = () => {
            x(0);
            y(0);
          };
          stage.addEventListener("pointermove", move);
          stage.addEventListener("pointerleave", reset);
          return () => {
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
  function choose(index: number) {
    setActive(index);
    if (
      matchMedia(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      ).matches
    ) {
      const beat = root.current?.querySelector<HTMLElement>(
        `[data-learning-beat="${index}"]`,
      );
      if (beat)
        scrollPageTo(beat, { offset: innerHeight * 0.3, duration: 0.9 });
    }
  }
  return (
    <div className={s.journey} ref={root} data-nexa-owned>
      <header className={s.journeyHeading}>
        <span className={s.kicker}>THE LEARNING JOURNEY</span>
        <h3>
          Small steps.
          <br />
          <em>Deeper understanding.</em>
        </h3>
        <p>Explore what a thoughtful learning journey can look like.</p>
      </header>
      <div className={s.journeyGrid}>
        <div className={s.stickyStage}>
          <div className={s.stage} data-step={active}>
            <div className={s.stageMeta}>
              <span>NEXA / LEARNING IN FOCUS</span>
              <span>0{active + 1} — 03</span>
            </div>
            <svg
              className={s.orbit}
              viewBox="0 0 600 600"
              fill="none"
              aria-hidden="true"
              data-learning-orbit
            >
              <circle cx="300" cy="300" r="235" />
              <ellipse
                cx="300"
                cy="300"
                rx="280"
                ry="138"
                transform="rotate(-32 300 300)"
              />
              <path d="M65 300h470M300 65v470" strokeDasharray="2 12" />
              <circle cx="502" cy="180" r="5" fill="currentColor" />
            </svg>
            <div className={s.stageArt} aria-hidden="true">
              <svg viewBox="0 0 600 410" fill="none">
                <path
                  d="m80 300 220-95 220 95-220 92Z"
                  fill="#081b31"
                  stroke="#326aab"
                />
                <path
                  d="m80 300 220 73 220-73v18l-220 74-220-74Z"
                  fill="#102d50"
                />
                <g className={s.learningSheet}>
                  <path d="m135 188 184-58 148 96-184 63Z" fill="#f3f0e7" />
                  <path
                    d="m151 184 133 85 162-53"
                    stroke="#d2d5d5"
                    strokeWidth="2"
                  />
                  <path
                    d="m179 186 80-24m-57 41 110-34m-88 49 82-25m-60 41 112-34"
                    stroke="#718599"
                    strokeWidth="3"
                  />
                  <path
                    d="m352 185 25 16 35-11"
                    stroke="#b29860"
                    strokeWidth="4"
                  />
                </g>
                <g className={s.learningPencil}>
                  <path d="m360 100 14-8 80 105-14 9Z" fill="#d1b87c" />
                  <path d="m440 206 14-9 6 23Z" fill="#ebe4d2" />
                  <path d="m456 215 4 5-8-2Z" fill="#0b233b" />
                  <path d="m360 100 14-8-8-10-14 8Z" fill="#366db1" />
                </g>
                <g className={s.learningSignal}>
                  <path
                    d="M288 145v-37m0-22V59m0-19V18"
                    stroke="#bdab75"
                    strokeWidth="2"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="288"
                    cy="60"
                    r="26"
                    fill="#123c6d"
                    stroke="#597dab"
                  />
                  <path
                    d="m277 60 8 8 16-18"
                    stroke="#e3cc91"
                    strokeWidth="3"
                  />
                </g>
              </svg>
            </div>
            <div className={s.sampleCard} data-sample={active}>
              <span className={s.sampleLabel}>
                ILLUSTRATIVE EXAMPLE · NOT A STUDENT RECORD
              </span>
              {active === 0 ? (
                <>
                  <strong>A starting point, together.</strong>
                  <div className={s.subjects}>
                    <span>Subject</span>
                    <b>Mathematics</b>
                    <span>Focus</span>
                    <b>Explaining a method</b>
                  </div>
                </>
              ) : active === 1 ? (
                <>
                  <strong>2x + 3 = 11</strong>
                  <p>What would you do first?</p>
                  <button
                    type="button"
                    className={s.exampleButton}
                    onClick={() => setAnswer(!answer)}
                    aria-expanded={answer}
                  >
                    {answer
                      ? "Subtract 3 → 2x = 8 → x = 4"
                      : "Reveal a worked example ↗"}
                  </button>
                </>
              ) : (
                <>
                  <strong>A clearer conversation.</strong>
                  <div className={s.reportLine}>
                    <i />
                    Lesson feedback
                  </div>
                  <div className={s.reportLine}>
                    <i />
                    Next practice priority
                  </div>
                  <a href="#parent-portal" className={s.exampleButton}>
                    Explore the parent preview ↗
                  </a>
                </>
              )}
            </div>
            <div className={s.stepControls} aria-label="Learning journey steps">
              {steps.map((step, index) => (
                <button
                  type="button"
                  key={step.name}
                  aria-label={step.name}
                  aria-pressed={active === index}
                  onClick={() => choose(index)}
                >
                  <span>0{index + 1}</span>
                  <i />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={s.beats}>
          {steps.map((step, index) => (
            <article
              key={step.name}
              className={s.beat}
              data-learning-beat={index}
              data-active={active === index}
            >
              <span className={s.kicker}>{step.tag}</span>
              <h4>{step.title}</h4>
              <p>{step.copy}</p>
              <button
                type="button"
                onClick={() => choose(index)}
                aria-pressed={active === index}
              >
                {step.name}
                <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
