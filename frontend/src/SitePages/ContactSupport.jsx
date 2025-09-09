import React from "react";
import { Mail } from "lucide-react";

const ContactSupport = () => {
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center mt-4 md:p-6">
      <div className="max-w-4xl w-full md:p-10"><div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            
            <Mail className="hidden md:inline-block  w-12 h-12 text-gray-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact us</h1>
          </div>          <p className="text-lg text-gray-600">Last Updated: September 5, 2025</p>

          <div className="w-24 h-1 bg-gray-300 mx-auto mt-4"></div>
        </div>
        <section className="  p-4">
        <p className="text-lg text-gray-700 leading-relaxed">
          We’re here to help! Whether you have questions, need assistance, or want to report a bug, our support team is ready to assist you.
        </p>
</section>
        <section className="  p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
        <p className="text-gray-700 mb-2"><strong>Email Support:</strong></p>
        <p className="text-blue-600 underline mb-4">
          <a href="mailto:support@latexwriter.com">support@latexwriter.com</a>
        </p>
        <p className="text-gray-700 mb-6">We aim to respond to all queries within <strong>24–48 hours</strong>.</p>
</section>

        <section className="  p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What to Include in Your Email</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li><strong>Your Name and Email:</strong> So we can get back to you quickly.</li>
          <li><strong>Issue Description:</strong> A clear explanation of the problem or question.</li>
          <li><strong>Steps to Reproduce (if applicable):</strong> This helps us understand the issue better.</li>
          <li><strong>Screenshots or Files (if relevant):</strong> Visuals can speed up the troubleshooting process.</li>
        </ul>
</section>
        <section className="  p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li><strong>Account Issues:</strong> Login problems, password reset, or account updates.</li>
          <li><strong>Feature Support:</strong> Help with the math keyboard, LaTeX commands, or PDF export.</li>
          <li><strong>Bug Reports:</strong> Any unexpected behavior or errors while using the platform.</li>
        </ul>
</section>
        <section className="  p-4">
        <p className="text-gray-700 mb-2">
          <strong>Tip:</strong> Always make sure your email subject clearly states your issue, e.g., <em>“PDF Export Not Working on Chrome”</em>.
        </p>

        <p className="text-gray-700 font-semibold mt-6">
          We value your feedback and strive to make LatexWriter the easiest, most efficient LaTeX editor for everyone!
        </p>
        </section>
      </div>
    </div></div>
  );
};

export default ContactSupport;
