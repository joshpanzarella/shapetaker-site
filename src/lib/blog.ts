import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
};

const blogDir = path.join(process.cwd(), "src/content/blog");

export function getBlogPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as BlogPostFrontmatter
      };
    });

  return posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPathMDX = path.join(blogDir, `${slug}.mdx`);
    const fullPathMD = path.join(blogDir, `${slug}.md`);

    const filePath = fs.existsSync(fullPathMDX) ? fullPathMDX : fullPathMD;
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    return {
      slug,
      frontmatter: data as BlogPostFrontmatter,
      content
    };
  } catch (error) {
    return null;
  }
}
