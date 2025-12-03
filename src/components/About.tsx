import { Brain, Users, TrendingUp, Target, Zap, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
const thinkingPrinciples = [{
  icon: Brain,
  title: "First Principles",
  text: "Don't accept the problem as stated. Dig into root causes. What are we really trying to solve?"
}, {
  icon: Users,
  title: "User-First",
  text: "The best solutions solve real problems for real people. I obsess over understanding what users actually need, not what we assume they want."
}, {
  icon: TrendingUp,
  title: "Business Discipline",
  text: "Impact isn't just about growth—it's about sustainable unit economics. I think about P&L, sustainability, and scalability."
}, {
  icon: Target,
  title: "Clarity Over Complexity",
  text: "Complex ideas are often poorly understood ideas. I distill complex problems into clear frameworks that teams can act on."
}, {
  icon: Zap,
  title: "Execution Mindset",
  text: "Strategy without execution is hallucination. I build things. I ship. I iterate based on real feedback."
}];
export const About = () => {
  return <section id="about" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Who I Am
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        
        <div className="space-y-16 sm:space-y-20">
          {/* Personal Statement */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 sm:p-12 lg:p-16 shadow-card hover:shadow-premium transition-all duration-300 border-0">
              <div className="space-y-8 text-lg sm:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
                <p>
                  I'm a <span className="font-semibold text-accent">business problem-solver</span>. I don't fit neatly into one box—and that's by design.
                </p>
                <p>
                  Most roles are either strategy (all thinking, no execution) or operations (all execution, no strategy). <span className="font-semibold text-foreground">I do both.</span> I think clearly about complex business problems, then I execute relentlessly to build solutions that scale.
                </p>
              </div>
            </Card>
          </div>
          
          {/* How I Think */}
          <div className="mt-20 sm:mt-24">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
              How I Think
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {thinkingPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return <Card key={index} className="p-6 shadow-card hover:shadow-premium transition-all duration-300 border-0 hover:scale-105 group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {principle.text}
                        </p>
                      </div>
                    </div>
                  </Card>;
            })}
            </div>
          </div>
          
          {/* What I've Done */}
          <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
              What I've Done
            </h3>
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                  <p className="text-foreground/90 leading-relaxed">
                    <span className="font-semibold text-foreground">Scaled a marketplace category from zero to 50% MoM growth</span> by combining user research, vendor strategy, and relentless optimization. Improved unit economics in the process.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                  <p className="text-foreground/90 leading-relaxed">
                    <span className="font-semibold text-foreground">Turned around unit economics across hardware, wholesale, and retail</span> by rethinking operations, building scalable systems, and making hard tradeoff decisions.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                  <p className="text-foreground/90 leading-relaxed">
                    <span className="font-semibold text-foreground">Built and scaled a sustainable fashion brand from scratch</span>—navigating supply chains, multi-channel launches, and complex operations. Learned hard lessons about product-market fit when the unit economics don't work.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                  <p className="text-foreground/90 leading-relaxed">Executed high-stakes negotiations (Stitching large complex deals, acquiring large customers from competition, global pricing strategy) by understanding what customers actually needed and positioning accordingly.<span className="font-semibold text-foreground">Executed high-stakes negotiations</span> ($860K competitive wins, global pricing strategy) by understanding what customers actually needed and positioning accordingly.
                  </p>
                </li>
              </ul>
            </Card>
          </div>
          
          {/* Where I'm Valuable */}
          <div className="mt-20 sm:mt-24 max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
              Where I'm Valuable
            </h3>
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                I'm best suited for organizations in growth mode that need someone who can:
              </p>
              <ul className="space-y-4">
                {["Think clearly about what really matters (and what's just noise)", "Own outcomes end-to-end—strategy AND execution", "Scale businesses sustainably (not just chase vanity metrics)", "Build and lead teams through ambiguity and complexity", "Make clear tradeoff decisions with incomplete information"].map((item, index) => <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span className="text-foreground/90 leading-relaxed">{item}</span>
                  </li>)}
              </ul>
              <p className="text-lg text-foreground/90 leading-relaxed mt-6">
                I'm energized by founders and scaling businesses—especially in <span className="font-semibold text-accent">fintech, marketplaces, and B2B platforms</span>—where solving user problems and driving business impact must be tightly aligned.
              </p>
            </Card>
          </div>
          
          {/* Personal Interests */}
          <div className="text-center mt-20 sm:mt-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
              When I'm Not Solving Problems
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['📚 Reading', '🧬 Bio-hacking', '💪 Fitness', '⚽ Football'].map((interest, index) => <div key={index} className="px-6 py-3 bg-card rounded-full shadow-card text-foreground font-medium hover:shadow-premium transition-all hover:scale-105">
                  {interest}
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};