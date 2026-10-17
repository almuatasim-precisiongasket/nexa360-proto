"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import { ConsultLink, Label, SectionHead, OpticalTransition } from "./Shared";
import s from "./v5.module.css";

/** A user-started, deterministic example. Pauses when hidden or out of view. */
function useExample(root: RefObject<HTMLDivElement | null>) {
  const [playing, setPlaying] = useState(false),
    [progress, setProgress] = useState(0);
  const finished = progress >= 1;
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    observer.observe(el);
    const hidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", hidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [root]);
  useEffect(() => {
    if (!playing || finished) return;
    const timer = setInterval(
      () => setProgress((p) => Math.min(1, p + 0.01)),
      90,
    );
    return () => clearInterval(timer);
  }, [playing, finished]);
  const active = playing && !finished;
  function toggle() {
    if (finished) {
      setProgress(0);
      setPlaying(true);
    } else setPlaying((p) => !p);
  }
  function reset() {
    setProgress(0);
    setPlaying(false);
  }
  function seek(value: number) {
    setPlaying(false);
    setProgress(Math.max(0, Math.min(1, value)));
  }
  return {
    progress,
    active,
    toggle,
    reset,
    seek,
    stage: Math.min(3, Math.floor(progress * 4)),
    label: finished ? "Replay" : active ? "Pause" : "Play example",
  };
}
const explanations = [
  "Let’s solve 2x + 3 = 11. What should we undo first?",
  "Subtract 3 from both sides. That leaves 2x = 8.",
  "Divide both sides by 2. We get x = 4.",
  "Check it: 2 × 4 + 3 = 11. Now try explaining each step yourself.",
];
function AIExample() {
  const root = useRef<HTMLDivElement>(null);
  const ex = useExample(root);
  return (
    <div className={s.productWindow} ref={root}>
      <div className={s.windowBar}>
        <strong>NEXA / Interactive learning</strong>
        <span>SAMPLE WORKFLOW</span>
      </div>
      <div className={s.lesson}>
        <div className={s.board}>
          <small>WHITEBOARD / LINEAR EQUATIONS</small>
          <div className={s.equation}>
            <span>2x + 3 = 11</span>
            <span style={{ opacity: ex.stage >= 1 ? 1 : 0.12 }}>2x = 8</span>
            <span style={{ opacity: ex.stage >= 2 ? 1 : 0.12 }}>
              <em>x = 4</em>
            </span>
          </div>
        </div>
        <div className={s.lessonAside}>
          <strong>Let’s work it out.</strong>
          <div
            className={s.audioBars}
            data-playing={ex.active}
            aria-hidden="true"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <motion.p
            key={ex.stage}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24 }}
          >
            {explanations[ex.stage]}
          </motion.p>
          <small style={{ fontSize: 9, opacity: 0.55 }}>
            CONVERSATION TRANSCRIPT PREVIEW
          </small>
        </div>
      </div>
      <div className={s.productControls}>
        <button type="button" className={s.playButton} onClick={ex.toggle}>
          {ex.active ? "Ⅱ" : "▷"} {ex.label}
        </button>
        <button
          type="button"
          className={s.playButton}
          onClick={ex.reset}
          aria-label="Reset the lesson example"
        >
          ↺ Reset
        </button>
        <div
          className={s.progress}
          aria-label="Example playback"
          role="progressbar"
          aria-valuenow={Math.round(ex.progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <i style={{ transform: `scaleX(${ex.progress})` }} />
        </div>
      </div>
      <div className={s.oversight}>
        Planned concept: conversational audio + whiteboard + human oversight.
        Prepared visual example; no live AI or audio connection.
      </div>
    </div>
  );
}
function P2LExample() {
  const root = useRef<HTMLDivElement>(null);
  const ex = useExample(root);
  return (
    <div className={s.productWindow} ref={root}>
      <div className={s.windowBar}>
        <strong>P2L / Prompt to Learn</strong>
        <span>PREPARED VECTOR EXAMPLE</span>
      </div>
      <div className={s.prompt}>
        <small>THE LEARNING PROMPT</small>Explain how a simple electric circuit
        works.
      </div>
      <div className={s.circuit}>
        <svg
          viewBox="0 0 440 240"
          fill="none"
          role="img"
          aria-label="Sample circuit with a battery, connected wire and a light bulb"
        >
          <defs>
            <radialGradient id="v5-bulb-glow">
              <stop stopColor="#e4c15b" stopOpacity=".65" />
              <stop offset="1" stopColor="#e4c15b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M90 140V50H310V85M310 125V200H90V160"
            stroke="#b8cbdc"
            strokeWidth="3"
          />
          <path
            d="M90 140V50H310V85M310 125V200H90V160"
            stroke="#195f9f"
            strokeWidth="3"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - Math.min(1, ex.progress * 2)}
          />
          <path
            className={s.trace}
            data-playing={ex.active && ex.stage >= 1}
            d="M90 140V50H310V200H90V160"
            stroke="#6fb6f1"
            strokeWidth="3"
            opacity={ex.stage >= 1 ? 1 : 0}
          />
          <path d="M65 140h50M75 160h30" stroke="#173c60" strokeWidth="4" />
          <circle
            className={s.bulb}
            cx="310"
            cy="105"
            r="48"
            fill="url(#v5-bulb-glow)"
            opacity={ex.stage >= 2 ? 1 : 0}
          />
          <circle
            cx="310"
            cy="105"
            r="21"
            fill={ex.stage >= 2 ? "#f7e1a4" : "#f9fbfd"}
            stroke="#b69849"
            strokeWidth="2"
          />
          <path
            d="M300 97l20 16m0-16-20 16"
            stroke="#b69849"
            strokeWidth="1.5"
          />
          <text x="38" y="183" fill="#68839a" fontSize="10">
            BATTERY
          </text>
          <text x="337" y="109" fill="#68839a" fontSize="10">
            LAMP
          </text>
          <text x="177" y="31" fill="#68839a" fontSize="10">
            {ex.stage >= 1 ? "CURRENT FLOWS" : "CLOSED CIRCUIT"}
          </text>
          <text x="177" y="226" fill="#175cdb" fontSize="10">
            {ex.stage >= 3
              ? "A COMPLETE PATH POWERS THE LAMP"
              : "CONNECT → EXPLAIN → UNDERSTAND"}
          </text>
        </svg>
      </div>
      <div className={s.storyboard}>
        {["01 / The idea", "02 / The diagram", "03 / The explanation"].map(
          (item, i) => (
            <button
              key={item}
              type="button"
              aria-pressed={Math.min(2, ex.stage) === i}
              data-active={Math.min(2, ex.stage) === i}
              onClick={() => ex.seek([0, 0.4, 0.8][i])}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <div className={s.productControls}>
        <button type="button" className={s.playButton} onClick={ex.toggle}>
          {ex.active ? "Ⅱ" : "▷"} {ex.label}
        </button>
        <button
          type="button"
          className={s.playButton}
          onClick={ex.reset}
          aria-label="Reset the circuit example"
        >
          ↺ Reset
        </button>
        <div
          className={s.progress}
          role="progressbar"
          aria-label="Vector explanation playback"
          aria-valuenow={Math.round(ex.progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <i style={{ transform: `scaleX(${ex.progress})` }} />
        </div>
      </div>
      <div className={s.oversight}>
        Illustration of the intended prompt-to-video workflow. This replays a
        prepared example and does not generate new content.
      </div>
    </div>
  );
}
export function Products({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id={embedded ? "products-detail" : "products"}
      className={`section ${s.section} ${s.products}`}
      tabIndex={-1}
    >
      <span id="learning-tools" className={s.anchor} />
      <div className={s.inner}>
        <Label number="09" note="EDUCATIONAL TECHNOLOGY / IN DEVELOPMENT">
          THE PRODUCT THEATRE
        </Label>
        <SectionHead
          label="IDEAS TAKING SHAPE"
          title={
            <>
              New ways to learn.
              <br />
              <em>New ways to teach.</em>
            </>
          }
          copy="Two products in development. Explore the learning experiences we’re working towards through prepared concept demonstrations."
        />
        <article className={`${s.product} v5-reveal`}>
          <div className={s.productCopy}>
            <span className={s.status}>IN DEVELOPMENT / 01</span>
            <h3>
              AI teaching.
              <br />
              <em>Human oversight.</em>
            </h3>
            <p>
              Our Interactive AI Tuition Platform is being designed to combine
              conversational audio, an interactive whiteboard and guided
              learning activities.
            </p>
            <p>
              Human oversight is central to the concept. Progress monitoring and
              learning management are potential future capabilities.
            </p>
            <ConsultLink
              light
              context={{
                audience: "Institution",
                category: "Product partnership",
                programme: "Interactive AI Tuition Platform",
              }}
            >
              Discuss the platform
            </ConsultLink>
          </div>
          <AIExample />
        </article>
        <article className={`${s.product} v5-reveal`}>
          <div className={s.productCopy}>
            <span className={s.status}>IN DEVELOPMENT / 02</span>
            <h3>
              Prompt an idea.
              <br />
              <em>Make learning visible.</em>
            </h3>
            <p>
              Prompt to Learn (P2L) explores how educational prompts can become
              vector-based visual explanations and learning videos.
            </p>
            <p>
              Built for the way teachers, tutors and institutions explain ideas.
              Technical specifications and release information will follow.
            </p>
            <ConsultLink
              light
              context={{
                audience: "Institution",
                category: "Product partnership",
                programme: "Prompt to Learn (P2L)",
              }}
            >
              Talk about P2L
            </ConsultLink>
          </div>
          <P2LExample />
        </article>
      </div>
      <OpticalTransition />
    </section>
  );
}
