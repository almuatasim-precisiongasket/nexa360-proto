# V4 — Tuition and learning experience

Build the approved tuition proposition into the existing one-page site. Keep the
book as the opening signature and add a direct tuition entry from its cover.

Design: navy ink, NEXA blue, warm paper, generous editorial type, fine rules and
bounded motion. Mobile controls use native buttons and inputs with visible focus.

1. Tuition: “Your unfair advantage” headline, qualification enquiry finder,
   current London/online options, and existing commitments.
2. Products: one clearly labelled concept demonstration connecting an explanatory
   tutor conversation, revision flashcards and a weekly study plan.
3. Parents: an explicitly fictional dashboard preview with progress, attendance
   and tutor notes; a school/tutor consultation action.
4. Future skills: links to the existing cybersecurity and AI/robotics pathways.

The finder collects a requested programme, subject, exam board and lesson format.
It does not invent an available course catalogue. Selected details accompany the
existing enquiry draft without replacing a visitor's typed message.

AI tools and parent accounts are previews. The demo has authored sample content,
no model API, learner authentication or saved student records. No first/best or
grade guarantee claims are added. Actual exam-board grounding and account access
require a subsequent platform implementation.

Validation: TypeScript, lint, production build and browser review when available.
Review narrow layouts, keyboard controls, card navigation, study-plan toggles,
parent preview selection and enquiry detail transfer. No physical phone claim.

## Local review

Implemented on v4. The production build (including TypeScript) and repository
lint passed. Browser review covered the sample quiz's correct and incorrect
feedback, keyboard flashcard reveal, card navigation, study routine changes,
session completion, parent dashboard views and tool-to-tool focus transfer.

The programme finder carried A Level / Maths / AQA / Online tuition into a
reviewable local enquiry draft. Existing message text was retained. Removing
the selection cleared its summary. No message was sent or downloaded.

The new controls fit sampled 320, 768, 1024 and 1440px viewports. Final 320px
review confirmed 16px input text, compact tool navigation and no overflow after
layout settled. No browser console errors were observed. The inherited book's
scroll offsets can shift briefly while changing viewport size; navigate again
after its layout settles. Physical touch devices, Safari and screen-reader
software were not available for this review.

Screenshots are in ignored `output/v4-tuition-desktop.png` and
`output/v4-learning-mobile.png`. Publication is separate from this local change.
