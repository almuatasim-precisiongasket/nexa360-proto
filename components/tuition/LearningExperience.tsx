import { SectionHandoff } from "../SectionHandoff";
import { LearningPreview } from "./LearningPreview";
import { ParentPreview } from "./ParentPreview";
import { TuitionEnquiry } from "../TuitionEnquiry";
import styles from "./tuition-experience.module.css";
import { SupportArtwork } from "./SupportArtwork";
import artwork from "./support-artwork.module.css";
import { LearningGuide } from "./LearningGuide";
import { LearningSystemExploded } from "./LearningSystemExploded";

export function LearningExperience() {
  return (
    <section id="products" className={`section ${styles.products}`}>
      <SectionHandoff previous="#e7edea" light />
      <div className="section-label">
        <span>OUR PRODUCTS / LEARNING TOOLS</span>
        <span>LEARNING PLATFORM PREVIEW</span>
      </div>
      <LearningGuide />
      <div id="learning-tools" tabIndex={-1} className={styles.chapterTarget}>
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
        <LearningSystemExploded />
        <LearningPreview />
      </div>
      <div
        id="exam-practice"
        tabIndex={-1}
        className={`${styles.practice} ${styles.chapterTarget}`}
      >
        <div className={artwork.practiceHeading}>
          <div className={artwork.practiceArt}>
            <SupportArtwork kind="practice" />
          </div>
          <div>
            <span className="kicker">02 / FROM KNOWING TO APPLYING</span>
            <h3>
              Exam practice.
              <br />
              <em>With the reasoning.</em>
            </h3>
          </div>
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
