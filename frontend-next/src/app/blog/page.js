import React from "react";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/Blogs";
import Button from "@/ui/Button/Button";
import FaqLinks from "@/components/FaqLinks";
import GuideLinks from "@/components/GuideLinks";

export const metadata = {
  title: "LaTeXWriter Blog - Tips, Tutorials & LaTeX Insights",
  description:
    "Explore the LaTeXWriter Blog for the latest tutorials, tips, and insights on LaTeX editing, document creation, and productivity for students, researchers, and professionals.",
  alternates: {
    canonical: "https://latexwriter.com/blog",
  },
};
const BlogIndex = () => {
  const allPostsData = getSortedPostsData(); // synchronous for local Markdown

  return (
    <div className="w-full md:max-w-5/6 mx-auto md:pb-8 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className=" w-full h-screen  flex flex-col justify-center   ">
        <div className="flex flex-col">
          {" "}
          <h1 className="  text-5xl lg:text-8xl   text-gray-950">
            Read Articles
            <br />
            Insights and Tutorials
          </h1>
          <p className="text-lg md:text-xl  text-gray-700 mt-8 max-w-4xl ">
            Explore our LaTeX blog packed with tips, tutorials, and insights for
            writers, researchers, and students. Learn how to write, format, and
            publish professional documents with ease using practical guides and
            expert advice.
          </p>
          <div className="w-fit grid md:grid-cols-2 gap-4 mt-12  md:items-center">
            <Link
              href="/documentation/latex/getting-started-latex"
              className="w-full"
            >
              <Button className="w-full" varient="primary">
                LaTeX Documentation
              </Button>
            </Link>{" "}
            <Link href="/documentation/latexwriter" className="w-full">
              <Button className="w-full" varient="muted">
                {" "}
                LaTeXWriter Documentation{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16">
        {allPostsData.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="flex flex-col justify-between border-b-2  border-gray-300 rounded transition-all duration-300 overflow-hidden group cursor-pointer hover:border-blue-600 pb-4"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>
            <p className=" text-gray-600 text-sm">{post.date}</p>
          </Link>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <FaqLinks />
        <GuideLinks />
      </div>
    </div>
  );
};

export default BlogIndex;
