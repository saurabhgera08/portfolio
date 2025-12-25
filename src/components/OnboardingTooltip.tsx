import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ArrowDown, ArrowUp, ArrowLeft } from "lucide-react";
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
    target: "nav.fixed.top-0, nav[class*='fixed'][class*='top-0']",
    title: "Top Navigation Bar",
    description: "Use this to quickly jump to any section. Tap the menu icon on mobile to see all sections.",
    position: "bottom",
    arrow: "down"
  },
  {
    id: "floating-nav",
    target: "nav.floating-nav",
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
  const [isMobile, setIsMobile] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState<{ position: "top" | "bottom" | "left" | "right", arrow: "right" | "down" | "up" | "left" } | null>(null);
  const highlightedElementRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!hasSeenOnboarding) {
      // Start onboarding after a short delay
      setTimeout(() => {
        setCurrentStep(0);
      }, 2000);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // Skip floating nav step on mobile
  useEffect(() => {
    if (currentStep === null) return;
    
    const step = onboardingSteps[currentStep];
    if (step.id === "floating-nav" && isMobile) {
      // Skip to next step on mobile
      if (currentStep < onboardingSteps.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 100);
      } else {
        handleDismiss();
      }
    }
  }, [currentStep, isMobile]);

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
    
    // Skip if this is floating-nav on mobile (will be handled by other effect)
    if (step.id === "floating-nav" && isMobile) {
      return;
    }
    
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
      if (!tooltipRef.current) return;
      
      // Find target element with improved selectors
      let targetElement: Element | null = null;
      
      if (step.id === "navbar") {
        // Find top navigation - more specific selector
        const allNavs = document.querySelectorAll('nav');
        for (const nav of allNavs) {
          const styles = window.getComputedStyle(nav);
          const rect = nav.getBoundingClientRect();
          // Check if it's fixed at the top
          if (styles.position === 'fixed' && rect.top <= 100) {
            targetElement = nav;
            break;
          }
        }
        // Fallback to first nav if none found
        if (!targetElement) {
          targetElement = document.querySelector('nav');
        }
      } else if (step.id === "floating-nav") {
        // Find floating nav by class
        targetElement = document.querySelector('nav.floating-nav');
        // Fallback: find nav fixed on the right side
        if (!targetElement) {
          const allNavs = document.querySelectorAll('nav');
          for (const nav of allNavs) {
            const styles = window.getComputedStyle(nav);
            const rect = nav.getBoundingClientRect();
            if (styles.position === 'fixed' && 
                rect.right > window.innerWidth - 100 && 
                rect.top > 100) {
              targetElement = nav;
              break;
            }
          }
        }
      } else {
        // Use the provided selector
        targetElement = document.querySelector(step.target);
      }
      
      if (!targetElement) {
        // If floating nav not found, skip to next step
        if (step.id === "floating-nav" && currentStep !== null && currentStep < onboardingSteps.length - 1) {
          setTimeout(() => setCurrentStep(currentStep + 1), 100);
        }
        return;
      }
      
      const element = targetElement as HTMLElement;
      
      // Highlight the target element
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
      
      // Wait for tooltip to render and measure its actual size
      requestAnimationFrame(() => {
        if (!tooltipRef.current) return;
        
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = isMobile ? 16 : 20;
        const arrowOffset = 12; // Space for arrow
        
        let top = 0;
        let left = 0;
        let finalPosition: "top" | "bottom" | "left" | "right" = step.position;
        let finalArrow: "right" | "down" | "up" | "left" = step.arrow || "down";

        // Helper function to get arrow for a position
        const getArrowForPosition = (pos: "top" | "bottom" | "left" | "right"): "right" | "down" | "up" | "left" => {
          switch (pos) {
            case "top": return "down";
            case "bottom": return "up";
            case "left": return "right";
            case "right": return "left";
          }
        };

        // Calculate initial position based on preferred position
        switch (step.position) {
          case "bottom":
            top = rect.bottom + 20 + arrowOffset;
            left = rect.left + (rect.width / 2);
            break;
          case "top":
            top = rect.top - tooltipRect.height - 20 - arrowOffset;
            left = rect.left + (rect.width / 2);
            break;
          case "left":
            top = rect.top + (rect.height / 2);
            left = rect.left - tooltipRect.width - 20 - arrowOffset;
            break;
          case "right":
            top = rect.top + (rect.height / 2);
            left = rect.right + 20 + arrowOffset;
            break;
        }

        // Adjust for mobile - center horizontally and prefer bottom
        if (isMobile) {
          left = viewportWidth / 2;
          // On mobile, prefer bottom position for better visibility
          if (step.position === "top" || step.position === "left" || step.position === "right") {
            top = rect.bottom + 20 + arrowOffset;
            finalPosition = "bottom";
            finalArrow = getArrowForPosition("bottom");
          }
        } else {
          // Desktop: Check horizontal bounds and adjust position if needed
          if (left < padding) {
            // Too far left - try right side
            if (rect.right + tooltipRect.width + 20 + arrowOffset < viewportWidth - padding) {
              left = rect.right + 20 + arrowOffset;
              finalPosition = "right";
              finalArrow = getArrowForPosition("right");
            } else {
              // Can't fit on right either, center it horizontally but keep vertical position
              left = Math.max(padding, Math.min(viewportWidth - tooltipRect.width - padding, rect.left + (rect.width / 2)));
            }
          } else if (left + tooltipRect.width > viewportWidth - padding) {
            // Too far right - try left side
            if (rect.left - tooltipRect.width - 20 - arrowOffset > padding) {
              left = rect.left - tooltipRect.width - 20 - arrowOffset;
              finalPosition = "left";
              finalArrow = getArrowForPosition("left");
            } else {
              // Can't fit on left either, center it horizontally but keep vertical position
              left = Math.max(padding, Math.min(viewportWidth - tooltipRect.width - padding, rect.left + (rect.width / 2)));
            }
          }
        }

        // Check vertical bounds and adjust position if needed
        if (top < padding) {
          // Too close to top - try bottom
          const bottomSpace = viewportHeight - rect.bottom - 20 - arrowOffset;
          if (bottomSpace >= tooltipRect.height + padding) {
            top = rect.bottom + 20 + arrowOffset;
            finalPosition = "bottom";
            finalArrow = getArrowForPosition("bottom");
          } else {
            // Not enough space below, position at top with padding
            top = padding;
          }
        } else if (top + tooltipRect.height > viewportHeight - padding) {
          // Too close to bottom - try top
          const topSpace = rect.top - 20 - arrowOffset;
          if (topSpace >= tooltipRect.height + padding) {
            top = rect.top - tooltipRect.height - 20 - arrowOffset;
            finalPosition = "top";
            finalArrow = getArrowForPosition("top");
          } else {
            // Not enough space above, position at bottom with padding
            top = viewportHeight - tooltipRect.height - padding;
          }
        }

        // Ensure final position is within bounds
        left = Math.max(padding, Math.min(viewportWidth - tooltipRect.width - padding, left));
        top = Math.max(padding, Math.min(viewportHeight - tooltipRect.height - padding, top));

        setTooltipPosition({ top, left });
        setCalculatedPosition({ position: finalPosition, arrow: finalArrow });
      });
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
      setCalculatedPosition(null);
    };
  }, [currentStep, isMobile]);

  const handleNext = () => {
    if (currentStep !== null && currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleDismiss();
    }
  };

  const handleSkip = () => {
    handleDismiss();
  };

  if (isDismissed || currentStep === null) return null;

  const step = onboardingSteps[currentStep];
  const displayPosition = calculatedPosition?.position || step.position;
  const displayArrow = calculatedPosition?.arrow || step.arrow || "down";
  const ArrowIcon = 
    displayArrow === "down" ? ArrowDown : 
    displayArrow === "up" ? ArrowUp : 
    displayArrow === "left" ? ArrowLeft : 
    ArrowRight;

  return (
    <>
      {/* Transparent overlay - no blur, just for click handling */}
      <div 
        className="fixed inset-0 z-[100] bg-transparent"
        onClick={handleNext}
      />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-[101] bg-white rounded-lg shadow-2xl p-4 sm:p-6 max-w-[calc(100vw-32px)] sm:max-w-sm animate-in fade-in slide-in-from-bottom-4"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: isMobile 
            ? 'translateX(-50%)' 
            : (displayPosition === "bottom" || displayPosition === "top" ? 'translateX(-50%)' : 'translateY(-50%)'),
          maxWidth: isMobile ? `${window.innerWidth - 32}px` : '384px'
        }}
      >
        {/* Arrow */}
        {displayArrow && (
          <div 
            className={`absolute ${
              displayPosition === "bottom" ? "-top-3 left-1/2 -translate-x-1/2" :
              displayPosition === "top" ? "-bottom-3 left-1/2 -translate-x-1/2 rotate-180" :
              displayPosition === "left" ? "-right-3 top-1/2 -translate-y-1/2 rotate-90" :
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

