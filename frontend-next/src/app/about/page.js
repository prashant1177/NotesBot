import React from "react";
import Button from "@/ui/Button/Button";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/Blogs";
import FaqLinks from "@/components/FaqLinks";
import GuideLinks from "@/components/GuideLinks";
export const metadata = {
  title: "About LaTeXWriter - Learn About Our LaTeX Editing Platform",
  description:
    "Discover LaTeXWriter, the modern LaTeX editor for researchers, students, and professionals. Learn about our mission, features, and how we simplify LaTeX document creation.",
  alternates: {
    canonical: "https://latexwriter.com/about",
  },
};

const About = () => {
  const recentPosts = getSortedPostsData();
  return (
    <div>
      <div className="w-full md:max-w-5/6 mx-auto md:pb-16 px-4 sm:px-6 lg:px-8X">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className=" w-full h-screen  flex flex-col justify-center   ">
          <div className="flex flex-col  ">
            <h1 className="  text-5xl lg:text-8xl   text-gray-950">
              The Story of
              <br />
              LaTeX Writer
            </h1>
            <p className="text-lg md:text-xl  text-gray-700 mt-8 max-w-4xl ">
              LaTeXWriter simplifies professional document creation with
              intuitive tools, AI-powered editing, and seamless academic
              integrations. Built for students, researchers, and professionals,
              it transforms complex LaTeX formatting into a fast, smooth, and
              accessible writing experience.
            </p>
            <div className="w-fit grid md:grid-cols-2 gap-4 mt-12  md:items-center">
              <Link href="/features" className="w-full">
                <Button className="w-full" varient="primary">
                  Read Features
                </Button>
              </Link>{" "}
              <Link href="/" className="w-full">
                <Button className="w-full" varient="muted">
                  Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
          Our Story
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          LaTeX Writer was founded in 2025 with the vision of making LaTeX
          editing simpler and more accessible for everyone. The idea was born
          when I was working on my final presentation in LaTeX and realized the
          process felt unnecessarily complex and time-consuming. Determined to
          find a better way, I immersed myself in learning LaTeX and exploring
          how its editing experience could be improved. What started as a
          personal challenge quickly grew into a mission — to build a platform
          that makes LaTeX editing faster, smoother, and user-friendly for
          students, researchers, and professionals alike.{" "}
        </p>
        <h2 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At Latexwriter, our mission is to make professional document creation
          accessible to everyone by offering intuitive, powerful LaTeX tools. We
          want researchers, students, and professionals to spend less time
          wrestling with formatting and more time focusing on their ideas. By
          blending technical precision with creative flexibility, Latexwriter
          bridges the gap between complexity and simplicity in academic and
          scientific writing.{" "}
        </p>
        <h2 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
          Our Vision & Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Innovation
            </h3>
            <p className="text-gray-700">
              We continuously push boundaries in document processing technology,
              integrating AI-powered features and real-time collaboration tools
              to stay ahead of evolving user needs.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Accessibility
            </h3>
            <p className="text-gray-700">
              Making professional LaTeX editing accessible to users of all skill
              levels through intuitive interfaces, comprehensive templates, and
              educational resources.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Reliability
            </h3>
            <p className="text-gray-700">
              Providing robust, secure, and dependable tools that researchers
              can trust with their most important work, backed by
              enterprise-grade infrastructure.
            </p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Community
            </h3>
            <p className="text-gray-700">
              Building a supportive ecosystem where users can collaborate, share
              knowledge, and contribute to advancing scientific communication
              worldwide.
            </p>
          </div>
        </div>

        {/* Meet the Team 
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
            Meet the Founder
          </h2>
          <div className="flex justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto  flex items-center justify-center text-white text-2xl font-bold">
                PJ
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Prashant Jitendra Patil
              </h3>
              <p className="text-blue-600 font-medium mb-3">
                Founder of LaTeXWriter
              </p>
              <p className="text-gray-600 text-sm">
                A Computer Science student with a strong passion for technology,
                problem-solving, and innovation.{" "}
              </p>
            </div>
          </div>
        </section>*/}
        <h2 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
          Why Choose LatexWrite?
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Latexwriter was created to make LaTeX editing accessible, fast, and
          user-friendly. Unlike traditional LaTeX editors that feel complex and
          overwhelming, Latexwriter blends the precision of LaTeX with a modern,
          intuitive experience. Our smart editor, AI-powered suggestions, and
          seamless academic integrations help you focus on your research and
          writing—while we handle the formatting. Whether you’re drafting a
          thesis, journal paper, or professional presentation, Latexwriter
          ensures speed, simplicity, and accuracy.{" "}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <FaqLinks/>
          <GuideLinks/>
        </div>
        <h5 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
            Recent Blogs{" "}
          </h5>
          <ul className="flex flex-col gap-2 ">
            {recentPosts.slice(0, 5).map((post) => (
              <li
                key={post.id}
                className=" transition-all duration-300 group cursor-pointer border-b-1 border-gray-200  py-2 hover:border-blue-600 rounded"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h6 className="text-xl font-light text-gray-800 group-hover:text-blue-600 transition-colors duration-200 ">
                    {post.title}
                  </h6>
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default About;
