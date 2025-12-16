import { Card } from "@/components/ui/card";
import { BookOpen, Mail, Sparkles, Users, Zap, History, BookMarked } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentlyReading, getBooksByCategory } from "@/lib/sanity-queries";

const fallbackCurrentlyReading = {
  title: "The Book of Clarity",
  author: "Paras Chopra",
  image: "/images/books/the-book-of-clarity.jpg",
  reflection: "I'm reading this while building. The book asks: what are you actually trying to accomplish? Why? In a world where AI spits out solutions instantly, the difference between builders and noise-makers is asking better questions. That's what I'm sitting with."
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
  title: "Shantaram",
  author: "Gregory David Roberts",
  image: "/images/books/shantaram.jpg",
  about: "A flawed, runaway convict lands in Bombay and rebuilds himself from rock bottom in a chaotic, morally grey world. It's a transformation story, one that shows how guilt, addiction, loss, torture, and loneliness don't have to destroy you. They can become the soil for wisdom, loyalty, and courage.",
  why: "Shantaram has a lot of emotion and gives an outsider perspective into Indian society. The protagonist's journey isn't sanitized or romanticized. He's broken, makes terrible choices, and finds redemption through connection, loyalty, and choosing the right thing even when it costs him. The book shows Bombay through the eyes of someone who has nothing, no money, no status, no safety net. He builds a life through relationships, through showing up, through choosing humanity over self-preservation.",
  impact: "Transformation isn't becoming perfect. It's choosing to be better than your worst moments. The protagonist's guilt, addiction, loss, torture, and loneliness aren't dismissed. They become the soil for wisdom, loyalty, courage. When I face setbacks, I think about this book. Failure isn't the end. It's the beginning of a different story, if you choose to make it so."
}, {
  title: "The Surrender Experiment",
  author: "Michael A. Singer",
  image: "/images/books/the-surrender experiment.jpg",
  about: "A memoir about what happens when you stop trying to control life and instead say yes to whatever shows up. Singer built a meditation center, then a software company, then a spiritual community, not by planning, but by surrendering to what life asked of him.",
  why: "One book zooms outward (Sapiens): 'Look at how arbitrary and constructed all this is.' The Surrender Experiment turns inward: 'Given the madness, how do I live sanely inside it?' This book challenged my assumption that control equals success. Singer's experiment was radical: say yes to whatever life presents, trust the process, and see what happens. He didn't plan to build a software company. He didn't plan to become a spiritual teacher. He just said yes to what showed up and did his best work.",
  impact: "There's a difference between planning and controlling. Planning is useful. Controlling is exhausting. Sometimes the best opportunities come from saying yes to something you didn't expect. At SWNCK, I learned when to persist and when to exit. The Surrender Experiment showed me that sometimes the exit isn't failure, it's life asking you to move in a different direction. The question isn't 'How do I control this?' It's 'How do I respond to this with clarity and integrity?'"
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
    image: "/images/books/the-master-algorithm.jpg",
    why: "A book about machine learning that doesn't require a PhD in mathematics. Domingos walks through how different schools of thought approach learning: Can we encode knowledge (symbolic)? Can we learn from data (statistical)? Can we evolve solutions (evolutionary)? What if all three talk to each other? AI will reshape everything. I wanted to understand not just how to use AI tools, but how AI actually thinks. This book gave me that foundation without the math."
  }, {
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    image: "/images/books/the-gene.jpg",
    why: "I spent a month with this book. Margin notes on every page. I don't come from a biology background. But I wanted to understand the foundations of modern medicine, why diseases happen the way they do, and what the future of human capability looks like. Mukherjee traces how one insight builds on another. Darwin's observations led to Mendel's patterns. Mendel's work led to DNA. DNA led to the Human Genome Project. The Genome Project led to CRISPR. Each generation of scientists stood on the shoulders of the previous one. This book changed how I see everything. I realized that the technologies and breakthroughs we take for granted are the result of decades of work by people most of us will never know. Genomics will reshape medicine, agriculture, and human capability in the next 50 years. It also taught me humility. When you read about how long it took to crack something as simple as the structure of DNA (13 years between Linus Pauling's wrong answer and Watson and Crick's right one), you stop thinking that problems have quick solutions. Building something that matters isn't about being the smartest person in the room. It's about understanding the problem deeply and patiently working at it until clarity emerges."
  }, {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: "/images/books/sapiens.png",
    why: "A book that zooms outward: 'Look at how arbitrary and constructed all this is.' Harari shows how Homo sapiens conquered the world through our ability to believe in shared fictions, money, nations, corporations, laws. These aren't natural. They're stories we tell ourselves, and because we all believe them, they become real. This book changed how I see business, society, and human cooperation. Everything we build is a shared fiction. The question isn't whether it's real. The question is: Does it serve us? Does it help us solve problems? Does it create value or extract it?"
  }],
  history: [{
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert M. Pirsig",
    image: "/images/books/zen-and-the-art-of-mm.jpeg",
    why: "Part autobiography, part philosophy, part technical manual. Pirsig and his son take a motorcycle journey across America. Along the way, he meditates on quality, technology, meaning, and what it means to live a good life. This book sits in the intersection of art and engineering, philosophy and pragmatism. Pirsig argues that the divide between \"the humanities\" and \"technology\" is artificial. A good motorcycle repair requires both precision and care. A meaningful life requires both reason and intuition."
  }, {
    title: "Delhi",
    author: "Khushwant Singh",
    image: "/images/books/delhi.jpeg",
    why: "A historical and personal exploration of Delhi, tracing its evolution from ancient times through various empires to modern India. Singh combines history, personal anecdotes, and deep observation to paint a vivid picture of the city's character, its people, and its transformation over centuries."
  }],
  fiction: [{
    title: "Harry Potter Series",
    author: "J.K. Rowling",
    image: "/images/books/harry-potter.webp",
    why: "I read these as an adult, not as a child. They're more than fantasy. They're about friendship, trust, courage, and how ordinary people choose to do the right thing when it's hard. Fiction shows you what's possible in human nature. The books aren't about wizards. They're about choice, loyalty, and sacrifice. Harry had every reason to give up. He didn't."
  }, {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    image: "/images/books/the-name-of-the-wind.jpg",
    why: "A boy with nothing becomes a legendary figure. The book is about mastery, the cost of knowledge, and the difference between seeming powerful and being powerful. Rothfuss teaches you that stories matter. How you frame your journey, your struggles, and your failures shapes how people understand you. Good storytelling isn't manipulation. It's truth told well."
  }]
};

// Category card data
const categories = [
  {
    id: 'shaping',
    title: 'Books That Shaped Me',
    description: 'Books that fundamentally changed how I think',
    icon: Sparkles,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    borderGradient: 'from-purple-500/50 to-rose-500/50',
    count: 6
  },
  {
    id: 'technology',
    title: 'Technology & Innovation',
    description: 'Understanding how the future is being built',
    icon: Zap,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    borderGradient: 'from-blue-500/50 to-teal-500/50',
    count: 3
  },
  {
    id: 'history',
    title: 'History & Humanity',
    description: 'Lessons from the past, wisdom for the present',
    icon: History,
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    borderGradient: 'from-amber-500/50 to-red-500/50',
    count: 2
  },
  {
    id: 'fiction',
    title: 'Fiction & Story',
    description: 'Stories that reveal what it means to be human',
    icon: BookMarked,
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    borderGradient: 'from-green-500/50 to-teal-500/50',
    count: 2
  }
];

// Flip Card Component
const FlipCard = ({ 
  category, 
  books, 
  isFlipped, 
  onFlip,
  expandedBook,
  onBookToggle
}: { 
  category: typeof categories[0]; 
  books: any[]; 
  isFlipped: boolean; 
  onFlip: () => void;
  expandedBook: string | null;
  onBookToggle: (bookId: string) => void;
}) => {
  const Icon = category.icon;
  
  return (
    <div 
      className="relative h-[400px] perspective-1000 cursor-pointer group"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
          <Card className={`h-full border-2 bg-gradient-to-br ${category.gradient} border-transparent hover:border-opacity-50 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.borderGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full text-sm font-medium text-foreground/80">
                  <BookOpen className="w-4 h-4" />
                  {category.count} books
                </div>
              </div>
              <p className="text-xs text-foreground/60 italic">Tap to explore</p>
            </div>
          </Card>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className={`h-full border-2 bg-gradient-to-br ${category.gradient} border-transparent shadow-xl overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-background/80 backdrop-blur-sm py-2 -mx-2 px-2 rounded-lg z-10">
                <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFlip();
                  }}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {books.map((book: any, idx: number) => {
                  const bookId = `${category.id}-${book.title}`;
                  const isExpanded = expandedBook === bookId;
                  
                  return (
                    <div 
                      key={idx} 
                      className="bg-background/50 rounded-lg overflow-hidden hover:bg-background/70 transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookToggle(bookId);
                      }}
                    >
                      <div className="p-4">
                        <div className="flex gap-3">
                          <img
                            src={book.image || book.coverImage || '/placeholder.svg'}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded shadow-sm flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm mb-1">{book.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                            {!isExpanded && (
                              <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                                {book.why || book.about || ''}
                              </p>
                            )}
                            {!isExpanded && (
                              <p className="text-xs text-accent mt-2 font-medium">Tap to expand →</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4 border-t border-foreground/10 pt-4 transition-all duration-300">
                          {book.about && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-2">What It's About</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{book.about}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-accent mb-2">Why It Mattered to Me</p>
                            <p className="text-xs text-foreground/80 leading-relaxed">{book.why}</p>
                          </div>
                          {book.impact && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-2">How It Shapes Me</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{book.impact}</p>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookToggle(bookId);
                            }}
                            className="text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                          >
                            ↑ Collapse
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Reading = ({ skipSectionWrapper = false }: { skipSectionWrapper?: boolean }) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [isCurrentlyReadingExpanded, setIsCurrentlyReadingExpanded] = useState(false);

  const toggleFlip = (categoryId: string) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
        setExpandedBook(null);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleBook = (bookId: string) => {
    setExpandedBook(prev => prev === bookId ? null : bookId);
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
        return (data && Array.isArray(data) && data.length > 0) ? data : fallbackShapingBooks
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
        return (data && Array.isArray(data) && data.length > 0) ? data : fallbackNewWorldsBooks.technology
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
        return (data && Array.isArray(data) && data.length > 0) ? data : fallbackNewWorldsBooks.history
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
        return (data && Array.isArray(data) && data.length > 0) ? data : fallbackNewWorldsBooks.fiction
      } catch (error) {
        console.warn('Failed to fetch fiction books from Sanity, using fallback:', error)
        return fallbackNewWorldsBooks.fiction
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const current = { ...fallbackCurrentlyReading, ...currentlyReading };
  const shaping = (shapingBooks && Array.isArray(shapingBooks) && shapingBooks.length > 0) ? shapingBooks : fallbackShapingBooks;
  const tech = (techBooks && Array.isArray(techBooks) && techBooks.length > 0) ? techBooks : fallbackNewWorldsBooks.technology;
  const history = (historyBooks && Array.isArray(historyBooks) && historyBooks.length > 0) ? historyBooks : fallbackNewWorldsBooks.history;
  const fiction = (fictionBooks && Array.isArray(fictionBooks) && fictionBooks.length > 0) ? fictionBooks : fallbackNewWorldsBooks.fiction;

  const categoryBooksMap: Record<string, any[]> = {
    shaping,
    technology: tech,
    history,
    fiction
  };

  const content = (
    <div className="max-w-7xl mx-auto">
        {/* Currently Reading - Expandable */}
        <div className="mb-16 max-w-2xl mx-auto">
          <Card 
            className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-accent/5 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setIsCurrentlyReadingExpanded(!isCurrentlyReadingExpanded)}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <img 
                  src={current.image || current.coverImage || '/placeholder.svg'} 
                  alt={current.title}
                  className="w-16 h-24 object-cover rounded shadow-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-accent mb-1">Currently Reading</p>
                  <h3 className="text-lg font-bold text-foreground mb-1">{current.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{current.author}</p>
                  {!isCurrentlyReadingExpanded && (
                    <>
                      <p className="text-sm text-foreground/70 line-clamp-2">{current.reflection || current.why}</p>
                      <p className="text-xs text-accent mt-2 font-medium">Tap to expand →</p>
                    </>
                  )}
                </div>
              </div>
              
              {isCurrentlyReadingExpanded && (
                <div className="mt-4 pt-4 border-t border-foreground/10 space-y-3 transition-all duration-300">
                  <div>
                    <p className="text-xs font-semibold text-accent mb-2">My Reflection</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{current.reflection || current.why}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCurrentlyReadingExpanded(false);
                    }}
                    className="text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    ↑ Collapse
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Category Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category) => (
            <FlipCard
              key={category.id}
              category={category}
              books={categoryBooksMap[category.id] || []}
              isFlipped={flippedCards.has(category.id)}
              onFlip={() => toggleFlip(category.id)}
              expandedBook={expandedBook}
              onBookToggle={toggleBook}
            />
          ))}
        </div>

        {/* Expanded Book Details - Only show when a card is flipped */}
        {flippedCards.size > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm text-foreground/60">
                Tap a book card above to see full details, or tap the category card again to close
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="max-w-2xl mx-auto mt-20">
          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
            <div className="text-center">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">What book changed how you think?</h3>
              <p className="text-sm text-foreground/70 mb-4">
                I'm always looking for recommendations that shift perspectives.
              </p>
              <a 
                href="mailto:saurabhgera08@gmail.com?subject=Book%20recommendation" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                Share a recommendation
              </a>
            </div>
          </Card>
        </div>
      </div>
  );

  if (skipSectionWrapper) {
    return content;
  }

  return (
    <section id="reading" className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      {content}
    </section>
  );
};
