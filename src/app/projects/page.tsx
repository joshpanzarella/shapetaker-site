import { MorphingTitle } from "@/components/MorphingTitle";
import { ModuleCatalog } from "@/components/ModuleCatalog";
import { getVisibleModules } from "@/data/modules";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "projects | shapetaker"
};

export default function ProjectsPage() {
  const moduleCount = getVisibleModules().length;

  return (
    <main className="page-shell">
      <FadeIn direction="up">
        <section className="page-heading">
          <span className="eyebrow">module catalog</span>
          <MorphingTitle title="the full rack." as="h1" />
          <p>
            {moduleCount} modules in the shapetaker series — every panel links to its interactive manual.
          </p>
        </section>
      </FadeIn>

      <ModuleCatalog />
    </main>
  );
}
