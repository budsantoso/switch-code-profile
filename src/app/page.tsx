import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TransformationSection } from "@/components/sections/transformation";
import { Services } from "@/components/sections/services";
import { ProductsSection } from "@/components/sections/products";
import { Process } from "@/components/sections/process";
import { PortfolioConcepts } from "@/components/sections/testimonials";
import { ArticlesSection } from "@/components/sections/articles";
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
        <TransformationSection />
        <Services />
        <ProductsSection />
        <Process />
        <PortfolioConcepts />
        <ArticlesSection />
        <Commitment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}