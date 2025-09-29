import { Sparkles} from "lucide-react";
import Link from "next/link";
import Button from "../../ui/Button/Button";

export function HeroSection() {
  return (
    <section className="py-4 md:py-16 w-full">
      <div className="flex flex-col w-full h-full  mx-auto items-center  z-10 md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex-1 flex flex-col justify-center md:text-center my-4 md:my-0 items-center">
          <div className=" hidden md:inline-flex  px-4 py-2 rounded-full border border-gray-600 mb-8 text-gray-600 bg-gray-200">
            <Sparkles className="w-4 h-4 text-chart-1 mr-2" />
            <span className="text-sm ">
              Write faster. Format smarter. Publish better.
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-medium mb-6 text-center text-gray-800 md:leading-18 tracking-tight md:tracking-wide">
            The Simplest Way to <br/> Write LaTeX  {" "}
          </h1>

          <p className="text-lg md:text-xl  text-gray-600 mb-8  text-justify md:text-center">
           Latexwriter.com brings the power of Google Gemini directly into your editor—making it easier to learn, write, and debug LaTeX in real time. Whether you’re a beginner or an expert, enjoy a smarter, faster, and more reliable LaTeX experience.
          </p>

          <div className="w-fit grid md:grid-cols-2 gap-4  md:my-8 px-4 md:px-0 md:pe-8">
            <Link href="/user/register" className="w-full">
              <Button className="w-full">
                Start Now{" "}
              </Button>
            </Link>{" "}
            <Link href="/Documentation/latex" className="w-full">
              <Button className="w-full"  varient="muted"> Explore Latex Documetation</Button>{" "}
            </Link>
          </div>
        </div>

        <div className="blocks flex-1 flex items-center justify-center h-full w-full mt-12 md:mt-24  rounded-4xl shadow-2xl ">
          <img
            src="/assets/LatexWriterEditor.webp"
            alt="LatexWriterEditor"
            className="object-cover h-full rounded-4xl "
          />
        </div>
      </div>
    </section>
  );
}
