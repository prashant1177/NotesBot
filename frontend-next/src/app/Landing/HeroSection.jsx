import { Sparkles } from "lucide-react";
import Link from "next/link";
import Button from "../../ui/Button/Button";

export function HeroSection() {
  return (
    <section className="py-8 md:py-24 w-full">
      <div className="flex flex-col w-full h-full  mx-auto items-center  z-10 md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex-1 flex flex-col justify-center md:text-center my-4 md:my-0 items-center">
          <h1 className="text-5xl lg:text-8xl  mb-8 text-center text-gray-800  tracking-tight md:tracking-wide ">
            Fast & Simple <br />
            Way to <span className="text-blue-500"> Write LaTeX </span>{" "}
          </h1>

          <p className="text-lg md:text-xl  text-gray-600 mb-8  text-justify md:text-center tracking-tight md:tracking-wide max-w-4xl ">
            With LaTeXWriter, save time and skip complicated setups. Compile
            LaTeX files locally without installing anything, and collaborate
            seamlessly with colleagues on shared projects.
          </p>

          <div className="w-fit grid md:grid-cols-2 gap-4  md:my-8 px-4 md:px-0 md:pe-8">
            <Link href="/user/register" className="w-full">
              <Button className="w-full">Start Free Trial</Button>
            </Link>{" "}
            <Link href="/download" className="w-full">
              <Button className="w-full" varient="muted">
                {" "}
                Download For Windows{" "}
              </Button>{" "}
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center h-full w-full mt-12 md:mt-24 ">
          <img
            src="/assets/LatexWriterEditor.gif"
            alt="LatexWriterEditor"
            className="object-cover w-full  "
          />
        </div>
      </div>
    </section>
  );
}
