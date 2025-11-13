import Link from "next/link";
import Button from "../../ui/Button/Button";
import FaqLinks from "@/components/FaqLinks";

// Features Page
export const metadata = {
  title: "LaTeXWriter Features - Advanced LaTeX Editor for Professionals",
  description:
    "Explore LaTeXWriter’s powerful features including real-time collaboration, fast PDF compilation, templates, and expert LaTeX support for researchers and students.",
  alternates: {
    canonical: "https://latexwriter.com/features",
  },
};

export default function WebsiteFeatures() {
  return (
    <div className="w-full mx-auto md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
     
      <div className=" w-full h-screen  flex flex-col justify-center   ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="flex flex-col">
        
          <h1 className="  text-5xl lg:text-8xl   text-gray-950">
            Key Features and <br />
            How to Use Them
          </h1>
          <p className="text-lg md:text-xl  text-gray-700 mt-8 max-w-4xl ">
            Discover powerful tools designed to make LaTeX writing easier,
            faster, and more efficient. Each feature is explained in detail with
            simple steps so you can focus on creating professional documents
            without hassle.
          </p>
          <div className="w-fit grid md:grid-cols-2 gap-4 mt-12  md:items-center">
            <Link href="/user/register" className="w-full">
              <Button className="w-full" varient="primary">
                Start For Free
              </Button>
            </Link>{" "}
            <Link href="/documentation/latexwriter" className="w-full">
              <Button className="w-full" varient="muted">
                {" "}
                LaTeXWriter Documentation{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Save Version Feature */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Save Version (Commit System)
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Keep track of your document's progress with version saving. When
          you're satisfied with a section, save it as a "commit" so you can
          return to it anytime.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Finish editing a section of your document.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Click Commit Changes.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              Add a Commit Title (e.g., Introduction Final Draft).
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                4
              </span>
              Click Commit.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                5
              </span>
              To restore, go to Older Versions, select the commit, and click
              Restore.
            </li>
          </ul>
        </div>
      </section>
      {/* Math Symbol Keyboard */}
      <section className="my-16 bg-white rounded-2xl">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Math Symbol Keyboard
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Insert mathematical symbols without memorizing LaTeX commands. A
          dedicated keyboard helps you add everything from simple arithmetic to
          advanced calculus.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Open the Math Symbol Keyboard tab.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Click on the symbol, and it will automatically insert into your
              document.
            </li>
          </ul>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">
              Available Categories:
            </h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Arithmetic & Relations</li>
              <li>• Set Theory & Logic</li>
              <li>• Greek Letters</li>
              <li>• Calculus Symbols</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">
              More Categories:
            </h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Arrows</li>
              <li>• Delimiters & Brackets</li>
              <li>• Miscellaneous Symbols</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Quick PDF Review */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Quick PDF Review - Two Modes
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Get an instant look at how your LaTeX document will appear in PDF
          format. Choose between two review modes depending on your stage of
          writing.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              Preview Modes:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-medium mr-2">Quick Preview:</span>
                Shows a fast-rendegray version to quickly check formatting.
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Final Output:</span>
                Generates the polished version of your PDF for submission.
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-3">
              How to Use:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  1
                </span>
                Click on Preview PDF.
              </li>
              <li className="flex items-start">
                <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  2
                </span>
                Quick Preview is auto selected.
              </li>
              <li className="flex items-start">
                <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  3
                </span>
                You can turn it off to see Final Output.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Error Assistance */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Error Assistance
        </h3>

        <p className="text-lg text-gray-700 mb-6">
          No more confusing LaTeX errors. This feature explains error messages
          in plain language and shows you how to fix them.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              If an error occurs, it will be displayed in the PDF view.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Click on Error Assistance.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              You'll get a detailed explanation of the error and instructions to
              fix it.
            </li>
          </ul>
        </div>
      </section>
      {/* AI Seek */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          AI Seek (Ask Gemini)
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Stay focused on your writing without switching tabs. Ask questions
          directly inside the editor—whether about LaTeX commands, research
          formatting, or content suggestions.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Go to the Ask Gemini tab.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Type your question (e.g., "How do I add a bibliography in
              LaTeX?").
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              Get instant answers tailogray to your document.
            </li>
          </ul>
        </div>
      </section>
      {/* File Management Features */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Uploading Files and Images
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Easily upload your research papers, LaTeX projects, or images directly
          into the editor. This feature saves time by allowing you to manage all
          files in one place.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Click the "Upload" button in the folder toolbar.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Select your file or image from your computer.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              The uploaded file will appear in your workspace.
            </li>
          </ul>
        </div>
      </section>
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Auto-Save Files
        </h3>

        <p className="text-lg text-gray-700 mb-6">
          Never worry about losing your work again. The system automatically
          saves every change you make, ensuring that your research and writing
          progress is always secure.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Simply start typing or editing.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Every few seconds, your changes are saved in the background.
            </li>
          </ul>
        </div>
      </section>
      {/* Advanced Features */}
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Math Mode Made Easy
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Simplify writing mathematical equations by inserting ready-made LaTeX
          commands with one click.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Available Options:
          </h4>
          <div className="space-y-1 text-gray-700 text-sm">
            <div>• Inline Math and Display Math</div>
            <div>• Fractions and Square Roots</div>
            <div>• Summations, Integrals, and Limits</div>
            <div>• Partial Derivatives</div>
            <div>• Binomial Coefficients</div>
            <div>• Vectors</div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Click on Math Mode.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Choose the desigray mathematical structure.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              It will auto-insert the LaTeX code into your document.
            </li>
          </ul>
        </div>
      </section>
      <section className="my-16 bg-white rounded-2xl ">
        <h3 className="text-3xl lg:text-5xl  mb-4 text-black blocksnone">
          Smart Toolbar
        </h3>

        <p className="text-lg text-gray-700 mb-6">
          The smart toolbar is your one-click solution to formatting,
          structuring, and organizing content.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Features in One Click:
          </h4>
          <div className="space-y-1 text-gray-700 text-sm">
            <div>• Text formatting: Bold, Italic, Typewriter</div>
            <div>• Add structure: Section, Chapter, Subsection, Paragraph</div>
            <div>• Insert: Citations, Cross-references, Links</div>
            <div>• Align text with a single click</div>
            <div>• Create ordegray and unordegray lists instantly</div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-gray-800 mb-4">How to Use:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                1
              </span>
              Select the text or position where you want changes.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                2
              </span>
              Click the desigray button in the Smart Toolbar.
            </li>
            <li className="flex items-start">
              <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                3
              </span>
              The change is applied instantly.
            </li>
          </ul>
        </div>
      </section>
      <FaqLinks/>
    </div>
  );
}
