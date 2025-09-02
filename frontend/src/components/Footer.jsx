export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        {/* Left Side */}
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} LaTeX Writer. All rights reserved.
        </p>

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
