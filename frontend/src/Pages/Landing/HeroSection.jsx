import { Sparkles, Zap, BookOpen, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import LatexWriterImage from "../../assets/LatexWriterImage.png";

export function HeroSection() {
  return (
    <section className="container min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="flex flex-col md:flex-row w-full items-center h-full z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left flex flex-col my-4 md:my-0 items-center md:block">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/30 border border-border/20 mb-8">
            <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
            <span className="text-sm text-muted-foreground ">
              Smarter LaTeX editing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 ">
            The better way to
            <br />
            Write Latex Docs
          </h1>

          <p className="text-xl  text-gray-700 mb-8 max-w-2xl mx-auto">
            Create professional research papers, reports, and assignments
            effortlessly. with seamless LaTeX writing and version control.
          </p>

          <div className="w-100 flex flex-col gap-4 justify-center items-center mb-16">
            <Link to="/register">
              <Button className="w-100">Start Now </Button>
            </Link>{" "}
            <Link to="/Documentation">
              <Button varient="muted" className="w-100">
                Explore Latex Documetation
              </Button>{" "}
            </Link>
          </div>
        </div>

        <div className="md:w-3/6 md:h-96 rounded-4xl rounded-bl-4xl overflow-hidden mt-8 md:mt-0">
          <img
            src={LatexWriterImage}
            alt="LatexWriterImage"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
