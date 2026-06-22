import Link from "next/link";
import { ArrowLeft, Download, BookOpen, Headphones, Mic, Speaker } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "understanding sound field | shapetaker",
  description: "A field manual for sound in physical space — room acoustics, microphone placement, and practical application.",
};

const chapters = [
  {
    icon: Speaker,
    title: "room acoustics",
    description:
      "How sound behaves in enclosed spaces. Reflections, standing waves, modal frequency distribution, and the way materials absorb or scatter energy.",
  },
  {
    icon: Mic,
    title: "microphone placement",
    description:
      "Techniques for capturing a sound field accurately. Near-field, far-field, stereo configurations, and how distance changes the character of a recording.",
  },
  {
    icon: Headphones,
    title: "practical application",
    description:
      "Real-world exercises and annotated examples that connect acoustic theory to decisions you make at the session, in the room, with the gear you have.",
  },
];

export default function UnderstandingSoundFieldPage() {
  return (
    <main>
      <section className="project-page__hero">
        <FadeIn direction="up" delay={50}>
          <div className="module-page__intro">
            <Link className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" />
              projects
            </Link>
            <span className="eyebrow">publication</span>
            <h1 className="project-page__title">understanding sound field</h1>
            <p className="project-page__tagline">
              A field manual for sound in physical space. Covers the principles
              behind room acoustics, microphone placement, and practical
              listening — written for producers, engineers, and curious ears.
            </p>
            <div className="spec-row" aria-label="project specifications">
              <span>coming soon</span>
              <span>PDF download</span>
              <span>print-ready</span>
            </div>
            <div className="project-page__actions">
              <button className="button button--primary" disabled aria-disabled="true">
                <Download size={15} aria-hidden="true" />
                download PDF
              </button>
              <span className="project-page__cta-note">available when ready</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={300}>
          <div className="project-cover" aria-label="manual cover placeholder">
            <BookOpen size={48} aria-hidden="true" />
            <span>cover image</span>
            <span className="project-cover__sub">replace with cover art when ready</span>
          </div>
        </FadeIn>
      </section>

      <section className="content-band content-band--dark">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">contents</span>
            <h2>what's inside.</h2>
          </div>
        </FadeIn>
        <div className="stack-grid">
          {chapters.map((chapter, i) => {
            const Icon = chapter.icon;
            return (
              <FadeIn key={chapter.title} direction="up" delay={100 + i * 100}>
                <article className="stack-tile h-full">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">how to use this manual</span>
            <h2>built for the session, not the shelf.</h2>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <div className="project-prose">
            <p>
              Each section is written to be read in pieces. You don't need to
              start at the front — if you're solving a specific problem in a
              room or a recording, you can open directly to the relevant chapter.
              Annotations throughout connect theory to the practical decisions
              that come up in real sessions.
            </p>
            <p>
              Diagrams are included for spatial concepts that are hard to
              describe in text. Where possible, the examples use common
              situations: a treated home studio, an untreated room, a live
              space, an outdoor field recording.
            </p>
            <p>
              The manual is designed to print well at A4 or US Letter.
              A digital version optimized for tablet reading will also be
              available.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="project-availability">
            <span className="eyebrow">availability</span>
            <h2>in progress.</h2>
            <p>
              The manual is currently being written and laid out. Drop back here
              when the status changes to see the download link appear above.
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
