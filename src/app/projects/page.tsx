import { MorphingTitle } from "@/components/MorphingTitle";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "projects | shapetaker"
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">project library</span>
        <MorphingTitle title="select a project." as="h1" />
        <p>
          browse module panel renders, manuals, and future audio or software projects from one place.
        </p>
      </section>

      <ProjectGallery projects={projects} />
    </main>
  );
}
