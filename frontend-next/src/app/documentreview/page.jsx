"use client";
import React, { useEffect, useState } from "react";
import { Upload, FileText } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import Badge from "@/ui/Badge/Badge";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewLoader from "@/components/ReviewLoader";
import { useRouter } from "next/navigation";
import ReviewBuySection from "@/components/ReviewBuySection";
import ReviewBuySection1 from "@/components/ReviewBuySection1";
import ShowReviewStats from "./components/ShowReviewStats";
import ReviewHistory from "./components/ReviewHistory";

export default function PDFReviewPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [response, setResponse] = useState(null);
  const [stats, setStats] = useState(null);
  const [showMoney, setShowMoney] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!localStorage.getItem("token")) {
        return;
      }
      const res = await api.get("/user");
      const reviews = await api.get("/reviewHistory");
      if (res.data.user?.reviewsAvailable > 0) {
        setShowMoney(false);
      }
      if (reviews.data.reviews) {
        setReviews(reviews.data.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileUpload = async (e) => {
    if (!localStorage.getItem("token")) {
      router.push("/user/login");
      return;
    }
    try {
      const file = e.target.files[0];
      if (file && file.type === "application/pdf") {
        setAnalyzing(true);
        setPdfFile(file.name);
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
      }
    } catch (error) {
      console.log(error);
      setPdfFile(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleShowHistory = (freview = false) => {
    if (freview) {
      setAnalyzing(true);
      setPdfFile(freview.title);
      setStats(freview.stats);
      const cleanResponse = freview.content.replace(/```html|```/g, "").trim();
      setResponse(cleanResponse);
    } else {
      setPdfFile(null);
      setStats(null);
      setResponse(null);
    }
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 -z-10"></div>
      <div className="fixed bottom-0 md:bottom-8  flex md:gap-4 z-10 w-full max-w-7xl justify-end">
        {pdfFile && !analyzing && (
          <button
            onClick={() => handleShowHistory()}
            className={` bg-gray-900 text-white w-full md:w-24 p-4 md:aspect-square md:rounded-full flex items-center justify-center border border-gray-100 cursor-pointer transition-all `}
          >
            New
          </button>
        )}
        <button
          onClick={() => setShowReviews(!showReviews)}
          className={` ${
            showReviews ? "bg-gray-900" : " bg-gray-950" 
          } text-white w-full md:w-24 p-4 md:aspect-square md:rounded-full flex items-center justify-center border border-gray-100 cursor-pointer transition-all `}
        >
          History
        </button>
      </div>
      <div className="w-full grid lg:grid-cols-3 gap-4 h-full  px-4">
        <div
          className={`${
            pdfFile && !analyzing ? "lg:col-span-2" : "lg:col-span-3"
          } w-full mx-auto`}
        >
          {!response && (
            <div className="my-8 text-center">
              <Badge variant="outline" className="mb-4">
                AI Peer Review
              </Badge>
              <h2 className="text-5xl lg:text-6xl  mb-4 text-black">
                Get Your Document Reviewed
              </h2>
            </div>
          )}

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
              {analyzing ? (
                <ReviewLoader />
              ) : (
                <>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: response }}
                  ></div>
                </>
              )}
            </div>
          )}
        </div>
       <div className="lg:sticky lg:top-16 block h-fit w-full bg-white"> {pdfFile && !analyzing ? <ShowReviewStats stats={stats} /> : null}</div>
      </div>
      {showReviews && (
        <ReviewHistory
          reviews={reviews}
          handleShowHistory={handleShowHistory}
        />
      )}
      {showMoney && (
        <>
          <ReviewBuySection />
          <ReviewBuySection1 />
        </>
      )}
      <FAQAccordion />
    </div>
  );
}
