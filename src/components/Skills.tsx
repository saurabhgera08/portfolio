import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/sanity-queries";

const fallbackSkillCategories = {
  product: [
    "Product Strategy & Roadmapping",
    "User Research & Data Analysis",
    "Wireframing & Prototyping",
    "A/B Testing & Growth Experiments",
    "Agile/Scrum Methodologies",
    "Product-Market Fit Validation",
    "Feature Prioritization",
    "User Journey Mapping"
  ],
  technical: [
    "SQL & Data Analysis",
    "HTML, CSS, JavaScript",
    "Java & Verilog HDL",
    "Shopify & E-commerce Platforms",
    "Amazon Seller Central",
    "Google Analytics & Mixpanel",
    "Figma & Adobe XD",
    "Git & Version Control"
  ],
  business: [
    "P&L Management",
    "Digital Marketing (Meta Ads, Google Ads)",
    "Vendor/Partner Management",
    "Sales Strategy & Execution",
    "Financial Modeling & Valuation",
    "Go-to-Market Strategy",
    "Competitive Analysis",
    "Stakeholder Management"
  ]
};

const fallbackCertifications = [
  "Private Equity & Venture Capital - Bocconi University",
  "PGP in Product Management - Accredian",
  "Financial Modelling & Valuation - Udemy",
  "Digital Product Design - Udemy",
  "Facebook & Instagram Ads - Young Urban Project"
];

export const Skills = () => {
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

  const skillCategories = {
    product: skillsData?.productSkills || fallbackSkillCategories.product,
    technical: skillsData?.technicalSkills || fallbackSkillCategories.technical,
    business: skillsData?.businessSkills || fallbackSkillCategories.business,
  };

  const certifications = skillsData?.certifications || fallbackCertifications;

  return (
    <section id="skills" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Skills & Capabilities
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        
        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card shadow-card">
            <TabsTrigger value="product" className="text-sm sm:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Product Management
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-sm sm:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Technical
            </TabsTrigger>
            <TabsTrigger value="business" className="text-sm sm:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Business & Growth
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="product" className="space-y-4">
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <div className="flex flex-wrap gap-4">
                {skillCategories.product.map((skill: string, index: number) => (
                  <Badge 
                    key={index}
                    className="px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <div className="flex flex-wrap gap-4">
                {skillCategories.technical.map((skill: string, index: number) => (
                  <Badge 
                    key={index}
                    className="px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="business" className="space-y-4">
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <div className="flex flex-wrap gap-4">
                {skillCategories.business.map((skill: string, index: number) => (
                  <Badge 
                    key={index}
                    className="px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="mt-20 sm:mt-24">
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Certifications
            </h3>
            <Card className="p-10 sm:p-12 shadow-card border-0">
              <ul className="space-y-4">
                {certifications.map((cert: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                    <span className="text-foreground text-lg">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
