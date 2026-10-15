import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { PortfolioConcepts } from "@/components/sections/testimonials";
import { Commitment } from "@/components/sections/commitment";
import { Contact } from "@/components/sections/contact";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Process />
        <PortfolioConcepts />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}