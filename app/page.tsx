import { ChapterNav } from "@/components/v5/ChapterNav";
import { DesktopScroll } from "@/components/v5/DesktopScroll";
import { Header } from "@/components/Header";
import { Experience, Footer } from "@/components/v5/Experience";
import { Gateway } from "@/components/v5/Gateway";
import { Effects } from "@/components/v5/Effects";
import { BookStory } from "@/components/BookStory";
import { MotionDirector } from "@/components/v5/MotionDirector";
export default function Home() {
  return (
    <>
      <DesktopScroll />
      <a className="skip-link" href="#welcome">
        Skip to learning options
      </a>
      <Header />
      <ChapterNav />
      <main>
        <div id="book-experience">
          <BookStory skipTargetId="welcome" />
        </div>
        <Gateway />
        <Experience />
      </main>
      <Footer />
      <Effects />
      <MotionDirector />
    </>
  );
}
