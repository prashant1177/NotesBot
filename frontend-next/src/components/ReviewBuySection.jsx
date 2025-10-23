import { Check, Zap, Users, Star, Clock, Shield, Crown } from "lucide-react";

export default function ReviewBuySection() {
  return (
    <div className="bg-white text-black flex flex-col items-center">
      {/* Features Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Review?</h2>
            <p className="text-xl text-gray-600">
              Get accurate, fast, and professional feedback on your documents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Detailed Reviews */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Detailed Reviews in Seconds
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Receive fast, in-depth analysis of your documents with actionable insights within seconds.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    Complete feedback on writing quality
                  </span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Suggestions for improvement</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">
                    Covers grammar, style, and clarity
                  </span>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-300 transition-all duration-200 shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Analyze Everything
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Our AI scans your content against millions of research papers, articles, and online sources to give you a comprehensive evaluation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Structure and organization analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Content originality and research coverage</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Context-aware recommendations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Features (keep same) */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Your documents are fully encrypted and deleted after 30 days.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Fast Turnaround</h4>
              <p className="text-gray-600 text-sm">
                Get meaningful AI feedback in minutes, not hours.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-3">User-Friendly</h4>
              <p className="text-gray-600 text-sm">
                Simple interface to upload, review, and track all your AI feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
