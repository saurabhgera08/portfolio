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
      children: [{ _type: 'span', text: "I am a builder who thinks in three languages: business, human behavior, and systems.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I start with numbers—P&L, conversion funnels, unit economics—because the math tells you what is actually happening. But numbers alone are not enough. I then sit with the human side: what people are trying to accomplish, what frustrates them, what they are willing to pay for, and what they are not. Finally, I translate both into something that can be built, scaled, and operated.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I do not begin with tools. Every skill I have—product strategy, SQL, AppsScript, financial modelling, vendor negotiation, wireframing, process design—has been a byproduct of needing to solve a specific problem. When the situation demanded it, I learned it. When the problem changed, I unlearned what no longer applied. When the problem became clear, I executed.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I am comfortable moving between insight and execution, between spreadsheets and user interviews, between high-level strategy and the unglamorous work of making operations run. I adapt quickly because I am not attached to a single method—I am attached to solving the problem in front of me.", marks: [] }]
    }
  ],
  thinkingPrinciples: [
    { title: "First Principles", description: "I rarely accept the first version of a problem. I keep asking why until the real constraint shows up, then solve for that instead of the surface symptom.", icon: "Brain" },
    { title: "User First", description: "Good ideas do not matter if they do not solve anything for real people. I spend time understanding what users are trying to get done, what they are afraid of, and what they are willing to trade.", icon: "Users" },
    { title: "Business Discipline", description: "Growth is useful only if the unit economics make sense. I think in terms of P&L, cash flow, payback periods, and whether a model can survive outside a spreadsheet.", icon: "TrendingUp" },
    { title: "Clarity Over Complexity", description: "If something sounds complicated, it usually means it is not understood well enough. I try to reduce problems to simple, shared language and frameworks so that teams know exactly what to do next.", icon: "Target" },
    { title: "Execution Mindset", description: "Ideas are cheap. I care about what ships, what changes in the numbers, and what we learn. I prefer short feedback loops, small experiments, and steady iteration over big promises.", icon: "Zap" }
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
      children: [{ _type: 'span', text: "Closed high stakes deals, including 860K dollars in competitive wins and global pricing contracts, by understanding how customers made decisions and positioning around their real constraints rather than around generic pitches.", marks: [] }]
    }
  ],
  valueProposition: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I am at my best with teams that want someone to take a problem end to end, not just own a narrow slice of it.", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "I add the most value when:", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "There is noise and you need clarity on what actually matters", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Strategy and execution need to live in the same person for a while", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "The goal is to grow, but not at the cost of broken unit economics", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "The team is facing ambiguity and hard tradeoffs with incomplete information", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "", marks: [] }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "There is a gap between insight and operational reality, and you need someone to close it", marks: [] }]
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

  // Always use fallback data to ensure latest content is displayed
  const about = fallbackData;
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
              When I Am Not Solving Problems
            </h3>
            <div className="space-y-6 text-foreground/80 leading-relaxed text-lg sm:text-xl">
              <p>
                I read a lot. Biographies to understand how people make decisions under pressure. History to understand the cost of choices and the weight of consequence. Science to see how long term effort compounds into breakthroughs. Fiction to keep contact with what it feels like to be human. When a book changes how I see the world, I sit with it, fill the margins, and return to it until the ideas sink in.
              </p>
              <p>
                Outside of work and reading, I like experimenting with how I live. I track sleep, nutrition, and focus to see what actually improves performance rather than what just sounds good. I lift, run, and play football because they clear my head and remind me what it feels like to compete and to be part of a team. These are not side hobbies for me. They are part of how I stay curious, keep my energy high, and show up with a clear mind.
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