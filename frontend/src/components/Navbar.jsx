import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           <div className="flex items-center space-x-2">
            <span className="text-xl font-medium bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              NotesBot.ai
            </span>
          </div>
          <div className="flex space-x-4">
            <ul className="text-lg flex flex-col items-center font-medium mt-4 rounded-lg bg-white/10 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                href="/#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  
                >
                  Features 
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/prashant1177/NotesBot"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  Github 
                </a>
              </li>

              {/* Login/Logout Button */}
            </ul>
          </div>
          <div>
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="inline-flex text-white bg-red-600 border-0 py-2 px-3 focus:outline-none hover:bg-red-500 rounded-lg text-lg shadow-md"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                <button className="text-white hover:bg-gray-500/10 py-2 px-4 rounded-md">
                  Sign in
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-background font-medium py-2 px-4 rounded-md">
                  Get Started
                </button>
              </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
