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
    story: "I help early-stage founders and consumer brands solve specific problems: validating product-market fit, improving unit economics, designing go-to-market strategies, and scaling operations efficiently.",
    learnings: [
      "Recent work spans cloud kitchens (supply chain optimization, customer retention), consumer brands (product positioning, channel strategy), fintech startups (unit economics, lending product design), and marketplace platforms (vendor acquisition, growth mechanics).",
      "I also take on pro bono work for problems I find interesting, whether it's helping a founder think through a pivot or advising a nonprofit on operational efficiency.",
      "How I work: I don't give answers. I ask questions that help you see your business clearly. We work together to validate assumptions, stress-test strategies, and build frameworks you can execute on independently."
    ],
    clarity: "The best consulting asks the right questions. It helps founders see their business clearly, not just gives them answers.",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    role: "Founder",
    company: "SWNCK",
    duration: "Jun 2023 - Sep 2025",
    headline: "Building a Business Taught Me What Real Problems Look Like",
    story: "I founded SWNCK to test whether I could build a scalable business by combining operational rigor with user-first thinking.",
    learnings: [
      "Product-market fit means finding a customer segment, channel, and positioning where unit economics work sustainably. It's not about building the perfect product.",
      "I successfully navigated complex problems: built relationships with 40+ suppliers across 5 cities, negotiated terms for favorable pricing and quality, scaled across 4 channels (Shopify + Amazon + Flipkart + affiliates), and optimized operations to reduce CAC.",
      "But I made a strategic decision: the unit economics for our target customer (eco-conscious fashion buyers) didn't work at scale. The right call was to exit and preserve capital, not waste resources chasing a broken model."
    ],
    clarity: "Desirability requires craftsmanship. Sustainability requires unit economics. You can build the most beautiful product, execute flawlessly, and still fail because the customer's willingness to pay doesn't match your cost to serve. That's not a product failure, it's market clarity. Having that clarity early saves resources, capital, and heartbreak.",
    color: "accent"
  },
  {
    role: "Category Head",
    company: "CityMall",
    duration: "Feb 2023 - Jun 2023",
    headline: "How Clarity of Thought Compounds Into Growth",
    story: "I took over a struggling Men's Fashion category and grew it 50% MoM by combining user research, vendor strategy, and financial discipline.",
    learnings: [
      "User insight: Why were customers not finding what they wanted? I dug into search behavior, discovered gaps between what customers looked for vs. what was available.",
      "Supply-side strategy: Why weren't vendors adopting the platform? I understood their pain (complex onboarding, unclear payouts) and fixed it. Result: 130+ quality vendors in months.",
      "Demand-side optimization: I optimized search, collections, and product assortment based on what actually sold, not what I thought should sell. AOV improved 20%.",
      "Financial discipline: I improved CM1 from -11% to -5% by understanding that growth without sustainable unit economics is just noise."
    ],
    clarity: "Complex problems dissolve when you break them down to first principles and stay obsessed with understanding the actual user.",
    color: "primary"
  },
  {
    role: "Brand Specialist",
    company: "Amazon",
    duration: "Oct 2021 - Jan 2023",
    headline: "Learning to Optimize for What Actually Matters",
    story: "I managed $1.2M+ in ad spends and led catalog quality initiatives for premium brands like Microsoft.",
    learnings: [
      "Data-driven decision making: Achieved 3% QoQ platform share gain by continuously analyzing conversion funnels, identifying friction points, and testing improvements.",
      "Pre-purchase UX optimization: Led initiatives to improve product messaging and purchase journey, because clarity converts better than clever copy.",
      "Ad spend optimization: Learned that throwing money at ads doesn't work. Understanding customer intent and optimizing for the right metrics does."
    ],
    clarity: "Performance marketing is about understanding what users need, not just bidding higher.",
    color: "accent"
  },
  {
    role: "General Manager",
    company: "Universal Batteries",
    duration: "Feb 2021 - Oct 2021",
    headline: "Operational Excellence + User-First Thinking = Sustainability",
    story: "I improved unit economics across hardware, wholesale, and retail by rethinking how the business operated.",
    learnings: [
      "Cash flow was dying (payback period 40+ days). I analyzed the entire cycle, from ordering to fulfillment to payment collection. Result: 25-day payback. That's cash flow health.",
      "Retail was broken: No scalable way to reach customers. I built an e-commerce store that let us reach beyond geographic limits and sell at better margins.",
      "Customer needs were being underserved: I sized and executed solar/power backup solutions based on what customers actually needed, not what we wanted to sell."
    ],
    clarity: "The distance between insight and impact is execution. At Amazon, I saw that the difference between good and great companies is operationalization, not analysis. You can have perfect insights, but if you can't turn them into structured processes, documented playbooks, and team behaviors, they disappear when you move on. I became obsessed with this: How do I extract a behavioral insight from data? How do I test it? How do I make it permanent so it compounds? This is how you scale impact beyond your own effort.",
    color: "primary"
  },
  {
    role: "Account Executive",
    company: "Dell Technologies",
    duration: "Mar 2019 - Feb 2021",
    headline: "Thinking Like a Strategist While Executing Like an Operator",
    story: "I didn't just 'make quota.' I learned to think strategically about customer needs while executing relentlessly on business outcomes.",
    learnings: [
      "Pricing is strategy: Global contracts with Franklin Templeton and Facebook taught me that how you price signals your value. Pricing isn't a sales tactic, it's a product decision.",
      "Customer strategy matters more than closing speed: Instead of hunting quick wins, I planned deep customer strategies. I understood buying cycles, influencers, and actual pain points.",
      "Competitive strategy + execution: I orchestrated $860K competitive wins by understanding our real advantage, the customer's actual needs, and how to position accordingly. It wasn't luck, it was strategic + relentless."
    ],
    clarity: "The best sales come from solving real problems, not from better pitch decks.",
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
                
                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  {exp.story}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">
                  Tap to explore details
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
          onClick={(e) => e.stopPropagation()}
        >
          <Card className={`h-full border-2 bg-gradient-to-br ${gradient} border-border/30 shadow-xl overflow-y-auto`}>
            <div className="p-6 h-full flex flex-col">
              {/* Header with close button */}
              <div className="flex items-start justify-between mb-4 sticky top-0 bg-background/80 backdrop-blur-sm py-2 -mx-2 px-2 rounded-lg z-10">
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlip();
                  }}
                  className="flex-shrink-0 ml-4 text-foreground/60 hover:text-foreground transition-colors p-1 hover:bg-background/50 rounded"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              
              {/* Expanded content */}
              <div className="flex-1 space-y-6 overflow-y-auto">
                {exp.headline && (
                  <div className="pt-2 border-t border-border/30">
                    <h4 className="text-base font-bold text-foreground/90 italic">
                      {exp.headline}
                    </h4>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {exp.story}
                  </p>
                </div>
                
                {exp.learnings && exp.learnings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wide">
                      What I Discovered
                    </p>
                    <ul className="space-y-3">
                      {exp.learnings.map((learning: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                          <span className="text-sm text-foreground/90 leading-relaxed">
                            {learning}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-4 border-t border-border/30 bg-accent/5 -mx-2 px-4 py-4 rounded-lg">
                  <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                    The Clarity
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    {exp.clarity}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlip();
                  }}
                  className="w-full flex items-center justify-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors py-2"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const WorkExperience = () => {
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

  return (
    <section id="experience" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            How I've Solved Problems
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-8" />
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Not just what I did, how I thought about the problems and what it produced
          </p>
          <p className="text-sm text-muted-foreground/70 mt-4 italic">
            Tap any card to explore deeper
          </p>
        </div>
        
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
    </section>
  );
};