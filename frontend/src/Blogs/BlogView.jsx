// BlogPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { BlogPosts } from "./BlogPosts";
import { Footer } from "../components/Footer";

export default function BlogView() {
  const { blogSlug } = useParams();
  const blog = BlogPosts.find((post) => post.slug === blogSlug);
  return (
    <div className="w-full">
      <div className=" md:w-4/6 mx-auto md:p-6 p-2 text-justify shadow-lg">
        {/* Title */}
        <div className="border-b-1 border-gray-400">
          <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
          <div className="flex justify-center gap-2 px-2 pb-2 text-gray-700">
           <p className="text-sm ">Written by<b> {blog.author}</b> on {blog.date}</p>
          </div>
        </div>
        <div
          className="prose prose-lg prose-indigo"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
      <Footer />
    </div>
  );
}
