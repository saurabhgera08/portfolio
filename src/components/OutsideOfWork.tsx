import { BookOpen } from "lucide-react";

export const OutsideOfWork = () => {
  return (
    <section className="py-24 sm:py-36 md:py-48 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
          Outside of Work
        </h3>
        <div className="space-y-6 text-foreground/80 leading-relaxed text-lg sm:text-xl">
          <p>
            I read widely across history, science, biographies and fiction to sharpen judgement and understand how people make decisions under pressure. I also train regularly to stay mentally sharp and competitive.
          </p>
        </div>
        <div className="mt-10">
          <button
            onClick={() => document.getElementById('reading')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            Explore My Reading List
          </button>
        </div>
      </div>
    </section>
  );
};

