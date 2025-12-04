import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getSkills } from "@/lib/sanity-queries";

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

  const certifications = skillsData?.certifications || fallbackCertifications;

  return (
    <section id="skills" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            How I Approach Problems
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>
        
        <div className="space-y-12">
          {/* Product & Business */}
          <Card className="p-10 sm:p-12 shadow-card border-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Product & Business</h3>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>First principles thinking</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>User research and insight extraction</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Unit economics analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Go-to-market strategy</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Vendor and partnership strategy</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>P&L optimization</span>
              </li>
            </ul>
          </Card>

          {/* Execution */}
          <Card className="p-10 sm:p-12 shadow-card border-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Execution</h3>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Building and shipping</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Cross-functional team leadership</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Operations scaling</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Process documentation and playbooks</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Financial modeling</span>
              </li>
            </ul>
          </Card>

          {/* Tools I Use */}
          <Card className="p-10 sm:p-12 shadow-card border-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Tools I Use</h3>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Figma (product design)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Google Sheets / Excel (modeling, analysis)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>SQL (data analysis)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>App Scripts (automation)</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Shopify, Amazon Seller Central, payment integrations</span>
              </li>
            </ul>
          </Card>
        </div>
        
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
