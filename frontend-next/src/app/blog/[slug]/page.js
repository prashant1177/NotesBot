import { getPostContent, getAllPostSlugs } from "@/lib/Blogs";

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

  return (
    <article className="prose mx-auto">
      <div className="w-full pb-6">
        <div className=" md:w-4/6 mx-auto md:p-6 p-4 text-justify">
          {/* Title */}
          <div className="border-b-1 border-gray-400">
            <h1 className="text-center">{post.title}</h1>
            <div className="flex justify-center gap-2 px-2 pb-2 text-gray-700">
              <p className="text-sm ">
                Written by<b> {post.author}</b> on {post.date}
              </p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
        </div>
      </div>
    </article>
  );
}
