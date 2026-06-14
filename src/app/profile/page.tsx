import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, CircuitBoard, DraftingCompass, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: "profile | shapetaker",
  description: "an unlisted profile page for people evaluating Josh Panzarella's work.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

const strengths = [
  {
    title: "musical systems",
    description:
      "I work on tools where sound, interaction, and visual feedback have to feel coherent in real use.",
    icon: Waves
  },
  {
    title: "product-minded engineering",
    description:
      "I like turning rough instrument ideas into usable interfaces, documentation, and repeatable workflows.",
    icon: DraftingCompass
  },
  {
    title: "technical implementation",
    description:
      "This site connects TypeScript, React, MDX content, static generation, and a growing VCV Rack module library.",
    icon: CircuitBoard
  }
];

const fitNotes = [
  "audio software, creative tools, or interactive product work",
  "front-end engineering with strong visual and systems taste",
  "small teams where design judgment and implementation both matter",
  "roles that benefit from clear documentation and careful technical communication"
];

export default function ProfilePage() {
  return (
    <main>
      <section className="profile-hero">
        <div className="profile-hero__copy">
          <span className="eyebrow">unlisted profile</span>
          <h1>Josh Panzarella</h1>
          <p>
            I build Shapetaker: a portfolio, manual library, and design space for modular synthesis
            tools. This page is a quieter employer-facing view of the same work.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" href="/projects">
              view projects
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button--ghost" href="/manuals">
              browse manuals
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <aside className="profile-card" aria-label="profile summary">
          <BriefcaseBusiness size={24} aria-hidden="true" />
          <h2>What to look for here</h2>
          <p>
            The site is meant to show taste, technical range, and follow-through: product pages,
            interactive documentation, visual systems, and writing around the build process.
          </p>
        </aside>
      </section>

      <section className="content-band content-band--dark">
        <div className="section-heading">
          <span className="eyebrow">working profile</span>
          <h2>where design and engineering meet.</h2>
        </div>

        <div className="stack-grid">
          {strengths.map((item) => {
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
      </section>

      <section className="profile-detail">
        <div className="profile-detail__main">
          <span className="eyebrow">fit</span>
          <h2>the kind of work I want this portfolio to signal</h2>
          <p>
            I am drawn to work that rewards both precision and feel: tools people use repeatedly,
            interfaces that need to explain themselves without getting in the way, and systems where
            small implementation details change the user experience.
          </p>
        </div>

        <div className="profile-list">
          {fitNotes.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="source-strip profile-links">
          <div>
            <span className="eyebrow">selected links</span>
            <h2>use these as entry points.</h2>
          </div>
          <div className="profile-links__actions">
            <Link className="button button--ghost" href="/projects">
              projects
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button--ghost" href="/blog">
              field notes
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
