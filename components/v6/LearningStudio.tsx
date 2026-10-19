"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollPageTo } from "@/lib/scroll-controller";
import { ConsultLink } from "../v5/Shared";
import type { StudioBridge } from "./StudioRenderer";
import s from "./studio.module.css";

const Renderer = dynamic(() => import("./StudioRenderer"), { ssr: false });

class StudioBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
gsap.registerPlugin(ScrollTrigger, useGSAP);
const chapters = [
  {
    label: "Understand",
    title: "First, understand your child.",
    copy: "The subject. The sticking points. The questions they hesitate to ask. Your consultation starts with what matters to your family.",
    detail: "A conversation before a learning arrangement.",
  },
  {
    label: "Explain",
    title: "Make the method make sense.",
    copy: "A question becomes a conversation. Work through a familiar example, with space to explain why each step works.",
    detail: "Follow the reasoning. Then try it independently.",
  },
  {
    label: "Practise",
    title: "Let understanding take the lead.",
    copy: "Try the example yourself. A useful hint helps you move forward; the method matters as much as the answer.",
    detail: "A small website sample, not a live lesson or assessment.",
  },
  {
    label: "Share",
    title: "Stay part of the picture.",
    copy: "See how this practice could become a clear conversation about learning: what was explored, where support helped and what to try next.",
    detail: "Illustrative parent feedback — no student records.",
  },
];

export function LearningStudio() {
  const root = useRef<HTMLDivElement>(null);
  const travel = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const bridge = useRef<StudioBridge>({
    progress: 0,
    solved: false,
    redraw: () => {},
  });
  const navigation = useRef<(() => void) | undefined>(undefined);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [hinted, setHinted] = useState(false);
  const solved = operation === "subtract" && answer === 4;
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const registerRedraw = useCallback((callback: () => void) => {
    bridge.current.redraw = callback;
    return () => {
      if (bridge.current.redraw === callback) bridge.current.redraw = () => {};
    };
  }, []);
  useEffect(() => {
    bridge.current.solved = solved;
    bridge.current.redraw();
  }, [solved]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "500px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => navigation.current?.(), []);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          trigger.current = ScrollTrigger.create({
            trigger: travel.current,
            start: "top 100px",
            end: "bottom bottom",
            onUpdate: (self) => {
              bridge.current.progress = self.progress * 3;
              bridge.current.redraw();
              setActive(Math.min(3, Math.floor(self.progress * 3 + 0.5)));
              meter.current?.style.setProperty(
                "transform",
                `scaleX(${self.progress})`,
              );
            },
            invalidateOnRefresh: true,
          });
          return () => {
            trigger.current = null;
            navigation.current?.();
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
  function choose(index: number) {
    setActive(index);
    navigation.current?.();
    const linked = trigger.current;
    if (linked) {
      navigation.current = scrollPageTo(
        linked.start + (index / 3) * (linked.end - linked.start),
        { duration: 1.25 },
      );
    } else {
      bridge.current.progress = index;
      bridge.current.redraw();
      meter.current?.style.setProperty("transform", `scaleX(${index / 3})`);
    }
  }
  function reset() {
    setOperation(null);
    setAnswer(null);
    setHinted(false);
  }
  const feedback = solved
    ? "You subtracted 3, divided by 2, and checked the result."
    : operation === "subtract"
      ? "You identified the first inverse operation. Try dividing next."
      : operation
        ? "A hint helped identify the first step. Revisit inverse operations."
        : "No sample answer yet. Try the practice to see this update.";
  return (
    <div ref={root} id="learning-studio" className={s.studio} data-nexa-owned>
      <header className={s.intro}>
        <div>
          <span className={s.eyebrow}>
            FOR PARENTS / A CLOSER LOOK AT LEARNING
          </span>
          <h3>
            A little more clarity.
            <br />
            <em>For both of you.</em>
          </h3>
        </div>
        <p>
          Step inside a learning journey. From a question at the desk to a
          clearer picture for the family.
        </p>
      </header>
      <div ref={travel} className={s.travel}>
        <div className={s.viewport}>
          <div className={s.topline}>
            <span>NEXA360 / THE LEARNING STUDIO</span>
            <a href="#parent-portal">Skip to parent preview ↗</a>
          </div>
          <div className={s.visual} data-ready={ready && !failed}>
            <div className={s.fallback}>
              <Image
                src="/assets/rive/learning-desk-0.svg"
                width={900}
                height={650}
                alt="A study desk with learning materials"
              />
              <span>
                {failed
                  ? "Illustrated view · all steps remain available"
                  : "Preparing the learning studio"}
              </span>
            </div>
            {near && !failed && (
              <StudioBoundary onFailure={onFailure}>
                <Renderer
                  registerRedraw={registerRedraw}
                  bridge={bridge}
                  onReady={onReady}
                  onFailure={onFailure}
                />
              </StudioBoundary>
            )}
          </div>
          <span className={s.sceneNumber} aria-hidden="true">
            0{active + 1}
          </span>
          <div className={s.story}>
            <span className={s.eyebrow}>
              0{active + 1} / {chapters[active].label.toUpperCase()}
            </span>
            <h4>{chapters[active].title}</h4>
            <p>{chapters[active].copy}</p>
            {active === 0 && (
              <div className={s.familyPoints}>
                <span>Barking Riverside, London</span>
                <span>Online tuition</span>
                <a href="#tuition">
                  Discuss your child’s learning preferences ↑
                </a>
              </div>
            )}
            {active === 1 && (
              <div className={s.method}>
                <span>AN EXAMPLE TOGETHER</span>
                <strong>2x + 3 = 11</strong>
                <p>Undo the addition. Then undo the multiplication.</p>
                <button type="button" onClick={() => choose(2)}>
                  Try the next step <span>↗</span>
                </button>
              </div>
            )}
            {active === 2 && (
              <div className={s.practice}>
                <div className={s.practiceTop}>
                  <span>YOUR TURN / SAMPLE QUESTION</span>
                  <button type="button" onClick={reset}>
                    Reset
                  </button>
                </div>
                <strong>
                  {operation === "subtract" ? "2x = 8" : "2x + 3 = 11"}
                </strong>
                <p>
                  {operation === "subtract"
                    ? "Divide both sides by 2. What is x?"
                    : "Which operation should come first?"}
                </p>
                <div className={s.answers}>
                  {operation === "subtract"
                    ? [8, 4, 5].map((value) => (
                        <button
                          type="button"
                          key={value}
                          aria-pressed={answer === value}
                          onClick={() => {
                            setAnswer(value);
                            if (value !== 4) setHinted(true);
                          }}
                        >
                          x = {value}
                        </button>
                      ))
                    : [
                        { id: "add", text: "Add 3" },
                        { id: "subtract", text: "Subtract 3" },
                        { id: "divide", text: "Divide by 2" },
                      ].map((choice) => (
                        <button
                          type="button"
                          key={choice.id}
                          aria-pressed={operation === choice.id}
                          onClick={() => {
                            setOperation(choice.id);
                            if (choice.id !== "subtract") setHinted(true);
                          }}
                        >
                          {choice.text}
                        </button>
                      ))}
                </div>
                <p className={s.feedback} role="status">
                  {solved
                    ? "Exactly. Check: 2 × 4 + 3 = 11."
                    : answer !== null && operation === "subtract"
                      ? "Divide 8 by 2. Keep both sides balanced."
                      : operation === "subtract"
                        ? "That leaves 2x = 8. Now undo the multiplication."
                        : operation
                          ? "Undo the +3 first: subtract 3 from both sides."
                          : "Choose an operation. A hint is here if you need it."}
                </p>
                <button
                  className={s.next}
                  type="button"
                  onClick={() => choose(3)}
                >
                  See the parent’s view <span>↗</span>
                </button>
              </div>
            )}
            {active === 3 && (
              <div className={s.report}>
                <span>ILLUSTRATIVE PARENT NOTE</span>
                <strong>Two-step equations</strong>
                <p>{feedback}</p>
                <dl>
                  <dt>Sample status</dt>
                  <dd>
                    {solved
                      ? "Completed"
                      : operation === "subtract"
                        ? "First step explored"
                        : operation
                          ? "Exploring with a hint"
                          : "Not tried yet"}
                  </dd>
                  <dt>Support</dt>
                  <dd>
                    {hinted
                      ? "A hint was used"
                      : operation
                        ? "No hint selected"
                        : "Not recorded"}
                  </dd>
                  <dt>Next practice</dt>
                  <dd>
                    {solved
                      ? "Explain a new example aloud"
                      : "Identify the inverse operations"}
                  </dd>
                </dl>
                <a href="#parent-portal">Explore the full portal preview ↗</a>
              </div>
            )}
            <span className={s.note}>{chapters[active].detail}</span>
          </div>
          <div className={s.bottomline}>
            <nav aria-label="Studio story steps">
              {chapters.map((chapter, index) => (
                <button
                  type="button"
                  key={chapter.label}
                  aria-pressed={active === index}
                  onClick={() => choose(index)}
                >
                  <span>0{index + 1}</span>
                  {chapter.label}
                </button>
              ))}
            </nav>
            <span className={s.scrollCue}>
              SCROLL TO EXPLORE / OR SELECT A STEP
            </span>
          </div>
          <div className={s.progress} aria-hidden="true">
            <span ref={meter} />
          </div>
        </div>
      </div>
      <div className={s.handoff}>
        <div>
          <span className={s.eyebrow}>THE NEXT CONVERSATION</span>
          <p>
            What would help your child
            <br />
            <em>take their next step?</em>
          </p>
        </div>
        <ConsultLink
          context={{
            audience: "Individual",
            category: "GCSE tuition",
            programme: "GCSE",
          }}
        >
          Book a GCSE consultation
        </ConsultLink>
      </div>
    </div>
  );
}
