import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MorphingTitle } from "@/components/MorphingTitle";
import { getVisibleModules } from "@/data/modules";

export const metadata = {
  title: "manuals | shapetaker"
};

export default function ManualsPage() {
  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">manual library</span>
        <MorphingTitle title="vcv rack module manuals" as="h1" />
        <p>each module page combines reference material, control notes, and demo media.</p>
      </section>

      <section className="manual-index" aria-label="manual index">
        {getVisibleModules().map((module) => (
          <article className="manual-index__item" key={module.slug}>
            <div>
              <span className="eyebrow">{module.status}</span>
              <h2>{module.name}</h2>
              <p>{module.summary}</p>
            </div>
            <Link className="button button--ghost" href={`/modules/${module.slug}`}>
              open
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
