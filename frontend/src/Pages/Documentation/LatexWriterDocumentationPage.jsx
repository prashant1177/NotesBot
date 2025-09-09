import React, { useState, useMemo } from "react";
import { ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import faqData from "./LatexWriterFAQ.js";

// FAQ data structure with tags
const LatexWriterDocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
  if (!searchTerm.trim()) return faqData;

  return faqData.filter((category) => {
    const searchLower = searchTerm.toLowerCase();

    const inQuestions = category.questions?.some((q) => {
      if (typeof q === "string") {
        return q.toLowerCase().includes(searchLower);
      } else if (q?.question) {
        return q.question.toLowerCase().includes(searchLower);
      }
      return false;
    });

    return (
      category.title.toLowerCase().includes(searchLower) ||
      category.tag.toLowerCase().includes(searchLower) ||
      category.content.toLowerCase().includes(searchLower) ||
      inQuestions
    );
  });
}, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            LaTeXWriter Documentation
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQ categories and questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300"
              >
                <Link to={`/documentation/latexwriter/${category.slug}`}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-2 rounded-lg bg-slate-100 text-slate-800 border-slate-300 mr-3`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border bg-slate-100 text-slate-800 border-slate-300`}
                      >
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
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No FAQ categories found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatexWriterDocumentationPage;
