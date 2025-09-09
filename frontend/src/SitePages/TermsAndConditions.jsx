import React from "react";
import { Asterisk } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center mt-4 md:p-6">
        <div className="max-w-4xl w-full md:p-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Asterisk className="hidden md:inline-block w-12 h-12 text-gray-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-lg text-gray-600">Last Updated: September 7, 2025</p>
            <div className="w-24 h-1 bg-gray-300 mx-auto mt-4"></div>
          </div>

          <section className="p-4">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to LatexWriter.com. By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Use of the Service</h2>
            <p className="text-gray-700 mb-4">
              You may use LatexWriter for lawful purposes only. You agree not to use the service in any way that could harm the website, its users, or violate any applicable laws.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              Some features may require creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content, features, and functionality on LatexWriter are the exclusive property of LatexWriter.com or its licensors and are protected by intellectual property laws. You may not copy, reproduce, or distribute content without permission.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your use of LatexWriter is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              LatexWriter is provided “as is” and without warranties of any kind, either express or implied. We do not guarantee the accuracy, reliability, or availability of the service at all times.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, LatexWriter.com shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the service.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the service constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms and Conditions, please contact us at{" "}
              <a href="mailto:support@latexwriter.com" className="text-blue-600 underline">
                support@latexwriter.com
              </a>
              .
            </p>

          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
