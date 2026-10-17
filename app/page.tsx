import { Header } from "@/components/Header";
import { Experience, Footer } from "@/components/v5/Experience";
import { Gateway } from "@/components/v5/Gateway";
import { Effects } from "@/components/v5/Effects";
import { BookStory } from "@/components/BookStory";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#welcome">
        Skip to learning options
      </a>
      <Header />
      <main>
        <div id="book-experience">
          <BookStory skipTargetId="welcome" />
        </div>
        <Gateway />
        <Experience />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
