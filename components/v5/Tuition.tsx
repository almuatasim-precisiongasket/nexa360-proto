"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import { ConsultLink, Label } from "./Shared";
import { ParentPortalPreview } from "./ParentPortalPreview";
import s from "./v5.module.css";
const RiveDesk = dynamic(() => import("../tuition/RiveLearningDesk"), {
  ssr: false,
});
function DeskScene() {
  const root = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        setVisible(e.isIntersecting);
      },
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={s.desk} ref={root} data-nexa-reveal="surface">
      <Image
        className={s.deskPoster}
        src="/assets/rive/learning-desk-0.svg"
        width={900}
        height={650}
        alt="An illustrated study desk with books and learning materials"
      />
      {near && (
        <div className={s.deskRuntime}>
          <RiveDesk programme={0} visible={visible} />
        </div>
      )}
    </div>
  );
}
function Choice({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className={s.preferenceGroup}>
      <legend>{label}</legend>
      <div className={s.choices}>
        {items.map((x) => (
          <button
            type="button"
            key={x}
            aria-pressed={value === x}
            onClick={() => onChange(x)}
          >
            {x}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
export function Tuition() {
  const [delivery, setDelivery] = useState("Barking Riverside"),
    [tutor, setTutor] = useState("UK-based"),
    [format, setFormat] = useState("1:1");
  return (
    <section
      id="tuition"
      className={`section ${s.section} ${s.tuition}`}
      tabIndex={-1}
    >
      <div className={s.paper}>
        <Label number="01" note="BARKING RIVERSIDE, LONDON · ONLINE">
          GCSE & SCHOOL LEARNING
        </Label>
        <div className={`${s.tuitionGrid} v5-reveal`} data-nexa-owned>
          <div>
            <div data-nexa-scene>
              <span className={s.eyebrow} data-nexa-kicker>
                SCHOOL SUBJECT SUPPORT / FOR STUDENTS & PARENTS
              </span>
              <h2 data-nexa-heading>
                GCSE tuition
                <br />
                that fits
                <br />
                <em>your child.</em>
              </h2>
              <p data-nexa-support>
                Expert guidance. Room for questions. A learning arrangement
                shaped around your child’s needs and your family’s priorities.
              </p>
            </div>
            <DeskScene />
            <div className={s.deskNote}>
              <span>STRONGER FOUNDATIONS</span>
              <span>ONE LESSON AT A TIME</span>
            </div>
          </div>
          <div
            className={s.preferences}
            data-nexa-reveal="surface"
            data-nexa-delay="0.2"
          >
            <span className={s.eyebrow}>LET’S FIND YOUR FIT</span>
            <h3>Your learning preferences.</h3>
            <p style={{ fontSize: 13, color: "#6a7c88" }}>
              A starting point for your free consultation.
            </p>
            <Choice
              label="01 / Where would you like to learn?"
              items={["Barking Riverside", "Online"]}
              value={delivery}
              onChange={setDelivery}
            />
            <Choice
              label="02 / Preferred tutor category"
              items={["International", "UK-based", "Premium"]}
              value={tutor}
              onChange={setTutor}
            />
            <Choice
              label="03 / Preferred session format"
              items={["1:1", "Small group · 1:5", "Larger group · 1:20"]}
              value={format}
              onChange={setFormat}
            />
            <div className={s.summary} aria-live="polite">
              <motion.strong
                key={`${delivery}-${tutor}-${format}`}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {delivery} · {tutor} · {format}
              </motion.strong>
              <p>
                We’ll confirm tutor availability, subjects, group arrangements
                and a personalised quotation. Group ratios are proposed.
              </p>
            </div>
            <ConsultLink
              context={{
                audience: "Individual",
                category: "GCSE tuition",
                programme: "GCSE",
                delivery,
                tutor,
                format,
              }}
            >
              Book a GCSE consultation
            </ConsultLink>
            <p className={s.footnote}>
              International tutors are selected from India. Premium tutors may
              include Oxford or Cambridge university talent, subject to
              availability. Preferences are discussed during consultation.
            </p>
          </div>
        </div>
        <ParentPortalPreview />
      </div>
    </section>
  );
}
