import { Navigation } from "@/components/Navigation";
import { FloatingNav } from "@/components/FloatingNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WorkExperience } from "@/components/WorkExperience";
import { Projects } from "@/components/Projects";
import { OutsideOfWork } from "@/components/OutsideOfWork";
import { Reading } from "@/components/Reading";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { OnboardingTooltip } from "@/components/OnboardingTooltip";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingTooltip />
      <Navigation />
      <FloatingNav />
      <ScrollToTop />
      <main>
        <Hero />
        <About />
        <CollapsibleSection 
          id="experience" 
          title="My Career Timeline"
          description="A chronological view of my professional journey and the impact I've created"
        >
          <WorkExperience skipSectionWrapper={true} />
        </CollapsibleSection>
        <Projects />
        <OutsideOfWork />
        <CollapsibleSection 
          id="reading" 
          title="My Reading List"
          description="Books that shaped how I think. Tap any category to explore."
        >
          <Reading skipSectionWrapper={true} />
        </CollapsibleSection>
        <CollapsibleSection 
          id="skills" 
          title="Skills and Capabilities"
          description="Strategic thinking, execution discipline, and the technical tools to make it real"
        >
          <Skills skipSectionWrapper={true} />
        </CollapsibleSection>
        <CollapsibleSection 
          id="contact" 
          title="Let's Connect"
          description="Roles that combine ownership with business outcomes"
        >
          <Contact skipSectionWrapper={true} />
        </CollapsibleSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
