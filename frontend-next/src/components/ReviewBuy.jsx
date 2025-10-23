"use client";
import api from "@/lib/api";

export default async function ReviewBuy() {
  try {
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
}
