import { ChevronsLeftRight, Space, Sparkles } from "lucide-react";
import Link from "next/link";
import Button from "../../ui/Button/Button";

export function HeroSection() {
  return (
    <section className="w-full h-full  -z-10">
      <div className="flex flex-col w-full h-full  mx-auto items-center  md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
        <div className="sticky top-0  w-full h-screen  flex flex-col justify-center   ">
          <div className="flex flex-col ">
            {" "}
            <h1 className="  text-5xl lg:text-8xl   text-gray-950">
              Fast & Simple <br />
              Way to Write LaTeX
            </h1>
            <p className="text-lg md:text-xl  text-gray-700 mt-8 max-w-4xl ">
              With LaTeXWriter, save time and skip complicated setups. Compile
              LaTeX files locally without installing anything, and collaborate
              seamlessly with colleagues on shared projects.
            </p>
            <div className="w-fit grid md:grid-cols-2 gap-4 mt-12  md:items-center">
              <Link href="/user/register" className="w-full">
                <Button className="w-full" varient="primary">
                  Start For Free
                </Button>
              </Link>{" "}
              <Link href="/download" className="w-full">
                <Button className="w-full" varient="muted">
                  {" "}
                  Download For Windows{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>

  
      </div>
    </section>
  );
}
