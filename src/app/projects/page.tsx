import Link from "next/link";
import Image from "next/image";
import { MorphingTitle } from "@/components/MorphingTitle";
import { ModuleCatalog } from "@/components/ModuleCatalog";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "projects | shapetaker"
};

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <FadeIn direction="up">
        <section className="page-heading">
          <span className="eyebrow">module catalog</span>
          <MorphingTitle title="projects" as="h1" />
          <p>
            clairaudient leads the shapetaker series — open the panel to learn the device through
            its interactive manual. more modules are on the bench and will surface here as they ship.
          </p>
        </section>
      </FadeIn>

      <ModuleCatalog />

      <FadeIn direction="up">
        <section className="page-heading" style={{ marginTop: "3rem" }}>
          <span className="eyebrow">software</span>
          <h2>standalone builds.</h2>
          <p>
            full applications outside the rack — handheld instruments and tools
            that ship on their own.
          </p>
        </section>
      </FadeIn>

      <div className="catalog-grid">
        <FadeIn direction="up" className="h-full">
          <Link className="catalog-card h-full" href="/projects/apotheca">
            <span className="catalog-card__rack">
              <Image
                src="/blog/apotheca/song.png"
                alt="Apotheca song view showing three tracks across eight scenes"
                width={640}
                height={480}
                sizes="(max-width: 560px) 90vw, 320px"
              />
            </span>
            <span className="catalog-card__body">
              <span className="catalog-card__status">alpha</span>
              <span className="catalog-card__name">apotheca</span>
              <span className="catalog-card__summary">
                a handheld DAW for retro gaming devices. self-contained, fast,
                free, and open source.
              </span>
              <span className="catalog-card__plate">
                <span>shapetaker</span>
                <span>open source</span>
              </span>
            </span>
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
