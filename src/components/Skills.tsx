import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/sanity-queries";
import { useState } from "react";
import { 
  Target, 
  Rocket, 
  Code,
  Mail,
  ChevronDown,
  Workflow
} from "lucide-react";

const skillCategories = [
  {
    id: 'strategic',
    title: 'Strategy',
    icon: Target,
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    borderGradient: 'from-blue-500/50 to-pink-500/50',
    summary: 'Break complex problems into first principles, extract insights from data, model financial scenarios',
    skills: [
      {
        name: 'First Principles Problem-Solving',
        description: 'Taking complexity apart to find the core issue, then rebuilding solutions from fundamentals.',
        example: 'Analyzed battery resale business constraints (margin compression, location-bound model, e-commerce disruption) and identified the real problem wasn\'t marketing—it was structural viability. Proposed pivot from B2C retail to B2B fleet operations.',
        subsumes: 'User Research & Insights, Unit Economics Analysis'
      },
      {
        name: 'Data-Driven Decision Making',
        description: 'Extracting patterns from user behavior, market dynamics, and financial metrics to inform strategy.',
        example: 'Can analyze customer acquisition costs, lifetime value cohorts, churn patterns, and unit economics to show why a channel is profitable or not. Build dashboards that make strategy obvious.',
        subsumes: 'Financial Modeling, Unit Economics Analysis'
      }
    ]
  },
  {
    id: 'gtm',
    title: 'Marketing & Sales',
    icon: Rocket,
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    borderGradient: 'from-orange-500/50 to-yellow-500/50',
    summary: 'Design and execute customer acquisition strategies, optimize revenue and unit economics',
    skills: [
      {
        name: 'Strategic Alliances',
        description: 'Building partnerships that create mutual value and open new markets.',
        subsumes: 'Partner Identification & Negotiation, Ecosystem Development, Co-go-to-market Strategy',
        example: 'At CityMall, I onboarded 130+ vendors by understanding their pain points rather than pushing adoption. Instead of compliance, I built relationships. Vendors became advocates because the platform solved their real problems. This transformed a struggling category into a growth engine where supply-side momentum pulled demand.'
      },
      {
        name: 'Enterprise Account Strategy & Deal-Making',
        description: 'Protecting and expanding territory by understanding competitive dynamics and customer psychology better than competitors.',
        subsumes: 'Competitive Strategy, Pricing Strategy, Customer Positioning',
        example: 'At Dell, I orchestrated 860K dollars in competitive wins by studying how customers evaluated options, not just by quoting lower. I mapped decision influencers, timelines, and actual pain points. Then I positioned our offerings to solve their constraints, not ours. This turned commodity sales into strategic conversations where price became secondary to fit.'
      },
      {
        name: 'Go-to-Market Design for Emerging Categories',
        description: 'Creating demand and defining market narratives when the category itself is still being shaped.',
        subsumes: 'Segmentation & Targeting, Channel Strategy, Brand Narrative',
        example: 'At Amazon, I managed the go-to-market for Microsoft\'s premium laptop line in a market dominated by price-driven competition. I identified underserved segments (creators, professionals), designed messaging around workflow, not specs, and orchestrated events like Comic Con (80K footfall) to reach them where they gathered. Market share grew 3% QoQ by repositioning the category conversation.'
      },
      {
        name: 'Market Entry & Growth Strategy',
        description: 'Designing how a product reaches customers—from positioning to channels to customer acquisition mechanics.',
        example: 'For Zipowatt, designed hyperlocal GTM combining digital (Instagram, WhatsApp), B2B partnerships (quick commerce, RWAs), and offline (no-parking boards with QR codes). Tracked CAC, conversion rates, and adjusted channels based on performance.',
        subsumes: 'Go-to-Market Strategy, Vendor & Partnership Strategy, Building & Shipping'
      },
      {
        name: 'Revenue & Economics Optimization',
        description: 'Finding leverage points to improve profitability—pricing, unit economics, cost structure, customer quality.',
        example: 'Built financial models for different Zipowatt pricing strategies, delivery radius economics, and customer lifetime value scenarios. Identified that B2B corporate contracts had 3x better margins than direct B2C.',
        subsumes: 'P&L Optimization, Unit Economics Analysis'
      },
      {
        name: 'Brand Identity Creation',
        description: 'Designing brand identity, visual systems, and brand voice that resonate with target audiences.',
        tools: 'Figma, Brand Strategy, Visual Design',
        example: 'Created complete brand identity for Zipowatt—from logo and color palette to brand guidelines and visual language. Established brand voice for tech-forward energy solutions that appeals to both technical and consumer audiences.',
        subsumes: 'Brand Design, Visual Identity, Brand Strategy'
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations & Scaling',
    icon: Workflow,
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    borderGradient: 'from-green-500/50 to-teal-500/50',
    summary: 'Build automation and playbooks that scale operations without chaos',
    skills: [
      {
        name: 'Scalable Systems Design',
        description: 'Creating playbooks, automation, and processes that let a business grow without chaos.',
        example: 'Designed Zipowatt customer management workflow connecting Shopify, Google Sheets, and Apps Script. Automated order routing, inventory tracking, and payment reconciliation. What took 3 hours now takes 15 minutes.',
        subsumes: 'Process Documentation, Operations Scaling, App Scripts automation'
      },
      {
        name: 'Cross-Functional Coordination',
        description: 'Leading execution across technical, design, and business domains.',
        example: 'At Amazon, managed brand strategy across category ops, logistics, and marketplace teams. Coordinated product launches where logistics, pricing, and marketing had to align perfectly.',
        subsumes: 'Cross-Functional Leadership'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Tech',
    icon: Code,
    gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    borderGradient: 'from-indigo-500/50 to-pink-500/50',
    summary: 'Build models, dashboards, and automated systems that turn data into business intelligence',
    skills: [
      {
        name: 'Financial & Business Intelligence',
        description: 'Building analytical models and dashboards that drive decisions.',
        tools: 'Google Sheets/Excel (financial modeling, scenario analysis, forecasting), SQL (data querying and analysis)',
        example: 'Built competitive pricing tracker for e-commerce player, monitoring 200+ competitors across 50+ categories in real-time. Updated automatically via web scraping and SQL queries. Saved client ₹50K+ monthly by identifying pricing arbitrage opportunities.',
        subsumes: 'Financial Modeling, Data Analysis'
      },
      {
        name: 'Workflow Automation & Integration',
        description: 'Connecting disparate systems so data flows without manual work.',
        tools: 'Google Apps Script, Shopify API, automation platforms like N8N',
        example: 'Built end-to-end e-commerce automation: customer order → Shopify webhook → Apps Script processing → Google Sheets logging → automated invoice/payment tracking. Eliminated 90% of manual data entry.',
        subsumes: 'App Scripts, System Integration'
      },
      {
        name: 'Product & Platform Operations',
        description: 'Managing e-commerce or marketplace platforms—from optimization to custom integrations.',
        tools: 'Shopify, Amazon Seller Central, Figma (for prototyping flows)',
        example: 'Managed the Amazon Account and Go-To-Market platform strategy for Microsoft, a leading ecosystem partner in the Personal Computing category. Optimized listing performance, A/B tested pricing and positioning, managed vendor relationships. Parallel: built Shopify store with custom integrations for order management and analytics.',
        subsumes: 'E-commerce Management, Platform Optimization'
      }
    ]
  }
];

// Flip Card Component for Skills Categories
const SkillFlipCard = ({
  category,
  skills,
  isFlipped,
  onFlip,
  expandedSkill,
  onSkillToggle
}: {
  category: typeof skillCategories[0];
  skills: any[];
  isFlipped: boolean;
  onFlip: () => void;
  expandedSkill: string | null;
  onSkillToggle: (skillId: string) => void;
}) => {
  const Icon = category.icon;

  return (
    <div
      className="relative h-[400px] perspective-1000 cursor-pointer group"
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
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
          <Card className={`h-full border-2 bg-gradient-to-br ${category.gradient} border-transparent hover:border-opacity-50 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.borderGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{category.summary}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full text-sm font-medium text-foreground/80">
                  <Code className="w-4 h-4" />
                  {skills.length} skills
                </div>
              </div>
              <p className="text-xs text-foreground/60 italic">Tap to explore</p>
            </div>
          </Card>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className={`h-full border-2 bg-gradient-to-br ${category.gradient} border-transparent shadow-xl`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-foreground">{category.title}</h4>
                <button
                  onClick={onFlip}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {skills.map((skill: any, idx: number) => {
                  const skillId = `${category.id}-${idx}`;
                  const isSkillExpanded = expandedSkill === skillId;
                  return (
                    <div
                      key={idx}
                      className="bg-background/50 rounded-lg p-4 hover:bg-background/70 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkillToggle(skillId);
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                          {!isSkillExpanded && (
                            <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                              {skill.example || skill.description}
                            </p>
                          )}
                          {!isSkillExpanded && (
                            <p className="text-xs text-accent mt-2 font-medium">Tap to expand →</p>
                          )}
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isSkillExpanded && (
                        <div className="px-2 pb-2 space-y-3 border-t border-foreground/10 pt-3 mt-2 transition-all duration-300">
                          {skill.subsumes && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-1">Includes:</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{skill.subsumes}</p>
                            </div>
                          )}
                          {'tools' in skill && skill.tools && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-1">Tools:</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{skill.tools}</p>
                            </div>
                          )}
                          {skill.example && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-1">In Practice:</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{skill.example}</p>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSkillToggle(skillId);
                            }}
                            className="text-xs text-accent font-medium flex items-center gap-1 hover:underline mt-2"
                          >
                            <ChevronDown className="w-3 h-3 rotate-180" /> Collapse
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Skills = ({ skipSectionWrapper = false }: { skipSectionWrapper?: boolean }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      try {
        const data = await getSkills()
        return data
      } catch (error) {
        console.warn('Failed to fetch skills from Sanity, using fallback:', error)
        return null
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });


  const toggleFlip = (categoryId: string) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
        setExpandedSkill(null); // Collapse any expanded skill when category flips back
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleSkill = (skillId: string) => {
    setExpandedSkill(prev => (prev === skillId ? null : skillId));
  };

  const content = (
    <div className="max-w-7xl mx-auto">

        {/* Category Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category) => (
            <SkillFlipCard
              key={category.id}
              category={category}
              skills={category.skills}
              isFlipped={flippedCards.has(category.id)}
              onFlip={() => toggleFlip(category.id)}
              expandedSkill={expandedSkill}
              onSkillToggle={toggleSkill}
            />
          ))}
        </div>


        {/* Freelance CTA */}
        <div className="mt-20">
          <Card className="p-10 sm:p-12 border-0 shadow-xl bg-gradient-to-br from-accent/10 via-accent/5 to-background">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Available for Freelance Work
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                I take on freelance assignments for product strategy, go-to-market planning, unit economics analysis, and e-commerce optimization. If you have a specific problem that needs clear thinking and execution, let's talk.
              </p>
              <a 
                href="mailto:saurabhgera08@gmail.com?subject=Freelance%20Inquiry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Discuss Your Project
              </a>
            </div>
          </Card>
        </div>
      </div>
  );

  if (skipSectionWrapper) {
    return content;
  }

  return (
    <section id="skills" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background">
      {content}
    </section>
  );
};
