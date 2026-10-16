"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TutorPreview } from "./TutorPreview";
import { FlashcardPreview } from "./FlashcardPreview";
import { StudyPlanPreview } from "./StudyPlanPreview";
import styles from "./tuition-experience.module.css";

const tools = [
  {
    id: "tutor",
    title: "Understand.",
    label: "AI TUTOR",
    copy: "A vision for clear explanations, guided questions and support aligned to your studies.",
  },
  {
    id: "cards",
    title: "Remember.",
    label: "FLASHCARDS",
    copy: "Turn a topic into focused revision. Try recalling the answer before you reveal it.",
  },
  {
    id: "plan",
    title: "Move forward.",
    label: "STUDY PLAN",
    copy: "Bring explanations, revision and practice together in a manageable week.",
  },
] as const;
type Tool = (typeof tools)[number]["id"];

export function LearningPreview() {
  const [tool, setTool] = useState<Tool>("tutor");
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const toolButtons = useRef<Record<Tool, HTMLButtonElement | null>>({
    tutor: null,
    cards: null,
    plan: null,
  });
  const selectTool = (next: Tool) => {
    if (next === tool) return;
    setDirection(
      Math.sign(
        tools.findIndex((item) => item.id === next) -
          tools.findIndex((item) => item.id === tool),
      ) || 1,
    );
    setTool(next);
  };
  const followLearning = (next: Tool) => {
    selectTool(next);
    toolButtons.current[next]?.focus({ preventScroll: true });
    root.current?.scrollIntoView({
      block: "start",
      behavior: reduced ? "instant" : "smooth",
    });
  };
  useEffect(() => {
    if (!root.current) return;
    let frame = 0;
    let height = root.current.getBoundingClientRect().height;
    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.height - height) < 1) return;
      height = entry.contentRect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={root} className={styles.studio}>
        <div className={styles.studioTop}>
          <div className={styles.studioIdentity}>
            <span className={styles.studioMark} aria-hidden="true">
              N
            </span>
            <span>NEXA / Learning companion</span>
          </div>
          <span className={styles.sampleLabel}>
            INTERACTIVE CONCEPT PREVIEW
          </span>
        </div>
        <div className={styles.studioBody}>
          <div
            className={styles.toolMenu}
            role="group"
            aria-label="Choose a learning tool preview"
          >
            {tools.map((item, index) => (
              <button
                type="button"
                className={styles.toolButton}
                key={item.id}
                ref={(element) => {
                  toolButtons.current[item.id] = element;
                }}
                aria-pressed={tool === item.id}
                aria-controls={
                  tool === item.id ? `learning-preview-${item.id}` : undefined
                }
                onClick={() => selectTool(item.id)}
              >
                <span>
                  {item.label}
                  <span aria-hidden="true">0{index + 1}</span>
                </span>
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </button>
            ))}
          </div>
          <div className={styles.toolSurface}>
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <m.div
                key={tool}
                id={`learning-preview-${tool}`}
                custom={direction}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, x: direction * 28, scale: 0.985 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -18, scale: 0.99 }
                }
                transition={{
                  duration: reduced ? 0 : 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {tool === "tutor" ? (
                  <TutorPreview onRevise={() => followLearning("cards")} />
                ) : tool === "cards" ? (
                  <FlashcardPreview onPlan={() => followLearning("plan")} />
                ) : (
                  <StudyPlanPreview />
                )}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.studioFoot}>
          <span>
            Try the sample session. The AI platform is in development.
          </span>
          <span>
            Authored examples · No chat is sent · No progress is saved
          </span>
        </div>
      </div>
    </LazyMotion>
  );
}
