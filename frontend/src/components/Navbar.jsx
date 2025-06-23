export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur border-b border-gray-200 py-5">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-purple-700">NotesBot.ai</span>
        </div>
        <div className="flex space-x-4">
          <ul className="text-lg flex flex-col font-medium mt-4 rounded-lg bg-white/10 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-purple-700 font-semibold rounded-sm hover:text-purple-500 transition duration-300"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-700 hover:text-purple-500 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
