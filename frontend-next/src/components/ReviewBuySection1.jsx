"use client";

import { Check, Star, Crown } from "lucide-react";
import ReviewBuy from "./ReviewBuy";
export default function ReviewBuySection1() {
  return (
    <div className=" text-black flex flex-col items-center  mt-24">
      {/* Final CTA */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Start Improving Your Documents
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Purchase your 10 AI reviews now and enhance your documents
            instantly.
          </p>

          <button
            onClick={ReviewBuy}
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg mb-6"
          >
            <Crown className="w-6 h-6 mr-3" />
            Buy 10 Reviews for ₹4999
          </button>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-1" />
              <span>365-day validity</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-1" />
              <span>Use anytime</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-blue-600 mr-1" />
              <span>AI-powered feedback</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
