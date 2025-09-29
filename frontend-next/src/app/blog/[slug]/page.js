import { getPostContent, getAllPostSlugs } from "@/lib/Blogs";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.params.slug }));
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
