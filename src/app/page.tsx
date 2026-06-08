import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { ModuleExplorer } from "@/components/ModuleExplorer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getModuleExplorerData, modules, stackHighlights } from "@/data/modules";
import { getProjects } from "@/lib/projects";

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

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
        <div className="source-strip" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', opacity: 0.6, fontSize: '1.2rem', lineHeight: 1 }}>
          {Array.from({ length: Math.floor(alchemicalSymbols.length / 9) }).map((_, blockIdx) => (
            <div key={blockIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {alchemicalSymbols.slice(blockIdx * 9, blockIdx * 9 + 9).map((sym, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.5rem', height: '1.5rem' }}>{sym}</span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
