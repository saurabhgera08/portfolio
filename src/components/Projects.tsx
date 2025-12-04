import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Target, TrendingUp, Package, Users, Zap, ShoppingCart, Smartphone, Heart, Plane, Megaphone, LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/sanity-queries";
import * as LucideIcons from "lucide-react";

// Icon mapping helper
const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || Package;
};

const fallbackProjects = [
  // Projects with banners - Ordered first
  {
    id: "zipowatt",
    category: "built-launched",
    icon: Zap,
    title: "Zipowatt",
    subtitle: "Building a Platform for Power Backup Solutions",
    tagline: "From brand identity to product wizards, creating user-friendly solutions for complex technical products",
    problem: "How do you help customers navigate complex power backup decisions (inverters, UPS systems, automotive batteries) without technical expertise? The challenge: translating technical specs into user-friendly experiences, building discovery tools, and creating scalable operations across multiple product categories.",
    images: [
      "/images/projects/zipowatt-banner.jpg"
    ],
    thinking: [
      {
        label: "Brand & Platform Identity",
        description: "Designed brand identity for tech-forward energy solutions. Created brand guidelines and visual system. Established brand voice for tech + consumer audiences."
      },
      {
        label: "E-Commerce Platform",
        description: "Designed and implemented store interface. Built product catalog architecture. Integrated payment systems. Optimized for both desktop and mobile."
      },
      {
        label: "Cataloguing Playbook",
        description: "Created comprehensive cataloguing system for Automotive Batteries, Inverters, and UPS Systems. Standardized data structure for product information. Built templates for rapid catalog expansion. Enables scale without sacrificing data quality."
      },
      {
        label: "Automotive Battery Finder",
        description: "Designed functional flows for vehicle-to-battery matching. Built interaction model that guides users through selection. Created data flow: vehicle info → compatible batteries → recommended solution. Progressive disclosure prevents overwhelming users."
      },
      {
        label: "Power Backup Solution Wizard",
        description: "Designed multi-step wizard for solution selection. Functional design: Energy needs → Usage patterns → Recommended system. Makes complex decisions accessible to non-technical users."
      }
    ],
    outcome: "Complete brand identity for energy/tech solutions space. Functional e-commerce platform with payment integration. Scalable cataloguing system across 3+ product categories. Two smart product finders that translate technical decisions into user-friendly experiences. Platform architecture ready for expansion.",
    learning: "Technical products confuse people. Instead of dumping more specs, I asked better questions. The Battery Finder and Power Backup Wizard guide customers through decisions step by step. They're opinionated about how people should think about power needs. The trick: sequence information, don't remove it. Show what matters when it matters.",
    tags: ["E-Commerce", "UX Design", "Product Wizards", "Brand Identity", "Technical Products"],
    gradient: "from-yellow-500/20 to-orange-500/20",
    timeline: "Ongoing",
    link: "https://zipowatt.in/"
  },
  {
    id: "swnck",
    category: "built-launched",
    icon: Package,
    title: "SWNCK",
    subtitle: "Building a Sustainable Fashion Brand from Zero",
    tagline: "From supplier partnerships to multi-channel launches, learning what it takes to build a scalable business",
    problem: "How do you build a sustainable fashion brand that's both environmentally responsible and financially viable? The challenge: sourcing ethical materials, managing complex supply chains, scaling across multiple channels (DTC, Amazon, Flipkart), and achieving product-market fit in a competitive market.",
    images: [
      "/images/projects/swnck-banner.jpg"
    ],
    thinking: [
      {
        label: "Brand & Identity",
        description: "Crafted brand positioning around sustainable, mindful fashion. Designed brand identity reflecting eco-conscious values and created cohesive visual language across channels."
      },
      {
        label: "Supplier Ecosystem",
        description: "Engaged with 40+ suppliers across 5 cities. Negotiated terms for sustainable sourcing, favorable pricing, minimal MOQs. Built quality control processes for material integrity."
      },
      {
        label: "Product Development",
        description: "Launched 7 SKUs (Men's T-shirts & Women's Tops). Materials: Bamboo and Organic Cotton (100% sustainable sourcing). Designed for quality + environmental responsibility."
      },
      {
        label: "Multi-Channel Distribution",
        description: "Built Shopify e-commerce store from scratch. Integrated with Amazon & Flipkart. Implemented payment gateways and order management. Leveraged affiliate channels for customer reach."
      },
      {
        label: "Operations & Execution",
        description: "Managed inventory across channels. Optimized fulfillment processes. Tracked customer satisfaction and feedback."
      }
    ],
    outcome: "Launched 7 SKUs across 4 channels. Built sustainable supply chain from zero. Learned critical lessons about product-market fit and business sustainability. Decision to exit showed judgment and financial discipline.",
    learning: "SWNCK had everything: great products, solid supply chains, clean operations. But the numbers didn't add up at scale. I could have kept pushing for two more years, hoping something would change. Instead, I exited. Sometimes the best decision is stopping. That judgment call saved capital and time. Knowing when to quit beats grinding on a losing bet.",
    tags: ["E-Commerce", "Sustainability", "Supply Chain", "Multi-Channel", "Brand Building"],
    gradient: "from-green-500/20 to-emerald-500/20",
    timeline: "Jun 2023 - Sep 2025",
    link: "https://www.swnck.in/"
  },

  {
    id: "eatsure",
    category: "strategic",
    icon: Users,
    title: "Eatsure",
    subtitle: "Positioning Party & Group Food Orders",
    tagline: "Strategic product design to capture the underserved group ordering segment",
    problem: "Eatsure operates a unique food court model with on-site dining. But online, it's indistinguishable from other food delivery apps. How do you leverage the food court advantage to dominate group and party orders, where most delivery platforms fail?",
    images: [
      "/images/projects/eatsure-banner.jpg"
    ],
    thinking: [
      {
        label: "Core Innovation",
        description: "Group-first experience allowing party orders with multiple people, one checkout. Built-in bill-splitting mechanisms. Real-time coordination between group members. Preference management for dietary restrictions and customizations."
      },
      {
        label: "Operational Efficiency",
        description: "Optimized ordering process for group complexity. Streamlined food court fulfillment for bulk orders. Real-time order status for multiple recipients."
      },
      {
        label: "UI/UX Improvements",
        description: "Intuitive group creation and member management. Clear cost breakdown per person. Mobile-first design. Payment split options (equal, custom, payment link per person)."
      }
    ],
    outcome: "Designed group-first ordering experience leveraging food court model. Created operational framework for bulk order fulfillment. Built payment splitting system for complex group dynamics.",
    learning: "Group orders are messy. It's not just about preferences, it's about who pays, who decides, and how to split the bill without awkwardness. Most apps optimize for speed. The real win is making group coordination feel natural. That means rethinking everything: how people invite each other, how they choose together, how they pay separately.",
    tags: ["Food Delivery", "Group Orders", "UX Strategy", "Marketplace"],
    gradient: "from-red-500/20 to-pink-500/20",
    timeline: "Professional Assessment",
    link: "https://docs.google.com/document/d/1sdEFhJusJEivfrxIjDArxgdwz0DyM_hUd5ZeO1z0t9U/edit?tab=t.0#heading=h.otm5w2iuju62"
  },
  {
    id: "musify",
    category: "strategic",
    icon: Smartphone,
    title: "Musi.Fy",
    subtitle: "Mobile-First Strategy for Music Streaming",
    tagline: "Reorienting a web-first platform to capture mobile engagement and emerging revenue streams",
    problem: "Musi.Fy built for web, but 85%+ of music streaming happens on mobile. Web-first architecture = lower engagement, lost market share, missed monetization opportunities (mobile-first content creation, in-app advertising).",
    images: [
      "/images/projects/musify-banner.jpg"
    ],
    thinking: [
      {
        label: "Mobile-First Architecture",
        description: "Redesigned core experience for thumb-friendly navigation. Progressive disclosure: Essential features first, advanced later. Optimized for poor connectivity with offline playback and smart caching."
      },
      {
        label: "Emerging Revenue Streams",
        description: "Integrated content creation tools (user-generated mixes, playlists). Advertising integration (sponsor playlists, targeted audio ads). Premium tier: Ad-free + early access to new features."
      },
      {
        label: "Engagement Mechanics",
        description: "Social sharing built into core experience. Discovery algorithms optimized for mobile usage patterns. Notification strategy for re-engagement without annoying users."
      }
    ],
    outcome: "Repositioned company for mobile-first market. Created path to emerging revenue (content creation + ads). Laid foundation for user engagement recovery.",
    learning: "Mobile changes everything. People discover differently, share differently, and they're fine with ads. Most companies shrink the web version and call it mobile. That misses the point. Mobile needs its own value prop, not a smaller screen.",
    tags: ["Mobile Strategy", "Music Streaming", "Monetization", "UX Design"],
    gradient: "from-purple-500/20 to-blue-500/20",
    timeline: "Professional Assessment",
    link: "https://docs.google.com/document/d/1ggj7G7auuioyuZzEpfg_7j5D-ZbJWVl8wEPHr-a2Kfg/edit?tab=t.0"
  },
  {
    id: "medequity",
    category: "strategic",
    icon: Heart,
    title: "MedEquity Hub",
    subtitle: "Solving Medicine Hoarding During Crisis",
    tagline: "System design for equitable distribution of essential medicines during supply shocks",
    problem: "During the pandemic, hoarding of essential medicines created artificial scarcity. People with money bought surplus; people without money got nothing. How do you prevent hoarding while ensuring equitable access to life-saving medications?",
    images: [], // No banner
    thinking: [
      {
        label: "Demand Aggregation",
        description: "Centralized registry of medicine needs (hospitals, clinics, patients). Real-time demand visibility across geographies. Prevents duplicate ordering and hoarding."
      },
      {
        label: "Supply Matching Algorithm",
        description: "Dynamic allocation based on need (not purchasing power). Fair distribution across regions. Transparency in allocation decisions."
      },
      {
        label: "Stakeholder Ecosystem",
        description: "Aligned incentives across manufacturers (production planning), distributors (efficient logistics), healthcare providers (guaranteed supply), and patients (equitable access)."
      },
      {
        label: "Governance & Accountability",
        description: "Price controls during crisis to prevent gouging. Transparent allocation criteria. Public dashboard showing supply status."
      }
    ],
    outcome: "Designed framework for crisis distribution addressing equity and efficiency simultaneously. Created system applicable beyond medicine to any essential goods during supply shocks.",
    learning: "This is a system design problem, not just tech. You need manufacturers, distributors, healthcare providers, and government all aligned. The hard part isn't the platform. It's the governance model that keeps things fair without breaking efficiency. Tech shows what's happening. Policy makes it stick.",
    tags: ["Healthcare", "Crisis Management", "System Design", "Social Impact"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    timeline: "Professional Assessment",
    link: "https://drive.google.com/file/d/1kKPDD1R5T7aoft3sXjvjF1D86mfMYTHp/view"
  },
  {
    id: "inflight",
    category: "strategic",
    icon: Plane,
    title: "In-Flight Food Ordering",
    subtitle: "Modernizing Airline Services",
    tagline: "Transforming a captive audience into engaged customers through seamless in-flight ordering",
    problem: "Onboard Wi-Fi is becoming standard. But in-flight food service remains outdated: limited menu, long waits, inefficient ordering. How do you modernize the experience and turn a captive audience into a revenue opportunity?",
    images: [], // No banner
    thinking: [
      {
        label: "User Experience Innovation",
        description: "Pre-order before flight or order during flight. Browse full menu with high-quality imagery. Customization options for dietary restrictions and preferences. Real-time order tracking and delivery updates."
      },
      {
        label: "Operational Efficiency",
        description: "Crew planning: Know demand before service starts. Inventory management: Order based on pre-orders. Faster service with pre-prepared orders. Reduced waste by matching supply to demand."
      },
      {
        label: "Monetization",
        description: "Premium upsells (premium meals, bundled services). Targeted in-flight advertising. Loyalty program integration to earn miles from food purchases."
      },
      {
        label: "Market Strategy",
        description: "Partnership focus with airlines first, then catering partners. Premium positioning: Enhanced experience, not discount pricing. Brand the food experience, not just the app."
      }
    ],
    outcome: "Designed end-to-end in-flight ordering experience. Created operational playbook for airline partnerships. Built monetization strategy aligned with customer willingness to pay.",
    learning: "Airlines have a captive audience with nothing to do. Most waste this opportunity. In-flight ordering shouldn't squeeze every rupee from each meal. It should create an experience worth paying extra for. Captive means attention, not trapped. Use it well.",
    tags: ["Aviation", "Service Design", "Monetization", "Mobile App"],
    gradient: "from-sky-500/20 to-blue-500/20",
    timeline: "Professional Assessment",
    link: "https://drive.google.com/file/d/188cYzvsL5TW23edlUgMhukfKtkaqjgdW/view"
  },
  {
    id: "truemeds",
    category: "strategic",
    icon: Megaphone,
    title: "Truemeds",
    subtitle: "360° Brand Campaign for Medicine Cost Reduction",
    tagline: "Multi-channel campaign strategy around the core value prop: Reduce medicine bills by up to 72%",
    problem: "Truemeds has a powerful value prop (reduce medicine bills by 72%), but it's buried in a crowded healthcare market. How do you build a campaign that breaks through, reaches the right customers, and communicates the value clearly?",
    images: [], // No banner
    thinking: [
      {
        label: "Customer Segmentation",
        description: "Segment 1: Chronic disease patients (high repeat purchases, price-sensitive). Segment 2: Parents (broad medicine usage, budget-conscious). Segment 3: Elderly (prescription-heavy, trust-focused). Each segment = different messaging, different channels."
      },
      {
        label: "Core Narrative",
        description: "Not 'we're cheaper' (race to bottom). Instead: 'Take control of your medicine budget' (empowerment). Real stories showing how families saved money and improved health outcomes."
      },
      {
        label: "Multi-Channel Strategy",
        description: "Digital: Google Ads (intent-driven), Facebook (awareness), YouTube (education). Offline: Pharmacy partnerships, doctor endorsements, community health camps. Content: Blog articles, doctor testimonials, calculator tools. Partnerships: Health insurance companies, corporate wellness programs."
      },
      {
        label: "Budget Allocation",
        description: "40% digital performance (Google Ads, ROI-driven). 30% brand awareness (Facebook, YouTube, content). 20% partnerships (highest ROI, word-of-mouth). 10% experimentation (new channels, messaging)."
      }
    ],
    outcome: "Comprehensive 360° campaign strategy. Segmented messaging for higher conversion. Multi-channel execution plan with budget allocation and ROI tracking framework.",
    learning: "Good campaigns don't tell people what to think. They help people figure it out themselves. Calculators, patient stories, doctor endorsements aren't fluff. They're proof. In healthcare, trust wins. Show the savings. Show the proof. Let people connect the dots.",
    tags: ["Marketing Strategy", "Healthcare", "Campaign Design", "Multi-Channel"],
    gradient: "from-teal-500/20 to-green-500/20",
    timeline: "Professional Assessment",
    link: "https://drive.google.com/file/d/1KhkrvPacwnoksQQy_5cGdB5eSxLmkL1n/view?usp=sharing"
  },

  {
    id: "immutable",
    category: "analysis",
    icon: LineChart,
    title: "Immutable",
    subtitle: "Strategic Analysis of GameFi Market Leadership",
    tagline: "Deep-dive analysis of token economics, community, and competitive positioning in web3 gaming",
    problem: "How can Immutable maintain market leadership in the rapidly evolving GameFi space while ensuring long-term sustainability? What are the core strengths, vulnerabilities, and growth levers?",
    images: [
      "/images/projects/immutable-banner.jpg"
    ],
    thinking: [
      {
        label: "Token Economics",
        description: "Analyzed circulating vs. total supply, stakeholder distribution (investors, team, community, treasury), inflation mechanics and sustainability, and utility of IMX token across ecosystem."
      },
      {
        label: "Community & Engagement",
        description: "Evaluated developer ecosystem (games built on Immutable), user adoption (players onboarded, retention metrics), community health (Discord, Twitter, governance), and network effects from more developers + players."
      },
      {
        label: "Competitive Positioning",
        description: "Compared against other GameFi platforms (Polygon, Arbitrum, Solana). Analyzed core differentiation (zero-knowledge proofs, scalability, game focus). Assessed market share and growth trajectory."
      },
      {
        label: "Financial Health",
        description: "Reviewed funding history and burn rate. Examined revenue model and diversification. Calculated cash runway and sustainability. Analyzed treasury management practices."
      },
      {
        label: "Strategic Recommendations",
        description: "Identified growth opportunities (emerging game categories, new chains) and threats (competitive pressure, regulatory risk, adoption slowdown). Provided decision-making framework for executives."
      }
    ],
    outcome: "Comprehensive strategic assessment identifying core levers for market leadership. Created decision-making framework for long-term sustainability in cyclical GameFi market.",
    learning: "GameFi cycles up and down. The winners aren't the ones with the biggest token pumps. They're the ones building developer tools, actual games, and communities that survive crashes. When hype dies, infrastructure keeps going. That's what lasts.",
    tags: ["Web3", "GameFi", "Token Economics", "Strategic Analysis", "Market Research"],
    gradient: "from-indigo-500/20 to-purple-500/20",
    timeline: "Market Research Project",
    link: "https://docs.google.com/document/d/1X7fca2OjrZEzdW_ldwEzORqPD_x-xOYyi9jJKnqI7Ts/edit#heading=h.ag4k06kesqe4"
  }
];

export const Projects = () => {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const data = await getProjects()
        // Use fallback if Sanity returns empty array or null
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return fallbackProjects
        }
        return data
      } catch (error) {
        console.warn('Failed to fetch projects from Sanity, using fallback:', error)
        return fallbackProjects
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    initialData: fallbackProjects, // Use fallback as initial data
  });

  // Always use fallback if projects is empty or undefined
  const allProjects = (projects && Array.isArray(projects) && projects.length > 0) ? projects : fallbackProjects;
  
  // Sort projects: banner projects first (Zipowatt, SWNCK, EatSure, Musify, Immutable), then others
  const bannerProjectIds = ['zipowatt', 'swnck', 'eatsure', 'musify', 'immutable'];
  const displayProjects = [...allProjects].sort((a, b) => {
    const aId = a.id || a._id;
    const bId = b.id || b._id;
    const aIndex = bannerProjectIds.indexOf(aId);
    const bIndex = bannerProjectIds.indexOf(bId);
    
    // If both are banner projects, maintain their order
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // Banner projects come first
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    // Others maintain their order
    return 0;
  });

  return (
    <section id="projects" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Work & Thinking
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Some of this work shipped. Some of it helped founders think through complex decisions. Some of it is how I'd approach a problem if I were building it. All of it shows how I think.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="built-launched">Built</TabsTrigger>
            <TabsTrigger value="strategic">Explored</TabsTrigger>
            <TabsTrigger value="analysis">Analyzed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12 sm:space-y-16">
            {displayProjects.map((project: any, index: number) => (
              <ProjectCard key={project._id || project.id || index} project={project} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="built-launched" className="space-y-12 sm:space-y-16">
            {displayProjects.filter((p: any) => p.category === "built-launched").map((project: any, index: number) => (
              <ProjectCard key={project._id || project.id || index} project={project} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="strategic" className="space-y-12 sm:space-y-16">
            {displayProjects.filter((p: any) => p.category === "strategic").map((project: any, index: number) => (
              <ProjectCard key={project._id || project.id || index} project={project} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-12 sm:space-y-16">
            {displayProjects.filter((p: any) => p.category === "analysis").map((project: any, index: number) => (
              <ProjectCard key={project._id || project.id || index} project={project} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const Icon = getIcon(project.icon || "Package");
  const categoryLabels = {
    "built-launched": "Built",
    "strategic": "Explored",
    "analysis": "Analyzed"
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/50 overflow-hidden animate-fade-in"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'backwards'
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {project.images && project.images.length > 0 && (
        <div className="relative w-full overflow-hidden">
          <div className="aspect-video bg-muted/50 overflow-hidden">
            <img 
              src={project.images[0] || '/placeholder.svg'} 
              alt={`${project.title} banner`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback to placeholder if image doesn't exist
                const target = e.target as HTMLImageElement;
                if (target.src !== '/placeholder.svg') {
                  target.src = '/placeholder.svg';
                }
              }}
            />
          </div>
        </div>
      )}
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {categoryLabels[project.category]}
          </Badge>
        </div>
        
        <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-base font-medium">
          {project.subtitle}
        </CardDescription>
        <p className="text-sm text-muted-foreground italic mt-2">
          {project.tagline}
        </p>
        {project.timeline && (
          <p className="text-xs text-muted-foreground mt-2">
            {project.timeline}
          </p>
        )}
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Problem
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </div>

        {project.thinking && project.thinking.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              My Approach
            </h4>
            <div className="space-y-3">
              {project.thinking.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors">
                  <h5 className="text-sm font-semibold mb-1">{item.label}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Outcome
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.outcome}
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            💡 What This Taught Me
          </h4>
          <p className="text-sm leading-relaxed italic bg-muted/50 p-4 rounded-lg">
            {project.learning}
          </p>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {project.link && (
          <div className="pt-4">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Visit Project →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
