import PremiumUpgradePage from "./PremiumUpgradePage";
import api from "../../api";
import loadRazorpayScript from "./loadRazorpayScript"; // your script loader

export default function PremiumPage() {
   const handleUpgrade = async () => {
  // 1️⃣ Load Razorpay Checkout script
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    // 2️⃣ Call backend to create subscription (api version)
    const subscriptionRes = await api.post("/api/payment/create-subscription", {
      planId: "plan_monthly_premium",
    });

    const data = subscriptionRes.data;

    if (!data.subscriptionId) {
      alert("Failed to create subscription. Try again.");
      return;
    }

    // 3️⃣ Configure Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // use frontend key
      subscription_id: data.subscriptionId,
      name: "Latex Writer Premium",
      description: "Monthly subscription",
      handler: async function (response) {
        try {
          // 4️⃣ Send payment verification to backend (api version)
          const verifyRes = await api.post("/api/payment/verify", response);
          const verifyData = verifyRes.data;

          if (verifyData.success) {
            alert("Payment successful! Premium activated.");
            // Optionally, fetch user profile again to update frontend state
          } else {
            alert("Payment verification failed. Try again.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          alert("Something went wrong during verification.");
        }
      },
      prefill: {},
      theme: { color: "#6B46C1" },
      modal: { confirm_close: true }, // optional: ask before closing
    };

    // 5️⃣ Open Razorpay Checkout modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Subscription creation error:", error);
    alert("Could not create subscription. Try again.");
  }
};
  return (
    <div className="min-h-screen">
      <PremiumUpgradePage handleUpgrade={handleUpgrade}/>
    </div>
  );
}
