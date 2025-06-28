import { Link } from "react-router-dom";
import { useState } from "react";

export default function Pricing() {
  const [PRO, setPRO] = useState(300);

  return (
    <section class="text-purple-900 body-font overflow-hidden bg-purple-50">
      <div class="container px-48 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-purple-900">
            Pricing
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-purple-600">
            Choose the plan that suits your note-taking needs. Simple, scalable,
            and smart.
          </p>
          <div class="flex mx-auto border-2 border-purple-500 rounded overflow-hidden mt-6">
            <button
              className={`py-1 px-4 focus:outline-none transition-all duration-200 ${
                PRO === 300 ? "bg-purple-500 text-white" : "text-purple-500"
              }`}
              onClick={() => setPRO(300)}
            >
              Monthly
            </button>{" "}
            <button
              className={`py-1 px-4 focus:outline-none transition-all duration-200 ${
                PRO === 250 ? "bg-purple-500 text-white" : "text-purple-500"
              }`}
              onClick={() => setPRO(250)}
            >
              Annually
            </button>{" "}
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          <div class="p-4 xl:w-1/2  w-full">
            <div class="h-full p-6 rounded-lg border-2 border-purple-300 flex flex-col relative overflow-hidden bg-white">
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium text-purple-700">
                START
              </h2>
              <h1 class="text-5xl text-purple-900 pb-4 mb-4 border-b border-purple-200 leading-none">
                Free
              </h1>
              <ul class="mb-6 space-y-2 text-purple-600">
                <li>Basic AI summarization</li>
                <li>3 notes/day limit</li>
                <li>Text export enabled</li>
              </ul>
              <Link to="/main">
                {" "}
                <button class="mt-auto text-white bg-purple-400 hover:bg-purple-500 border-0 py-2 px-4 w-full rounded">
                  Get Started
                </button>
              </Link>{" "}
            </div>
          </div>
          <div class="p-4 xl:w-1/2 w-full">
            <div class="h-full p-6 rounded-lg border-2 border-purple-700 flex flex-col relative overflow-hidden bg-white shadow-lg">
              <span class="bg-purple-700 text-white px-3 py-1 text-xs absolute right-0 top-0 rounded-bl">
                POPULAR
              </span>
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium text-purple-700">
                PRO
              </h2>
              <h1 class="text-5xl text-purple-900 pb-4 mb-4 border-b border-purple-200 leading-none">
                {PRO}
                <span class="text-lg ml-1 font-normal text-purple-500">
                  /mo
                </span>
              </h1>
              <ul class="mb-6 space-y-2 text-purple-600">
                <li>Unlimited notes</li>
                <li>Advanced AI structuring</li>
                <li>Export as PDF & Markdown</li>
              </ul>
              <button class="mt-auto text-white bg-purple-700 hover:bg-purple-800 border-0 py-2 px-4 w-full rounded">
                Choose Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
