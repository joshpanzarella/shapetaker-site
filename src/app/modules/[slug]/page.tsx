import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { MediaDock } from "@/components/MediaDock";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { getModule, getModuleExplorerData, modules } from "@/data/modules";

type ModulePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.slug
  }));
}

export async function generateMetadata({ params }: ModulePageProps) {
  const { slug } = await params;
  const moduleSpec = getModule(slug);

  if (!moduleSpec) {
    return {
      title: "module not found | shapetaker"
    };
  }

  return {
    title: `${moduleSpec.name} | shapetaker`,
    description: moduleSpec.summary
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const moduleSpec = getModule(slug);

  if (!moduleSpec) {
    notFound();
  }

  return (
    <main className="module-page">
      <section className="module-page__hero">
        <div className="module-page__intro">
          <Link className="back-link" href="/manuals">
            <ArrowLeft size={16} aria-hidden="true" />
            manuals
          </Link>
          <span className="eyebrow">{moduleSpec.category}</span>
          <h1>{moduleSpec.name}</h1>
          <p>{moduleSpec.subtitle}</p>
          <div className="spec-row" aria-label={`${moduleSpec.name} specifications`}>
            <span>{moduleSpec.hp} hp</span>
            <span>{moduleSpec.status}</span>
          </div>
        </div>
        <ModuleExplorer module={getModuleExplorerData(moduleSpec)} />
      </section>

      <section className="manual-body">
        <div className="section-heading">
          <span className="eyebrow">
            <BookOpen size={15} aria-hidden="true" />
            manual
          </span>
          <h2>{moduleSpec.name} reference</h2>
        </div>
        <div className="manual-sections">
          {moduleSpec.manual.map((section) => (
            <article className="manual-section" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <MediaDock module={moduleSpec} />
    </main>
  );
}
