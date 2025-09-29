// app/documentation/latex/[slug]/page.js
import { sampleDocumentation } from "@/lib/sampleDocumentation-data";
import Link from "next/link";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return sampleDocumentation.map((doc) => ({
    slug: doc.id.toString(), // or doc.slug if you have it
  }));
}

export const metadata = {
  title: "LaTeX Documentation - LaTeXWriter",
  description: "Complete guide to LaTeX syntax and commands",
};

export default function LatexDocPage({ params }) {
  const { slug } = params;
  const currentIndex = sampleDocumentation.findIndex((d) => d.id.toString() === slug);
  const currentDoc = sampleDocumentation[currentIndex];
  const prevDoc = currentIndex > 0 ? sampleDocumentation[currentIndex - 1] : null;
  const nextDoc = currentIndex < sampleDocumentation.length - 1 ? sampleDocumentation[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
          <nav className="flex flex-col gap-2">
            {sampleDocumentation.map((doc) => (
              <Link
                key={doc.id}
                href={`/documentation/latex/${doc.id}`}
                className={`text-left p-2 rounded-lg transition-colors ${
                  doc.id === currentDoc.id
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {doc.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">{currentDoc.title}</h1>
            </div>
            <p className="text-gray-700 mb-6">{currentDoc.content}</p>

            {currentDoc.sections?.map((section, index) => (
              <div key={index} className="mb-6 border-l-4 border-blue-500 pl-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.subheading}</h2>
                <p className="text-gray-700 mb-3">{section.paragraph}</p>
              </div>
            ))}

            {/* Prev/Next Navigation */}
            <div className="flex justify-between mt-8">
              {prevDoc && (
                <Link
                  href={`/documentation/latex/${prevDoc.id}`}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  {prevDoc.title}
                </Link>
              )}
              {nextDoc && (
                <Link
                  href={`/documentation/latex/${nextDoc.id}`}
                  className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 transition-colors"
                >
                  {nextDoc.title}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
