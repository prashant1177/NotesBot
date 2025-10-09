import Badge from "@/ui/Badge/Badge";
import { Check, Clock, Shield, Users, Zap, Star } from "lucide-react";

export default function Pricing() {
  return (
    <section className="w-full  pt-16">
      <div className="w-full sm:max-w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Badge variant="outline" className="mb-4 ">
            Know LaTeXWriter
          </Badge>
          <h2 className="text-5xl lg:text-6xl  mb-4 text-black blocksnone">
            Why Upgrade to LaTeXWriter?
          </h2>
        </div>
        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 p-4 ">
          <div className="justify-center items-center gap-12 h-full hidden md:flex">
            <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
              <div className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200">
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                  <img
                    src="/assets/LatexWriterEditor.gif"
                    className="rounded-[16px]" alt="Latex Writer Lightning Fast Compilation"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="blocksnone bg-white ">
            <h6 className="text-3xl font-bold mb-4 text-black">
              Lightning Fast Compilation
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Experience blazing-fast document compilation with our offline
              compilation. Compile complex documents in under a second instead
              of waiting minutes.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">
                  10x faster than standard compilation
                </span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Offline compilation</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">
                  Advanced caching technology
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16 p-4">
          {/* Lightning Fast Compilation */}
          <div className="blocksnone bg-white ">
            <h6 className="text-3xl font-bold mb-4 text-black">
              Real-time Collaboration
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Work together with your team in real-time. See changes instantly,
              leave comments, and collaborate seamlessly on any document.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Live cursor tracking</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Comment & review system</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">
                  Share with unlimited users
                </span>
              </div>
            </div>
          </div>{" "}
          <div className="justify-center items-center gap-12 h-full hidden md:flex">
            <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
              <div className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200">
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                  <img
                    src="/assets/Multi-cursor.webp"
                    className="rounded-[16px]" alt="Latex Writer Real-time Collaboration
"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="grid md:grid-cols-2 gap-12 mb-16 p-4">
          <div className="justify-center items-center gap-12 h-full hidden md:flex">
            <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
              <div className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200">
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                  <img
                    src="/assets/savedcommit.webp"
                    className="rounded-[16px]" alt="Latex Writer Version History"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Version History */}
          <div className="blocksnone bg-white">
            <h6 className="text-3xl font-bold mb-4 text-black">
              Version History
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Never lose your work with unlimited version history and one-click
              restore.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Automatic saves</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Restore previous versions</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Track every edit</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16 p-4">
          {/* Advanced Security */}
          <div className="blocksnone bg-white">
            <h6 className="text-3xl font-bold mb-4 text-black">
              Smart Error Assistant
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Identify and fix LaTeX errors instantly with real-time suggestions
              and guided debugging. With one click, you can send the issue to
              Google Gemini for instant analysis and solution.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Real-time error detection</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">One-click Gemini integration</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Step-by-step debugging help</span>
              </div>
            </div>
          </div>{" "}
         <div className="justify-center items-center gap-12 h-full hidden md:flex">
            <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
              <div className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200">
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                  <img
                    src="/assets/latexwritererrorassistant.webp"
                    className="rounded-[16px]" alt="Latex Writer Smart Error Assistant"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-16 p-4">
          {" "}
          <div className="justify-center items-center gap-12 h-full hidden md:flex">
            <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
              <div className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200">
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                  <img
                    src="/assets/latexmathsymbols.webp"
                    className="rounded-[16px]" alt="Latex Writer Simple Math Keyboard"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Simple Math Keyboard */}
          <div className="blocksnone bg-white">
            <h6 className="text-3xl font-bold mb-4 text-black">
              Simple Math Keyboard
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Type math equations quickly with an intuitive on-screen keyboard
              designed for symbols and formulas.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">One-tap math symbols</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Supports LaTeX syntax</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Works on touch devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
