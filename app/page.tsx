import { Header } from "@/components/Header";
import { Experience, Footer } from "@/components/v5/Experience";
import { Gateway } from "@/components/v5/Gateway";
import { Effects } from "@/components/v5/Effects";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#tuition">
        Skip to learning options
      </a>
      <Header />
      <main>
        <Gateway />
        <Experience />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
