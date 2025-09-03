import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-medium">Writingpapers</span>
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
                  href="/#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                 Workflow
                </a>
              </li><li>
                <Link
                  to="/Documentation"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                 Documentation
                </Link>
              </li>

              {/* Login/Logout Button */}
            </ul>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
              <Link to="/register">
                <Button varient="transparent">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
