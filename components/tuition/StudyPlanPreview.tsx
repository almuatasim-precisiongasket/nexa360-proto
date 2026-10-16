"use client";

import { useState } from "react";
import styles from "./tuition-experience.module.css";

const sessions = [
  {
    title: "Understand diffusion",
    activity: "Read the explanation. Explain it back in your own words.",
  },
  {
    title: "Recall without the notes",
    activity: "Revisit the flashcards and focus on anything uncertain.",
  },
  {
    title: "Put it into practice",
    activity: "Attempt a question, then review your reasoning with a tutor.",
  },
];

export function StudyPlanPreview() {
  const [weekend, setWeekend] = useState(false);
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const count = done.filter(Boolean).length;
  const days = weekend ? ["FRI", "SAT", "SUN"] : ["MON", "WED", "FRI"];
  return (
    <div>
      <div className={styles.topicLine}>
        <span>YOUR WEEK / DIFFUSION</span>
        <span>Illustrative study plan</span>
      </div>
      <div className={styles.planIntro}>
        <div>
          <h3>
            A little structure.
            <br />
            Room to make progress.
          </h3>
          <p>A sample week that connects understanding, recall and practice.</p>
        </div>
        <div>
          <label htmlFor="sample-study-schedule">Study routine</label>
          <select
            id="sample-study-schedule"
            value={weekend ? "weekend" : "weekdays"}
            onChange={(e) => setWeekend(e.target.value === "weekend")}
          >
            <option value="weekdays">Across the week</option>
            <option value="weekend">Around the weekend</option>
          </select>
        </div>
      </div>
      <div className={styles.planProgress}>
        <span>Sample sessions completed</span>
        <span role="status">{count} of 3</span>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ width: `${(count / sessions.length) * 100}%` }} />
      </div>
      {sessions.map((session, index) => (
        <div className={styles.session} key={session.title}>
          <span>{days[index]}</span>
          <div>
            <h4>{session.title}</h4>
            <p>{session.activity}</p>
          </div>
          <button
            type="button"
            aria-label={`${done[index] ? "Mark incomplete" : "Mark complete"}: ${session.title}`}
            aria-pressed={done[index]}
            onClick={() =>
              setDone(done.map((value, i) => (i === index ? !value : value)))
            }
          >
            {done[index] ? "✓" : "+"}
          </button>
        </div>
      ))}
      <p className={styles.feedback}>
        The planned platform would tailor revision around goals, available time
        and tutor feedback.
      </p>
    </div>
  );
}
