# Third-party notices

The NEXA360 website uses Next.js, React, React Three Fiber, Three.js, GSAP, Motion,
the GSAP React integration and Fontsource fonts. Their package distributions
retain their respective license notices in node_modules. The lockfile records
the exact installed versions.

## React Bits

The team gallery also adapts ProfileCard's pointer-normalized glare, restrained
foil gradients and portrait parallax, using scoped GSAP instead of its physics
engine. It retains the approved team identities and source photos/monograms.

Source: https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/ProfileCard/ProfileCard.tsx

The section-heading reveal adapts the word-reveal technique from React Bits'
ScrollReveal component. The adaptation uses semantic heading markup, a scoped
GSAP context and reduced-motion handling; it does not use the original global
ScrollTrigger cleanup.

Source: https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx

Additional adaptations use BlurText's staggered blur-to-sharp text reveal,
AnimatedContent's viewport-triggered entrances, and TiltedCard's normalized
pointer-to-rotation mapping. These are implemented with the existing GSAP
runtime, scoped cleanup and reduced-motion handling. Tilt applies to decorative
pathway artwork only; interactive text and buttons remain stable.

Sources:

- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/BlurText/BlurText.tsx
- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx
- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/TiltedCard/TiltedCard.tsx

ClickSpark's radial bursts, ShinyText's gradient sweep and BorderGlow's pointer
lighting also inform local GSAP/CSS adaptations. Bursts use bounded DOM elements;
the text sweep runs once on entry; border lighting shares existing coordinates.

- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Animations/ClickSpark/ClickSpark.tsx
- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/TextAnimations/ShinyText/ShinyText.tsx
- https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/BorderGlow/BorderGlow.tsx

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software as part of
an application, website, or product, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

Commons Clause Restriction

You may use this Software, including for any commercial purpose, so long as
you do not sell, sublicense, or redistribute the components themselves—whether
alone, in a bundle, or as a ported version.

No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Aceternity UI design references

Local GSAP/CSS/SVG implementations adapt the visual patterns documented in
Aceternity UI's free Moving Border, Background Beams, Tracing Beam and Glowing
Effect examples. No Aceternity Pro assets or templates are included. Animation
timings, viewport/visibility pausing and reduced-motion handling are local.

- https://ui.aceternity.com/components/moving-border
- https://ui.aceternity.com/components/background-beams
- https://ui.aceternity.com/components/tracing-beam
- https://ui.aceternity.com/components/glowing-effect
- https://ui.aceternity.com/components/bento-grid
- https://ui.aceternity.com/components/card-hover-effect
- https://ui.aceternity.com/components/wobble-card

## Fonts

DM Sans and Instrument Serif are distributed through Fontsource under the
SIL Open Font License. Their licenses are retained in the installed
@fontsource package directories. Both fonts are served locally by this app.

## GSAP

GSAP uses its Standard License, available at https://gsap.com/standard-license/.
It is distinct from the MIT license of the GSAP React helper and skills content.

## Magic UI

Adaptations of the free Interactive Hover Button (credited by Magic UI to
AayushBharti), Animated Grid Pattern and Scroll Progress components. The button
uses a semantic enquiry link; the grid uses deterministic SVG cells and CSS
pulses; the progress line follows the editorial sections after the book through
an existing scroll listener and Motion value. Timings, colors and visibility
handling are tailored to NEXA360. No Pro components or additional packages used.

- https://magicui.design/docs/components/interactive-hover-button
- https://magicui.design/docs/components/animated-grid-pattern
- https://magicui.design/docs/components/scroll-progress
- https://github.com/magicuidesign/magicui/tree/main/apps/www/registry/magicui

MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Aceternity Background Beams registry component

The team backdrop uses the actual component installed with
`npx shadcn@latest add @aceternity/background-beams --yes`, from
https://ui.aceternity.com/registry/background-beams.json.
Source: https://ui.aceternity.com/components/background-beams.
License terms: https://ui.aceternity.com/license.

Local changes replace utility classes with scoped CSS, reuse Motion's LazyMotion
bundle, use unique SVG IDs and deterministic timing, slow the gradient travel to
24–34 seconds, stop animations offscreen/hidden, and provide a static reduced
motion version. The source paths and moving SVG gradient technique are retained.
