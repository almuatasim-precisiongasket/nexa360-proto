import { Logo } from "../Logo";
import { CompanyHub } from "./CompanyHub";
import { Institutions } from "./Institutions";
import { CourseStudio } from "./CourseStudio";
import { Tuition } from "./Tuition";
import { OptionalExperiences } from "./OptionalExperiences";
import { Contact } from "./Contact";
import s from "./v5.module.css";
export function Experience() {
  return (
    <>
      <Tuition />
      <CourseStudio />
      <Institutions />
      <Contact />
      <CompanyHub />
      <OptionalExperiences />
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
            <a href="#tuition">GCSE tuition</a>
            <a href="#technical">Skills courses</a>
            <a href="#pathways">For organisations</a>
            <a href="#products">Our products</a>
            <a href="#contact">Book consultation ↗</a>
          </nav>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} NEXA360 · United Kingdom</span>
          <span>Barking Riverside, London · Online learning</span>
          <a href="#book-experience">Explore the interactive book ↗</a>
          <a href="#welcome">Back to the beginning ↑</a>
        </div>
      </div>
    </footer>
  );
}
