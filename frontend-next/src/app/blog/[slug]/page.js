import {
  getPostContent,
  getAllPostSlugs,
  getSortedPostsData,
} from "@/lib/Blogs";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.params.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    return {
      title: "Blog Not Found - LaTeXWriter",
      description: "The blog you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} - LaTeXWriter Blog`,
    description: post.contentHtml.replace(/<[^>]+>/g, "").slice(0, 160), // strip HTML and limit to 160 chars
    alternates: {
      canonical: `https://latexwriter.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} - LaTeXWriter`,
      description: post.contentHtml.replace(/<[^>]+>/g, "").slice(0, 160),
      url: `https://latexwriter.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - LaTeXWriter`,
      description: post.contentHtml.replace(/<[^>]+>/g, "").slice(0, 160),
    },
  };
}
export default async function BlogPostPage({ params }) {
  const param = await params;
  const post = await getPostContent(param.slug);
  const recentPosts = getSortedPostsData();

  return (
    <div className="relative w-full md:w-5/6 grid lg:grid-cols-3 mx-auto h-full">
      <article className="prose w-full px-4  lg:col-span-2 ">
        <div className=" text-justify">
          {/* Title */}
          <div className="border-b-1 border-gray-400">
            <h1>{post.title}</h1>
            <p className="text-sm ">
              Written by<b> {post.author}</b> on {post.date}
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
        </div>
      </article>
      <div className="w-full px-4 mx-auto md:mb-16 lg:col-span-1 h-fit md:sticky  md:top-20 ">
        <h5 className="font-bold text-xl  text-gray-900 border-b-1 border-gray-400  py-2 ">
          Learn More About LaTeX{" "}
        </h5>
      <ul className="flex flex-col gap-2 ">
        {recentPosts.slice(0, 5).map((post) => (
          <li
            key={post.id}
            className=" transition-all duration-300 group cursor-pointer border-b-1 border-gray-200  py-2"
          >
            <Link href={`/blog/${post.slug}`}>
              <h6 className="text-md font-light text-gray-500 group-hover:text-blue-600 transition-colors duration-200 ">
                {post.title}
              </h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
