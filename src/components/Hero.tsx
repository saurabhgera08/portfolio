import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHeroData } from "@/lib/sanity-queries";

// Fallback data if Sanity isn't configured
const fallbackData = {
  headline: "Building clarity.\nExecuting relentlessly.",
  headlineHighlight: "Executing relentlessly",
  subheadline: "I have scaled marketplace categories, improved unit economics across retail and hardware, and managed high-stakes portfolios across enterprise sales and e-commerce. The common thread in my work is finding the real constraint in a business and acting precisely on it.",
  ctaPrimary: "Explore My Work",
  ctaSecondary: "Get in Touch",
  stats: [
    { value: "$5M+", label: "Annual revenue managed at Dell", highlight: false },
    { value: "$860K", label: "Competitive takeout in a single quarter", highlight: false },
    { value: "50%+", label: "MoM growth for two months at CityMall", highlight: true },
    { value: "$1.2M", label: "Annual ad portfolio for Microsoft on Amazon", highlight: false },
    { value: "3%", label: "QoQ share gain in laptops category", highlight: false },
    { value: "6pps", label: "CM1 improvement from –11% to –5% within two months", highlight: true },
  ],
};

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch data from Sanity, fallback to hardcoded data
  const { data: heroData = fallbackData } = useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      try {
        const data = await getHeroData()
        return data || fallbackData
      } catch (error) {
        console.warn('Failed to fetch hero data from Sanity, using fallback:', error)
        return fallbackData
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Parse headline - split by newlines or use as-is, ensuring periods stay with their words
  const headlineText = (heroData.headline || fallbackData.headline).trim();
  const headlineParts = headlineText.split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      // Ensure periods stay with their words (remove any standalone periods)
      if (p === '.' || p === '。') return null;
      return p;
    })
    .filter((p): p is string => p !== null);
  const highlightText = heroData.headlineHighlight || fallbackData.headlineHighlight;
  
  // Use fallback stats if Sanity has old data (checking for "Profitable" or old CM1 label without supply cluster optimization)
  const stats = heroData.stats && heroData.stats.some((s: any) => 
    s.label?.includes("Profitable") || 
    s.value === "Profitable" ||
    (s.value === "6pps" && !s.label?.includes("supply cluster optimization"))
  )
    ? fallbackData.stats
    : (heroData.stats || fallbackData.stats);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient" />
      
      {/* Secondary Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2C3E50]/80 via-transparent to-[#14B8A6]/20" />
      
      {/* Animated Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#14B8A6]/20 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#2C3E50]/30 rounded-full blur-2xl animate-float-fast" />
      
      {/* Moving Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridMove 20s linear infinite'
      }} />
      
      {/* Radial Accent Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #F59E0B 0%, transparent 50%)`,
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      
      {/* Diagonal Lines Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.5) 40px,
            rgba(255,255,255,0.5) 41px
          )`,
          animation: 'diagonalMove 30s linear infinite'
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 fade-in pt-20 pb-32 sm:pb-40 md:pb-48">
        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight px-4" style={{ whiteSpace: 'pre-line' }}>
          {headlineParts.map((part, index) => {
            const isHighlight = part.includes(highlightText);
            if (isHighlight) {
              const parts = part.split(highlightText);
              return (
                <span key={index} className="inline-block">
                  <span className="whitespace-nowrap inline-block">{parts[0]?.trim() || ''}</span>
                  <span className="relative inline-block mt-2 whitespace-nowrap">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] animate-shimmer bg-[length:200%_auto]">
                      {highlightText}
                    </span>
                  </span>
                  {parts[1] && <span className="whitespace-nowrap inline-block">{parts[1].trim()}</span>}
                  {index < headlineParts.length - 1 && <br className="block" />}
                </span>
              );
            }
            return (
              <span key={index} className="whitespace-nowrap inline-block">
                {part.trim()}
                {index < headlineParts.length - 1 && <br className="block" />}
              </span>
            );
          })}
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/85 max-w-4xl mx-auto leading-relaxed font-light px-4">
          {heroData.subheadline || fallbackData.subheadline}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4 stagger-1 px-4">
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#1A1A1A] font-semibold px-10 py-7 text-lg rounded-full shadow-lg shadow-[#F59E0B]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F59E0B]/30"
          >
            {heroData.ctaPrimary || fallbackData.ctaPrimary}
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            variant="ghost"
            className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 font-medium px-10 py-7 text-lg rounded-full transition-all duration-300"
          >
            {heroData.ctaSecondary || fallbackData.ctaSecondary}
          </Button>
        </div>
        
        {/* Quick Navigation Buttons */}
        <div className="quick-nav-buttons flex flex-wrap justify-center gap-3 pt-6 px-4 stagger-2">
          <Button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Who I Am
          </Button>
          <Button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Experience
          </Button>
          <Button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Projects
          </Button>
          <Button
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Skills
          </Button>
          <Button
            onClick={() => document.getElementById('reading')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Reading
          </Button>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4 py-2 rounded-full border border-white/20"
          >
            Contact
          </Button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 pt-16 max-w-5xl mx-auto px-4">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center p-6 lg:p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
                stat.highlight 
                  ? stat.value.includes('50%') || stat.value.includes('%')
                    ? 'text-[#14B8A6]'
                    : 'text-[#F59E0B]'
                  : 'text-white'
              }`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};