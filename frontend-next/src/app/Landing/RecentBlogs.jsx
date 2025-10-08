import React from "react";
import Link from "next/link";
import Badge from "@/ui/Badge/Badge";

import { getSortedPostsData } from "@/lib/Blogs";

const RecentBlogs = () => {
  const allPostsData = getSortedPostsData();

  return (
    <div className="w-full sm:max-w-5/6 px-4 sm:px-6 lg:px-8 mx-auto  py-4 md:py-16">
      <div className="mb-8">
        <Badge variant="outline" className="mb-4 ">
          Our Blogs
        </Badge>
        <h3 className="  text-5xl lg:text-6xl  text-black blocksnone">
          Learn More About LaTeX{" "}
        </h3>
      </div>
      <ul className="flex flex-col gap-2 lg:gap-4 list-decimal px-8">
        {allPostsData.slice(0, 10).map((post) => (
          <li
            key={post.id}
            className=" transition-all duration-300 group cursor-pointer"
          >
            <Link href={`/blog/${post.slug}`}>
              <h6 className="text-xl font-light text-gray-900 group-hover:text-blue-600 transition-colors duration-200 ">
                {post.title}
              </h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBlogs;
