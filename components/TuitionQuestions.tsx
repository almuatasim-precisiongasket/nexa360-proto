"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const questions = [
  {
    question: "Where can my child learn?",
    answer:
      "Choose one-to-one tuition at our centre in Barking, London, or online learning from home. The enquiry links above select your preferred format in the form.",
  },
  {
    question: "Which qualifications do you support?",
    answer:
      "Our academic tuition includes IGCSE and GCSE support, with concept-focused lessons aligned to the syllabus. Tell us the subjects and learning goals you would like to discuss.",
  },
  {
    question: "How will I hear about progress?",
    answer:
      "Progress is tracked against agreed targets, with weekly progress reports and a face-to-face parent meeting every month.",
  },
  {
    question: "What happens when I make an enquiry?",
    answer:
      "The form prepares an enquiry draft for you to review, copy or download. It does not send a message from the website. Choosing a tuition link preselects Academic tuition so you can add your child's subjects and goals.",
  },
];

export function TuitionQuestions() {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const refresh = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  return (
    <div id="tuition-faq" className="tuition-questions">
      <div className="questions-heading">
        <span className="kicker">BEFORE YOUR NEXT STEP</span>
        <h3>
          A little clarity.
          <br />
          <em>A confident start.</em>
        </h3>
        <p>The essentials for choosing your child’s next chapter.</p>
      </div>
      <div className="questions-list">
        {questions.map(({ question, answer }, index) => (
          <details key={question} name="tuition-questions" onToggle={refresh}>
            <summary>
              <span className="question-number" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{question}</span>
              <span className="question-toggle" aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
