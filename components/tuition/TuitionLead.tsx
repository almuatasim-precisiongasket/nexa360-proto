import { Arrow } from "../Logo";
import { TextReveal } from "../TextReveal";
import styles from "./tuition-experience.module.css";
import type { ReactNode } from "react";

export function TuitionLead({ learningDesk }: { learningDesk: ReactNode }) {
  return (
    <div className={styles.lead}>
      <div>
        <div className={styles.locationLine}>
          <span>Barking, London</span>
          <i aria-hidden="true" />
          <span>Learn online</span>
        </div>
        <TextReveal
          lines={["Expert tuition.", "Your unfair advantage."]}
          italicLast
        />
        <p className={styles.leadCopy}>
          Understanding that lasts beyond the next exam. Personal guidance,
          purposeful practice and a bigger horizon for every learner.
        </p>
        <div className={styles.leadActions}>
          <a href="#programme-finder" className={styles.primaryAction}>
            Find your programme <Arrow />
          </a>
          <a href="#products" className={styles.quietAction}>
            Preview the learning tools <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <aside className={styles.learningNote}>
        <span className={styles.noteCorner} aria-hidden="true" />
        <span className="kicker">THE NEXA360 APPROACH</span>
        {learningDesk}
        <span>
          In-person and online tuition today. Explore our vision for AI
          explanations, revision cards and a clearer view of progress.
        </span>
        <a href="#products">
          AI learning platform · Preview <Arrow />
        </a>
      </aside>
      <nav
        className={styles.audienceLinks}
        aria-label="Explore tuition for your role"
      >
        <a href="#programme-finder">
          <span className="kicker">I’M A STUDENT</span>
          <strong>
            Find my direction <Arrow />
          </strong>
        </a>
        <a href="#parent-preview">
          <span className="kicker">I’M A PARENT</span>
          <strong>
            See the bigger picture <Arrow />
          </strong>
        </a>
        <a href="#education-partners">
          <span className="kicker">SCHOOL, TRUST OR TUTOR</span>
          <strong>
            Explore working together <Arrow />
          </strong>
        </a>
      </nav>
    </div>
  );
}
