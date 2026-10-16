"use client";

import { useState } from "react";
import {
  isTuitionFormat,
  tuitionFormats,
  type TuitionFormat,
} from "@/lib/content";
import { TuitionEnquiry } from "../TuitionEnquiry";
import styles from "./tuition-experience.module.css";

const programmes = [
  {
    title: "GCSE & IGCSE",
    label: "Build your foundation",
    detail: "Concepts, exam technique and purposeful revision.",
    exams: "GCSE · IGCSE",
  },
  {
    title: "A Level",
    label: "Go deeper",
    detail: "Discuss your subjects, specification and next academic step.",
    exams: "A Level pathways · Enquire for availability",
  },
  {
    title: "Entrance exams",
    label: "Prepare for what's next",
    detail:
      "Tell us the school, assessment and entry stage you are preparing for.",
    exams: "7+ · 8+ · 9+ · 10+ · 11+ · 13+ · Pre-Tests",
  },
] as const;

export function ProgrammeFinder() {
  const [selected, setSelected] = useState(0);
  const [subject, setSubject] = useState("");
  const [examBoard, setExamBoard] = useState("");
  const [format, setFormat] = useState<TuitionFormat | "">("");
  const programme = programmes[selected];
  return (
    <div id="programme-finder" className={styles.finder}>
      <div className={styles.finderHeading}>
        <div>
          <span className="kicker">01 / YOUR STARTING POINT</span>
          <h3>Find your next step.</h3>
        </div>
        <p>
          A subject. An exam. A bigger ambition.
          <br />
          Start with what you want to work towards.
        </p>
      </div>
      <fieldset className={styles.programmes}>
        <legend className="sr-only">
          Choose a qualification to enquire about
        </legend>
        {programmes.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={styles.programme}
          >
            <span className={styles.programmeTop}>
              <span className="kicker">0{index + 1}</span>
              <span className={styles.selectionMark} aria-hidden="true">
                {selected === index ? "✓" : "+"}
              </span>
            </span>
            <strong>{item.title}</strong>
            <span>{item.label}</span>
          </button>
        ))}
      </fieldset>
      <div className={styles.finderBody}>
        <div className={styles.programmeDetail} aria-live="polite">
          <span className={styles.smallTag}>YOUR DIRECTION</span>
          <h4>{programme.title}</h4>
          <p>{programme.detail}</p>
          <span className={styles.examList}>{programme.exams}</span>
        </div>
        <div className={styles.finderFields}>
          <div>
            <label htmlFor="programme-subject">Subject or area of focus</label>
            <input
              id="programme-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              placeholder="e.g. Maths, English or exam preparation"
            />
          </div>
          <div>
            <label htmlFor="programme-board">Exam board or target school</label>
            <input
              id="programme-board"
              value={examBoard}
              onChange={(e) => setExamBoard(e.target.value)}
              maxLength={120}
              placeholder="Tell us if you know — or leave this open"
            />
          </div>
          <div className={styles.formatField}>
            <label htmlFor="programme-format">
              How would you like to learn?
            </label>
            <select
              id="programme-format"
              value={format}
              onChange={(e) =>
                setFormat(isTuitionFormat(e.target.value) ? e.target.value : "")
              }
            >
              <option value="">Help me choose</option>
              {tuitionFormats.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className={styles.finderAction}>
            <p>
              We’ll confirm subjects, exam-board support and availability with
              you.
            </p>
            <TuitionEnquiry
              className={styles.primaryAction}
              programme={{
                programme: programme.title,
                subject: subject.trim(),
                examBoard: examBoard.trim(),
                format,
              }}
            >
              Discuss this programme
            </TuitionEnquiry>
          </div>
        </div>
      </div>
    </div>
  );
}
