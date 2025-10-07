import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// Inline Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 rounded-md px-8 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function CTASection() {
  return (
    <section className="relative overflow-hidden w-full h-screen flex justify-center">
      <img src="/hd.webp" className="object-cover w-full"/>
      <div className="absolute w-full mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-950/90 h-full flex items-center flex-col justify-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-600 mb-8 bg-gray-700/50">
          <Sparkles className="w-4 h-4 text-blue-400 mr-2 animate-pulse" />
          <span className="text-sm text-gray-500">
            Built to make writing simple, smooth, and stress-free.{" "}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-semibold text-blue-500 mb-6">
          Write LaTeX Without the Hassle
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          LaTeXWriter makes professional writing easy with simple setup, rapid
          tools, instant compilation, and real-time collaboration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-12">
          <Link href={`/user/register`}>
            {" "}
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white group"
            >
              Start Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={`/features`}>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-500 hover:bg-gray-700 text-gray-200"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Trust Statement */}
        <div className="mt-8 text-sm text-gray-400">
          <p>
           No installation needed • Compile in seconds •  Export-ready
            for IEEE, Springer & more
          </p>
        </div>
      </div>
    </section>
  );
}
