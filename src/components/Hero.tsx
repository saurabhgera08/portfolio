import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHeroData } from "@/lib/sanity-queries";

// Fallback data if Sanity isn't configured
const fallbackData = {
  headline: "Scaling Businesses Through\nClear Thinking &\nRelentless Execution",
  headlineHighlight: "Relentless Execution",
  subheadline: "I've driven 50%+ MoM growth, built profitable unit economics, and led cross-functional teams to win in competitive markets. I think clearly about complex problems and execute relentlessly on what matters.",
  ctaPrimary: "Explore My Work",
  ctaSecondary: "Get in Touch",
  stats: [
    { value: "$5M+", label: "Annual Revenue Managed", highlight: false },
    { value: "$860K", label: "Competitive Wins", highlight: false },
    { value: "50%+", label: "MoM Growth Driven", highlight: true },
    { value: "$1.2M+", label: "Market Share Leader", highlight: false },
    { value: "3%", label: "QoQ Share Gains", highlight: false },
    { value: "Profitable", label: "Unit Economics", highlight: true },
  ],
};

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch data from Sanity, fallback to hardcoded data
  const { data: heroData = fallbackData } = useQuery({
    queryKey: ['hero'],
    queryFn: getHeroData,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Parse headline - split by newlines or use as-is
  const headlineText = heroData.headline || fallbackData.headline;
  const headlineParts = headlineText.split('\n').filter(p => p.trim());
  const highlightText = heroData.headlineHighlight || fallbackData.headlineHighlight;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
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
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight px-4">
          {headlineParts.map((part, index) => {
            const isHighlight = part.includes(highlightText);
            if (isHighlight) {
              const parts = part.split(highlightText);
              return (
                <span key={index}>
                  {parts[0]}
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] animate-shimmer bg-[length:200%_auto]">
                      {highlightText}
                    </span>
                  </span>
                  {parts[1]}
                  {index < headlineParts.length - 1 && <br />}
                </span>
              );
            }
            return (
              <span key={index}>
                {part}
                {index < headlineParts.length - 1 && <br />}
              </span>
            );
          })}
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/85 max-w-4xl mx-auto leading-relaxed font-light px-4">
          {heroData.subheadline || fallbackData.subheadline}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6 stagger-1 px-4">
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
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 pt-16 max-w-5xl mx-auto px-4">
          {(heroData.stats || fallbackData.stats).map((stat: any, index: number) => (
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