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
      children: [{ _type: 'span', text: "I'm a ", marks: [] }, { _type: 'span', text: "business problem-solver", marks: ['strong'] }, { _type: 'span', text: ". I don't fit neatly into one box—and that's by design.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Most roles are either strategy (all thinking, no execution) or operations (all execution, no strategy). ", marks: [] }, { _type: 'span', text: "I do both.", marks: ['strong'] }, { _type: 'span', text: " I think clearly about complex business problems, then I execute relentlessly to build solutions that scale.", marks: [] }]
    }
  ],
  thinkingPrinciples: [
    { title: "First Principles", description: "Don't accept the problem as stated. Dig into root causes. What are we really trying to solve?", icon: "Brain" },
    { title: "User-First", description: "The best solutions solve real problems for real people. I obsess over understanding what users actually need, not what we assume they want.", icon: "Users" },
    { title: "Business Discipline", description: "Impact isn't just about growth—it's about sustainable unit economics. I think about P&L, sustainability, and scalability.", icon: "TrendingUp" },
    { title: "Clarity Over Complexity", description: "Complex ideas are often poorly understood ideas. I distill complex problems into clear frameworks that teams can act on.", icon: "Target" },
    { title: "Execution Mindset", description: "Strategy without execution is hallucination. I build things. I ship. I iterate based on real feedback.", icon: "Zap" }
  ],
  achievements: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Scaled a marketplace category from zero to 50% MoM growth by combining user research, vendor strategy, and relentless optimization. Improved unit economics in the process.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Turned around unit economics across hardware, wholesale, and retail by rethinking operations, building scalable systems, and making hard tradeoff decisions.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Built and scaled a sustainable fashion brand from scratch—navigating supply chains, multi-channel launches, and complex operations. Learned hard lessons about product-market fit when the unit economics don't work.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Executed high-stakes negotiations ($860K competitive wins, global pricing strategy) by understanding what customers actually needed and positioning accordingly.", marks: [] }]
    }
  ],
  valueProposition: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I'm best suited for organizations in growth mode that need someone who can:", marks: [] }]
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

  const about = { ...fallbackData, ...aboutData };
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
                <p className="text-lg text-foreground/90 leading-relaxed mt-6">
                  I'm energized by founders and scaling businesses—especially in <span className="font-semibold text-accent">fintech, marketplaces, and B2B platforms</span>—where solving user problems and driving business impact must be tightly aligned.
                </p>
              </Card>
            </div>
          )}
          
          {/* Personal Interests */}
          {about.interests && about.interests.length > 0 && (
            <div className="text-center mt-20 sm:mt-24">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
                When I'm Not Solving Problems
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {(about.interests || fallbackData.interests).map((interest: string, index: number) => (
                  <div key={index} className="px-6 py-3 bg-card rounded-full shadow-card text-foreground font-medium hover:shadow-premium transition-all hover:scale-105">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>;
};