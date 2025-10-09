import faqData from "@/app/documentation/latexwriter/LatexWriterFAQ";
import Link from "next/link";

export default function FaqLinks() {
  return (
    <div>
      <h5 className="text-3xl lg:text-5xl   text-black mt-16 mb-8">
        LaTeXWriter Guide{" "}
      </h5>
      <ul className="flex flex-col gap-2 mb-16 ">
        {faqData.slice(0, 7).map((post, i) => (
          <li
            key={i}
            className="rounded transition-all duration-300 group cursor-pointer border-b-1 border-gray-200  py-2 hover:border-blue-600"
          >
            <Link href={`/documentation/latexwriter/${post.slug}`}>
              <h6 className="text-xl font-light text-gray-700 group-hover:text-blue-600 transition-colors duration-200 ">
                {post.title}
              </h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
