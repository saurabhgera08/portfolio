import { Brain, Users, TrendingUp, Target, Zap, BookOpen } from "lucide-react";
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
      children: [{ _type: 'span', text: "I've worked across sales, operations, product, and strategy. Each role taught me something different, but the real value came from how they compound.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Sales taught me to understand customer needs deeply. Operations showed me how to build systems that scale. Product work taught me to think from first principles. Strategy work taught me to see the bigger picture. ", marks: [] }, { _type: 'span', text: "Together, they compound.", marks: ['strong'] }, { _type: 'span', text: " When I'm solving a problem, I can think strategically about what matters, understand the operational constraints, design the solution, and execute it. That combination is rare, and it's what drives real value.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I don't fit neatly into one box. That used to feel like a disadvantage. Now I see it's the advantage.", marks: [] }]
    }
  ],
  thinkingPrinciples: [
    { title: "First Principles", description: "Don't accept the problem as stated. Dig into root causes. What are we really trying to solve?", icon: "Brain" },
    { title: "User-First", description: "The best solutions solve real problems for real people. I obsess over understanding what users actually need, not what we assume they want.", icon: "Users" },
    { title: "Business Discipline", description: "Impact isn't just about growth, it's about sustainable unit economics. I think about P&L, sustainability, and scalability.", icon: "TrendingUp" },
    { title: "Clarity Over Complexity", description: "Complex ideas are often poorly understood ideas. I distill complex problems into clear frameworks that teams can act on.", icon: "Target" },
    { title: "Execution Mindset", description: "Strategy without execution is hallucination. I build things. I ship. I iterate based on real feedback.", icon: "Zap" }
  ],
  achievements: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Scaled a marketplace category 50% month-over-month by staying obsessed with what customers actually needed and what vendors actually struggled with. Improved profitability simultaneously.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Improved cash flow and unit economics across hardware, wholesale, and retail businesses by fixing unsexy operational problems (payback cycles, supply chains, customer fit).", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Built a sustainable fashion brand from scratch across multiple channels and supply chains. Learned when to persist and when to exit. Exiting isn't failure, it's clarity.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Executed high-stakes sales ($860K wins, global contracts) by understanding customer strategy better than the customer did. Turned sales into problem-solving.", marks: [] }]
    }
  ],
  valueProposition: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I'm best suited for:", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• Founders who want thinking + execution (not just one or the other)", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• Scaling businesses hitting specific problems (unit economics, market fit, go-to-market)", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "• Leaders who value clarity over polish", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I'm energized by problems where user needs and business metrics must be aligned. Fintech, marketplaces, consumer brands, operations-heavy businesses, the specific domain matters less than whether the problem is real and the team is ready to solve it.", marks: [] }]
    }
  ],
  interests: ['📚 Reading', '🧬 Bio-hacking', '💪 Fitness', '⚽ Football']
};

export const About = () => {
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

  // Prefer fallback if Sanity data is incomplete or missing personalStatement
  const about = (aboutData && aboutData.personalStatement && Array.isArray(aboutData.personalStatement) && aboutData.personalStatement.length > 0)
    ? { ...fallbackData, ...aboutData }
    : fallbackData;
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
                  return (
                    <Card key={index} className="p-6 shadow-card hover:shadow-premium transition-all duration-300 border-0 hover:scale-105 group">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground mb-2">
                            {principle.title}
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {principle.description || principle.text}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* What I've Done */}
          {about.achievements && (
            <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                What I've Done
              </h3>
              <Card className="p-10 sm:p-12 shadow-card border-0">
                <PortableTextBlock content={about.achievements || fallbackData.achievements} />
              </Card>
            </div>
          )}
          
          {/* Where I'm Valuable */}
          {about.valueProposition && (
            <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
                Where I'm Valuable
              </h3>
              <Card className="p-10 sm:p-12 shadow-card border-0">
                <PortableTextBlock content={about.valueProposition || fallbackData.valueProposition} />
              </Card>
            </div>
          )}
          
          {/* Personal Interests */}
          <div className="text-center mt-20 sm:mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
              When I'm Not Solving Problems
            </h3>
            <div className="space-y-6 text-foreground/80 leading-relaxed text-lg sm:text-xl">
              <p>
                I read obsessively, biographies to understand decision-making, history to understand consequence, science to marvel at progress, and fiction to understand what it means to be human. When a book changes how I see the world, I sit with it, make margin notes, and think about it for months.
              </p>
              <p>
                Beyond reading, I experiment with bio-hacking, optimizing sleep, nutrition, and cognitive performance. I stay disciplined about fitness and find joy in football, both watching and playing. These aren't hobbies. They're ways I stay curious, maintain energy, and think clearly.
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