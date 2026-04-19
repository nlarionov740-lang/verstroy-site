import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/SectionTransition";
import Portfolio from "@/components/PortfolioClient";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition>
          <Services />
        </SectionTransition>
        <Portfolio />
        <SectionTransition>
          <Process />
        </SectionTransition>
        <SectionTransition>
          <Stats />
        </SectionTransition>
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
