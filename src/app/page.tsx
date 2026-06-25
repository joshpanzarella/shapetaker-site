import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getModuleExplorerData, modules, stackHighlights } from "@/data/modules";
import { getProjects } from "@/lib/projects";

import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  const featuredModule = modules.find((module) => module.panelImage) ?? modules[0];
  const projects = getProjects();

  return (
    <main>
      <section className="home-hero">
        <FadeIn delay={100} direction="up" className="home-hero__intro">
          <h1 className="brand-title" aria-label="SHAPETAKER">
            <span aria-hidden="true">
              SHAPETA<span className="brand-alt-glyph">&#xf02d;</span>E<span className="brand-alt-glyph">&#xf02e;</span>
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={300} direction="up" className="w-full">
          <ProjectGallery projects={projects} />
        </FadeIn>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">interactive manual</span>
            <h2>select a control:</h2>
          </div>
        </FadeIn>
        <ModuleExplorer module={getModuleExplorerData(featuredModule)} />
      </section>

      <section className="content-band content-band--dark">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">build direction</span>
            <h2>set up for deeper product pages.</h2>
          </div>
        </FadeIn>
        <div className="stack-grid">
          {stackHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={100 + index * 100} direction="up">
                <article className="stack-tile h-full">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={400} direction="up" className="mt-8">
          <Link className="inline-link" href="/manuals">
            browse manual index
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </FadeIn>
      </section>

    </main>
  );
}
