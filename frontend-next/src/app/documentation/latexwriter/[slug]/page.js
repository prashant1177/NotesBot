import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import faqData from "../LatexWriterFAQ.js";

// Generate static paths for all FAQ categories
export async function generateStaticParams() {
  return faqData.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = faqData.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} - LaTeXWriter Documentation`,
    description: category.content,
    openGraph: {
      title: `${category.title} - LaTeXWriter`,
      description: category.content,
    },
  };
}

const LatexWriterDocumentationPageView = ({ params }) => {
  const { slug } = params;
  const selectedCategory = faqData.find((category) => category.slug === slug);

  // Handle 404 if category not found
  if (!selectedCategory) {
    notFound();
  }

  const IconComponent = selectedCategory.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/documentation/latexwriter"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to all categories
          </Link>

          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border-slate-300 mr-3">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory.title}
              </h1>
              <p className="text-gray-600 mt-1">{selectedCategory.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions - Fully expanded for SEO */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {selectedCategory.questions?.map((qa, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-blue-100 hover:bg-blue-50 transition-all ease-in-out"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900">
                  {qa.question}
                </h2>
              </div>
              <div
                className="px-6 py-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: qa.answer }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contact support section */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Still need help?
          </h3>
          <p className="text-blue-700 mb-4">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatexWriterDocumentationPageView;