"use client";
import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import Badge from "@/ui/Badge/Badge";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewLoader from "@/components/ReviewLoader";

export default function PDFReviewPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [response, setResponse] = useState(null);
  const [stats, setStats] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAnalyzing(true);
      setPdfFile(file);
      const formData = new FormData();
      formData.append("pdf", file);
      // Send the FormData directly
      const res = await api.post("/analyze/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const cleanResponse = res.data.response
        .replace(/```html|```/g, "")
        .trim();

      setStats(res.data.stats);
      setResponse(cleanResponse);
      setAnalyzing(false);
    }
  };

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="min-h-screen w-full grid lg:grid-cols-3">
        <div
          className={`${
            pdfFile && !analyzing ? "lg:col-span-2" : "lg:col-span-3"
          } w-full mx-auto`}
        >
          {/* Header */}
          <div className="my-8 text-center">
            <Badge variant="outline" className="mb-4">
              AI Peer Review
            </Badge>
            <h2 className="text-5xl lg:text-6xl  mb-4 text-black">
              Get Your Document Review
            </h2>
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
              {pdfFile && !analyzing ? (
                <div className="">
                  <div className="grid grid-cols-4 gap-4">
                    {/* Word Count */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
                      <p className="text-gray-600 text-sm mb-1">Word Count</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats.totalWords.toLocaleString()}
                      </p>
                    </div>

                    {/* Reading Time */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
                      <p className="text-gray-600 text-sm mb-1">Reading Time</p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.readingTimeMinutes}{" "}
                        <span className="text-lg text-gray-500">min</span>
                      </p>
                    </div>

                    {/* Reading Ease */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
                      <p className="text-gray-600 text-sm mb-2">Reading Ease</p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              stats.fleschReadingEase >= 60
                                ? "bg-green-500"
                                : stats.fleschReadingEase >= 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                stats.fleschReadingEase,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          {stats.fleschReadingEase}/100
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        {stats.fleschReadingEase >= 90
                          ? "Very Easy"
                          : stats.fleschReadingEase >= 80
                          ? "Easy"
                          : stats.fleschReadingEase >= 70
                          ? "Fairly Easy"
                          : stats.fleschReadingEase >= 60
                          ? "Standard"
                          : stats.fleschReadingEase >= 50
                          ? "Fairly Difficult"
                          : stats.fleschReadingEase >= 30
                          ? "Difficult"
                          : "Very Difficult"}
                      </p>
                    </div>

                    {/* Grade Level */}
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm w-full h-full">
                      <p className="text-gray-600 text-sm mb-2">Grade Level</p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                (stats.fleschKincaidGrade / 18) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {stats.fleschKincaidGrade}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        Grade {Math.round(stats.fleschKincaidGrade)} reading
                        level
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {/* Detailed Stats */}
                    <div className="pt-4 border-t-2 border-gray-200">
                      <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
                        DETAILED STATS
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pages</span>
                          <span className="font-semibold text-gray-900">
                            {stats.totalPages}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paragraphs</span>
                          <span className="font-semibold text-gray-900">
                            {stats.totalParagraphs}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sentences</span>
                          <span className="font-semibold text-gray-900">
                            {stats.totalSentences}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Avg. Words/Sentence
                          </span>
                          <span className="font-semibold text-gray-900">
                            {stats.avgWordsPerSentence}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Most Frequent Words */}
                    {stats.mostFrequentWords &&
                      stats.mostFrequentWords.length > 0 && (
                        <div className="pt-4 border-t-2 border-gray-200">
                          <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
                            TOP WORDS
                          </h3>
                          <div className="space-y-2">
                            {stats.mostFrequentWords
                              .slice(0, 5)
                              .map((word, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                                      style={{
                                        width: `${
                                          (word[1] /
                                            stats.mostFrequentWords[0][1]) *
                                          100
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-700 font-medium w-20 text-right">
                                    {word[0]} ({word[1]})
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ) : null}
              {/* Review Section */}
              {analyzing ? (
                <ReviewLoader />
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-black mb-4 mt-12">
                    Detailed Review
                  </h2>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: response }}
                  ></div>
                </>
              )}
            </div>
          )}
        </div>
        {pdfFile&& !analyzing && (
          <div className=" lg:col-span-1  sticky top-16 h-full p-8">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-2823773486701492"
              data-ad-slot="1578889750"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <Link href={`/`}>
              <img
                src="/latexwriter-adl.gif"
                alt="LaTeXWriter Ad"
                className="w-full mt-6 mb-6 sm:mt-0 rounded-2xl sm:shadow-lg/10 sm:hover:shadow-lg/30 shadow-blue-600 transition-all duration-500"
              />
            </Link>
          </div>
        )}
      </div>
      <FAQAccordion />
    </div>
  );
}
