import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperience } from "@/lib/sanity-queries";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";

const fallbackExperiences = [
  {
    role: "Freelance Advisor",
    company: "",
    duration: "Sep 2025 - Present",
    headline: "",
    storyBullets: [
      "Help small businesses and early-stage founders diagnose growth problems, fix the root cause, and build actionable playbooks",
      "Work spans cloud kitchens, consumer products and service businesses",
      "Value delivered: clarity on what to stop, what to prioritise, and how to test assumptions with minimal spend"
    ],
    learnings: ["Founders rarely need more ideas — they need clarity. The most valuable work wasn't handing them solutions, but helping them see the real constraint in their business so they could solve it themselves."],
    clarity: "",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    role: "Founder",
    company: "SWNCK",
    duration: "Jun 2023 - Sep 2025",
    headline: "",
    storyBullets: [
      "Launched sustainable apparel brand using bamboo and organic cotton across Shopify, Amazon, and Flipkart",
      "Sold ~150 units at ₹999 ASP with 48–55% margins",
      "Built supplier relationships across five cities and created multichannel fulfilment processes",
      "Meta CAC ~₹500–₹700 and Amazon CAC ~₹350–₹450 made unit economics unviable at scale",
      "Exited instead of chasing growth at a loss"
    ],
    learnings: ["A great product and tight operations do not guarantee scalability. The business model only works when customer willingness to pay exceeds the cost to serve, and it is better to stop early than scale a losing model."],
    clarity: "",
    color: "accent"
  },
  {
    role: "Category Head",
    company: "CityMall",
    duration: "Feb 2023 - Jun 2023",
    headline: "",
    storyBullets: [
      "Owned Men's Fashion category and turned around performance",
      "Achieved 50%+ MoM growth for two consecutive months, reaching ~₹4 crore GMV",
      "AOV increased from ₹150 to ₹380 by closing assortment gaps",
      "Onboarded 130+ vendors in two months and redesigned search, collections and category UX",
      "CM1 improved from –11% to –5% within eight weeks by shutting down high-cost supply clusters and rationalising discounts",
      "Led three-member team with daily and weekly operating rhythms"
    ],
    learnings: ["Growth and profitability don't need to be trade-offs. When you understand what users truly want and what it costs to serve them, the same levers can move both topline and contribution margin."],
    clarity: "",
    color: "primary"
  },
  {
    role: "Brand Specialist",
    company: "Amazon",
    duration: "Oct 2021 - Jan 2023",
    headline: "",
    storyBullets: [
      "Managed $1.2M annual advertising portfolio for Microsoft laptops",
      "Delivered 3% QoQ share gain for Windows devices during M1-driven competitive cycle",
      "Drove improvements in pre-purchase clarity through catalog optimisation, reference grids, and targeted content",
      "Co-initiated Comic Con activation, driving clear bump in conversions and wishlist activity in gaming SKUs"
    ],
    learnings: ["Market share isn't won through promotion alone. Clear and complete pre-purchase information converts better than spending more on ads, especially in technical product categories."],
    clarity: "",
    color: "accent"
  },
  {
    role: "General Manager",
    company: "Universal Batteries",
    duration: "Feb 2021 - Oct 2021",
    headline: "",
    storyBullets: [
      "Worked across sales, service, finance, operations and fulfilment",
      "Revenue grew from ~₹2 crore to ₹2.5 crore",
      "Shortened collection cycle from 40+ days to ~25 days through disciplined weekly processes and customer mix optimisation",
      "Launched WooCommerce store",
      "Executed eight solar/backup projects up to 40 KW"
    ],
    learnings: ["Most small businesses don't fail due to lack of customers; they fail due to lack of cash flow discipline. Fixing the cash cycle matters more than chasing revenue."],
    clarity: "",
    color: "primary"
  },
  {
    role: "Account Executive",
    company: "Dell Technologies",
    duration: "Mar 2019 - Feb 2021",
    headline: "",
    storyBullets: [
      "Owned $2M quota and closed $3M within the year, with total revenue influence exceeding $5M across the full period",
      "Closed $860K competitive deal within one quarter by aligning solution fit, lifecycle management and pricing speed",
      "Recovered distressed and lapsed accounts, contributing roughly 30% of total revenue"
    ],
    learnings: ["Large deals are rarely won on price or features. They are won by understanding how the customer buys, navigating internal politics, and reducing perceived risk for every stakeholder in the decision chain."],
    clarity: "",
    color: "accent"
  }
];

// Flip Card Component for Work Experience
const ExperienceFlipCard = ({ 
  exp, 
  index,
  isFlipped, 
  onFlip 
}: { 
  exp: any; 
  index: number;
  isFlipped: boolean; 
  onFlip: () => void;
}) => {
  const getGradient = (color: string) => {
    if (color === 'accent') return 'from-accent/20 to-accent/40';
    if (color === 'primary') return 'from-blue-500/20 to-purple-500/20';
    return color || 'from-gray-500/20 to-gray-600/20';
  };

  const gradient = getGradient(exp.color);

  return (
    <div 
      className="relative h-[340px] sm:h-[380px] lg:h-[400px] perspective-1000 cursor-pointer group"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card - Compact view */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
          <Card className={`h-full border-2 bg-gradient-to-br ${gradient} border-border/30 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl`}>
            <div className="h-full flex flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                      {exp.role}
                    </h3>
                    {exp.company && (
                      <p className="text-lg font-semibold text-accent mb-2">
                        {exp.company}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {exp.duration}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                </div>
                
                {exp.headline && (
                  <div className="pt-3 border-t border-border/30">
                    <p className="text-sm font-semibold text-foreground/90 italic leading-relaxed line-clamp-2">
                      {exp.headline}
                    </p>
                  </div>
                )}
                
                {(exp.storyBullets || exp.story) && (
                  <div className="space-y-1">
                    {(exp.storyBullets || [exp.story]).slice(0, 2).map((item: string, idx: number) => (
                      <p key={idx} className="text-sm text-foreground/70 leading-relaxed line-clamp-1">
                        • {item}
                      </p>
                    ))}
                    {(exp.storyBullets?.length || 0) > 2 && (
                      <p className="text-xs text-muted-foreground">+{(exp.storyBullets?.length || 0) - 2} more</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">
                  Tap to expand
                </p>
                <ChevronDown className="w-5 h-5 text-accent group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          </Card>
        </div>

        {/* Back of card - Expanded view */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Card className={`h-full border-2 bg-gradient-to-br ${gradient} border-border/30 shadow-xl overflow-y-auto`}>
            <div className="p-6 h-full flex flex-col">
              {/* Header - Clickable to collapse */}
              <div 
                className="flex items-start justify-between mb-4 sticky top-0 bg-background/80 backdrop-blur-sm py-2 -mx-2 px-2 rounded-lg z-10 cursor-pointer"
                onClick={onFlip}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  {exp.company && (
                    <p className="text-base font-semibold text-accent mt-1">
                      {exp.company}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {exp.duration}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4 flex items-center gap-1 text-accent">
                  <ChevronUp className="w-5 h-5" />
                  <span className="text-xs font-medium">Tap to collapse</span>
                </div>
              </div>
              
              {/* Expanded content - Scrollable, not clickable */}
              <div className="flex-1 space-y-6 overflow-y-auto">
                {exp.headline && (
                  <div className="pt-2 border-t border-border/30">
                    <h4 className="text-base font-bold text-foreground/90 italic">
                      {exp.headline}
                    </h4>
                  </div>
                )}
                
                {(exp.storyBullets || exp.story) && (
                  <div>
                    <ul className="space-y-2">
                      {(exp.storyBullets || [exp.story]).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                          <span className="text-sm text-foreground/90 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {exp.learnings && exp.learnings.length > 0 && (
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                      Learning
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      {exp.learnings[0]}
                    </p>
                  </div>
                )}
                
                {exp.clarity && (
                  <div className="pt-4 border-t border-border/30 bg-accent/5 -mx-2 px-4 py-4 rounded-lg">
                    <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                      The Clarity
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed italic">
                      {exp.clarity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const WorkExperience = ({ skipSectionWrapper = false }: { skipSectionWrapper?: boolean }) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const { data: experiences = fallbackExperiences } = useQuery({
    queryKey: ['workExperience'],
    queryFn: async () => {
      try {
        const data = await getWorkExperience()
        return data || fallbackExperiences
      } catch (error) {
        console.warn('Failed to fetch work experience from Sanity, using fallback:', error)
        return fallbackExperiences
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Always use fallback data to ensure all experiences are displayed
  const displayExperiences = fallbackExperiences;

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const content = (
    <div className="max-w-6xl mx-auto">
      
      {/* Timeline layout */}
      <div className="relative">
        {/* Timeline line - visible on larger screens */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-border to-accent" 
             style={{ top: '40px', bottom: '40px' }} />
        
        {/* Timeline items */}
        <div className="space-y-8 sm:space-y-12">
          {displayExperiences.map((exp: any, index: number) => (
            <div 
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 
                  ? 'lg:flex-row' 
                  : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline dot - visible on larger screens */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-accent border-4 border-background shadow-lg z-10" />
              
              {/* Card container - takes up space on opposite side */}
              <div className={`w-full lg:w-[calc(50%-40px)] ${
                index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
              }`}>
                <ExperienceFlipCard
                  exp={exp}
                  index={index}
                  isFlipped={flippedCards.has(index)}
                  onFlip={() => toggleFlip(index)}
                />
              </div>
              
              {/* Spacer for timeline dot on larger screens */}
              <div className="hidden lg:block w-[80px] flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (skipSectionWrapper) {
    return content;
  }

  return (
    <section id="experience" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      {content}
    </section>
  );
};