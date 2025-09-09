import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import faqData from "./LatexWriterFAQ.js";
// FAQ data structure with tags

const LatexWriterDocumentationPageView = () => {
  const { slug } = useParams();
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const selectedCategory = faqData.find((category) => category.slug === slug);

  // Toggle question expansion
  const toggleQuestion = (questionIndex) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  // Render selected category questions
  const IconComponent = selectedCategory.icon;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            to={`/documentation/latexwriter`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to all categories
          </Link>

          <div className="flex items-center mb-4">
            <div
              className={`p-2 rounded-lg bg-slate-100 text-slate-800 border-slate-300 mr-3`}
            >
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

      {/* Questions */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {selectedCategory.questions?.map((qa, index) => {
            const isExpanded = expandedQuestions[index];
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {qa.question}
                  </h3>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div
                    className="px-6 py-4 border-t border-gray-100 text-gray-800"
                    dangerouslySetInnerHTML={{ __html: qa.answer }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact support section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Still need help?
          </h3>
          <p className="text-blue-700 mb-4">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <Link
            to={`/contact`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatexWriterDocumentationPageView;
