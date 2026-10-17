"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import s from "./v5.module.css";
const messages = [
  "A message asks you to share your password through an unfamiliar link.",
  "Your tutor shares a homework question in your agreed lesson channel.",
  "Your calendar reminds you about a session you already scheduled.",
];
export function LearningLab({ course }: { course: string }) {
  const [answer, setAnswer] = useState<number | null>(null),
    [step, setStep] = useState(0),
    [position, setPosition] = useState(0),
    [threshold, setThreshold] = useState(50);
  const reduced = useReducedMotion();
  const reset = () => {
    setAnswer(null);
    setStep(0);
    setPosition(0);
    setThreshold(50);
  };
  return (
    <div id="course-lab" className={s.learningLab} tabIndex={-1}>
      <div className={s.labIntro}>
        <span className={s.eyebrow}>TRY A SMALL IDEA</span>
        <h3>
          {course === "cyber"
            ? "Spot the warning sign."
            : course === "ai"
              ? "Think like an agent."
              : course === "robotics"
                ? "Give a robot a command."
                : course === "game"
                  ? "Make the next move."
                  : "Move a decision boundary."}
        </h3>
        <p>
          Interact with this prepared illustration to explore a simple concept.
          It is a website demo, not the course curriculum.
        </p>
      </div>
      <div className={s.labPlayground}>
        {course === "cyber" ? (
          <>
            <p className={s.labPrompt}>Which message deserves extra caution?</p>
            <div className={s.riskOptions}>
              {messages.map((text, i) => (
                <button
                  type="button"
                  key={text}
                  aria-pressed={answer === i}
                  onClick={() => setAnswer(i)}
                >
                  <span>0{i + 1}</span>
                  {text}
                </button>
              ))}
            </div>
            <p className={s.labFeedback} aria-live="polite">
              {answer === null
                ? "Choose a message to reveal the explanation."
                : answer === 0
                  ? "Good catch. A request for your password through an unfamiliar link is a warning sign. Verify it through a trusted channel."
                  : "The first message is the warning sign: it asks for a password through an unfamiliar link."}
            </p>
          </>
        ) : course === "ai" ? (
          <>
            <div className={s.agentFlow}>
              {["1. Set a goal", "2. Plan steps", "3. Review the result"].map(
                (label, i) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={step === i}
                    onClick={() => setStep(i)}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
            <motion.div
              key={step}
              className={s.agentResult}
              initial={reduced ? false : { opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {
                [
                  "Goal: organise a revision session around a learner’s questions.",
                  "Plan: identify the topic, prepare questions and arrange a short practice sequence.",
                  "Review: check the draft plan and correct it before using it with a learner.",
                ][step]
              }
            </motion.div>
            <p className={s.labFeedback}>
              Prepared example of a goal → plan → review workflow. No live AI is
              connected.
            </p>
          </>
        ) : course === "robotics" ? (
          <>
            <div className={s.robotTrack}>
              <motion.div
                className={s.miniRobot}
                animate={{ transform: `translateX(${position * 24}px)` }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                ▣<i />
                <i />
              </motion.div>
              <span>START</span>
              <span>MOVE → OBSERVE</span>
            </div>
            <div className={s.labActions}>
              <button
                type="button"
                onClick={() => setPosition((p) => Math.min(6, p + 1))}
                disabled={position >= 6}
              >
                Send forward command →
              </button>
              <button type="button" onClick={reset}>
                Reset
              </button>
            </div>
            <p className={s.labFeedback} aria-live="polite">
              {position === 0
                ? "Send a command and watch the illustrated robot respond."
                : `Command received. The robot has moved ${position} step${position === 1 ? "" : "s"}.`}
            </p>
          </>
        ) : course === "game" ? (
          <>
            <div className={s.gameTrack}>
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} data-player={position === i} data-goal={i === 6}>
                  {position === i ? (
                    <motion.span
                      layoutId="lab-player"
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    >
                      ●
                    </motion.span>
                  ) : i === 6 ? (
                    "⚑"
                  ) : (
                    "·"
                  )}
                </div>
              ))}
            </div>
            <div className={s.labActions}>
              <button
                type="button"
                onClick={() => setPosition((p) => Math.max(0, p - 1))}
                disabled={position === 0}
              >
                ← Move left
              </button>
              <button
                type="button"
                onClick={() => setPosition((p) => Math.min(6, p + 1))}
                disabled={position === 6}
              >
                Move right →
              </button>
              <button type="button" onClick={reset}>
                Reset
              </button>
            </div>
            <p className={s.labFeedback} aria-live="polite">
              {position === 6
                ? "Goal reached. A simple rule checks the player’s position and changes the game state."
                : "Move the player to the flag. Each action updates a position; a rule checks whether you reached the goal."}
            </p>
          </>
        ) : (
          <>
            <div className={s.classificationPlot}>
              <div
                className={s.plotBoundary}
                style={{ left: `${threshold}%` }}
              />
              <div
                className={s.plotRegion}
                style={{ width: `${threshold}%` }}
              />
              {[12, 24, 36, 44, 58, 66, 79, 88].map((v, i) => (
                <span
                  key={v}
                  style={{ left: `${v}%`, top: `${25 + ((i * 23) % 55)}%` }}
                  data-group={v < threshold ? "a" : "b"}
                />
              ))}
            </div>
            <label className={s.thresholdLabel} htmlFor="lab-boundary">
              Decision boundary: {threshold}%
            </label>
            <input
              id="lab-boundary"
              type="range"
              min="15"
              max="85"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
            <p className={s.labFeedback}>
              Moving a rule changes the groups. This is a simple threshold
              illustration, not a trained machine learning model.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
