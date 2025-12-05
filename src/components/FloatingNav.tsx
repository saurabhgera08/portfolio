import { useState, useEffect } from "react";
import { Home, User, Briefcase, FolderKanban, BookOpen, Code, Mail } from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "skills", label: "Skills", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
];

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const scrollPosition = window.pageYOffset + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed right-2 sm:right-4 lg:right-6 z-40" style={{ 
      // Position nav in upper-middle area, leaving bottom space for ScrollToTop
      top: '50%',
      transform: 'translateY(-50%)',
      maxHeight: 'calc(100vh - 200px)', // Leave space for ScrollToTop button at bottom
    }}>
      <div className="flex flex-col gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-background/40 backdrop-blur-sm rounded-full shadow-xl border border-border/30" style={{
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
      }}>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative p-2 sm:p-3 rounded-full transition-all duration-300 group ${
                isActive
                  ? "bg-accent text-accent-foreground scale-110"
                  : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
              }`}
              aria-label={section.label}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute right-full mr-2 sm:mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

