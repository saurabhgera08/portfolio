import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TooltipStep {
  id: string;
  target: string; // CSS selector or element ID
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  arrow?: "right" | "down" | "up" | "left";
}

const onboardingSteps: TooltipStep[] = [
  {
    id: "navbar",
    target: "nav",
    title: "Top Navigation Bar",
    description: "Use this to quickly jump to any section. Hover over items to see what they contain.",
    position: "bottom",
    arrow: "down"
  },
  {
    id: "floating-nav",
    target: "[class*='fixed right'] nav, nav.fixed.right",
    title: "Floating Navigation",
    description: "This floating navigation bar on the right lets you quickly jump between sections as you scroll. Click any icon to navigate.",
    position: "left",
    arrow: "right"
  },
  {
    id: "quick-nav",
    target: ".quick-nav-buttons",
    title: "Quick Navigation",
    description: "Click any button to jump directly to that section.",
    position: "top",
    arrow: "up"
  }
];

export const OnboardingTooltip = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const highlightedElementRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      // Start onboarding after a short delay
      setTimeout(() => {
        setCurrentStep(0);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (currentStep === null) {
      // Remove highlight when no step is active
      if (highlightedElementRef.current) {
        highlightedElementRef.current.style.filter = '';
        highlightedElementRef.current.style.transition = '';
        highlightedElementRef.current.style.zIndex = '';
        highlightedElementRef.current.style.position = '';
        highlightedElementRef.current.style.transform = '';
        highlightedElementRef.current.style.boxShadow = '';
        highlightedElementRef.current = null;
        setHighlightRect(null);
      }
      return;
    }

    const step = onboardingSteps[currentStep];
    
    // Remove previous highlight
    if (highlightedElementRef.current) {
      highlightedElementRef.current.style.filter = '';
      highlightedElementRef.current.style.transition = '';
      highlightedElementRef.current.style.zIndex = '';
      highlightedElementRef.current.style.position = '';
      highlightedElementRef.current.style.transform = '';
      highlightedElementRef.current.style.boxShadow = '';
    }

    const updatePosition = () => {
      // Try multiple selectors for floating nav
      let targetElement: Element | null = null;
      
      if (step.id === "floating-nav") {
        // Try to find the floating nav by class name first
        targetElement = document.querySelector('nav.floating-nav');
        
        // Fallback: try to find by checking for fixed right positioning
        if (!targetElement) {
          const allNavs = document.querySelectorAll('nav');
          for (const nav of allNavs) {
            const styles = window.getComputedStyle(nav);
            if (styles.position === 'fixed' && styles.right !== 'auto' && parseFloat(styles.right) > 0) {
              targetElement = nav;
              break;
            }
          }
        }
        
        // Another fallback: look for nav with specific classes
        if (!targetElement) {
          targetElement = document.querySelector('nav[class*="fixed"][class*="right"]');
        }
      } else {
        targetElement = document.querySelector(step.target);
      }
      
      if (targetElement && tooltipRef.current) {
        const element = targetElement as HTMLElement;
        
        // Highlight the target element - ensure it's visible and clickable
        element.style.filter = 'blur(0px)';
        element.style.transition = 'filter 0.3s ease, transform 0.3s ease';
        element.style.zIndex = '103';
        element.style.transform = 'scale(1.02)';
        element.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.2)';
        if (window.getComputedStyle(element).position === 'static') {
          element.style.position = 'relative';
        }
        highlightedElementRef.current = element;
        
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        switch (step.position) {
          case "bottom":
            top = rect.bottom + 20;
            left = rect.left + (rect.width / 2);
            break;
          case "top":
            top = rect.top - tooltipRect.height - 20;
            left = rect.left + (rect.width / 2);
            break;
          case "left":
            top = rect.top + (rect.height / 2);
            left = rect.left - tooltipRect.width - 20;
            break;
          case "right":
            top = rect.top + (rect.height / 2);
            left = rect.right + 20;
            break;
        }

        // Ensure tooltip stays within viewport
        const padding = 20;
        if (left < padding) left = padding;
        if (left + tooltipRect.width > window.innerWidth - padding) {
          left = window.innerWidth - tooltipRect.width - padding;
        }
        if (top < padding) top = padding;
        if (top + tooltipRect.height > window.innerHeight - padding) {
          top = window.innerHeight - tooltipRect.height - padding;
        }

        setTooltipPosition({ top, left });
      }
    };

    // Initial position
    setTimeout(updatePosition, 100);
    
    // Update on scroll/resize
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    // Update highlight rect on scroll/resize
    const updateHighlightRect = () => {
      if (highlightedElementRef.current) {
        setHighlightRect(highlightedElementRef.current.getBoundingClientRect());
      }
    };
    
    window.addEventListener('scroll', updateHighlightRect);
    window.addEventListener('resize', updateHighlightRect);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updateHighlightRect);
      window.removeEventListener('resize', updateHighlightRect);
      // Clean up highlight on unmount
      if (highlightedElementRef.current) {
        highlightedElementRef.current.style.filter = '';
        highlightedElementRef.current.style.transition = '';
        highlightedElementRef.current.style.zIndex = '';
        highlightedElementRef.current.style.position = '';
        highlightedElementRef.current.style.transform = '';
        highlightedElementRef.current.style.boxShadow = '';
        highlightedElementRef.current = null;
      }
      setHighlightRect(null);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep !== null && currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    // Clean up highlight
    if (highlightedElementRef.current) {
      highlightedElementRef.current.style.filter = '';
      highlightedElementRef.current.style.transition = '';
      highlightedElementRef.current.style.zIndex = '';
      highlightedElementRef.current.style.position = '';
      highlightedElementRef.current.style.transform = '';
      highlightedElementRef.current.style.boxShadow = '';
      highlightedElementRef.current = null;
    }
    setHighlightRect(null);
    setCurrentStep(null);
    setIsDismissed(true);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const handleSkip = () => {
    handleDismiss();
  };

  if (isDismissed || currentStep === null) return null;

  const step = onboardingSteps[currentStep];
  const ArrowIcon = step.arrow === "down" ? ArrowDown : step.arrow === "up" ? ArrowUp : ArrowRight;

  return (
    <>
      {/* Overlay with blur effect - but not on highlighted element */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-md"
        onClick={handleNext}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
      
      {/* Spotlight effect - cutout for highlighted element */}
      {highlightRect && (
        <div
          className="fixed inset-0 z-[99] pointer-events-none"
          style={{
            background: `radial-gradient(circle ${Math.max(highlightRect.width, highlightRect.height) / 2 + 40}px at ${highlightRect.left + highlightRect.width / 2}px ${highlightRect.top + highlightRect.height / 2}px, transparent 0%, rgba(0, 0, 0, 0.6) ${Math.max(highlightRect.width, highlightRect.height) / 2 + 80}px)`,
            transition: 'background 0.3s ease',
          }}
        />
      )}
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-[101] bg-white rounded-lg shadow-2xl p-6 max-w-sm animate-in fade-in slide-in-from-bottom-4"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: step.position === "bottom" || step.position === "top" ? 'translateX(-50%)' : 'translateY(-50%)'
        }}
      >
        {/* Arrow */}
        {step.arrow && (
          <div 
            className={`absolute ${
              step.position === "bottom" ? "-top-3 left-1/2 -translate-x-1/2" :
              step.position === "top" ? "-bottom-3 left-1/2 -translate-x-1/2 rotate-180" :
              step.position === "left" ? "-right-3 top-1/2 -translate-y-1/2 rotate-90" :
              "-left-3 top-1/2 -translate-y-1/2 -rotate-90"
            }`}
          >
            <div className="w-6 h-6 bg-white rotate-45 shadow-lg" />
          </div>
        )}

        <div className="relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 pr-6">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {step.description}
          </p>
          
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip
            </button>
            <Button
              onClick={handleNext}
              size="sm"
              className="bg-[#F59E0B] hover:bg-[#FBBF24] text-white"
            >
              {currentStep < onboardingSteps.length - 1 ? "Next" : "Got it"}
              <ArrowIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress dots */}
          <div className="flex gap-1.5 mt-4 justify-center">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentStep
                    ? "w-6 bg-[#F59E0B]"
                    : index < currentStep
                    ? "w-1.5 bg-gray-300"
                    : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

