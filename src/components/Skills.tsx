import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/sanity-queries";
import { useState } from "react";
import { 
  Target, 
  Rocket, 
  Database,
  Code,
  TrendingUp,
  BarChart3,
  ShoppingCart,
  Award,
  CheckCircle2,
  Mail,
  ChevronDown,
  Sparkles,
  Zap,
  Layers,
  Workflow
} from "lucide-react";

const fallbackCertifications = [
  {
    name: "Private Equity & Venture Capital - Bocconi University",
    link: "https://www.coursera.org/account/accomplishments/verify/W8HMWQD7A542?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  },
  {
    name: "PGP in Product Management - Accredian",
    link: "https://drive.google.com/file/d/1dPHnss5gW_8SHdk65qEnu90HNY0UsLl0/view?usp=sharing"
  },
  {
    name: "Financial Modelling & Valuation - Udemy",
    link: "https://www.udemy.com/certificate/UC-42de8f8b-9da1-4667-8f2e-180d714259d1/"
  },
  {
    name: "Digital Product Design - Udemy",
    link: "https://www.udemy.com/certificate/UC-244ffc74-9bbc-4b5d-ac45-eecb6ba01d5e/"
  },
  {
    name: "Facebook & Instagram Ads - Young Urban Project",
    link: "https://drive.google.com/file/d/1nRACyenyXkdZQtkvcIJyLGG9V5Tgy8r-/view?usp=sharing"
  }
];

const skillCategories = [
  {
    id: 'strategic',
    title: 'Strategic Thinking & Analysis',
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
    title: 'Go-to-Market Execution',
    icon: Rocket,
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    borderGradient: 'from-orange-500/50 to-yellow-500/50',
    summary: 'Design and execute customer acquisition strategies, optimize revenue and unit economics',
    skills: [
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
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations & Systems Building',
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
    title: 'Technical Execution & Tools',
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
        example: 'Managed Amazon seller account with ₹X revenue, optimized listing performance, A/B tested pricing and positioning, managed vendor relationships. Parallel: built Shopify store with custom integrations for order management and analytics.',
        subsumes: 'E-commerce Management, Platform Optimization'
      },
      {
        name: 'Brand Identity Creation',
        description: 'Designing brand identity, visual systems, and brand voice that resonate with target audiences.',
        tools: 'Figma, Brand Strategy, Visual Design',
        example: 'Created complete brand identity for Zipowatt—from logo and color palette to brand guidelines and visual language. Established brand voice for tech-forward energy solutions that appeals to both technical and consumer audiences.',
        subsumes: 'Brand Design, Visual Identity, Brand Strategy'
      }
    ]
  }
];

const SkillCard = ({ category, skill, isExpanded, onToggle }: { category: typeof skillCategories[0], skill: typeof skillCategories[0]['skills'][0], isExpanded: boolean, onToggle: () => void }) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-foreground mb-2">{skill.name}</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">{skill.description}</p>
            {skill.subsumes && (
              <p className="text-xs text-muted-foreground mt-2 italic">Includes: {skill.subsumes}</p>
            )}
            {!isExpanded && (
              <p className="text-xs text-accent mt-3 font-medium flex items-center gap-1">
                Click to see details
                <ChevronDown className="w-3 h-3" />
              </p>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-border/50 pt-4 transition-all duration-300">
          {'tools' in skill && skill.tools && (
            <div>
              <p className="text-xs font-semibold text-accent mb-2 flex items-center gap-2">
                <Code className="w-3 h-3" />
                Tools
              </p>
              <p className="text-sm text-foreground/80">{skill.tools}</p>
            </div>
          )}
          {skill.example && (
            <div>
              <p className="text-xs font-semibold text-accent mb-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Real Example
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">{skill.example}</p>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="text-xs text-accent hover:text-accent/80 font-medium flex items-center gap-1 mt-4 transition-colors"
          >
            <ChevronDown className="w-3 h-3 rotate-180" />
            Collapse
          </button>
        </div>
      )}
    </Card>
  );
};

export const Skills = () => {
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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

  const certifications = skillsData?.certifications || fallbackCertifications;

  const toggleSkill = (categoryId: string, skillIndex: number) => {
    const skillId = `${categoryId}-${skillIndex}`;
    setExpandedSkills(prev => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
      }
      return next;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <section id="skills" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            How I Approach Problems
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-sm sm:text-base text-accent font-semibold mb-4">
            My Skills & Capabilities
          </p>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Strategic thinking, execution discipline, and the technical tools to make it real
          </p>
        </div>

        {/* Quick Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <Card
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`p-6 border-2 bg-gradient-to-br ${category.gradient} border-transparent hover:border-opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  isExpanded ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.borderGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{category.summary}</p>
                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                  <span>{category.skills.length} skills</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Skills - Progressive Disclosure */}
        <div className="space-y-8">
          {skillCategories.map((category) => {
            const isCategoryExpanded = expandedCategories.has(category.id);
            if (!isCategoryExpanded) return null;

            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.borderGradient} flex items-center justify-center`}>
                      {(() => {
                        const Icon = category.icon;
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{category.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="text-sm text-accent hover:text-accent/80 font-medium flex items-center gap-1 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 rotate-180" />
                    Collapse Category
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.skills.map((skill, idx) => (
                    <SkillCard
                      key={idx}
                      category={category}
                      skill={skill}
                      isExpanded={expandedSkills.has(`${category.id}-${idx}`)}
                      onToggle={() => toggleSkill(category.id, idx)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience Highlights */}
        <div className="mt-20 mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Impact in Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-accent" />
                <h4 className="font-bold text-foreground">50%+ MoM Growth</h4>
              </div>
              <p className="text-sm text-foreground/70">Scaled marketplace category through user obsession and vendor strategy</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-green-500/10 to-teal-500/10">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-6 h-6 text-teal" />
                <h4 className="font-bold text-foreground">6pps CM1 Improvement</h4>
              </div>
              <p className="text-sm text-foreground/70">Optimized supply cluster operations for profitability</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-orange-500/10 to-amber-500/10">
              <div className="flex items-center gap-3 mb-3">
                <ShoppingCart className="w-6 h-6 text-accent" />
                <h4 className="font-bold text-foreground">Multi-Channel Launch</h4>
              </div>
              <p className="text-sm text-foreground/70">Built and scaled across DTC, Amazon, Flipkart simultaneously</p>
            </Card>
            
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-pink-500/10 to-rose-500/10">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-6 h-6 text-accent" />
                <h4 className="font-bold text-foreground">90% Automation</h4>
              </div>
              <p className="text-sm text-foreground/70">Eliminated manual work through system integration and automation</p>
            </Card>
          </div>
        </div>
        
        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-3 mb-12">
              <Award className="w-8 h-8 text-accent" />
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                Certifications & Learning
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert: any, index: number) => {
                const certName = typeof cert === 'string' ? cert : cert.name;
                const certLink = typeof cert === 'string' ? null : cert.link;
                
                const cardContent = (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground font-medium leading-relaxed">{certName}</p>
                  </div>
                );
                
                if (certLink) {
                  return (
                    <a
                      key={index}
                      href={certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-background to-secondary/30 cursor-pointer">
                        {cardContent}
                      </Card>
                    </a>
                  );
                }
                
                return (
                  <Card 
                    key={index} 
                    className="p-6 border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-background to-secondary/30"
                  >
                    {cardContent}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

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
    </section>
  );
};
