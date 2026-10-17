"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ConsultLink } from "./Shared";
import s from "./questions.module.css";

const groups = [
  {
    name: "GCSE tuition",
    context: { audience: "Individual", category: "GCSE tuition" },
    action: "Discuss GCSE tuition",
    items: [
      {
        question: "How is tuition different from skills learning?",
        answer:
          "GCSE tuition focuses on school subjects, understanding and exam preparation. Skills courses explore technology through subjects such as AI, cybersecurity and robotics. They are separate learning routes, so we can help you choose the right starting point.",
        link: "Compare the learning routes",
        target: "#welcome",
      },
      {
        question: "Can my child learn in London or online?",
        answer:
          "You can discuss tuition at Barking Riverside, London, or online. Choose your preferred tutor category and session format, then we’ll confirm the subjects, tutor availability, group arrangements and quotation with you.",
        link: "Choose tuition preferences",
        target: "#tuition",
      },
      {
        question: "How will I follow my child’s progress?",
        answer:
          "Our planned parent portal brings individual lesson feedback, homework, attendance and recommended next steps together. Each child has their own report, including in group sessions. The dashboard on this page is an illustrative preview; parent accounts are not yet available.",
        link: "Explore the parent portal preview",
        target: "#parent-portal",
      },
    ],
  },
  {
    name: "Skills courses",
    context: { audience: "Individual", category: "Technical courses" },
    action: "Find a skills programme",
    items: [
      {
        question: "Which subjects can I explore?",
        answer:
          "Explore Cybersecurity, AI & Agentic AI, Robotics, Game Programming and Machine Learning. The course studio explains each direction and includes a small interactive sample. We’ll discuss the appropriate level, prerequisites and availability during consultation.",
        link: "Explore all five subjects",
        target: "#technical",
      },
      {
        question: "Will I work towards a practical project?",
        answer:
          "Practical work depends on the programme. Intended outcomes include a guided agentic AI application, robotics projects or a playable game. We confirm the curriculum, project scope, instructor and delivery details in your proposal rather than treating every course as the same package.",
        link: "Read the programme details",
        target: "#technical",
      },
      {
        question: "Can I enquire as an individual learner?",
        answer:
          "Yes. Individuals and organisations can enquire about technical programmes. Tell us your experience, learning goals and preferred delivery. We’ll discuss the available level, format, schedule and fees before you choose a programme.",
        link: "Try an interactive subject sample",
        target: "#course-lab",
      },
    ],
  },
  {
    name: "Organisations",
    context: { audience: "Institution", category: "Institutional programme" },
    action: "Discuss your programme",
    items: [
      {
        question: "Can a programme fit our organisation?",
        answer:
          "We work around the needs of schools, universities, businesses and CSR or community initiatives. Discuss your audience, goals and experience level so the programme, delivery and practical activities can be shaped around your people.",
        link: "Explore institutional programmes",
        target: "#pathways",
      },
      {
        question: "What happens during a consultation?",
        answer:
          "The free initial consultation helps us understand your objectives, participants, timing and preferred delivery. We can then discuss a proposal, programme customisation and next steps. Introductory sessions may be available for applicable programmes, subject to scheduling and availability.",
        link: "Review the programme process",
        target: "#pathways",
      },
      {
        question: "How are availability and fees confirmed?",
        answer:
          "We discuss these individually. The quotation depends on the selected programme, participant level, group size, delivery, location and agreed scope. No booking, place or final fee is confirmed by preparing an enquiry on this page.",
        link: "Prepare a consultation enquiry",
        target: "#contact",
      },
    ],
  },
] as const;

export function Questions() {
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const group = groups[category],
    item = group.items[selected];
  return (
    <section
      id="questions"
      className={s.section}
      aria-labelledby="questions-heading"
    >
      <div className={s.inner}>
        <div className={s.heading}>
          <div>
            <span className={s.kicker}>BEFORE WE TALK / USEFUL ANSWERS</span>
            <h2 id="questions-heading">
              A little clarity.
              <br />
              <em>A better next step.</em>
            </h2>
          </div>
          <p>
            Different learners need different things. Find the answers that
            matter to you before starting a conversation.
          </p>
        </div>
        <div className={s.categories} role="group" aria-label="Choose a topic">
          {groups.map((entry, i) => (
            <button
              type="button"
              key={entry.name}
              aria-pressed={category === i}
              onClick={() => {
                setCategory(i);
                setSelected(0);
              }}
            >
              {entry.name}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className={s.browser}>
          <div className={s.index}>
            <span className={s.indexLabel}>
              EXPLORE / {group.name.toUpperCase()}
            </span>
            {group.items.map((entry, i) => (
              <button
                type="button"
                key={entry.question}
                aria-pressed={selected === i}
                aria-controls="nexa-answer"
                onClick={() => setSelected(i)}
              >
                <small>0{i + 1}</small>
                <span>{entry.question}</span>
                <b aria-hidden="true">{selected === i ? "−" : "+"}</b>
              </button>
            ))}
          </div>
          <motion.div
            id="nexa-answer"
            className={s.answer}
            key={`${category}-${selected}`}
            initial={reduced ? false : { opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            aria-live="polite"
          >
            <span className={s.answerNumber}>
              0{selected + 1} / {group.name}
            </span>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
            <a href={item.target} className={s.detailLink}>
              {item.link} <span aria-hidden="true">↗</span>
            </a>
            <div className={s.answerAction}>
              <span>LET’S FIND THE RIGHT FIT</span>
              <ConsultLink context={group.context}>{group.action}</ConsultLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
