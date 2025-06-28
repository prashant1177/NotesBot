import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";

export default function Landing() {
  const phrases = ["Clean summaries out.", "Questions out.", "Answers out.", "Bullets out."];
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
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
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
            Convert raw thoughts into smart structure. Let AI summarize, bullet, organize, and extract questions from your notes instantly.
          </p>
          <div className="flex justify-center">
         <Link to="/main">  <button className="inline-flex text-white bg-purple-900 border-0 py-3 px-8 focus:outline-none hover:bg-purple-700 rounded-lg text-lg shadow-md">
              Start now
            </button></Link> 
             <Link to="/register">   <button className="ml-4 inline-flex text-purple-800 bg-purple-100 border-0 py-3 px-8 focus:outline-none hover:bg-purple-200 rounded-lg text-lg">
              Register
            </button></Link> 
          </div>
        </div>
      </div>
    </section>
  );
}
