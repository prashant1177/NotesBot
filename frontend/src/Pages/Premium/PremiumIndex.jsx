
export default function PremiumIndex({handleUpgrade}) {
 
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
    

      {/* Glass card with slight backdrop blur — Overleaf-esque minimal UI */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-12 flex flex-col items-center text-center">
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
              <span className="text-purple-600">✔</span>Get AI Assitance
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span>Debug Error With AI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Save 50 Commits /
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
              <span className="text-purple-600">✔</span> Compile Templates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✔</span> Faster cloud
              compilation
            </li>
          </ul>

          {/* Center button */}
          <button
            className="relative inline-flex items-center justify-center px-10 py-3 rounded-full font-medium text-white 
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
