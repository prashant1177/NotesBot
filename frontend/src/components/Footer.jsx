import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        {/* Left Side */}
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} LaTeX Writer. All rights reserved.
          </p>
          <Link to={"/TermsAndConditions"} className="underline">Terms & Conditions</Link>
          <Link to={"/PrivacyPolicy"} className="underline">Privacy Policy</Link>
          <Link to={"/contact"} className="underline">Contact us</Link>
        </div>

        {/* Right Side */}
        <p>
          Created by{" "}
          <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Prashant Patil
          </span>
        </p>
      </div>
    </footer>
  );
}
