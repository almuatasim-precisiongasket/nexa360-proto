"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Products } from "./Products";
import s from "./v5.module.css";
const BookStory = dynamic(
  () => import("../BookStory").then((m) => m.BookStory),
  {
    ssr: false,
    loading: () => (
      <p className={s.optionalLoading}>Preparing the interactive book…</p>
    ),
  },
);
export function OptionalExperiences() {
  const [book, setBook] = useState(false),
    [products, setProducts] = useState(false);
  useEffect(() => {
    const hash = location.hash;
    const frame = requestAnimationFrame(() => {
      if (hash === "#home") setBook(true);
      if (hash === "#learning-tools" || hash === "#products-detail")
        setProducts(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => clearTimeout(timer);
  }, [book, products]);
  return (
    <>
      <section data-v5-dynamic id="products" className={s.optionalSection}>
        <div className={s.inner}>
          <div className={s.optionalHeader}>
            <div>
              <span className={s.eyebrow}>
                ALSO AT NEXA360 / IN DEVELOPMENT
              </span>
              <h2>Our educational technology.</h2>
              <p>
                AI tuition and Prompt to Learn are product concepts in
                development, separate from the courses above.
              </p>
            </div>
            <button
              type="button"
              aria-expanded={products}
              aria-controls="product-experience"
              onClick={() => setProducts((v) => !v)}
            >
              {products
                ? "Close product concepts −"
                : "Explore product concepts +"}
            </button>
          </div>
        </div>
        <div id="product-experience" hidden={!products}>
          {products && <Products embedded />}
        </div>
      </section>
      <section data-v5-dynamic id="book-experience" className={s.optionalBook}>
        <div className={s.inner}>
          <div className={s.optionalHeader}>
            <div>
              <span className={s.eyebrow}>
                THE NEXA360 STORY / INTERACTIVE EXPERIENCE
              </span>
              <h2>Open a world of possibility.</h2>
              <p>Explore our original 3D book at your own pace.</p>
            </div>
            <button
              id={book ? undefined : "home"}
              type="button"
              aria-expanded={book}
              aria-controls="interactive-book"
              onClick={() => setBook((v) => !v)}
            >
              {book ? "Close the book −" : "Open the interactive book ↗"}
            </button>
          </div>
        </div>
        <div id="interactive-book" hidden={!book}>
          {book && <BookStory />}
        </div>
      </section>
    </>
  );
}
