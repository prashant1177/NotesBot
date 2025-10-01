import { Check, Clock, Shield, Users, Zap,Star } from "lucide-react";

 
 export default function Pricing(){
  return(
 <section className="w-full  py-20 border-t-1 border-gray-900 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black blocksnone">
              Why Upgrade to LaTeXWriter?
            </h2>
            <p className="text-xl text-gray-600 blocksnone">
              Unlock lightning-fast compilation and seamless collaboration
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16 ">
            {/* Lightning Fast Compilation */}
            <div className="blocksnone bg-white border-2 border-blue-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg">
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
            <div className="blocksnone bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg ">
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
          <div className="grid md:grid-cols-3 gap-8 ">
            <div className="blocksnone bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
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

            <div className="blocksnone bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
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

            <div className="blocksnone bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
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
      )
 }