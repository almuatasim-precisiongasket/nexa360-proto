import { Logo } from "../Logo";
import { ReplayIntro } from "../BrandIntro";
import { About, Projects, People, Events } from "./Editorial";
import { Institutions } from "./Institutions";
import { CourseStudio } from "./CourseStudio";
import { Tuition } from "./Tuition";
import { Products } from "./Products";
import { Contact } from "./Contact";
import s from "./v5.module.css";
export function Experience() {
  return (
    <>
      <About />
      <Institutions />
      <CourseStudio />
      <Tuition />
      <Products />
      <Projects />
      <People />
      <Events />
      <Contact />
    </>
  );
}
export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <a href="#welcome" aria-label="NEXA360 home">
              <Logo />
            </a>
            <p>
              Education Without Boundaries.
              <br />
              Skills for the Future.
            </p>
          </div>
          <nav className={s.footerLinks} aria-label="Explore NEXA360">
            <a href="#pathways">Institutions</a>
            <a href="#technical">Technical courses</a>
            <a href="#tuition">GCSE tuition</a>
            <a href="#products">Our products</a>
            <a href="#contact">Let’s talk ↗</a>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} NEXA360 · United Kingdom</span>
          <span>Barking Riverside, London · Online learning</span>
          <ReplayIntro />
          <a href="#welcome">Back to the beginning ↑</a>
        </div>
      </div>
    </footer>
  );
}
