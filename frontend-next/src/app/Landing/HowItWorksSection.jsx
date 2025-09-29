import { Code2, FileText, Download } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            How it Works
          </h2>
          <p className="text-lg text-gray-800 max-w-md">
            This is how it works — from writing LaTeX code to generating
            beautiful, ready-to-download PDFs.
          </p>
        </div>

        {/* Right Side - Steps */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-chart-1/10 text-chart-1">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Write LaTeX Code</h3>
              <p className="text-sm text-gray-800">
                Use the editor with smart syntax highlighting and easy toolbars
                for equations and formatting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-chart-2/10 text-chart-2">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Compile PDF</h3>
              <p className="text-sm text-gray-800">
                Instantly compile your LaTeX document into a high-quality PDF
                with lightning speed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-chart-3/10 text-chart-3">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Ready to Download</h3>
              <p className="text-sm text-gray-800">
                Your final PDF is ready to download, share, or publish — anytime
                and anywhere.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
