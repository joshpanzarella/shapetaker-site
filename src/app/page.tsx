import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getModuleExplorerData, modules, stackHighlights } from "@/data/modules";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const featuredModule = modules.find((module) => module.panelImage) ?? modules[0];
  const projects = getProjects();

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero__intro">
          <h1 className="brand-title" aria-label="SHAPETAKER">
            <span aria-hidden="true">
              SHAPETAKE<span className="brand-alt-r">&#xf02e;</span>
            </span>
          </h1>
        </div>
        <ProjectGallery projects={projects} />
      </section>

      <section className="content-band">
        <div className="section-heading">
          <span className="eyebrow">interactive manual</span>
          <h2>explore the featured module.</h2>
        </div>
        <ModuleExplorer module={getModuleExplorerData(featuredModule)} />
      </section>

      <section className="content-band content-band--dark">
        <div className="section-heading">
          <span className="eyebrow">build direction</span>
          <h2>set up for deeper product pages.</h2>
        </div>
        <div className="stack-grid">
          {stackHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article className="stack-tile" key={item.title}>
                <Icon size={22} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
        <Link className="inline-link" href="/manuals">
          browse manual index
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="content-band">
        <div className="source-strip">
          <div>
            <span className="eyebrow">next steps</span>
            <h2>bring in exact panel art, fonts, and demos.</h2>
          </div>
          <a className="button button--ghost" href="https://github.com/" rel="noreferrer" target="_blank">
            <GitBranch size={18} aria-hidden="true" />
            source ready
          </a>
        </div>
      </section>
    </main>
  );
}
