"use client";

import { useState } from "react";
import styles from "./tuition-experience.module.css";

const cards = [
  {
    question: "What is diffusion?",
    answer:
      "The net movement of particles from higher to lower concentration, down a concentration gradient.",
  },
  {
    question: "Does diffusion need energy from respiration?",
    answer:
      "No. Diffusion is passive: it does not require energy from respiration.",
  },
  {
    question: "How does a steeper concentration gradient affect diffusion?",
    answer:
      "A steeper concentration gradient increases the rate of diffusion, with other conditions unchanged.",
  },
];

export function FlashcardPreview({ onPlan }: { onPlan: () => void }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [decisions, setDecisions] = useState<
    Record<number, "again" | "got-it">
  >({});
  const change = (direction: number) => {
    setIndex((current) => (current + direction + cards.length) % cards.length);
    setRevealed(false);
  };
  return (
    <div>
      <div className={styles.topicLine}>
        <span>REVISION DECK / DIFFUSION</span>
        <span>3 sample cards</span>
      </div>
      <div className={styles.cardMeta}>
        <span>From explanation to active recall</span>
        <span aria-live="polite">
          0{index + 1} / 0{cards.length}
        </span>
      </div>
      <button
        className={styles.flashcard}
        type="button"
        aria-expanded={revealed}
        onClick={() => setRevealed(!revealed)}
      >
        <span>{revealed ? "THE EXPLANATION" : "A MOMENT TO REMEMBER"}</span>
        <strong>
          {revealed ? cards[index].answer : cards[index].question}
        </strong>
        <span>
          {revealed
            ? "Tap to return to the question ↶"
            : "Think first. Tap to reveal the answer ↗"}
        </span>
      </button>
      <div className={styles.cardDecisions}>
        <button
          className={styles.demoButton}
          type="button"
          aria-pressed={decisions[index] === "again"}
          onClick={() => {
            setDecisions({ ...decisions, [index]: "again" });
            setRevealed(true);
          }}
        >
          Review again
        </button>
        <button
          className={styles.demoButton}
          type="button"
          aria-pressed={decisions[index] === "got-it"}
          onClick={() => {
            setDecisions({ ...decisions, [index]: "got-it" });
            setRevealed(true);
          }}
        >
          Got it ✓
        </button>
      </div>
      <div className={styles.demoActions}>
        <div className={styles.cardNavigation}>
          <button
            type="button"
            aria-label="Previous flashcard"
            onClick={() => change(-1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next flashcard"
            onClick={() => change(1)}
          >
            →
          </button>
        </div>
        <button className={styles.demoLink} type="button" onClick={onPlan}>
          Make room for revision →
        </button>
      </div>
      <p className={styles.feedback} role="status">
        {decisions[index] === "again"
          ? "Marked for another review in this sample session."
          : decisions[index] === "got-it"
            ? "Marked as understood in this sample session."
            : "Choose a review option after you have tried the question."}
      </p>
    </div>
  );
}
