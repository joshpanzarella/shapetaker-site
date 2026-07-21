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
          <MorphingTitle title="first release." as="h1" />
          <p>
            clairaudient leads the shapetaker series — open the panel to learn the device through
            its interactive manual. more modules are on the bench and will surface here as they ship.
          </p>
        </section>
      </FadeIn>

      <ModuleCatalog />
    </main>
  );
}
