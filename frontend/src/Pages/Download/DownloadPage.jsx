import { Download, Check, Code, FileText, Zap, Shield, Users, Star } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 text-black">
 Get a month free trial            </h2>
            <p className="text-2xl text-gray-700 mb-4">
                           Then just $19 per month

            </p>
            <p className="text-lg text-gray-600 mb-12">
              Download Now
            </p>

            {/* Download Button */}
            <div className="mb-16">
              <button className="inline-flex items-center justify-center px-12 py-4 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <Download className="w-6 h-6 mr-3" />
                Download for Windows
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Compatible with Windows 10/11 • 64-bit • 125 MB download
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-gray-50 border border-gray-200 rounded p-6 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-black">Advanced Editor</h3>
                <p className="text-gray-600">
                  Syntax highlighting, auto-completion, and real-time PDF preview for seamless LaTeX editing.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-6 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-black">Lightning Fast</h3>
                <p className="text-gray-600">
                  Optimized compilation engine that processes your documents in seconds, not minutes.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-6 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-black">Secure & Private</h3>
                <p className="text-gray-600">
                  Your documents are encrypted and stored locally. We never access your content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 text-black">What's Included</h3>
            <p className="text-gray-600">Everything you need for professional LaTeX editing</p>
          </div>

          <div className="bg-white border border-gray-200 rounded p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-medium mb-6 text-blue-500">Free Trial (30 days)</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Full access to all features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited documents</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Real-time collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Premium templates</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-6 text-black">Pro Subscription ($19/month)</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Priority customer support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Advanced export options</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Cloud sync & backup</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Regular feature updates</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Cancel anytime • No long-term commitment</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>50k+ users</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-blue-500" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}