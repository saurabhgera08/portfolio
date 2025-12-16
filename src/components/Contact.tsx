import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "@/lib/sanity-queries";

const fallbackContact = {
  email: "saurabhgera08@gmail.com",
  phone: "+91 8341064488",
  linkedin: "https://www.linkedin.com/in/saurabhgera/",
  location: "Hyderabad, India",
  interestedIn: [
    "Founders and scaling businesses solving complex problems",
    "Companies in growth mode needing someone who can own outcomes end-to-end",
    "Leaders who value clarity of thought over corporate polish"
  ],
  letsTalkIf: "You're solving a problem that matters and you want a partner who thinks clearly, executes relentlessly, and isn't afraid to ask hard questions."
};

export const Contact = ({ skipSectionWrapper = false }: { skipSectionWrapper?: boolean }) => {
  const { data: contactData = fallbackContact } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      try {
        const data = await getContactInfo()
        return data || fallbackContact
      } catch (error) {
        console.warn('Failed to fetch contact data from Sanity, using fallback:', error)
        return fallbackContact
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const contact = { ...fallbackContact, ...contactData };
  
  const content = (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Let's Connect
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-8" />
          <div className="mt-8 max-w-3xl mx-auto space-y-8">
            <div className="text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                What I Am Looking For
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Roles that combine ownership with business outcomes. I am best suited to category leadership, business strategy, growth or founder's office roles — places where ambiguous problems must be broken down, prioritised and executed.
              </p>
            </div>
          </div>
        </div>
        
        <Card className="p-10 sm:p-12 lg:p-16 shadow-premium border-0">
          <div className="space-y-10">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                    {contact.email}
                  </p>
                </div>
              </a>
              
              {contact.phone && (
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {contact.phone}
                    </p>
                  </div>
                </a>
              )}
              
              {contact.linkedin && (
                <a 
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                      Connect with me
                    </p>
                  </div>
                </a>
              )}
              
              {contact.location && (
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">
                      {contact.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button 
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-base rounded-lg shadow-premium hover:scale-105 transition-all"
                asChild
              >
                <a href={`mailto:${contact.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send an Email
                </a>
              </Button>
              {contact.linkedin && (
                <Button 
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold py-6 text-base rounded-lg hover:scale-105 transition-all"
                  asChild
                >
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
  );

  if (skipSectionWrapper) {
    return content;
  }

  return (
    <section id="contact" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      {content}
    </section>
  );
};
