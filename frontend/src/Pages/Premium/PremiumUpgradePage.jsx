import { Check, Zap, Users, Star, Clock, Shield, Crown } from "lucide-react";
import { useState } from "react";

export default function PremiumUpgradePage({ handleUpgrade }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black relative flex items-center flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-8">
              <Crown className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">
                Limited Time Offer
              </span>
            </div>

            <h1 className="text-6xl font-bold mb-6 text-black">
              Upgrade to Premium
            </h1>

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl text-gray-500 line-through mr-4">
                  $19
                </span>
                <span className="text-6xl font-bold text-blue-600">$9</span>
                <span className="text-2xl text-gray-700 ml-2">/month</span>
              </div>
              <p className="text-xl text-gray-600 mb-2">
                Save 53% only for you still Jan 1, 2026
              </p>
              <p className="text-lg text-gray-500">
                Then $19/month • Cancel anytime
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-16">
              <button
                onClick={handleUpgrade}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <Crown className="w-6 h-6 mr-3" />
                Upgrade Now
              </button>
              <p className="text-sm text-gray-500 mt-4">
                30-day money-back guarantee • Secure payment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Why Upgrade to Premium?
            </h2>
            <p className="text-xl text-gray-600">
              Unlock lightning-fast compilation and seamless collaboration
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Lightning Fast Compilation */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Lightning Fast Compilation
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Experience blazing-fast document compilation with our premium
                servers. Compile complex documents in under 3 seconds instead of
                waiting minutes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    10x faster than standard compilation
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Priority server access</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    Advanced caching technology
                  </span>
                </div>
              </div>
            </div>

            {/* Collaboration */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Work together with your team in real-time. See changes
                instantly, leave comments, and collaborate seamlessly on any
                document.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Live cursor tracking</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Comment & review system</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    Share with unlimited users
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-black">
                Advanced Security
              </h4>
              <p className="text-gray-600 text-sm">
                Enterprise-grade encryption and secure cloud backup for all your
                documents.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-black">
                Version History
              </h4>
              <p className="text-gray-600 text-sm">
                Never lose your work with unlimited version history and
                one-click restore.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-black">
                Simple Math Keyboard
              </h4>
              <p className="text-gray-600 text-sm">
                Type math equations quickly with an intuitive on-screen keyboard
                designed for symbols and formulas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4 text-black">
            Join 50,000+ Premium Users
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Start your premium experience today with our limited-time offer
          </p>

          <button
            onClick={handleUpgrade}
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg mb-6"
          >
            <Crown className="w-6 h-6 mr-3" />
            Get Premium for $9/month
          </button>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-1" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-1" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-blue-600 mr-1" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
