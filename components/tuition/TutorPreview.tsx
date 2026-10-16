"use client";

import { useState } from "react";
import styles from "./tuition-experience.module.css";

export function TutorPreview({ onRevise }: { onRevise: () => void }) {
  const [quiz, setQuiz] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <div>
      <div className={styles.topicLine}>
        <span>GCSE BIOLOGY / DIFFUSION</span>
        <span>Authored sample conversation</span>
      </div>
      <p className={styles.chatPrompt}>How does diffusion actually work?</p>
      <div className={styles.tutorReply}>
        <span>NEXA / LEARNING ASSISTANT PREVIEW</span>
        <p>
          Imagine a drop of ink spreading through water. The particles move
          randomly, but overall they spread from a region of higher
          concentration to one of lower concentration.
        </p>
        <p>
          That overall movement is <strong>diffusion</strong>. It does not
          require energy from respiration.
        </p>
        <svg
          className={styles.diffusion}
          viewBox="0 0 400 90"
          fill="none"
          aria-hidden="true"
        >
          <path d="M10 10h380v52H10z" stroke="#91d0ff" strokeOpacity=".25" />
          {[24, 42, 60, 78, 96, 114].flatMap((x, i) =>
            [22, 36, 50].map((y, j) => (
              <circle
                key={`${i}-${j}`}
                cx={x + (j % 2) * 4}
                cy={y}
                r="3"
                fill="#91d0ff"
              />
            )),
          )}
          {[272, 307, 341, 371].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={24 + (i % 3) * 11}
              r="3"
              fill="#91d0ff"
            />
          ))}
          <path
            d="M155 36h85m-8-7 8 7-8 7"
            stroke="#d8b25a"
            strokeWidth="1.5"
          />
          <text x="10" y="84" fill="#b9cbdd" fontSize="9">
            Higher concentration
          </text>
          <text x="289" y="84" fill="#b9cbdd" fontSize="9">
            Lower concentration
          </text>
        </svg>
      </div>
      {!quiz ? (
        <div className={styles.demoActions}>
          <button
            className={styles.demoButton}
            type="button"
            onClick={() => setQuiz(true)}
          >
            Check my understanding <span aria-hidden="true">↗</span>
          </button>
          <button className={styles.demoLink} type="button" onClick={onRevise}>
            Revise with flashcards →
          </button>
        </div>
      ) : (
        <div className={styles.quiz}>
          <p>Which statement describes diffusion?</p>
          <div className={styles.quizChoices}>
            {[
              "Net movement from higher to lower concentration",
              "Movement against the concentration gradient using energy",
            ].map((choice, index) => (
              <button
                key={choice}
                type="button"
                aria-pressed={answer === index}
                onClick={() => setAnswer(index)}
              >
                {choice}
              </button>
            ))}
          </div>
          <p className={styles.feedback} role="status">
            {answer === 0
              ? "Exactly. Remember the word ‘net’: particles move both ways, but the overall movement is down the gradient."
              : answer === 1
                ? "Try again. Moving against the gradient using energy describes active transport."
                : "Choose an answer to see the explanation."}
          </p>
          <button className={styles.demoLink} type="button" onClick={onRevise}>
            Keep this fresh with flashcards →
          </button>
        </div>
      )}
    </div>
  );
}
