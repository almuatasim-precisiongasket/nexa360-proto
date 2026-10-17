"use client";
import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { courses } from "@/lib/business-content";
import { PathArt } from "../PathArt";
import { onSiteEvent } from "@/lib/site-events";
import { ConsultLink, Label, SectionHead } from "./Shared";
import { VisualField } from "./VisualField";
import s from "./v5.module.css";

function NewCourseArt({ kind }: { kind: "game" | "ml" }) {
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <svg
      className={s.stageFigure}
      viewBox="0 0 400 280"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={id}
          x1="70"
          y1="40"
          x2="330"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79c7ff" />
          <stop offset="1" stopColor="#164b97" />
        </linearGradient>
      </defs>
      {kind === "game" ? (
        <g strokeLinejoin="round">
          <path
            d="M52 165L200 80L348 165L200 250Z"
            fill="#143b60"
            stroke="#6e9ec1"
          />
          <path
            d="M52 165v15l148 85v-15M348 165v15l-148 85"
            fill="#0a2340"
            stroke="#315d83"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} stroke="#527fa0" opacity=".35">
              <path d={`M${82 + i * 30} ${148 - i * 17}l148 85`} />
              <path d={`M${82 + i * 30} ${182 + i * 17}l148-85`} />
            </g>
          ))}
          <path d="M96 140l46-26 46 26-46 27Z" fill="#9bcdf0" />
          <path d="M96 140v35l46 27v-35Z" fill="#2463a4" />
          <path d="M142 167l46-27v35l-46 27Z" fill="#164470" />
          <path d="M231 119l44-26 44 26-44 25Z" fill="#91c4e8" />
          <path d="M231 119v45l44 26v-46Z" fill="#2661a2" />
          <path d="M275 144l44-25v45l-44 26Z" fill="#123860" />
          <motion.g
            animate={
              reduced
                ? {}
                : {
                    transform: [
                      "translateY(0px)",
                      "translateY(-6px)",
                      "translateY(0px)",
                    ],
                  }
            }
            transition={{ duration: 2.4, repeat: 1, ease: "easeInOut" }}
          >
            <circle cx="197" cy="143" r="11" fill="#f3e7c6" />
            <path
              d="M184 181v-19a13 13 0 0 1 26 0v19l-13 8Z"
              fill={`url(#${id})`}
              stroke="#b1ddff"
            />
            <path d="M191 185v17m12-17v17" stroke="#a7d4f3" strokeWidth="5" />
          </motion.g>
          <path
            d="M275 93V48m0 0l28 10-28 11"
            stroke="#dfc17c"
            strokeWidth="2"
          />
          <path
            d="M213 205l16-9m8-5 16-9"
            stroke="#80c7ff"
            strokeDasharray="4 5"
          />
        </g>
      ) : (
        <g>
          <path
            d="M65 50v180h285M65 110h285M65 170h285M135 50v180M205 50v180M275 50v180"
            stroke="#537994"
            strokeOpacity=".35"
          />
          <path
            d="M102 230Q175 110 300 54"
            stroke="#c3dcf0"
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />
          {Array.from({ length: 28 }, (_, i) => {
            const x = 94 + ((i * 37) % 230),
              y = 77 + ((i * 53) % 135);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={i % 5 === 0 ? 6 : 4}
                fill={y > 220 - (x - 80) * 0.55 ? "#70b9ff" : "#d6bf83"}
                initial={reduced ? false : { opacity: 0.2 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 1.6, delay: i * 0.035 }}
              />
            );
          })}
          <circle cx="241" cy="108" r="18" stroke="#dbefff" />
          <circle
            cx="241"
            cy="108"
            r="25"
            stroke="#83c6ff"
            strokeOpacity=".35"
          />
          <text x="72" y="36" fill="#91b7d3" fontSize="9" letterSpacing="2">
            PATTERNS → POSSIBILITIES
          </text>
          <text x="278" y="254" fill="#91b7d3" fontSize="9">
            SAMPLE DATA
          </text>
        </g>
      )}
    </svg>
  );
}
function CourseStage({ index }: { index: number }) {
  const course = courses[index];
  const reduced = useReducedMotion();
  return (
    <>
      <div className={s.stageArt}>
        <VisualField mode={index} />
        <motion.div
          key={course.id}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            zIndex: 1,
          }}
          initial={
            reduced
              ? false
              : { opacity: 0.3, transform: "translateY(12px) scale(.97)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={{
            duration: reduced ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {course.art ? (
            <PathArt kind={course.art} />
          ) : (
            <NewCourseArt kind={course.id as "game" | "ml"} />
          )}
        </motion.div>
        <span className={s.sampleLabel}>ILLUSTRATIVE PROGRAMME VISUAL</span>
      </div>
    </>
  );
}
export function CourseStudio() {
  const [selected, setSelected] = useState(0);
  useEffect(
    () =>
      onSiteEvent("nexa:open-path", (path) => {
        const index = courses.findIndex((course) => course.id === path);
        if (index >= 0) setSelected(index);
      }),
    [],
  );
  const course = courses[selected];
  return (
    <section
      id="technical"
      className={`section ${s.section} ${s.technical}`}
      tabIndex={-1}
    >
      <div className={s.inner}>
        <Label number="03" note="FIVE WAYS TO BUILD WHAT’S NEXT">
          THE TECHNICAL STUDIO
        </Label>
        <SectionHead
          label="PRACTICAL SKILLS. REAL CURIOSITY."
          title={
            <>
              Don’t just learn technology.
              <br />
              <em>Build with it.</em>
            </>
          }
          copy="Choose a subject. Discover what you could make. Our programmes connect important ideas with guided practical learning."
        />
        <div className={`${s.studio} v5-reveal`}>
          <div className={s.courseIndex}>
            {courses.map((item, i) => (
              <article className={s.courseRow} key={item.id}>
                <button
                  className={s.courseButton}
                  type="button"
                  aria-expanded={i === selected}
                  aria-controls={`course-${item.id}`}
                  onClick={() => setSelected(i)}
                >
                  <span>0{i + 1}</span>
                  <strong>{item.name}</strong>
                  <span aria-hidden="true">{i === selected ? "−" : "+"}</span>
                </button>
                {i === selected && (
                  <div id={`course-${item.id}`} className={s.courseDescription}>
                    <div className={s.courseMobileArt}>
                      <CourseStage index={i} />
                    </div>
                    <p>{item.description}</p>
                    <span className={s.eyebrow}>{item.leader}</span>
                    <details>
                      <summary>Programme details</summary>
                      <p>{item.detail}</p>
                      <p>
                        Availability and pricing depend on country, level, group
                        size and delivery format.
                      </p>
                    </details>
                    <ConsultLink
                      context={{
                        audience: "Individual",
                        category: "Technical courses",
                        programme: item.name,
                      }}
                    >
                      Enquire about this programme
                    </ConsultLink>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className={s.courseStage}>
            <div className={s.stageTop}>
              <span>NEXA / PRACTICAL LEARNING</span>
              <span>0{selected + 1} — 05</span>
            </div>
            <CourseStage index={selected} />
            <div className={s.stageFooter} aria-live="polite">
              <span className={s.eyebrow}>{course.eyebrow}</span>
              <p>{course.outcome}</p>
              <span>{course.leader}</span>
              <ul className={s.tagList}>
                {course.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className={s.footnote}>
          Programmes are enquiry-led. Course levels, projects, schedules and
          fees are confirmed in your proposal.
        </p>
      </div>
    </section>
  );
}
