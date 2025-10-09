import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm'; // ✅ Import gfm plugin

const postsDirectory = path.join(process.cwd(), 'src/BlogsData');

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    params: { slug: fileName.replace(/\.md$/, '').replace(/–/g, '-') }, // convert en-dash to normal dash
  }));
}

export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
  };
}

export async function getPostContent(slug) {
  const postData = getPostData(slug);
  const processedContent = await remark().use(gfm).use(html).process(postData.content);
  const contentHtml = processedContent.toString();
  return { ...postData, contentHtml };
}


/** ✅ New function: getSortedPostsData */
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data, // title, description, date, author
    };
  });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}