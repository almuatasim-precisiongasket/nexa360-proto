"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { AmbientField } from "../AmbientField";
import { PathArt } from "../PathArt";
import { VisualField } from "./VisualField";
import { ConsultLink } from "./Shared";
import s from "./v5.module.css";

const routes = [
  {
    label: "A parent or student",
    title: "Start with GCSE tuition.",
    copy: "Explore tutor, delivery and group preferences, then request support for your child.",
    target: "#tuition",
    action: "Explore GCSE tuition",
  },
  {
    label: "A skills learner",
    title: "Find a technology course.",
    copy: "Explore five practical subjects, try a small learning demo and enquire about the programme.",
    target: "#technical",
    action: "Explore skills courses",
  },
  {
    label: "An organisation",
    title: "Build a programme for your people.",
    copy: "Schools, universities, businesses and community organisations can discuss a tailored technical programme.",
    target: "#pathways",
    action: "Explore institutional programmes",
  },
];
export function Gateway() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const route = routes[selected];
  return (
    <section id="welcome" className={s.gateway}>
      <AmbientField />
      <div className={s.inner}>
        <div className={s.gatewayIntro}>
          <div>
            <span className={s.eyebrow}>
              NEXA360 / EDUCATION WITHOUT BOUNDARIES
            </span>
            <h1>
              School confidence.
              <br />
              <em>Skills for the future.</em>
            </h1>
          </div>
          <p>
            Two clear ways to learn. GCSE tuition for school students, and
            practical technology courses for curious learners and organisations.
          </p>
        </div>
        <div className={s.routeCards}>
          <motion.article
            className={s.academicRoute}
            whileHover={reduced ? undefined : { transform: "translateY(-4px)" }}
            transition={{ duration: 0.25 }}
          >
            <div className={s.routeCopy}>
              <span className={s.routeNumber}>01 / SCHOOL LEARNING</span>
              <h2>
                GCSE
                <br />
                <em>tuition.</em>
              </h2>
              <p>
                Support your child’s understanding, confidence and exam
                preparation.
              </p>
              <ul>
                <li>Barking Riverside, London & online</li>
                <li>Individual and group preferences</li>
                <li>International, UK-based & premium tutors</li>
              </ul>
              <a href="#tuition" className={s.cta}>
                Explore GCSE tuition <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={s.routeDesk}>
              <Image
                src="/assets/rive/learning-desk-0.svg"
                width={900}
                height={650}
                alt="Illustrated study desk for school learning"
              />
            </div>
            <span className={s.routeCaption}>
              FOR SCHOOL STUDENTS & PARENTS
            </span>
          </motion.article>
          <motion.article
            className={s.skillsRoute}
            whileHover={reduced ? undefined : { transform: "translateY(-4px)" }}
            transition={{ duration: 0.25 }}
          >
            <VisualField mode={1} />
            <div className={s.routeCopy}>
              <span className={s.routeNumber}>02 / TECHNOLOGY LEARNING</span>
              <h2>
                Skills
                <br />
                <em>courses.</em>
              </h2>
              <p>
                Learn by exploring, experimenting and working towards practical
                projects.
              </p>
              <ul>
                <li>AI & Agentic AI · Cybersecurity</li>
                <li>Robotics · Game Programming</li>
                <li>Machine Learning</li>
              </ul>
              <a href="#technical" className={`${s.cta} ${s.lightCta}`}>
                Explore skills courses <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={s.routeRobot}>
              <PathArt kind="robotics" />
            </div>
            <span className={s.routeCaption}>FOR LEARNERS & ORGANISATIONS</span>
          </motion.article>
        </div>
        <div className={s.routeFinder}>
          <div>
            <span className={s.eyebrow}>NOT SURE WHERE TO START?</span>
            <h3>I’m here as…</h3>
            <div
              className={s.finderTabs}
              role="group"
              aria-label="Choose the route that fits you"
            >
              {routes.map((r, i) => (
                <button
                  key={r.label}
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  {selected === i && (
                    <motion.span
                      layoutId="route-finder"
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    />
                  )}
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
          <motion.div
            className={s.finderAnswer}
            key={selected}
            initial={
              reduced ? false : { opacity: 0.5, transform: "translateY(6px)" }
            }
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
          >
            <h4>{route.title}</h4>
            <p>{route.copy}</p>
            <a href={route.target}>{route.action} ↗</a>
          </motion.div>
        </div>
        <div className={s.gatewayBottom}>
          <span>FREE INITIAL CONSULTATION · PERSONALISED GUIDANCE</span>
          <ConsultLink context={{ category: "", audience: "Individual" }}>
            Book a consultation
          </ConsultLink>
        </div>
      </div>
    </section>
  );
}
