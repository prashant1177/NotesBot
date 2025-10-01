import React from "react";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/Blogs";

const RecentBlogs = () => {
  const allPostsData = getSortedPostsData(); 

  return (
    <div className="max-w-7xl mx-auto  py-4 md:py-16">
      <div className="text-center my-8">
      
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-950 mb-12 md:mb-16 blocks">
          Recent <span className="text-blue-600">Blogs</span> 
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {allPostsData.slice(0, 6).map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer blocks"
          >
            <Link href={`/blog/${post.slug}`}>
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
                <div className="w-fit bg-gray-900  hover:bg-gray-950 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Read More →
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
