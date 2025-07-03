import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import aiImage from "../assets/aiImage.png";
import profile from "../assets/ime.jpg";
export default function Landing() {
  const phrases = [
    "Clean summaries out.",
    "Questions out.",
    "Answers out.",
    "Bullets out.",
  ];
  const [text, setText] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (charIndex < phrases[currentPhrase].length) {
      timeoutRef.current = setTimeout(() => {
        setText((prev) => prev + phrases[currentPhrase].charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else {
      timeoutRef.current = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }, 1500);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, currentPhrase]);

  return (
    <>
      {" "}
      <section className="text-gray-700 body-font bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto flex px-5 py-32 md:flex-row flex-col items-center ">
          {/* Left Image */}
          <div className="lg:max-w-lg lg:w-full md:w-1/2 sm:block hidden w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded-lg"
              alt="hero"
              src={logo}
            />
          </div>

          {/* Right Content */}
          <div className="lg:flex-grow md:w-1/2 lg:pl-40 md:pl-20 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              <span className="text-purple-800">Notes in, </span>
              <br className="hidden lg:inline-block" />
              <span className="text-purple-600">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-gray-600">
              Convert raw thoughts into smart structure. Let AI summarize,
              bullet, organize, and extract questions from your notes instantly.
            </p>
            <div className="flex justify-center">
              <Link to="/main">
                {" "}
                <button className="inline-flex text-white bg-purple-900 border-0 py-3 px-8 focus:outline-none hover:bg-purple-700 rounded-lg text-lg shadow-md">
                  Start now
                </button>
              </Link>
              <Link to="/register">
                {" "}
                <button className="ml-4 inline-flex text-purple-800 bg-purple-100 border-0 py-3 px-8 focus:outline-none hover:bg-purple-200 rounded-lg text-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="px-6 py-32 text-center">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-4 ">
          Everything you need to create organized notes
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Our smart note-taking tool blends intelligent design with powerful
          features to help you structure and summarize content that truly
          matters.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16 container mx-auto">
          {[
            {
              title: "Smart Structuring",
              desc: "Automatically converts your raw input into clean, structured notes.",
            },
            {
              title: "Real-time Preview",
              desc: "See your notes evolve instantly as the AI works its magic.",
            },
            {
              title: "Multiple Input Types",
              desc: "Supports PDF uploads, YouTube links, and raw text entries.",
            },
            {
              title: "Clean Formatting",
              desc: "Neatly organized bullet points, summaries, and questions ready to read.",
            },
            {
              title: "Privacy Focused",
              desc: "Your notes are never stored—everything remains secure and local.",
            },
            {
              title: "Quick Export",
              desc: "Download your notes in copyable formats or share them directly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-left"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Steps Section */}
      <section className="px-32 py-32 text-center bg-white flex">
        <div className="w-1/2 mx-auto mb-12">
          <p className="text-sm uppercase text-purple-500 font-semibold mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Three steps to your smart notes
          </h2>
          <div className="flex flex-col w-full mx-auto gap-16 ">
            {[
              {
                step: "01",
                title: "Submit Input",
                desc: "Choose between uploading a PDF, pasting YouTube URLs, or entering plain text.",
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "Our AI engine organizes, summarizes, and generates insightful bullets and questions.",
              },
              {
                step: "03",
                title: "Download & Use",
                desc: "Review your notes and export them to your device or keep them ready in your dashboard.",
              },
            ].map(({ step, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-purple-50 rounded-lg p-6 border border-purple-100"
              >
                <p className="text-4xl font-bold text-purple-300 mb-4">
                  {step}
                </p>
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full mx-auto mb-12 p-8 flex items-center justify-center">
          <img src={aiImage} className="bg-purple-900 border-purple-200 rounded-full"/>{" "}
        </div>
      </section>
      {/* Developer Section */}
      <section className="px-6 py-20 bg-gray-100 text-center">
        <p className="text-xl uppercase text-purple-500 font-semibold mb-12">
          Meet The Developer
        </p>
        <div className="flex justify-center ">
          <div class="h-full ring-2 ring-purple-100 rounded-xl bg-white py-4 px-4 flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            <img
              alt="team"
              class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
              src= {profile}
            />
            <div class="flex-grow sm:pl-8">
              <h2 class="title-font font-medium text-xl text-purple-900">
                Prashant Patil
              </h2>
              <h3 class="text-gray-500 mb-3">Full Stack Developer</h3>
              <p class="mb-4">
                Focused on building clean, intuitive interfaces and powerful
                tools that simplify lives.
              </p>
             <span className="inline-flex justify-center mt-4">
  <a
    href="https://github.com/prashantpatil-07"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-gray-900"
    aria-label="GitHub"
  >
    <svg
      fill="currentColor"
      stroke="none"
      className="w-6 h-6"
      viewBox="0 0 24 24"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.469-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.045.137 3.002.403 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  </a>

  <a
    href="https://www.linkedin.com/in/prashantpatil07/"
    target="_blank"
    rel="noopener noreferrer"
    className="ml-4 text-gray-500 hover:text-blue-600"
    aria-label="LinkedIn"
  >
    <svg
      fill="currentColor"
      stroke="none"
      className="w-6 h-6"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.036-1.849-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666H9.354V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.372-1.849 3.602 0 4.268 2.368 4.268 5.452v6.288zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.068 0-1.144.924-2.068 2.068-2.068s2.068.924 2.068 2.068c0 1.142-.924 2.068-2.068 2.068zM6.797 20.452H3.876V9h2.921v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.207 24 24 23.227 24 22.271V1.729C24 .774 23.207 0 22.225 0z" />
    </svg>
  </a>

  <a
    href="https://leetcode.com/prashantpatil07/"
    target="_blank"
    rel="noopener noreferrer"
    className="ml-4 text-gray-500 hover:text-orange-600"
    aria-label="LeetCode"
  >
    <svg
      fill="currentColor"
      stroke="none"
      className="w-6 h-6"
      viewBox="0 0 50 50"
    >
      <path d="M26.173 0L2.082 24.091c-.59.59-.59 1.544 0 2.134L26.173 50l4.058-4.058L9.958 25 30.231 4.73 26.173 0zm6.924 8.718L37.155 5.4 50 18.244 47.195 21.05 33.321 7.175l-.224-.224zm0 32.564L33.321 42.823l13.874-13.875L50 31.756 37.155 44.6l-4.058-3.318z" />
         </svg>
           </a>
           </span>"

            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 NotesBot.ai. Crafted by Prashant Patil.
      </footer>
    </>
  );
}
