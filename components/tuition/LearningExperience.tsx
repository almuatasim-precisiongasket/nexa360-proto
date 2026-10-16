import { SectionHandoff } from "../SectionHandoff";
import { LearningPreview } from "./LearningPreview";
import { ParentPreview } from "./ParentPreview";
import { TuitionEnquiry } from "../TuitionEnquiry";
import styles from "./tuition-experience.module.css";

export function LearningExperience() {
  return (
    <section id="products" className={`section ${styles.products}`}>
      <SectionHandoff previous="#e7edea" light />
      <div className="section-label">
        <span>OUR PRODUCTS / THE NEXT CHAPTER</span>
        <span>LEARNING PLATFORM PREVIEW</span>
      </div>
      <div className={styles.productIntro}>
        <div>
          <span className={styles.previewBadge}>
            In development / Explore the concept
          </span>
          <h2>
            Your learning.
            <br />
            <em>Joined up.</em>
          </h2>
        </div>
        <p>
          Our vision: a subject AI aligned to your exam board, revision cards
          for the topics that need practice, and a study plan that gives your
          week direction. Try a sample of that connected experience.
        </p>
      </div>
      <LearningPreview />
      <div className={styles.practice}>
        <div>
          <span className="kicker">FROM KNOWING TO APPLYING</span>
          <h3>
            Exam practice.
            <br />
            <em>With the reasoning.</em>
          </h3>
        </div>
        <div>
          <p>
            Discuss past-paper practice, practice papers and detailed answers
            for your qualification. Share your subject and exam board so we can
            confirm the resources and guidance available.
          </p>
          <TuitionEnquiry>Ask about exam preparation</TuitionEnquiry>
        </div>
      </div>
      <ParentPreview />
    </section>
  );
}
