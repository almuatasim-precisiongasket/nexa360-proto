import { Header } from "@/components/Header";
import { BrandIntro } from "@/components/BrandIntro";
import { BookStory } from "@/components/BookStory";
import { Information, Footer } from "@/components/Information";
import { SiteEffects } from "@/components/SiteEffects";
import { ClickSpark } from "@/components/ClickSpark";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to NEXA360
      </a>
      <Header />
      <BrandIntro />
      <main>
        <BookStory />
        <Information />
      </main>
      <Footer />
      <SiteEffects />
      <ClickSpark />
    </>
  );
}
