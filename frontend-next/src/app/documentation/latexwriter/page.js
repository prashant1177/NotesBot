import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import faqData from "./LatexWriterFAQ.js";

export const metadata = {
  title: "LaTeXWriter Documentation - FAQ & Help Center",
  description:
    "Browse comprehensive LaTeXWriter documentation, FAQs, and guides to help you get the most out of your LaTeX editor.",
  openGraph: {
    title: "LaTeXWriter Documentation",
    description: "Comprehensive FAQ and documentation for LaTeXWriter",
  },
  alternates: {
    canonical: "https://latexwriter.com/documentation/latexwriter",
  },
};

const LatexWriter = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            LaTeXWriter Documentation
          </h1>
          <p className="text-gray-600">
            Browse our comprehensive documentation and FAQ categories below.
          </p>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqData.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/documentation/latexwriter/${category.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border-slate-300 mr-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium border bg-slate-100 text-slate-800 border-slate-300">
                      {category.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.questions?.length || 0} questions
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatexWriter;
