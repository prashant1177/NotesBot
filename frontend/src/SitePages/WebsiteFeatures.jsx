import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";
import savedcommit from "../assets/savedcommit.webp";
import latexmathsymbols from "../assets/latexmathsymbols.webp";
import latexreviredf from "../assets/latexreviredf.webp";
import latexwritererrorassistant from "../assets/latexwritererrorassistant.webp";
import latexwriteraskgemini from "../assets/latexwriteraskgemini.webp";

export default function WebsiteFeatures() {
  return (
    <div className="pt-4 md:pt-16 w-full">
      <div className="flex flex-col w-full h-full  mx-auto items-center  z-10 md:gap-2 md:max-w-5/6 px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full flex-1 flex flex-col justify-center md:text-center my-4 md:my-0 items-center">
          <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Features 
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
          <h1 className="text-4xl lg:text-6xl font-medium mb-6 text-center text-gray-800 md:leading-18 tracking-tight md:tracking-wide">
            Key Features and <br />
            How to Use Them
          </h1>

          <p className="text-lg md:text-xl  text-gray-600 mb-8  text-justify md:text-center">
            Discover powerful tools designed to make LaTeX writing easier,
            faster, and more efficient. Each feature is explained in detail with
            simple steps so you can focus on creating professional documents
            without hassle.{" "}
          </p>
          <div className="w-fit grid md:grid-cols-2 gap-4  md:my-8 px-4 md:px-0 md:pe-8">
            <Link to="/register" className="w-full">
              <Button className="w-full">Start Now </Button>
            </Link>{" "}
            <Link to="/Documentation/latex" className="w-full">
              <Button className="w-full" varient="muted">
                {" "}
                Explore Latex Tutorial
              </Button>{" "}
            </Link>
          </div>
          <div className="text-left w-full mt-12 md:mt-24 h-fit">
            <section className="mb-12 flex h-full items-center flex-col md:flex-row">
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Save Version (Commit System){" "}
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Keep track of your document’s progress with version saving.
                  When you’re satisfied with a section, save it as a “commit” so
                  you can return to it anytime.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Finish editing a section of your document.</li>
                  <li>Click Commit Changes.</li>
                  <li>Add a Commit Title (e.g., Introduction Final Draft).</li>
                  <li>Click Commit.</li>
                  <li>
                    To restore, go to Older Versions, select the commit, and
                    click Restore.{" "}
                  </li>
                </ul>
              </div>
              <div className="flex-1/2 flex items-center justify-center h-full mt-12 md:mt-0 overflow-hidden md:rounded-2xl shadow-sm">
                <img
                  src={savedcommit}
                  className="h-full w-full object-cover  scale-102"
                />
              </div>
            </section>
            <section className="mb-12 flex h-full items-center flex-col-reverse md:flex-row">
              <div className="flex-1/2 flex items-center justify-center h-full mt-12 md:mt-0 overflow-hidden md:rounded-2xl shadow-sm">
                <img
                  src={latexmathsymbols}
                  className="w-full object-cover scale-102"
                />
              </div>
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Math Symbol Keyboard{" "}
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Insert mathematical symbols without memorizing LaTeX commands.
                  A dedicated keyboard helps you add everything from simple
                  arithmetic to advanced calculus.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Open the Math Symbol Keyboard tab.</li>
                  <li>
                    Click on the symbol, and it will automatically insert into
                    your document.
                  </li>
                  <li>
                    Categories: Arithmetic & Relations, Set Theory & Logic,
                    Greek Letters, Calculus Symbols, Arrows, Delimiters &
                    Brackets, Miscellaneous Symbols{" "}
                  </li>
                </ul>
              </div>
            </section>{" "}
            <section className="mb-12 flex h-full items-center flex-col md:flex-row">
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Quick PDF Review - Two Modes{" "}
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Get an instant look at how your LaTeX document will appear in
                  PDF format. Choose between two review modes depending on your
                  stage of writing.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-decimal  list-inside mt-2 text-lg text-gray-700">
                  <li>
                    Quick Preview: Shows a fast-rendered version to quickly
                    check formatting.
                  </li>
                  <li>
                    Final Output: Generates the polished version of your PDF for
                    submission or printing.
                  </li>
                </ul>{" "}
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Click on Preview PDF.</li>
                  <li>Quick Preview is auto selected</li>
                  <li>You can turn it of to see Final Output.</li>
                </ul>
              </div>
              <div className="flex-1/2 flex items-center justify-center h-full mt-12 md:mt-0 overflow-hidden md:rounded-2xl shadow-sm">
                <img
                  src={latexreviredf}
                  alt="latex Preview PDF"
                  className="h-full w-full object-cover scale-102 "
                />
              </div>
            </section>{" "}
            
            <section className="mb-12 flex h-full items-center flex-col-reverse md:flex-row">
              <div className="flex-1/2 flex items-center justify-center h-full mt-12 md:mt-0 overflow-hidden md:rounded-2xl shadow-sm ">
                <img
                  src={latexwritererrorassistant}
                  alt="latexwriter error assistant"
                  className="w-full object-cover scale-102"
                />
              </div>
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Error Assistance
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  No more confusing LaTeX errors. This feature explains error
                  messages in plain language and shows you how to fix them.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>
                    If an error occurs, it will be displayed in the PDF view.
                  </li>
                  <li>Click on Error Assistance.</li>
                  <li>
                    You’ll get a detailed explanation of the error and
                    instructions to fix it.
                  </li>
                </ul>
              </div>
            </section>{" "}
            <section className="mb-12 flex h-full items-center flex-col md:flex-row">
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  AI Seek (Ask Gemini)
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Stay focused on your writing without switching tabs. Ask
                  questions directly inside the editor—whether about LaTeX
                  commands, research formatting, or content suggestions.{" "}
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Go to the Ask Gemini tab.</li>
                  <li>
                    Type your question (e.g., “How do I add a bibliography in
                    LaTeX?”).
                  </li>
                  <li>Get instant answers tailored to your document. </li>
                </ul>
              </div>
              <div className="flex-1/2 flex items-center justify-center h-full mt-12 md:mt-0 overflow-hidden md:rounded-2xl shadow-sm">
                <img
                  src={latexwriteraskgemini}
                  className="h-full w-full object-cover scale-102 "
                />
              </div>
            </section>
            <section className="mb-12 flex h-full  flex-col-reverse md:flex-row">
              <div className="flex-1/2 mt-12 md:mt-0 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Uploading Files and Images
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Easily upload your research papers, LaTeX projects, or images
                  directly into the editor. This feature saves time by allowing
                  you to manage all files in one place instead of switching
                  between platforms.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Click the "Upload" button in the folder toolbar.</li>
                  <li>Select your file or image from your computer.</li>
                  <li>
                    The uploaded file will appear in your workspace, ready to
                    edit or reference.
                  </li>
                </ul>
              </div>
              <div className="flex-1/2  md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Auto-Save Files{" "}
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Never worry about losing your work again. The system
                  automatically saves every change you make, ensuring that your
                  research and writing progress is always secure.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Simply start typing or editing.</li>
                  <li>
                    Every few seconds, your changes are saved in the background.
                  </li>
                </ul>
              </div>
            </section>{" "}
            <section className="mb-12 flex h-full  flex-col-reverse md:flex-row">
              <div className="flex-1/2 mt-12 md:mt-0 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">
                  Math Mode Made Easy
                </h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  Simplify writing mathematical equations by inserting
                  ready-made LaTeX commands with one click.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  Available Options:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Inline Math and Display Math</li>
                  <li>Fractions and Square Roots</li>
                  <li>Summations, Integrals, and Limits</li>
                  <li>Partial Derivatives</li>
                  <li>Binomial Coefficients</li>
                  <li>Vectors</li>
                </ul>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Click on Math Mode.</li>
                  <li>
                    Choose the desired mathematical structure (e.g., Fraction).
                  </li>
                  <li>
                    It will auto-insert the LaTeX code into your document.
                  </li>
                </ul>
              </div>
              <div className="flex-1/2 md:p-8 text-justify">
                <h3 className="text-3xl font-bold uppercase">Smart Toolbar</h3>
                <p className="mt-4 text-lg text-gray-700 ">
                  The smart toolbar is your one-click solution to formatting,
                  structuring, and organizing content.
                </p>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  Features in One Click:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Text formatting: Bold, Italic, Typewriter</li>
                  <li>
                    Add structure: Section, Chapter, Subsection, Paragraph
                  </li>
                  <li>Insert: Citations, Cross-references, Links</li>
                  <li>Align text with a single click</li>
                  <li>Create ordered and unordered lists instantly</li>
                </ul>
                <p className="mt-4 text-lg text-gray-700 font-bold">
                  How to Use:
                </p>
                <ul className="list-disc list-inside mt-2 text-lg text-gray-700">
                  <li>Select the text or position where you want changes.</li>
                  <li>Click the desired button in the Smart Toolbar.</li>
                  <li>The change is applied instantly.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
