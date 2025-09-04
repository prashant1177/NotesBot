import React from "react";
import { BlogPosts } from "./BlogPosts";
import { Link } from "react-router-dom";

const BlogIndex = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog 
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {BlogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                {post.description}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">
                    {post.author}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">{post.date}</div>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="px-6 pb-6">
              <Link to={`/blog/${post.slug}`} className="w-full bg-gray-900  hover:bg-gray-950 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};

export default BlogIndex;
