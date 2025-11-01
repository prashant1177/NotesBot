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

  const handleShowHistory = (freview) => {
      alert("hello")
    if (freview) {
      setAnalyzing(true);
      setPdfFile(freview.title);
      setStats(freview.stats);
      setResponse(freview.content);
    } else {
      setPdfFile(null);
      setStats(null);
      setResponse(null);
    }
    setAnalyzing(false);
  };

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="fixed bottom-8 right-24 flex gap-4">
        {pdfFile && !analyzing && (
          <button
            onClick={() => handleShowHistory(null)}
            className={`z-10 ${
              showReviews ? "bg-gray-900 text-white" : " bg-white"
            } w-24 p-4 aspect-square rounded-full flex items-center justify-center border border-gray-100 cursor-pointer transition-all `}
          >
            New
          </button>
        )}
        <button
          onClick={() => setShowReviews(!showReviews)}
          className={` ${
            showReviews ? "bg-gray-900 text-white" : " bg-white"
          } w-24 p-4 aspect-square rounded-full flex items-center justify-center border border-gray-100 cursor-pointer transition-all `}
        >
          History
        </button>
      </div>
      <div className="w-full grid lg:grid-cols-3">
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
                  <p className="font-semibold text-black">{pdfFile}</p>
                </div>
                <button
                  onClick={() => setPdfFile(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Remove
                </button>
              </div>
              {pdfFile && !analyzing ? <ShowReviewStats stats={stats} /> : null}
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
        {pdfFile && !analyzing && (
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
