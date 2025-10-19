"use client";
import React, { useState } from "react";
import { Upload, FileText, BarChart3 } from "lucide-react";
import api from "@/lib/api";

export default function PDFReviewPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAnalyzing(true);
      const formData = new FormData();
      formData.append("pdf", file);
      // Send the FormData directly
      const res = await api.post("/analyze/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPdfFile(file);
      setAnalyzing(false);
    }
  };

  // Mock data for demonstration
  const mockReview = {
    summary:
      "This document presents a comprehensive analysis of modern technological trends. The writing is clear and well-structured, making complex concepts accessible to a broad audience. The author effectively uses examples to illustrate key points and maintains a logical flow throughout.",
    strengths: [
      "Clear and concise writing style",
      "Well-organized structure with logical progression",
      "Effective use of examples and case studies",
      "Balanced perspective on controversial topics",
    ],
    improvements: [
      "Could benefit from more recent data sources",
      "Some sections could be more concise",
      "Additional visual aids would enhance understanding",
    ],
    wordCount: 3247,
    readingLevel: "College Level (Grade 13-16)",
    readingTime: "13 minutes",
    complexity: 7.5,
  };

  return (
    <div className="min-h-screen bg-white flex max-w-7xl  mx-auto">
      {/* Main Content - 70% */}
      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">
              PDF Review Assistant
            </h1>
            <p className="text-gray-600">
              Upload your PDF document for instant AI-powered analysis
            </p>
          </div>

          {/* Upload Area */}
          {!pdfFile ? (
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-all">
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-semibold text-black mb-2">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF files up to 10MB
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </label>
          ) : (
            <div>
              {/* File Info */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-100 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-black">{pdfFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(pdfFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={() => setPdfFile(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Remove
                </button>
              </div>

              {/* Review Section */}
              {analyzing ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Analyzing your document...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-4">
                      AI Review
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {mockReview.summary}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {mockReview.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">✓</span>
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {mockReview.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">→</span>
                          <span className="text-gray-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - 30% */}
      <div className="w-80 bg-black text-white p-8">
        <div className="flex items-center gap-2 mb-8">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold">Document Analytics</h2>
        </div>

        {pdfFile && !analyzing ? (
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm mb-1">Word Count</p>
              <p className="text-3xl font-bold text-blue-500">
                {mockReview.wordCount.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm mb-1">Reading Level</p>
              <p className="text-lg font-semibold">{mockReview.readingLevel}</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm mb-1">Reading Time</p>
              <p className="text-lg font-semibold">{mockReview.readingTime}</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Complexity Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${mockReview.complexity * 10}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-blue-500">
                  {mockReview.complexity}/10
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h3 className="font-semibold mb-3 text-sm text-gray-400">
                QUICK STATS
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pages</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paragraphs</span>
                  <span className="font-medium">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Words/Sentence</span>
                  <span className="font-medium">18.3</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 text-sm">
              Upload a PDF to view analytics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
