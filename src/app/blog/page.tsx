import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";

const alchemicalSymbols = ["☿", "🜍", "🜔", "🜂", "🜄", "🜁", "🜃", "☉", "☽"];

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <main>
      <section className="page-shell" style={{ paddingBottom: "2rem" }}>
        <div className="page-heading" style={{ marginBottom: "1rem" }}>
          <span className="eyebrow">development log</span>
          <h1 className="brand-title">blog</h1>
          <p>
            updates, deep dives, and build notes on current modular designs and experiments.
          </p>
        </div>
      </section>

      <section className="content-band content-band--dark" style={{ paddingTop: "3rem" }}>
        <div className="section-heading">
          <span className="eyebrow">latest posts</span>
          <h2>read the log.</h2>
        </div>

        <div className="stack-grid" style={{ marginBottom: "2rem" }}>
          {posts.map((post, index) => (
            <article className="stack-tile" key={post.slug} style={{ display: 'flex', flexDirection: 'column' }}>
              {post.frontmatter.image ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '1.2rem', clipPath: 'var(--chamfer-sm)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <img src={post.frontmatter.image} alt={post.frontmatter.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
              ) : (
                <span 
                  aria-hidden="true" 
                  style={{ 
                    fontSize: '1.8rem', 
                    marginBottom: '0.8rem', 
                    color: 'var(--teal)',
                    fontFamily: 'sans-serif'
                  }}
                >
                  {alchemicalSymbols[index % alchemicalSymbols.length]}
                </span>
              )}
              <h3 style={{ marginBottom: '0.4rem' }}>{post.frontmatter.title}</h3>
              <span className="eyebrow" style={{ marginBottom: '0.8rem', fontSize: '0.65rem' }}>{post.frontmatter.date}</span>
              <p style={{ flex: 1, marginBottom: '1.2rem' }}>{post.frontmatter.summary}</p>
              <Link className="inline-link" href={`/blog/${post.slug}`} style={{ marginTop: 'auto' }}>
                read post
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p style={{ color: "var(--ink-soft)" }}>No posts found yet.</p>
          )}
        </div>

        <Link className="inline-link" href="/">
          return to home
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
