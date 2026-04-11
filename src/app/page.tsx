import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import TerrainBackground from "@/components/TerrainBackground";
import TerrainDivider from "@/components/TerrainDivider";

export default function Home() {
  return (
    <>
      <TerrainBackground />
      <Header />
      <main>
        <Hero />
        <TerrainDivider amplitude={45} speed={0.4} lines={8} height={180} />
        <About />
        <TerrainDivider amplitude={35} speed={0.35} lines={6} height={150} />
        <Services />
        <TerrainDivider amplitude={40} speed={0.3} lines={7} height={160} />
        <Portfolio />
        <TerrainDivider amplitude={38} speed={0.45} lines={6} height={150} />
        <Process />
        <TerrainDivider amplitude={35} speed={0.35} lines={5} height={140} />
        <Stats />
        <TerrainDivider amplitude={42} speed={0.4} lines={7} height={170} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
