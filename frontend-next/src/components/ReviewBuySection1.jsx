"use client";

import { Check, Star, Crown } from "lucide-react";
import loadRazorpayScript from "@/app/user/premium/loadRazorpayScript";
import api from "@/lib/api";

export default function ReviewBuySection1() {
  const ReviewBuy = async () => {
    try {
      // 1️⃣ Load Razorpay Checkout script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create order
      const { data: order } = await api.post("/api/create-order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "AI Paper Review",
        description: "10 AI Reviews for one year",
        order_id: order.id,
        handler: async function (response) {
          try {
            const { data: result } = await api.post("/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert(result.message);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed. Try again.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to create order. Try again.");
    }
  };

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
