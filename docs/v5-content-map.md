# V5 content and asset map

Implemented on branch `v5`, 17 October 2026.
Primary source: the supplied Website Content & Business Requirements attachment
`bc97f353-63e6-421e-b24a-44e9c45359f0/Pasted text.txt`.

| Source section | Public implementation | Publication decisions |
| --- | --- | --- |
| 1 Company | Service gateway and About company tab | Official tagline, clear service routes, concise purpose and values |
| 2 International operations | About market diagram and list | UK operating centre; four target online expansion markets, no invented offices |
| 3 Business model | GCSE, course studio and Institutions | School learning and technology skills are distinct; organisations have a dedicated header route |
| 4 Academic tuition | Warm GCSE preferences | Delivery, tutor and proposed group preferences; no invented rates or subject inventory |
| 5 Technical courses | Five-entry course studio | All five programmes; intended project outcomes; conditional details in disclosures |
| 6 Institutional programmes | Audience brief, signal network and process | Four audiences, configurable programme conversation and five development stages |
| 7 Consultations | Shared contextual contact form | Free consultation and conditional introductory-session wording; local draft truthfully labelled |
| 8 Projects | Projects company tab: India CSR and Crescent College | Supplied facts only; documentation gaps visible without invented outcomes |
| 9 Products | Two product showcases, opened on demand | In development; prepared examples, no live AI/generation claim or unsupported first/cost claim |
| 10 Events | Events company tab | Planned topics/formats; no fake dates, countdown or registration |
| 11 Leadership/partners | Meet the team company tab | Five previously approved team identities retained; Saleh/Mahib technical roles; unsupported employer endorsements omitted |
| 12 Parent/tutor portal | Sample student-specific report within GCSE | Planned portal preview; secure operational accounts remain later scope |
| 13 Contact | Three-route consultation form and footer | Known location; no fabricated phone, email, registration number or office address |
| 14 Pending content | This map and implementation notes | Missing biographies, dates, course specs and contact details remain pending |
| 15 Operations | Planned later systems in tasks | No implication that draft preparation creates a CRM record, booking or student account |

## Source conflicts

- New source has an unnamed founder biography. Do not assign it to the existing
  named founder until confirmed. Team identities still come from the approved slide.
- OFGA is a planned game-programming collaboration. Tutelr remains the existing
  approved cybersecurity collaborator; scope reconciliation is pending.
- No Amazon logo/corporate partnership or NASA endorsement is presented.
- Saleh's full credentials and Mahib's achievement documentation remain pending.
- Former A Level, IGCSE and entrance-exam placeholders are absent from the active
  service offering. Book chapter copy now reflects GCSE and institutions while
  retaining its established chapter/art identifiers and physical interaction.

## Assets and motion

- Existing logo, portrait media, book geometry and all original asset files preserved.
- Existing `PathArt` reused for Cybersecurity, AI and Robotics.
- New original SVG Game/ML illustrations; no downloaded stock work.
- Existing learning-desk SVG and Rive runtime/asset reused for GCSE.
- Existing slow `AmbientField` ribbon shader retained for Gateway, Institutions and Contact.
- New local WebGL network and data-field stage, capped resolution and 30fps,
  with static SVG content, visibility pause and context-loss behaviour.
- GSAP handles section entrances, map route drawing and two bounded handoffs.
- Motion handles selection feedback, stage entrances and transcript changes.
- Products have user-started nine-second prepared examples with pause/reset/replay.
  Playback stops when offscreen/hidden and its timer is removed when complete.
- Company tabs use local content transitions; the five course samples respond to visitor input.
- The original book opens the page, with its existing interactions intact.
- Phone service sections use natural scroll.

## Public reading order (18 October revision)

1. Original 3D book, restored as the opening section at the user's request.
2. Service gateway: school tuition, skills courses, audience route finder.
3. GCSE tuition: delivery/tutor/group preferences and sample parent report.
4. Technology skills: five subjects, course artwork, interactive subject samples.
5. Organisations: tailored programme audiences and process.
6. Book consultation: service choice and contextual request.
7. Company hub: About, Projects, Team, Events.
8. Product concepts: optional expanded experiences.
9. Footer: direct service links, opening book and consultation.

## Implementation boundaries

New public experience is composed from `components/v5/Experience.tsx` and scoped
with `v5.module.css`. Legacy sections remain in the repository for recoverability
but are not rendered by `app/page.tsx`. No new application dependency was needed.
No live backend, AI generation service, parent login or registration is claimed.
Actual enquiry delivery needs the business recipient and an approved integration.
