import { Sparkles, Zap, BookOpen, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import LatexWriterImage from "../../assets/LatexWriterImage.png";

export function HeroSection() {
  return (
    <section className="mt-16 md:mt-32 w-ful flex items-center justify-center">
      <div  className="grid md:grid-cols-2  w-full h-full  items-center  z-10 md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex-1 flex flex-col justify-center md:text-left my-4 md:my-0 md:items-start">
          <div className=" hidden md:inline-flex  px-4 py-2 rounded-full bg-muted/30 border border-border/20 mb-8">
            <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
            <span className="text-sm text-muted-foreground ">
              Write faster. Format smarter. Publish better.
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-medium mb-6 text-left">
            The better way to
            Write Latex Docs
          </h1>

          <p className="text-xl  text-gray-700 mb-8 text-wrap">
            Create professional research papers, reports, and assignments
            effortlessly. with seamless LaTeX writing and version control.
          </p>

          <div className="w-full grid md:grid-cols-2 gap-4  mb-8 px-4 md:px-0 md:pe-8">
            <Link to="/register" className="w-full">
              <Button className="w-full">Start Now </Button>
            </Link>{" "}
            <Link to="/Documentation" className="w-full">
              <Button varient="muted" className="w-full">
                Explore Latex Documetation
              </Button>{" "}
            </Link>
          </div>
        </div>

        <div className="flex-1 hidden md:flex items-center justify-center h-full w-full mt-8 md:mt-0  rounded-4xl overflow-hidden">
          
          <img
            src={LatexWriterImage}
            alt="LatexWriterImage"
            className="object-cover h-full "
          />
        </div>
      </div>
    </section>
  );
}
