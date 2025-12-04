import { Navigation } from "@/components/Navigation";
import { FloatingNav } from "@/components/FloatingNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkExperience } from "@/components/WorkExperience";
import { Projects } from "@/components/Projects";
import { Reading } from "@/components/Reading";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingNav />
      <ScrollToTop />
      <main>
        <Hero />
        <About />
        <WorkExperience />
        <Projects />
        <Reading />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
