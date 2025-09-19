import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";

export default function Navbar({ token }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-medium">LaTeXWriter</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className=" hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className=" hover:text-blue-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/Blog"
                  className=" hover:text-blue-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className=" hover:text-blue-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li className="relative group">
                <button className="flex items-center  hover:text-blue-500 transition-colors gap-1">
                  Documentation
                </button>

                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <Link
                    to="/documentation/latex"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Latex
                  </Link>
                  <Link
                    to="/documentation/latexwriter"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    LatexWriter
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <Link to="/user">
                <Button>Profile</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            )}
            <Link to="/download">
              <Button varient="transparent">Download</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className=" hover:text-blue-500 transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block  hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    className="block  hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/About"
                    className="block  hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Blog"
                    className="block  hover:text-blue-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <button className="flex items-center  hover:text-blue-500 transition-colors gap-1">
                    Documentation
                  </button>
                  <Link
                    to="/documentation/latex"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Latex
                  </Link>
                  <Link
                    to="/documentation/latexwriter"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LatexWriter
                  </Link>
                </li>
              </ul>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-border/20 space-y-3">
                {token ? (
                  <Link to="/user">
                    <Button  className="w-full">Profile</Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button  className="w-full">Sign up</Button>
                  </Link>
                )}
                <Link
                  to="/download"
                  className="block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button varient="transparent" className="w-full">
                    Download
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
