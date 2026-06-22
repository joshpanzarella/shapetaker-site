import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Cable } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { MediaDock } from "@/components/MediaDock";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { MorphingTitle } from "@/components/MorphingTitle";
import { PatchWalker } from "@/components/PatchWalker";
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
          <FadeIn direction="up" delay={50}>
            <Link className="back-link" href="/manuals">
              <ArrowLeft size={16} aria-hidden="true" />
              manuals
            </Link>
          </FadeIn>
          <FadeIn direction="up" delay={150}>
            <span className="eyebrow">{moduleSpec.category}</span>
            <MorphingTitle title={moduleSpec.name} as="h1" />
            <p>{moduleSpec.subtitle}</p>
          </FadeIn>
          <FadeIn direction="up" delay={280}>
            <div className="spec-row" aria-label={`${moduleSpec.name} specifications`}>
              <span>{moduleSpec.hp} hp</span>
              <span>{moduleSpec.status}</span>
            </div>
          </FadeIn>
        </div>
        <ModuleExplorer module={getModuleExplorerData(moduleSpec)} />
      </section>

      <section className="manual-body">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">
              <BookOpen size={15} aria-hidden="true" />
              manual
            </span>
            <h2>{moduleSpec.name} reference</h2>
          </div>
        </FadeIn>
        <div className="manual-sections">
          {moduleSpec.manual.map((section, index) => (
            <FadeIn key={section.title} direction="up" delay={index * 80}>
              <article className="manual-section">
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {moduleSpec.suggestedPatches && moduleSpec.suggestedPatches.length > 0 && (
        <section className="content-band">
          <FadeIn direction="up">
            <div className="section-heading section-heading--nowrap">
              <span className="eyebrow">
                <Cable size={15} aria-hidden="true" />
                suggested patches
              </span>
              <h2>experiment from here.</h2>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={150}>
            <PatchWalker patches={moduleSpec.suggestedPatches} mainModuleId={moduleSpec.slug} mainModuleName={moduleSpec.name} />
          </FadeIn>
        </section>
      )}

      <FadeIn direction="up">
        <MediaDock module={moduleSpec} />
      </FadeIn>
    </main>
  );
}
