import api from "../../api";
import loadRazorpayScript from "./loadRazorpayScript"; // your script loader

export default function PremiumIndex() {
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
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      {/* Soft blurred decorative background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-200 opacity-30 blur-3xl transform rotate-12" />
        <div className="absolute right-[-8%] bottom-[-12%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-300 opacity-25 blur-2xl transform -rotate-6" />
      </div>

      {/* Glass card with slight backdrop blur — Overleaf-esque minimal UI */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl shadow-2xl p-12 flex flex-col items-center text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Premium</h1>
            <p className="mt-2 text-gray-600">
              Unlock advanced features and collaborate without limits.
            </p>
            <p className="mt-1 text-lg font-medium text-gray-700">
              Pricing at{" "}
              <span className="text-purple-600 font-semibold">$9/Month</span>{" "}
              only
            </p>
          </div>

          {/* Premium features list */}
          <ul className="text-left text-gray-700 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> AI Integration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Save 10x Commits /
              Version
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Create Multiple Projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Simplifies Math
              Keyboard
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Auto Compile
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Compile Templates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Faster cloud
              compilation
            </li>
          </ul>

          {/* Center button */}
          <button
            className="relative inline-flex items-center justify-center px-10 py-3 rounded-full font-medium text-white shadow-lg
bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-transform duration-150"
            aria-label="Upgrade to Premium"
            onClick={handleUpgrade}
          >
            Upgrade Now
          </button>

          <p className="mt-5 text-sm text-gray-500">
            One-click upgrade · Secure payment · Cancel anytime
          </p>
        </div>

        {/* Subtle footer note */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Designed for you — private preview
        </div>
      </div>

      {/* Dim, slightly blurred full-screen overlay to emphasize the card */}
      <div className="pointer-events-none absolute inset-0 bg-black/4 backdrop-blur-sm -z-20" />
    </div>
  );
}
