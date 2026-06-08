import Link from "next/link";

export const metadata = {
  title: "not found | shapetaker"
};

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">not found</span>
        <h1>this page is not here.</h1>
        <p>the project or manual may have moved, or the address may be incomplete.</p>
        <Link className="button button--primary" href="/">
          return home
        </Link>
      </section>
    </main>
  );
}
