"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { audiences, processSteps, processCopy } from "@/lib/business-content";
import { AmbientField } from "../AmbientField";
import { ConsultLink, Label, OpticalTransition } from "./Shared";
import { VisualField } from "./VisualField";
import s from "./v5.module.css";
export function Institutions() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const a = audiences[selected];
  return (
    <section
      id="pathways"
      className={`section ${s.section} ${s.institutions}`}
      tabIndex={-1}
    >
      <AmbientField />
      <div className={s.inner}>
        <Label number="02" note="DESIGNED AROUND YOUR PEOPLE">
          INSTITUTIONAL PROGRAMMES
        </Label>
        <div className={s.serviceLinks}>
          <a href="#pathways">Institutions</a>
          <a href="#technical">Technical courses ↗</a>
          <a href="#tuition">GCSE tuition ↗</a>
        </div>
        <div className={`${s.institutionGrid} v5-reveal`}>
          <div>
            <span className={s.eyebrow}>LEARNING, AT A LARGER SCALE</span>
            <h2>
              Technical learning.
              <br />
              <em>Collective possibility.</em>
            </h2>
            <p className={s.lead}>
              Expertise meets your ambition. Programmes shaped around your
              learners, your goals and your community.
            </p>
            <ConsultLink
              light
              context={{
                audience: "Institution",
                category: "Institutional programme",
                organisationType: a.name,
              }}
            >
              Request a consultation
            </ConsultLink>
            <p className={s.footnote}>
              Free initial consultation · Custom programme proposals
            </p>
          </div>
          <div className={s.institutionPanel}>
            <div className={s.network} aria-hidden="true">
              <VisualField
                mode={-1}
                focus={selected === 0 ? 1 : selected === 1 ? 0 : selected}
              />
              <svg viewBox="0 0 500 320" fill="none">
                <path
                  d="M250 160L100 65M250 160L400 65M250 160L100 255M250 160L400 255"
                  stroke="currentColor"
                  strokeWidth=".7"
                />
                <circle cx="250" cy="160" r="44" />
                <circle cx="250" cy="160" r="56" strokeDasharray="2 8" />
                {[
                  [100, 65],
                  [400, 65],
                  [100, 255],
                  [400, 255],
                ].map(([x, y], i) => (
                  <g key={i} opacity={i === selected ? 1 : 0.35}>
                    <circle cx={x} cy={y} r="22" />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill="currentColor"
                      stroke="none"
                      fontSize="10"
                    >
                      {audiences[i].code}
                    </text>
                  </g>
                ))}
                <text
                  x="250"
                  y="165"
                  textAnchor="middle"
                  fill="currentColor"
                  stroke="none"
                  fontSize="13"
                >
                  NEXA360
                </text>
              </svg>
              <span className={s.networkCaption}>
                ONE CONNECTED LEARNING NETWORK
              </span>
            </div>
            <div
              className={s.audienceTabs}
              role="group"
              aria-label="Choose your organisation type"
            >
              {audiences.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => setSelected(i)}
                >
                  {i === selected && (
                    <motion.span
                      layoutId="audience-line"
                      className={s.activeLine}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    />
                  )}
                  {item.name}
                </button>
              ))}
            </div>
            <div className={s.audienceContent} aria-live="polite">
              <motion.div
                key={selected}
                initial={
                  reduced
                    ? false
                    : { opacity: 0.6, transform: "translateY(4px)" }
                }
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{
                  duration: reduced ? 0 : 0.25,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <span className={s.eyebrow}>
                  PROGRAMME BRIEF / 0{selected + 1}
                </span>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <ul className={s.tagList}>
                  {a.examples.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        <div className={`${s.process} v5-reveal`}>
          {processSteps.map((step, i) => (
            <div key={step}>
              <span>0{i + 1}</span>
              <h4>{step}</h4>
              <p>{processCopy[i]}</p>
            </div>
          ))}
        </div>
      </div>
      <OpticalTransition />
    </section>
  );
}
