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
    title: "Navigation Bar",
    description: "Use this to quickly jump to any section. Hover over items to see what they contain.",
    position: "bottom",
    arrow: "down"
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
    if (currentStep === null) return;

    const step = onboardingSteps[currentStep];
    const updatePosition = () => {
      const targetElement = document.querySelector(step.target);
      
      if (targetElement && tooltipRef.current) {
        const rect = targetElement.getBoundingClientRect();
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
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
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
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={handleNext}
      />
      
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

