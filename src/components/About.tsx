import { useState } from "react";
import { Brain, Users, TrendingUp, Target, Zap, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAboutData } from "@/lib/sanity-queries";
import { PortableTextBlock, portableTextToPlainText } from "@/lib/portable-text";
import * as LucideIcons from "lucide-react";

// Icon mapping helper
const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || Brain;
};

// Fallback data
const fallbackData = {
  title: "Who I Am",
  personalStatement: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I operate at the intersection of business, human behaviour, and systems.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I break problems down to what the numbers say, what users are actually trying to do, and what the business can sustainably support. The result is a solution that solves for all three.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I move comfortably between strategic thinking and hands-on execution. All of my skills—financial modelling, SQL, negotiation, wireframing, and process design—have been learned only when a real problem required them.", marks: [] }]
    }
  ],
  thinkingPrinciples: [
    { 
      title: "First principles", 
      summary: "I ignore symptoms and rebuild problems from scratch to find the real constraint.",
      description: "At CityMall, the Men's Fashion business was underperforming and most teams assumed it was a marketing issue. I ignored the symptoms and rebuilt the problem from scratch: what people searched, what they found, and what it cost to deliver it. The real constraint was assortment gaps and logistics inefficiency, not marketing. Fixing those moved both GMV and CM1, not one at the expense of the other.", 
      icon: "Brain" 
    },
    { 
      title: "User first", 
      summary: "I focus on reducing friction in user behaviour, not just better messaging.",
      description: "During my time driving Microsoft laptops on Amazon, gaming users were highly motivated but poorly converted because they couldn't \"experience\" the product. Instead of more ads, we worked with Comic Con to let intent buyers try the devices live and order on the spot. The conversion uplift didn't come from better messaging but from reducing friction in the behaviour itself.", 
      icon: "Users" 
    },
    { 
      title: "Business discipline", 
      summary: "I map the full cycle to find bottlenecks, not just push for more sales.",
      description: "At Universal Batteries, revenue was steady but cash flow kept tightening. Instead of pushing for more sales, I mapped the full cash cycle and saw that slow collections, not demand, were the bottleneck. Weekly review and customer mix changes reduced the payback cycle from 40+ days to roughly 25, which did more for sustainability than any sales boost would have.", 
      icon: "TrendingUp" 
    },
    { 
      title: "Clarity over complexity", 
      summary: "I replace complex systems with simple drivers that lead to action.",
      description: "At CityMall, multiple reports, filters and dashboards were used to rank products. None of them led to action because they were too complex. We replaced them with two simple ranking drivers — CM1 per view and orders per day — and the team instantly knew what to promote, what to discount, and what to remove.", 
      icon: "Target" 
    },
    { 
      title: "Execution mindset", 
      summary: "Execution means knowing when continued effort is no longer creating value.",
      description: "At SWNCK, the product quality, supply chain and operations all worked, but the CAC never reached sustainable payback. Instead of scaling for vanity metrics, I exited early and took the lesson forward. Execution is not only about building fast; it's about knowing when continued effort is no longer creating value.", 
      icon: "Zap" 
    }
  ],
  achievements: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Scaled a marketplace category from a struggling baseline to more than 50 percent month on month growth by staying close to users, fixing vendor friction, and tuning assortment and UX for what actually sold. Profitability moved in the right direction at the same time, not after.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Improved unit economics across hardware, wholesale, and retail by doing unglamorous work on operations: shortening payback cycles, fixing leakage in processes, and designing systems that teams could run without heroics.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Built a sustainable fashion brand from zero, across suppliers, materials, channels, and operations. Launched products, served real customers, and then made the hard call to exit when the unit economics did not work at scale. That experience sharpened my instinct for when a model is worth pushing and when it is wiser to stop.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Closed high-stakes deals, including $860K in competitive wins and global pricing contracts, by understanding how customers made decisions and positioning around their real constraints rather than around generic pitches.", marks: [] }]
    }
  ],
  valueProposition: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I create the most impact where clarity and execution need to live in the same person.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• When a business needs to grow without breaking unit economics", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• When the real problem is unclear and needs to be discovered", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• When a model needs to be built, tested, and iterated quickly", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• When systems must scale beyond individual effort", marks: [] }]
    }
  ],
  interests: ['📚 Reading', '🧬 Bio-hacking', '💪 Fitness', '⚽ Football']
};

export const About = () => {
  const [expandedPrinciples, setExpandedPrinciples] = useState<Set<number>>(new Set());

  const { data: aboutData = fallbackData } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      try {
        const data = await getAboutData()
        return data || fallbackData
      } catch (error) {
        console.warn('Failed to fetch about data from Sanity, using fallback:', error)
        return fallbackData
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Always use fallback data to ensure latest content is displayed
  const about = fallbackData;

  const togglePrinciple = (index: number) => {
    setExpandedPrinciples(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };
  return <section id="about" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            {about.title || "Who I Am"}
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        
        <div className="space-y-16 sm:space-y-20">
          {/* Personal Statement */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 sm:p-12 lg:p-16 shadow-card hover:shadow-premium transition-all duration-300 border-0">
              <div className="space-y-8 text-lg sm:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
                <PortableTextBlock content={about.personalStatement || fallbackData.personalStatement} />
              </div>
            </Card>
          </div>
          
          {/* How I Think */}
          {about.thinkingPrinciples && about.thinkingPrinciples.length > 0 && (
            <div className="mt-20 sm:mt-24">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                How I Think
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {(about.thinkingPrinciples || fallbackData.thinkingPrinciples).map((principle: any, index: number) => {
                  const Icon = getIcon(principle.icon || principle.iconName || "Brain");
                  const isExpanded = expandedPrinciples.has(index);
                  return (
                    <Card 
                      key={index} 
                      className="p-6 shadow-card hover:shadow-premium transition-all duration-300 border-0 hover:scale-105 group cursor-pointer"
                      onClick={() => togglePrinciple(index)}
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground mb-2">
                            {principle.title}
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {isExpanded ? (principle.description || principle.text) : (principle.summary || principle.description || principle.text)}
                          </p>
                          {principle.description && (
                            <div className="mt-3 flex items-center gap-1 text-accent text-xs font-medium">
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  <span>Tap to collapse</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  <span>Tap to expand</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* What I Have Done */}
          {about.achievements && (
            <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                What I Have Done
              </h3>
              <Card className="p-10 sm:p-12 shadow-card border-0">
                <PortableTextBlock content={about.achievements || fallbackData.achievements} />
              </Card>
            </div>
          )}
          
          {/* Where I Am Most Useful */}
          {about.valueProposition && (
            <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                Where I Am Most Useful
              </h3>
              <Card className="p-10 sm:p-12 shadow-card border-0">
                <PortableTextBlock content={about.valueProposition || fallbackData.valueProposition} />
              </Card>
            </div>
          )}
          
          {/* Personal Interests */}
          <div className="text-center mt-20 sm:mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
              Outside of Work
            </h3>
            <div className="space-y-6 text-foreground/80 leading-relaxed text-lg sm:text-xl">
              <p>
                I read widely across history, science, biographies and fiction to sharpen judgement and understand how people make decisions under pressure. I also train and play football regularly to stay mentally sharp and competitive.
              </p>
            </div>
            <div className="mt-10">
              <button
                onClick={() => document.getElementById('reading')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                Explore My Reading List
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};