import React from 'react';
import { Shield, Mail, Lock, Eye, Users, FileText } from 'lucide-react';
import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Privacy Policy Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-gray-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600">Last Updated: September 5, 2025</p>
          <div className="w-24 h-1 bg-gray-300 mx-auto mt-4"></div>
        </div>

        {/* Introduction */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>Latexwriter</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Eye className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">1. Information We Collect</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700">
                When you sign up, we may collect your name, email address, and account details.
              </p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Data</h3>
              <p className="text-gray-700">
                We collect information on how you use our platform (e.g., pages visited, features used) to improve our services.
              </p>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Documents & Content</h3>
              <p className="text-gray-700">
                Any LaTeX documents you create or upload remain your property. We do not share or publish them without your consent.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">2. How We Use Your Information</h2>
          </div>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Provide and improve our LaTeX editing services.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Personalize your experience and suggest features.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Communicate with you about updates, support, or security notices.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Ensure platform security and prevent misuse.
            </li>
          </ul>
        </section>

        {/* Sharing of Information */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">3. Sharing of Information</h2>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              We <strong>do not sell or rent</strong> your personal information to third parties.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              We may share limited data with trusted service providers (such as cloud hosting or analytics tools) to run Latexwriter smoothly.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              We may disclose information if required by law or to protect the rights and safety of our users.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">4. Data Security</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We use encryption, secure servers, and other safeguards to protect your data. However, no online service can be completely secure, so we encourage you to use strong passwords and protect your account.
          </p>
        </section>

        {/* Cookies & Tracking */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Cookies & Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            Latexwriter may use cookies or similar technologies to improve site performance, remember your preferences, and analyze usage trends. You can manage cookies through your browser settings.
          </p>
        </section>

        {/* Your Rights */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">Depending on your location, you may have rights to:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Access, update, or delete your personal information.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Opt out of marketing emails.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Request a copy of your stored data.
            </li>
          </ul>
        </section>

        {/* Children's Privacy */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Latexwriter is not directed at children under 13 (or the minimum age in your country). We do not knowingly collect information from children.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section className="bg-gray-50 rounded-xl border p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new "Last Updated" date.
          </p>
        </section>

        {/* Contact Us */}
        <section className="bg-gray-50 rounded-xl border p-8">
          <div className="flex items-center mb-6">
            <Mail className="w-8 h-8 text-gray-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">9. Contact Us</h2>
          </div>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-600 mr-3" />
              <strong className="text-gray-900">support@latexwriter.com</strong>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default PrivacyPolicy;