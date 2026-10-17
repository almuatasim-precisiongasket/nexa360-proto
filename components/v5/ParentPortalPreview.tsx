"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import s from "./parent-portal.module.css";

const views = ["Overview", "Lesson reports", "Homework", "Attendance"] as const;
type View = (typeof views)[number];
const lessons = [
  {
    topic: "Number foundations",
    objective: "Use inverse operations to check an answer.",
    understanding: "Explains the method with prompts.",
    strength: "Recognises which operation to reverse.",
    next: "Practise explaining each calculation aloud.",
    note: "A useful first step. Keep the focus on explaining the method, rather than rushing to an answer.",
    confidence: "With support",
  },
  {
    topic: "One-step equations",
    objective: "Solve an equation using an inverse operation.",
    understanding: "Solves familiar examples with fewer prompts.",
    strength: "Keeps both sides of the equation balanced.",
    next: "Check each answer by substitution.",
    note: "The method is becoming more consistent. A short check after each answer will help build independence.",
    confidence: "Building confidence",
  },
  {
    topic: "Two-step equations",
    objective: "Choose and explain the order of two inverse operations.",
    understanding:
      "Explains familiar examples independently; needs a prompt for a new variation.",
    strength: "Identifies the first operation to reverse.",
    next: "Practise two-step equations and check by substitution.",
    note: "There is more confidence in explaining the first step. Next, we’ll work on checking the final answer without a reminder.",
    confidence: "Growing independence",
  },
];
const tasks = [
  {
    id: "practice",
    title: "Check your answers",
    description:
      "Revisit three one-step equations and check each by substitution.",
    lesson: "Lesson 02",
    label: "Practice",
  },
  {
    id: "revision",
    title: "Explain the two steps",
    description:
      "Try five two-step equations. Write a short explanation of each inverse operation.",
    lesson: "Lesson 03",
    label: "Next lesson preparation",
  },
];
function Icon({ view }: { view: View }) {
  const paths: Record<View, string> = {
    Overview: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    "Lesson reports": "M6 3h12v18H6zM9 8h6M9 12h6M9 16h4",
    Homework: "M4 5h16v15H4zM8 3v4M16 3v4M8 13l3 3 5-6",
    Attendance: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M7 12l3 3 7-7",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[view]} />
    </svg>
  );
}

/** A deterministic public preview. No student records, accounts or storage. */
export function ParentPortalPreview() {
  const [view, setView] = useState<View>("Overview");
  const [lesson, setLesson] = useState(2);
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    practice: true,
    revision: false,
  });
  const reduced = useReducedMotion();
  const done = tasks.filter((task) => completed[task.id]).length;
  const report = lessons[lesson];
  function openView(next: View) {
    setView(next);
    requestAnimationFrame(() => {
      const panel = document.getElementById("portal-panel");
      if (!panel) return;
      panel.focus({ preventScroll: true });
      const top = panel.getBoundingClientRect().top;
      if (top < 110 || top > innerHeight * 0.6)
        panel.scrollIntoView({
          block: "start",
          behavior: reduced ? "instant" : "smooth",
        });
    });
  }
  const openReport = (index: number) => {
    setLesson(index);
    openView("Lesson reports");
  };
  return (
    <section
      id="parent-portal"
      className={s.portal}
      aria-labelledby="parent-portal-title"
    >
      <div className={s.intro}>
        <div>
          <span className={s.kicker}>FOR PARENTS / A CLEARER PICTURE</span>
          <h3 id="parent-portal-title">
            Their progress.
            <br />
            <em>In your view.</em>
          </h3>
        </div>
        <div>
          <p>
            See what your child is learning, where they need support and what
            comes next. Our planned portal brings the important details into one
            place.
          </p>
          <span className={s.promise}>
            An individual report for every child — including group lessons.
          </span>
        </div>
      </div>
      <div className={s.dashboard}>
        <div className={s.topbar}>
          <span className={s.wordmark}>
            NEXA<span> / FAMILY SPACE</span>
          </span>
          <span className={s.sampleBadge}>
            <i />
            INTERACTIVE PREVIEW
          </span>
        </div>
        <div className={s.workspace}>
          <div className={s.sidebar}>
            <span className={s.navCaption}>YOUR CHILD’S LEARNING</span>
            <div
              className={s.nav}
              role="tablist"
              aria-label="Explore the parent portal sample"
              onKeyDown={(event) => {
                const index = views.indexOf(view);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? views.length - 1
                      : ["ArrowRight", "ArrowDown"].includes(event.key)
                        ? (index + 1) % views.length
                        : ["ArrowLeft", "ArrowUp"].includes(event.key)
                          ? (index + views.length - 1) % views.length
                          : -1;
                if (next < 0) return;
                event.preventDefault();
                setView(views[next]);
                document
                  .getElementById(
                    `portal-tab-${views[next].replaceAll(" ", "-")}`,
                  )
                  ?.focus();
              }}
            >
              {views.map((item) => (
                <button
                  type="button"
                  role="tab"
                  id={`portal-tab-${item.replaceAll(" ", "-")}`}
                  aria-selected={view === item}
                  tabIndex={view === item ? 0 : -1}
                  aria-controls="portal-panel"
                  key={item}
                  onClick={() => setView(item)}
                >
                  <Icon view={item} />
                  <span>{item}</span>
                  {view === item && <span className={s.navDot} />}
                </button>
              ))}
            </div>
            <div className={s.sidebarNote}>
              <span>CONNECTED TO THE LESSON.</span>
              <p>
                A little more clarity.
                <br />A better conversation.
              </p>
            </div>
          </div>
          <div className={s.main}>
            <div className={s.studentBar}>
              <div className={s.studentIdentity}>
                <span className={s.avatar} aria-hidden="true">
                  S
                </span>
                <div>
                  <strong>Sample learner</strong>
                  <span>GCSE Maths · Illustrative data</span>
                </div>
              </div>
              <span className={s.planned}>PORTAL PLANNED</span>
            </div>
            <motion.div
              id="portal-panel"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`portal-tab-${view.replaceAll(" ", "-")}`}
              key={view}
              initial={reduced ? false : { opacity: 0.65 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className={s.panel}
            >
              <div className={s.viewHeading}>
                <div>
                  <span className={s.kicker}>
                    PARENT VIEW / {view.toUpperCase()}
                  </span>
                  <h4>
                    {view === "Overview"
                      ? "The bigger picture, simply."
                      : view === "Lesson reports"
                        ? "Every lesson. A little clearer."
                        : view === "Homework"
                          ? "Small steps between lessons."
                          : "A record you can follow."}
                  </h4>
                </div>
                <span className={s.sampleLabel}>SAMPLE DATA</span>
              </div>
              {view === "Overview" ? (
                <>
                  <div className={s.metrics}>
                    <div>
                      <span>Lessons attended</span>
                      <strong>
                        3 <small>/ 3</small>
                      </strong>
                      <p>In this sample learning journey</p>
                    </div>
                    <div>
                      <span>Homework complete</span>
                      <strong>
                        {done} <small>/ {tasks.length}</small>
                      </strong>
                      <p>
                        {done === tasks.length
                          ? "Sample tasks marked complete"
                          : "A little practice to come back to"}
                      </p>
                    </div>
                    <div className={s.focusMetric}>
                      <span>Current focus</span>
                      <strong>
                        Two-step
                        <br />
                        equations
                      </strong>
                      <p>Understanding the method</p>
                    </div>
                  </div>
                  <div className={s.overviewGrid}>
                    <div className={s.progressCard}>
                      <div className={s.cardHeading}>
                        <h5>Confidence over time</h5>
                        <span>TUTOR OBSERVATIONS</span>
                      </div>
                      <svg
                        className={s.chart}
                        viewBox="0 0 440 160"
                        role="img"
                        aria-label="Illustrative tutor observations across three lessons, from with support to growing independence"
                      >
                        <defs>
                          <linearGradient
                            id="portal-chart-fill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop stopColor="#175cdb" stopOpacity=".14" />
                            <stop
                              offset="1"
                              stopColor="#175cdb"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M25 40H415M25 90H415M25 140H415"
                          stroke="#e4e5e5"
                          strokeDasharray="3 5"
                        />
                        <path
                          d="M35 124C115 124 140 91 220 84S330 43 405 29V145H35Z"
                          fill="url(#portal-chart-fill)"
                        />
                        <motion.path
                          d="M35 124C115 124 140 91 220 84S330 43 405 29"
                          fill="none"
                          stroke="#175cdb"
                          strokeWidth="2.5"
                          initial={reduced ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                        />
                        {[
                          [35, 124],
                          [220, 84],
                          [405, 29],
                        ].map(([x, y], i) => (
                          <g key={i}>
                            <circle
                              cx={x}
                              cy={y}
                              r="6"
                              fill="#fff"
                              stroke="#175cdb"
                              strokeWidth="2"
                            />
                          </g>
                        ))}
                      </svg>
                      <div className={s.chartLabels}>
                        {lessons.map((item, i) => (
                          <span key={item.topic}>
                            <b>Lesson 0{i + 1}</b>
                            {item.confidence}
                          </span>
                        ))}
                      </div>
                      <p className={s.chartNote}>
                        Illustrative observations, not exam grades or predicted
                        results.
                      </p>
                    </div>
                    <div className={s.nextStep}>
                      <span className={s.kicker}>WHAT COMES NEXT</span>
                      <h5>
                        Build the habit
                        <br />
                        of checking.
                      </h5>
                      <p>{lessons[2].next}</p>
                      <button
                        type="button"
                        onClick={() => openView("Homework")}
                      >
                        See practice tasks <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={s.latestReport}
                    onClick={() => openReport(2)}
                  >
                    <span className={s.reportIcon}>
                      <Icon view="Lesson reports" />
                    </span>
                    <span>
                      <small>LATEST LESSON REPORT / LESSON 03</small>
                      <strong>Two-step equations</strong>
                      <span>
                        See the tutor’s feedback and recommended next step.
                      </span>
                    </span>
                    <b aria-hidden="true">↗</b>
                  </button>
                </>
              ) : view === "Lesson reports" ? (
                <>
                  <div
                    className={s.lessonPicker}
                    role="group"
                    aria-label="Choose a sample lesson report"
                  >
                    {lessons.map((item, i) => (
                      <button
                        type="button"
                        key={item.topic}
                        aria-pressed={lesson === i}
                        onClick={() => setLesson(i)}
                      >
                        <small>LESSON 0{i + 1}</small>
                        <span>{item.topic}</span>
                      </button>
                    ))}
                  </div>
                  <article className={s.lessonReport}>
                    <div className={s.reportTitle}>
                      <h5>{report.topic}</h5>
                      <span className={s.attended}>Attended</span>
                    </div>
                    <div className={s.reportDetails}>
                      {[
                        ["Learning objective", report.objective],
                        ["Understanding", report.understanding],
                        ["Strength to build on", report.strength],
                        ["Recommended next step", report.next],
                      ].map(([label, text]) => (
                        <div key={label}>
                          <span>{label}</span>
                          <p>{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className={s.tutorNote}>
                      <span>TUTOR’S NOTE</span>
                      <p>“{report.note}”</p>
                    </div>
                  </article>
                  <button
                    type="button"
                    className={s.textAction}
                    onClick={() => openView("Homework")}
                  >
                    Explore the sample homework ↗
                  </button>
                </>
              ) : view === "Homework" ? (
                <>
                  <div className={s.taskSummary}>
                    <span>
                      {done} of {tasks.length} sample tasks complete
                    </span>
                    <div
                      role="progressbar"
                      aria-label="Sample homework completion"
                      aria-valuemin={0}
                      aria-valuemax={tasks.length}
                      aria-valuenow={done}
                    >
                      <i style={{ width: `${(done / tasks.length) * 100}%` }} />
                    </div>
                  </div>
                  <div className={s.tasks}>
                    {tasks.map((task) => (
                      <label
                        key={task.id}
                        className={s.task}
                        data-complete={completed[task.id]}
                      >
                        <input
                          type="checkbox"
                          checked={completed[task.id]}
                          onChange={(e) =>
                            setCompleted((old) => ({
                              ...old,
                              [task.id]: e.target.checked,
                            }))
                          }
                        />
                        <span>
                          <small>
                            {task.lesson} / {task.label}
                          </small>
                          <strong>{task.title}</strong>
                          <span>{task.description}</span>
                          <em>
                            {completed[task.id]
                              ? "Marked complete in this preview"
                              : "To practise before the next lesson"}
                          </em>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className={s.interactionNote}>
                    Try marking a task complete. This changes the sample
                    dashboard only; it does not update a student record.
                  </p>
                </>
              ) : (
                <>
                  <div className={s.attendanceSummary}>
                    <span className={s.attendanceCount}>
                      3 <small>/ 3</small>
                    </span>
                    <div>
                      <h5>A consistent learning routine.</h5>
                      <p>All three lessons attended in this sample journey.</p>
                    </div>
                  </div>
                  <div className={s.attendanceList}>
                    {lessons.map((item, i) => (
                      <div key={item.topic}>
                        <span className={s.sessionNumber}>0{i + 1}</span>
                        <div>
                          <strong>{item.topic}</strong>
                          <span>Sample lesson {i + 1} · GCSE Maths</span>
                        </div>
                        <span className={s.attended}>Attended</span>
                        <button type="button" onClick={() => openReport(i)}>
                          View report <span aria-hidden="true">↗</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className={s.interactionNote}>
                    Attendance is illustrative. No live timetable or student
                    attendance record is connected.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </div>
        <div className={s.previewFooter}>
          <p>
            <strong>A preview of what’s planned.</strong> All names, lessons and
            progress shown are illustrative. Parent accounts are not yet
            available.
          </p>
          <button
            type="button"
            onClick={() => {
              openView("Overview");
              setLesson(2);
              setCompleted({ practice: true, revision: false });
            }}
          >
            Reset preview ↺
          </button>
        </div>
      </div>
    </section>
  );
}
