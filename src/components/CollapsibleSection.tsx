import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const CollapsibleSection = ({ 
  id, 
  title, 
  description, 
  children, 
  defaultExpanded = false 
}: CollapsibleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section id={id} className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <Card 
          className={`border-2 transition-all duration-300 ${
            isExpanded 
              ? 'shadow-lg border-accent/30' 
              : 'shadow-sm border-border/30 hover:border-accent/20 hover:shadow-md cursor-pointer'
          }`}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          {!isExpanded ? (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-accent ml-4">
                  <span className="text-sm font-medium hidden sm:inline">Click to explore</span>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-4"
                  aria-label="Collapse section"
                >
                  <span className="text-sm font-medium hidden sm:inline">Collapse</span>
                  <ChevronUp className="w-6 h-6" />
                </button>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {children}
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

