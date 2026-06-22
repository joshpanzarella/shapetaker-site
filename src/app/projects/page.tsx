import { MorphingTitle } from "@/components/MorphingTitle";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjects } from "@/lib/projects";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "projects | shapetaker"
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="page-shell">
      <FadeIn direction="up">
        <section className="page-heading">
          <span className="eyebrow">project library</span>
          <MorphingTitle title="select a project." as="h1" />
          <p>
            browse module panel renders, manuals, and future audio or software projects from one place.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={200} direction="up" className="w-full">
        <ProjectGallery projects={projects} />
      </FadeIn>
    </main>
  );
}
