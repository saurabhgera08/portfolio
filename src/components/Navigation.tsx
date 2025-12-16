import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About", description: "Who I Am - My background and thinking principles" },
  { href: "#experience", label: "Experience", description: "How I've Solved Problems - Work history and impact" },
  { href: "#projects", label: "Projects", description: "What I've Built - Projects across different categories" },
  { href: "#reading", label: "Reading", description: "My Reading List - Books that shaped my thinking" },
  { href: "#skills", label: "Skills", description: "How I Approach Problems - Skills and capabilities" },
  { href: "#contact", label: "Contact", description: "Let's Connect - Get in touch" }
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo/Name */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl sm:text-2xl font-bold text-foreground hover:text-accent transition-colors"
            >
              Saurabh Gera
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={(e) => {
                    setHoveredLink(link.href);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPosition({
                      top: rect.bottom + 8,
                      left: rect.left + (rect.width / 2)
                    });
                  }}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-foreground/80 hover:text-accent transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                  
                  {/* Progressive Disclosure Tooltip */}
                  {hoveredLink === link.href && (
                    <div
                      className="absolute z-50 mt-2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg text-xs text-foreground/80 whitespace-nowrap animate-in fade-in slide-in-from-top-2"
                      style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {link.description}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-l border-t border-border rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-20 left-0 right-0 bg-card shadow-xl rounded-b-2xl mx-4 p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:text-accent hover:bg-secondary/50 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
