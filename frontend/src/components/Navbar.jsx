import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur border-b border-gray-200 py-5">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-purple-700">NotesBot.ai</span>
        </div>
        <div className="flex space-x-4">
          <ul className="text-lg flex flex-col items-center font-medium mt-4 rounded-lg bg-white/10 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-purple-700 font-semibold rounded-sm hover:text-purple-500 transition duration-300"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
              >
                Pricing
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/prashant1177/NotesBot"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
                target="_blank"
              >
                Documentation
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
              >
                Contact
              </Link>
            </li><li>
              <Link to="/login">  <button className="inline-flex text-white bg-purple-900 border-0 py-2 px-3 focus:outline-none hover:bg-purple-700 rounded-lg text-lg shadow-md">
                           Login
                          </button></Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
