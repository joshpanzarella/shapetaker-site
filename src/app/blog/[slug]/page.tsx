import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPosts, getBlogPost } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "note not found | shapetaker"
    };
  }

  return {
    title: `${post.frontmatter.title} | shapetaker`,
    description: post.frontmatter.summary
  };
}

// Optional: define custom components for MDX here
const components = {
  // Add custom components like ModuleExplorer here later!
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="module-page">
      <section className="module-page__hero" style={{ minHeight: "auto", paddingBottom: "2rem" }}>
        <div className="module-page__intro">
          <Link className="back-link" href="/blog">
            <ArrowLeft size={16} aria-hidden="true" />
            notes index
          </Link>
          <span className="eyebrow">{post.frontmatter.date}</span>
          <h1 style={{ marginTop: "1rem" }}>{post.frontmatter.title}</h1>
        </div>
      </section>

      <section className="manual-body">
        <div className="manual-sections" style={{ maxWidth: "760px" }}>
          <article className="manual-section" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            <MDXRemote source={post.content} components={components} />
          </article>
        </div>
      </section>
    </main>
  );
}
