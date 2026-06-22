import Link from "next/link";
import { Comments } from "@/components/Comments";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlogPosts, getBlogPost } from "@/lib/blog";

function splitFirstHeading(contentHtml: string) {
  const match = contentHtml.match(/^<h1>(.*?)<\/h1>\n?([\s\S]*)$/);

  return match
    ? { headingHtml: match[1], bodyHtml: match[2] }
    : { headingHtml: null, bodyHtml: contentHtml };
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { headingHtml, bodyHtml } = splitFirstHeading(post.contentHtml);
  const tags = post.frontmatter.tags ?? [];

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

      <section className="manual-body blog-post-body">
        <div className="blog-post-content">
          <article className="manual-section blog-post-article">
            {headingHtml ? (
              <h1 dangerouslySetInnerHTML={{ __html: headingHtml }} />
            ) : null}
            <div className="blog-post-meta">
              <span>posted {formatPostDate(post.frontmatter.date)}</span>
              {tags.length > 0 ? (
                <ul className="blog-post-tags" aria-label="post tags">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div
              className="blog-post-copy"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
            <Comments />
          </article>
        </div>
      </section>
    </main>
  );
}
