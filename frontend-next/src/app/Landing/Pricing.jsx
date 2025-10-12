import Badge from "@/ui/Badge/Badge";

export default function Pricing() {
  return (
    <section className="w-full  pt-16 ">
      <div className="w-full sm:max-w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Badge variant="outline" className="mb-4">
            Know LaTeXWriter
          </Badge>
          <h2 className="text-5xl lg:text-6xl  mb-4 text-black">
            Why Upgrade to LaTeXWriter?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 mb-16 ">
          <div className="blocksnone">
            <img
              src="/EDITORINTERFACE.webp"
              className="rounded  object-cover mb-6 heroImg shadow-lg"
              alt="Latex Writer Lightning Fast Compilation"
            />
            <h6 className="text-3xl mb-4 text-black">
              Lightning Fast Compilation
            </h6>{" "}
            <p className="text-gray-600 text-lg text-justify">
              Experience blazing-fast document compilation with our offline
              compilation. Compile complex documents in under a second instead
              of waiting minutes.
            </p>
          </div>
          <div className="blocksnone">
            <img
              src="/Collab.webp"
              className="rounded  object-cover mb-6 heroImg shadow-lg"
              alt="Latex Writer - Showing two screen with different cursors"
            />
            <h6 className="text-3xl mb-4 text-black">
              Real-time Collaboration
            </h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Work together with your team in real-time. See changes instantly,
              leave comments, and collaborate seamlessly on any document.
            </p>
          </div>
          <div className="blocksnone">
            <div>
            <img
              src="/version1.webp"
              className="rounded  object-cover mb-6 heroImg "
              alt="Latex Writer - Image showing version history with different versions of document"
            /></div>
            <h6 className="text-3xl  mb-4 text-black">Version History</h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Never lose your work with unlimited version history and one-click
              restore.
            </p>
          </div>
          <div className="blocksnone">
            <img
              src="/math.webp"
              className="rounded  object-cover mb-6 heroImg"
              alt="Latex Writer - Image showing on screen math keyboard with various math symbols"
            />
            <h6 className="text-3xl  mb-4 text-black">Simple Math Keyboard</h6>
            <p className="text-gray-600 mb-6 text-lg text-justify">
              Type math equations quickly with an intuitive on-screen keyboard
              designed for symbols and formulas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
