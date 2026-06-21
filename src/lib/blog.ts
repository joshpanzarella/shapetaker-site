import blogData from "@/data/blog-posts.json";

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  image?: string;
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  contentHtml: string;
};

export function getBlogPosts(): Omit<BlogPost, "content" | "contentHtml">[] {
  return blogData.map((post) => ({
    slug: post.slug,
    frontmatter: post.frontmatter as BlogPostFrontmatter
  }));
}

export function getBlogPost(slug: string): BlogPost | null {
  const post = blogData.find((p) => p.slug === slug);
  if (!post) {
    return null;
  }
  
  return {
    slug: post.slug,
    frontmatter: post.frontmatter as BlogPostFrontmatter,
    content: post.content,
    contentHtml: post.contentHtml
  };
}
