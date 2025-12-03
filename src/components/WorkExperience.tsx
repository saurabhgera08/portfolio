import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getWorkExperience } from "@/lib/sanity-queries";

const fallbackExperiences = [
  {
    role: "Freelance Consultant",
    company: "Strategic Advisory & Product Design",
    duration: "Sep 2025 - Present",
    headline: "Helping businesses solve strategic problems through clarity and execution",
    story: "I advise early-stage fintech and marketplace founders on product-market fit, unit economics, and go-to-market strategy. I design product strategies, validate concepts, and optimize operations for profitability. Recent work includes designing marketplace go-to-market strategies, optimizing lending product unit economics, and building B2B SaaS roadmaps based on financial impact.",
    learnings: [
      "Strategic advisory for product-market fit and validation",
      "Unit economics analysis and P&L optimization",
      "Go-to-market strategy and customer acquisition planning",
      "Operations scaling and financial modeling",
      "Product design for marketplaces, fintech, and B2B SaaS"
    ],
    clarity: "The best consulting isn't about giving answers—it's about asking the right questions that help founders see their business clearly.",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    role: "Founder",
    company: "SWNCK",
    duration: "Jun 2023 - Sep 2025",
    headline: "Building a Business Taught Me What Real Problems Look Like",
    story: "I founded SWNCK to test whether I could build a scalable business by combining operational rigor with user-first thinking.",
    learnings: [
      "Product-market fit isn't about building the perfect product. It's about finding a customer segment + channel + positioning where unit economics work sustainably.",
      "I successfully navigated complex problems: built relationships with 40+ suppliers across 5 cities, negotiated terms for favorable pricing and quality, scaled across 4 channels (Shopify + Amazon + Flipkart + affiliates), and optimized operations to reduce CAC.",
      "But I made a strategic decision: the unit economics for our target customer (eco-conscious fashion buyers) didn't work at scale. The right call was to exit and preserve capital, not waste resources chasing a broken model."
    ],
    clarity: "I learned that desirability requires craftsmanship, but sustainability requires unit economics. You can build the most beautiful product, execute flawlessly, and still fail because the customer's willingness to pay doesn't match your cost to serve. That's not a product failure—it's market clarity. And having that clarity early saves resources, capital, and heartbreak.",
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
      "Demand-side optimization: I optimized search, collections, and product assortment based on what actually sold—not what I thought should sell. AOV improved 20%.",
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
      "Pre-purchase UX optimization: Led initiatives to improve product messaging and purchase journey—because clarity converts better than clever copy.",
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
      "Cash flow was dying (payback period 40+ days). I analyzed the entire cycle—from ordering to fulfillment to payment collection. Result: 25-day payback. That's cash flow health.",
      "Retail was broken: No scalable way to reach customers. I built an e-commerce store that let us reach beyond geographic limits and sell at better margins.",
      "Customer needs were being underserved: I sized and executed solar/power backup solutions based on what customers actually needed, not what we wanted to sell."
    ],
    clarity: "I learned that the distance between insight and impact is execution. At Amazon, I realized that the difference between good and great companies isn't analysis, it's operationalization. You can have perfect insights, but if you can't turn them into structured processes, documented playbooks, and team behaviors, they disappear when you move on. I became obsessed with this: How do I extract a behavioral insight from data? How do I test it? How do I make it permanent so it compounds? This is how you scale impact beyond your own effort.",
    color: "primary"
  },
  {
    role: "Account Executive",
    company: "Dell Technologies",
    duration: "Mar 2019 - Feb 2021",
    headline: "Thinking Like a Strategist While Executing Like an Operator",
    story: "I didn't just 'make quota.' I learned to think strategically about customer needs while executing relentlessly on business outcomes.",
    learnings: [
      "Pricing is strategy: Global contracts with Franklin Templeton and Facebook taught me that how you price signals your value. Pricing isn't a sales tactic—it's a product decision.",
      "Customer strategy matters more than closing speed: Instead of hunting quick wins, I planned deep customer strategies. I understood buying cycles, influencers, and actual pain points.",
      "Competitive strategy + execution: I orchestrated $860K competitive wins by understanding our real advantage, the customer's actual needs, and how to position accordingly. It wasn't luck—it was strategic + relentless."
    ],
    clarity: "The best sales come from solving real problems, not from better pitch decks.",
    color: "accent"
  }
];

export const WorkExperience = () => {
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

  return (
    <section id="experience" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            How I've Solved Problems
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-8" />
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Not just what I did—how I thought about the problems and what it produced
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />
          
          {/* Timeline items */}
          <div className="space-y-16 sm:space-y-20">
            {(experiences || fallbackExperiences).map((exp: any, index: number) => (
              <div 
                key={index}
                className={`relative ${index % 2 === 0 ? 'lg:pr-[50%] lg:mr-8' : 'lg:pl-[50%] lg:ml-8'}`}
              >
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden lg:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg" />
                
                <Card className="p-8 sm:p-10 lg:p-12 shadow-card hover:shadow-premium transition-all duration-300 border-0 hover:scale-[1.01]">
                  <div className="space-y-8">
                    {/* Header */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-accent mt-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.duration}
                      </p>
                    </div>
                    
                    {/* Headline */}
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="text-lg font-bold text-foreground/90 italic">
                        {exp.headline}
                      </h4>
                    </div>
                    
                    {/* Story */}
                    <p className="text-foreground/80 leading-relaxed">
                      {exp.story}
                    </p>
                    
                    {/* Learnings/Achievements */}
                    {exp.learnings && exp.learnings.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          What I discovered:
                        </p>
                        <ul className="space-y-3">
                          {exp.learnings.map((learning: string, idx: number) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                              <span className="text-foreground/90 leading-relaxed text-sm">
                                {learning}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* The Clarity */}
                    <div className="pt-4 border-t border-border/50 bg-accent/5 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 -mb-6 sm:-mb-8">
                      <p className="text-sm font-semibold text-accent mb-1">
                        The Clarity:
                      </p>
                      <p className="text-foreground/90 leading-relaxed italic">
                        {exp.clarity}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};