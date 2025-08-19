import { Sparkles, Zap, BookOpen, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

export function HeroSection() {
  return (
    <section className="container min-h-screen flex items-center overflow-hidden ">
      <div className="flex z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border/20 mb-8">
            <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
            <span className="text-sm text-muted-foreground">
              A new way of writing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            The better way to
            <br />
            Write Together
          </h1>

          <p className="text-xl  text-gray-700 mb-8 max-w-2xl mx-auto">
            Transform your thoughts into organized, intelligent notes with the
            power of AI. Never lose an idea again.
          </p>

          <div className="w-100 flex flex-col gap-4 justify-center items-center mb-16">
            <Link to="/main">
              {" "}
              <Button className="w-100">Start Writing notes </Button>
            </Link>
            <Button varient="muted" className="w-100">
              See how it works
            </Button>
          </div>

        
        </div>
        <div className="w-3/6">This is image to be</div>
      </div>
    </section>
  );
}
