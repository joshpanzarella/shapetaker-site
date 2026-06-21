import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { micromark } from "micromark";

const blogDir = path.join(process.cwd(), "src/content/blog");
const outputFile = path.join(process.cwd(), "src/data/blog-posts.json");

function generateBlogData() {
  if (!fs.existsSync(blogDir)) {
    console.log("Blog directory not found, skipping generation.");
    fs.writeFileSync(outputFile, JSON.stringify([]));
    return;
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data,
        content,
        contentHtml: micromark(content)
      };
    });

  // Sort by date descending
  posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`Generated blog data for ${posts.length} posts.`);
}

generateBlogData();
