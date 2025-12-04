import { Card } from "@/components/ui/card";
import { BookOpen, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import { getCurrentlyReading, getBooksByCategory } from "@/lib/sanity-queries";

const fallbackCurrentlyReading = {
  title: "The Book of Clarity",
  author: "Paras Chopra",
  image: "/images/books/book-of-clarity.jpg",
  reflection: "Clarity isn't about having all the answers. It's about asking the right questions. In a world where AI can generate solutions at the drop of a hat, what separates transformative builders from noise-makers is clarity about what you're trying to accomplish and why. I'm sitting with this while building, thinking about how to apply clarity at scale."
};
const fallbackShapingBooks = [{
  title: "Train to Pakistan",
  author: "Khushwant Singh",
  image: "/images/books/train-to-pakistan.jpg",
  about: "A novel set during Partition in 1947. Two friends, one Hindu, one Muslim, forced to take opposite sides as a village tears itself apart. It's brutal, intimate, and unforgiving about human nature.",
  why: "My ancestors lived through Partition. This book grounded me in that reality in a way history textbooks never could. It showed me the cost of nation-building, the sacrifice of ordinary people, and the fragility of civilizations. When you read about characters you care about being forced to choose between survival and loyalty, you stop treating history as distant. You understand that the world we take for granted was built on tremendous sacrifice and suffering.",
  impact: "It reminds me that building anything meaningful comes at a cost. Comfort and safety are luxuries, not defaults. When I face difficult tradeoffs in business or life, I think about that book and ask: What am I willing to sacrifice for what I believe in?"
}, {
  title: "The Fountainhead",
  author: "Ayn Rand",
  image: "/images/books/the-fountainhead.jpg",
  about: "Ayn Rand's philosophical novel about individualism, integrity, and the conflict between those who create and those who live off the creations of others. The story follows Howard Roark, an architect who refuses to compromise his artistic vision despite societal pressure.",
  why: "This book challenged my thinking about integrity, individualism, and what it means to create something original. Roark's refusal to compromise his vision, even when it meant losing everything, forced me to question: What am I willing to sacrifice for what I believe in? The book's exploration of the tension between creators and those who exploit creation resonates deeply with building in business.",
  impact: "The Fountainhead taught me that true creation requires the courage to stand alone. In business, this means having the conviction to pursue your vision even when others don't understand it. It's not about being stubborn, it's about knowing when compromise serves the work and when it destroys it. This book shaped how I think about building: Are you creating something original, or are you copying what already exists?"
}, {
  title: "Steve Jobs",
  author: "Walter Isaacson",
  image: "/images/books/steve-jobs.jpg",
  about: "Isaacson's authorized biography of Steve Jobs. Access to Jobs himself, his family, colleagues, rivals. It shows both the genius and the cruelty, the vision and the tyranny.",
  why: "I wanted to understand how someone who wasn't a technologist, designer, or businessman became one of the most influential figures in human history. The answer: Jobs was a student of simplicity, clarity, and human psychology. He understood that most people are wrong about what they want. His job was to show them. Jobs visited a calligraphy class at Reed College. That class had nothing to do with computers. Ten years later, that learning showed up in the Mac. He was constantly making connections across domains.",
  impact: "Jobs taught me that breadth of thinking compounds. You can't innovate in a domain by only studying that domain. You need philosophy, art, psychology, history, technology, design. All of it in conversation. When I read widely across completely different domains (like genomics, history, psychology), I'm not being distracted. I'm building the mental models that show up in unexpected ways later."
}, {
  title: "Elon Musk",
  author: "Walter Isaacson",
  image: "/images/books/elon-musk.jpg",
  about: "Isaacson's biography of Elon Musk (2023). Access to Musk during the Twitter acquisition, the Ukraine crisis, Tesla's transformation, SpaceX, Neuralink. It's intimate about his thinking, his chaos, his obsessions.",
  why: "I wanted to understand how someone thinks when they're trying to solve problems at civilization scale. Musk doesn't think about quarterly earnings. He thinks about whether humanity becomes multiplanetary, whether we solve energy, whether we can enhance human cognition. His approach: First principles thinking. Ignore precedent. What are the physics? What are the constraints? How do we remove them? When Tesla was failing, he didn't ask \"How do I optimize a gas car?\" He asked \"What if we rethought the entire powertrain from physics first?\" That question changed everything.",
  impact: "Musk reminds me that constraints are often self-imposed. We say things are impossible because \"that's how it's always been done.\" First principles thinking means asking: Is that actually true? Or is it just convenient? At SWNCK, I was thinking within constraints I had accepted. The market for sustainable fashion at premium prices during early growth was constrained by assumptions about customer willingness to pay, channel economics, and supply chain complexity. Exiting wasn't failure. It was recognizing which constraints were physics and which were just business-as-usual thinking."
}];
const fallbackNewWorldsBooks = {
  technology: [{
    title: "The Master Algorithm",
    author: "Pedro Domingos",
    image: "/images/books/master-algorithm.jpg",
    why: "A book about machine learning that doesn't require a PhD in mathematics. Domingos walks through how different schools of thought approach learning: Can we encode knowledge (symbolic)? Can we learn from data (statistical)? Can we evolve solutions (evolutionary)? What if all three talk to each other? AI will reshape everything. I wanted to understand not just how to use AI tools, but how AI actually thinks. This book gave me that foundation without the math."
  }, {
    title: "Superintelligence",
    author: "Nick Bostrom",
    image: "/images/books/superintelligence.jpg",
    why: "What happens if we build an AI smarter than human intelligence? Bostrom explores not just the technical challenges, but the philosophical ones. If an AI system is smarter than you at every cognitive task, how do you ensure it's aligned with human values? We're building a world where intelligence becomes decoupled from human constraints. Understanding the implications is critical to building responsibly."
  }, {
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    image: "/images/books/the-gene.jpg",
    why: "I spent a month with this book. Margin notes on every page. I don't come from a biology background. But I wanted to understand the foundations of modern medicine, why diseases happen the way they do, and what the future of human capability looks like. Mukherjee traces how one insight builds on another. Darwin's observations led to Mendel's patterns. Mendel's work led to DNA. DNA led to the Human Genome Project. The Genome Project led to CRISPR. Each generation of scientists stood on the shoulders of the previous one. This book changed how I see everything. I realized that the technologies and breakthroughs we take for granted are the result of decades of work by people most of us will never know. Genomics will reshape medicine, agriculture, and human capability in the next 50 years. It also taught me humility. When you read about how long it took to crack something as simple as the structure of DNA (13 years between Linus Pauling's wrong answer and Watson and Crick's right one), you stop thinking that problems have quick solutions. Building something that matters isn't about being the smartest person in the room. It's about understanding the problem deeply and patiently working at it until clarity emerges."
  }],
  history: [{
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert M. Pirsig",
    image: "/images/books/zen-motorcycle.jpg",
    why: "Part autobiography, part philosophy, part technical manual. Pirsig and his son take a motorcycle journey across America. Along the way, he meditates on quality, technology, meaning, and what it means to live a good life. This book sits in the intersection of art and engineering, philosophy and pragmatism. Pirsig argues that the divide between \"the humanities\" and \"technology\" is artificial. A good motorcycle repair requires both precision and care. A meaningful life requires both reason and intuition."
  }, {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    image: "/images/books/mans-search-meaning.jpg",
    why: "A Holocaust survivor reflects on what gives life meaning. Frankl argues that the primary human drive isn't pleasure or power. It's meaning. People who find meaning survive suffering. People who lose meaning fall apart. When building anything difficult, meaning matters more than metrics. Frankl's insight that you can't pursue meaning directly (it emerges from commitment to something) changed how I think about purpose."
  }, {
    title: "Delhi",
    author: "Khushwant Singh",
    image: "/images/books/delhi.jpg",
    why: "A historical and personal exploration of Delhi, tracing its evolution from ancient times through various empires to modern India. Singh combines history, personal anecdotes, and deep observation to paint a vivid picture of the city's character, its people, and its transformation over centuries."
  }],
  fiction: [{
    title: "Harry Potter Series",
    author: "J.K. Rowling",
    image: "/images/books/harry-potter.jpg",
    why: "I read these as an adult, not as a child. They're more than fantasy. They're about friendship, trust, courage, and how ordinary people choose to do the right thing when it's hard. Fiction shows you what's possible in human nature. The books aren't about wizards. They're about choice, loyalty, and sacrifice. Harry had every reason to give up. He didn't."
  }, {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    image: "/images/books/name-of-wind.jpg",
    why: "A boy with nothing becomes a legendary figure. The book is about mastery, the cost of knowledge, and the difference between seeming powerful and being powerful. Rothfuss teaches you that stories matter. How you frame your journey, your struggles, and your failures shapes how people understand you. Good storytelling isn't manipulation. It's truth told well."
  }]
};
const BookCard = ({
  book,
  isExpanded,
  onToggle
}: {
  book: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => <Collapsible open={isExpanded} onOpenChange={onToggle}>
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-premium transition-all duration-300">
      <CollapsibleTrigger className="w-full text-left p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img 
                  src={book.image || book.coverImage || '/placeholder.svg'} 
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded shadow-md"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {book.title}
                </h4>
                <p className="text-sm font-medium text-muted-foreground">
                  {book.author}
                </p>
              </div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-6 pb-6 space-y-4 pt-2">
          {book.about && <div>
              <p className="text-sm font-semibold text-accent mb-2">What It's About</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{book.about}</p>
            </div>}
          <div>
            <p className="text-sm font-semibold text-accent mb-2">Why It Mattered to Me</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{book.why}</p>
          </div>
          {book.impact && <div>
              <p className="text-sm font-semibold text-accent mb-2">How It Shapes Me</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{book.impact}</p>
            </div>}
        </div>
      </CollapsibleContent>
    </Card>
  </Collapsible>;
export const Reading = () => {
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
  const toggleBook = (bookTitle: string) => {
    setExpandedBooks(prev => {
      const next = new Set(prev);
      if (next.has(bookTitle)) {
        next.delete(bookTitle);
      } else {
        next.add(bookTitle);
      }
      return next;
    });
  };

  const { data: currentlyReading = fallbackCurrentlyReading } = useQuery({
    queryKey: ['currentlyReading'],
    queryFn: async () => {
      try {
        const data = await getCurrentlyReading()
        return data || fallbackCurrentlyReading
      } catch (error) {
        console.warn('Failed to fetch currently reading from Sanity, using fallback:', error)
        return fallbackCurrentlyReading
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: shapingBooks = fallbackShapingBooks } = useQuery({
    queryKey: ['shapingBooks'],
    queryFn: async () => {
      try {
        const data = await getBooksByCategory('shaping')
        return data || fallbackShapingBooks
      } catch (error) {
        console.warn('Failed to fetch shaping books from Sanity, using fallback:', error)
        return fallbackShapingBooks
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: techBooks = fallbackNewWorldsBooks.technology } = useQuery({
    queryKey: ['techBooks'],
    queryFn: async () => {
      try {
        const data = await getBooksByCategory('technology')
        return data || fallbackNewWorldsBooks.technology
      } catch (error) {
        console.warn('Failed to fetch tech books from Sanity, using fallback:', error)
        return fallbackNewWorldsBooks.technology
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: historyBooks = fallbackNewWorldsBooks.history } = useQuery({
    queryKey: ['historyBooks'],
    queryFn: async () => {
      try {
        const data = await getBooksByCategory('history')
        return data || fallbackNewWorldsBooks.history
      } catch (error) {
        console.warn('Failed to fetch history books from Sanity, using fallback:', error)
        return fallbackNewWorldsBooks.history
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: fictionBooks = fallbackNewWorldsBooks.fiction } = useQuery({
    queryKey: ['fictionBooks'],
    queryFn: async () => {
      try {
        const data = await getBooksByCategory('fiction')
        return data || fallbackNewWorldsBooks.fiction
      } catch (error) {
        console.warn('Failed to fetch fiction books from Sanity, using fallback:', error)
        return fallbackNewWorldsBooks.fiction
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const current = { ...fallbackCurrentlyReading, ...currentlyReading };
  // Use fallback if Sanity data is missing or empty
  const shaping = (shapingBooks && Array.isArray(shapingBooks) && shapingBooks.length > 0) ? shapingBooks : fallbackShapingBooks;
  const tech = (techBooks && Array.isArray(techBooks) && techBooks.length > 0) ? techBooks : fallbackNewWorldsBooks.technology;
  const history = (historyBooks && Array.isArray(historyBooks) && historyBooks.length > 0) ? historyBooks : fallbackNewWorldsBooks.history;
  const fiction = (fictionBooks && Array.isArray(fictionBooks) && fictionBooks.length > 0) ? fictionBooks : fallbackNewWorldsBooks.fiction;

  return <section id="reading" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Books That Shaped How I Think
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        {/* What I'm Reading Now */}
        <div className="mb-24 sm:mb-28">
          <Card className="p-10 sm:p-12 lg:p-16 border-0 shadow-premium bg-gradient-to-br from-card to-card/50">
          <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={current.image || current.coverImage || '/placeholder.svg'} 
                  alt={current.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-accent mb-3">What I'm Reading Now</p>
                <h3 className="text-2xl font-bold text-foreground mb-1">{current.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">{current.author}</p>
                <p className="text-base text-foreground/80 leading-relaxed">{current.reflection || current.why}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Why I Read */}
        <div className="mb-24 sm:mb-28 max-w-4xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">Why I Read</h3>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              I read to understand how the world works and how people think when facing hard problems. I'm drawn to books that challenge my assumptions, open new domains entirely, or show how extraordinary people approached impossible-seeming challenges.
            </p>
            <p>
              I read biographies to understand decision-making frameworks through lived experience. I read history to understand sacrifice and consequence. I read science to marvel at human progress. I read fiction to understand what it means to be human.
            </p>
            <p>
              If a book changes how I see the world, I sit with it, make margin notes, and think about it for months. Some of these are below.
            </p>
          </div>
          
          <div className="mt-8 p-6 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm font-semibold text-accent mb-2">What books have shaped your thinking?</p>
            <p className="text-sm text-foreground/80">
              What book has changed how you think? I'm always looking for recommendations. Reach out:{" "}
              <a href="mailto:saurabhgera08@gmail.com" className="text-accent hover:underline font-medium">
                saurabhgera08@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Books That Shaped Me */}
        <div className="mb-24 sm:mb-28">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 flex items-center">
            <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
            Books That Shaped Me
          </h3>
          <div className="space-y-6">
            {shaping.map((book: any) => <BookCard key={book._id || book.title} book={book} isExpanded={expandedBooks.has(book.title)} onToggle={() => toggleBook(book.title)} />)}
          </div>
        </div>

        {/* Books That Show Me New Worlds */}
        <div className="mb-24 sm:mb-28">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 flex items-center">
            <span className="w-2 h-2 rounded-full bg-accent mr-3"></span>
            Books That Show Me New Worlds
          </h3>
          
          <div className="space-y-16">
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 pl-5">Technology & Innovation</h4>
              <div className="space-y-6">
                {tech.map((book: any) => <Card key={book._id || book.title} className="p-6 border-0 shadow-card hover:shadow-premium transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={book.image || book.coverImage || '/placeholder.svg'} 
                          alt={book.title}
                          className="w-12 h-18 object-cover rounded shadow-sm"
                        />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-foreground mb-1">{book.title}</h5>
                        <p className="text-sm font-medium text-muted-foreground mb-3">{book.author}</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{book.why}</p>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 pl-5">History & Humanity</h4>
              <div className="space-y-6">
                {history.map((book: any) => <Card key={book._id || book.title} className="p-6 border-0 shadow-card hover:shadow-premium transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={book.image || book.coverImage || '/placeholder.svg'} 
                          alt={book.title}
                          className="w-12 h-18 object-cover rounded shadow-sm"
                        />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-foreground mb-1">{book.title}</h5>
                        <p className="text-sm font-medium text-muted-foreground mb-3">{book.author}</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{book.why}</p>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 pl-5">Fiction & Story</h4>
              <div className="space-y-6">
                {fiction.map((book: any) => <Card key={book._id || book.title} className="p-6 border-0 shadow-card hover:shadow-premium transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={book.image || book.coverImage || '/placeholder.svg'} 
                          alt={book.title}
                          className="w-12 h-18 object-cover rounded shadow-sm"
                        />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-foreground mb-1">{book.title}</h5>
                        <p className="text-sm font-medium text-muted-foreground mb-3">{book.author}</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{book.why}</p>
                      </div>
                    </div>
                  </Card>)}
              </div>
            </div>
          </div>
        </div>

        {/* What This Tells You About How I Think */}
        <div className="mb-24 sm:mb-28 max-w-4xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-10 text-center">What This Tells You About How I Think</h3>
          <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">I read across domains.</span> I'm not just studying business or technology. I'm reading history, biology, philosophy, and fiction. This breadth is intentional. Breakthroughs come from connecting ideas across domains.
            </p>
            <p>
              <span className="font-semibold text-foreground">I read for depth, not breadth.</span> I don't skim books. Some books (like "The Gene") I sit with for a month, making margin notes. Others I return to. I value understanding over consumption.
            </p>
            <p>
              <span className="font-semibold text-foreground">I'm grounded in history and consequence.</span> "Train to Pakistan" and "Shoe Dog" aren't just stories. They remind me that things matter. Sacrifice is real. Building is hard.
            </p>
            <p>
              <span className="font-semibold text-foreground">I'm obsessed with how great people think.</span> I read biographies to extract decision-making frameworks. How did Jobs approach simplicity? How did Musk approach constraints? How did Knight approach obsession?
            </p>
            <p>
              <span className="font-semibold text-foreground">I believe technology and humanity aren't separate.</span> Books like "Zen and the Art of Motorcycle Maintenance" and "The Gene" show me that science isn't cold and engineering isn't soulless. They're expressions of human curiosity and care.
            </p>
            <p>
              <span className="font-semibold text-foreground">I want to understand the world, not just optimize my place in it.</span> I read to see around corners, to understand emerging domains, and to be humbled by what I don't know.
            </p>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-10 sm:p-12 lg:p-16 border-0 shadow-premium bg-gradient-to-br from-accent/5 to-accent/10">
            <div className="text-center">
              <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">What book has changed how you think?</h3>
              <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
                I'm always looking for recommendations. If you've read something that shifted how you see the world, business, human nature, or possibility, I'd love to hear about it.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Not looking for productivity tips or career advice books. Looking for books that made you think differently about something fundamental.
              </p>
              <a href="mailto:saurabhgera08@gmail.com?subject=Book%20recommendation%20for%20Saurabh" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <Mail className="w-4 h-4" />
                Email me your recommendation
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};