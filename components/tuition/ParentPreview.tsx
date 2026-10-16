"use client";

import { useState } from "react";
import { emitSiteEvent } from "@/lib/site-events";
import { Arrow } from "../Logo";
import { TuitionEnquiry } from "../TuitionEnquiry";
import styles from "./tuition-experience.module.css";
import { SupportArtwork } from "./SupportArtwork";
import artwork from "./support-artwork.module.css";

const views = ["Progress", "Attendance", "Tutor notes"] as const;

export function ParentPreview() {
  const [view, setView] = useState<(typeof views)[number]>("Progress");
  return (
    <>
      <div
        id="parent-preview"
        tabIndex={-1}
        className={`${styles.parentSection} ${styles.chapterTarget}`}
      >
        <div className={styles.parentCopy}>
          <span className={styles.previewBadge}>
            03 / Parent dashboard · Concept preview
          </span>
          <h3>
            See the progress
            <br />
            <em>behind the homework.</em>
          </h3>
          <p>
            A planned parent view that brings the important details together, so
            your next conversation starts with a clearer picture.
          </p>
          <ul>
            <li>Attendance and lesson activity</li>
            <li>Topics covered and areas to revisit</li>
            <li>Homework, tutor feedback and next steps</li>
          </ul>
          <TuitionEnquiry>Discuss support for your child</TuitionEnquiry>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboardHeader}>
            <div>
              <strong>NEXA / Parent view</strong>
              <p>Example learner · GCSE Biology</p>
            </div>
            <span>FICTIONAL SAMPLE DATA</span>
          </div>
          <div
            className={styles.dashboardFilters}
            role="group"
            aria-label="Choose a parent dashboard preview"
          >
            {views.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={view === item}
                aria-controls="parent-preview-content"
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div id="parent-preview-content" className={styles.dashboardContent}>
            <h4>
              {view === "Progress"
                ? "The learning picture."
                : view === "Attendance"
                  ? "Every lesson in view."
                  : "A conversation with direction."}
            </h4>
            {view === "Progress" ? (
              <>
                {[
                  ["Cell structure", "Reviewed"],
                  ["Diffusion", "Practising"],
                  ["Exam technique", "Next lesson"],
                ].map(([topic, status]) => (
                  <div className={styles.topicRow} key={topic}>
                    <span>{topic}</span>
                    <span>{status}</span>
                  </div>
                ))}
                <p className={styles.dashboardNote}>
                  A topic view would help distinguish what has been covered from
                  what still needs practice.
                </p>
              </>
            ) : view === "Attendance" ? (
              <>
                <div className={styles.attendanceWeek}>
                  {["MON", "TUE", "WED", "THU", "FRI"].map((day, index) => (
                    <div key={day}>
                      <span>{day}</span>
                      <i aria-hidden="true">
                        {index === 0 || index === 3 ? "✓" : "—"}
                      </i>
                      <span>
                        {index === 0 || index === 3 ? "Attended" : "No lesson"}
                      </span>
                    </div>
                  ))}
                </div>
                <p className={styles.dashboardNote}>
                  This example shows two attended lessons in a sample week.
                  Actual attendance would come from the centre’s records.
                </p>
              </>
            ) : (
              <div className={styles.tutorNote}>
                <p>
                  “In this sample lesson, the learner explained diffusion
                  clearly. Next, practise using ‘net movement’ and
                  ‘concentration gradient’ in an exam answer.”
                </p>
                <span>Example feedback / Next step: targeted practice</span>
              </div>
            )}
          </div>
          <p className={styles.dashboardNote}>
            Illustrative preview. Parent accounts and live tracking are planned
            features.
          </p>
        </div>
      </div>
      <div id="education-partners" className={styles.partners}>
        <div className={artwork.partnerIntro}>
          <div className={artwork.partnerArt}>
            <SupportArtwork kind="classroom" />
          </div>
          <div>
            <span className="kicker">FOR SCHOOLS, TRUSTS & TUTORS</span>
            <h3>A shared ambition for every learner.</h3>
            <p>
              Discuss tuition support, learning resources and the role NEXA360
              could play alongside your teaching.
            </p>
          </div>
        </div>
        <a
          href="#contact"
          data-focus-target="inquiry-name"
          className={styles.primaryAction}
          onClick={() => {
            emitSiteEvent("nexa:interest", "Collaboration");
            if (matchMedia("(prefers-reduced-motion: reduce)").matches)
              requestAnimationFrame(() =>
                document
                  .getElementById("inquiry-name")
                  ?.focus({ preventScroll: true }),
              );
          }}
        >
          Enquire about a consultation <Arrow />
        </a>
      </div>
      <div
        id="future-skills"
        tabIndex={-1}
        className={`${styles.future} ${styles.chapterTarget}`}
      >
        <div>
          <span className="kicker">04 / BEYOND YOUR EXAMS</span>
          <h3>Exam ready. Future curious.</h3>
          <p>
            Connect academic foundations with the possibilities beyond them.
          </p>
        </div>
        <div className={styles.futureLinks}>
          <button
            type="button"
            onClick={() => emitSiteEvent("nexa:open-path", "cyber")}
          >
            Cybersecurity ↗<small>With Tutelr · Enquire for details</small>
          </button>
          <button
            type="button"
            onClick={() => emitSiteEvent("nexa:open-path", "ai")}
          >
            AI ↗<small>Future educational vision</small>
          </button>
          <button
            type="button"
            onClick={() => emitSiteEvent("nexa:open-path", "robotics")}
          >
            Robotics ↗<small>Future educational vision</small>
          </button>
        </div>
      </div>
    </>
  );
}
