import { Header } from "@/components/Header";
import { BrandIntro } from "@/components/BrandIntro";
import { BookStory } from "@/components/BookStory";
import { Experience, Footer } from "@/components/v5/Experience";
import { Opening } from "@/components/v5/Editorial";
import { Effects } from "@/components/v5/Effects";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to NEXA360
      </a>
      <Header />
      <BrandIntro />
      <main>
        <Opening />
        <BookStory />
        <Experience />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
