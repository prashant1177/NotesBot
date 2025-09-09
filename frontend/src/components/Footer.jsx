import { Link } from "react-router-dom";
export function Footer() {
  return (
      <footer className="border-t-1 pt-8 border-gray-200">
        <div className="mx-auto w-full max-w-screen-xl p-4">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="https://latexwriter.com/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap">
                  LaTeXWriter
                </span>
              </a>
               <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">Create professional documents with ease, all in one place. Have any query ?</p>
                    <Link to="/contact"  className="py-2.5 px-5 h-9 block w-fit bg-blue-600 rounded-full shadow-sm text-xs text-gray-50 mx-auto transition-all  duration-500 hover:bg-indigo-700 lg:mx-0">
                        Contact us
                    </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  Resources
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <Link to="/documentation/latex" className="hover:underline">
                      Latex Docs
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/documentation/latexwriter"
                      className="hover:underline"
                    >
                      LatexWriter Docs
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/templates" className="hover:underline">
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  Legal
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <Link to={"/PrivacyPolicy"} className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/TermsAndConditions" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>{" "}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  General
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="https://latexwriter.com/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link to="/features" className="hover:underline">
                      Features
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/About" className="hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2025{" "}
              <a href="https://latexwriter.com/" className="hover:underline">
                LaTeXWriter™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a
                href="https://x.com/LaTeXWriter"
                className="text-gray-500 hover:text-gray-900 ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
               <a
    href="https://www.reddit.com/r/LaTeXWriters/"
    className="text-gray-500 hover:text-gray-900 ms-5"
  >
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm5.8 13.6a5.5 5.5 0 0 1-11.6 0 .8.8 0 0 1 1.6 0 3.9 3.9 0 0 0 8.4 0 .8.8 0 0 1 1.6 0Zm-8.3-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-2.8 3.3c-1.4 0-2.5-.6-2.5-1.3h5c0 .7-1.1 1.3-2.5 1.3Z"/>
    </svg>
    <span className="sr-only">Reddit page</span>
  </a>

  <a
    href="https://www.youtube.com/@LaTeXWriter"
    className="text-gray-500 hover:text-gray-900 ms-5"
  >
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.112C19.565 3.5 12 3.5 12 3.5s-7.565 0-9.388.574a2.991 2.991 0 0 0-2.11 2.112A31.678 31.678 0 0 0 0 12a31.678 31.678 0 0 0 .502 5.814 2.991 2.991 0 0 0 2.11 2.112C4.435 20.5 12 20.5 12 20.5s7.565 0 9.388-.574a2.991 2.991 0 0 0 2.11-2.112A31.678 31.678 0 0 0 24 12a31.678 31.678 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/>
    </svg>
    <span className="sr-only">YouTube channel</span>
  </a>
            </div>
          </div>
        </div>
      </footer>
  );
}
