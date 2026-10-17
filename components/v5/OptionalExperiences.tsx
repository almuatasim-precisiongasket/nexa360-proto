"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Products } from "./Products";
import s from "./v5.module.css";
export function OptionalExperiences() {
  const [products, setProducts] = useState(false);
  useEffect(() => {
    const hash = location.hash;
    const frame = requestAnimationFrame(() => {
      if (hash === "#learning-tools" || hash === "#products-detail")
        setProducts(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => clearTimeout(timer);
  }, [products]);
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
    </>
  );
}
