import Link from "next/link";
import { ArrowLeft, Save, Tag, RotateCcw, Search, Monitor } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "patch base | shapetaker",
  description: "Preset manager for VCV Rack. Save, organize, and recall complete patch states.",
};

const features = [
  {
    icon: Save,
    title: "one-click save",
    description:
      "Capture the complete state of your VCV Rack patch — module settings, cable connections, and panel positions — in a single action.",
  },
  {
    icon: Tag,
    title: "smart tagging",
    description:
      "Assign tags, categories, and notes to each preset. Build a library that reflects the way you actually work and search.",
  },
  {
    icon: RotateCcw,
    title: "full recall",
    description:
      "Restore any saved state with complete fidelity. Every knob, switch, and cable comes back exactly as you left it.",
  },
  {
    icon: Search,
    title: "instant search",
    description:
      "Find any preset by name, tag, or module. The search index updates as you save, so nothing gets buried.",
  },
];

const steps = [
  {
    number: "01",
    title: "build your patch",
    description:
      "Work in VCV Rack as you normally would. When you reach a state worth keeping, Patch Base is ready.",
  },
  {
    number: "02",
    title: "save and describe",
    description:
      "Name the preset, add a short note, and tag it. The full patch state is captured in the background.",
  },
  {
    number: "03",
    title: "recall any time",
    description:
      "Browse your library, search by tag, and restore a preset. Patch Base handles the rest.",
  },
];

export default function PatchBasePage() {
  return (
    <main>
      <section className="project-page__hero">
        <FadeIn direction="up" delay={50}>
          <div className="module-page__intro">
            <Link className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" />
              projects
            </Link>
            <span className="eyebrow">software</span>
            <h1 className="project-page__title">patch base</h1>
            <p className="project-page__tagline">
              A preset manager built for VCV Rack. Save, organize, and recall
              complete patch states — so the sounds you find don't disappear
              when you close the session.
            </p>
            <div className="spec-row" aria-label="project specifications">
              <span>in development</span>
              <span>VCV Rack plugin</span>
              <span>paid license</span>
            </div>
            <div className="project-page__actions">
              <button className="button button--primary" disabled aria-disabled="true">
                <Monitor size={15} aria-hidden="true" />
                get notified
              </button>
              <span className="project-page__cta-note">availability TBD</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={300}>
          <div className="project-screenshot" aria-label="app screenshot placeholder">
            <Monitor size={48} aria-hidden="true" />
            <span>app screenshot</span>
            <span className="project-cover__sub">replace with UI screenshot when ready</span>
          </div>
        </FadeIn>
      </section>

      <section className="content-band content-band--dark">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">features</span>
            <h2>what it does.</h2>
          </div>
        </FadeIn>
        <div className="stack-grid stack-grid--wide">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} direction="up" delay={100 + i * 80}>
                <article className="stack-tile h-full">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="section-heading">
            <span className="eyebrow">workflow</span>
            <h2>how it works.</h2>
          </div>
        </FadeIn>
        <div className="patch-base__steps">
          {steps.map((step, i) => (
            <FadeIn key={step.number} direction="up" delay={100 + i * 120}>
              <div className="patch-base__step">
                <span className="patch-base__step-num" aria-hidden="true">{step.number}</span>
                <div>
                  <h3 className="patch-base__step-title">{step.title}</h3>
                  <p className="patch-base__step-body">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="project-availability">
            <span className="eyebrow">pricing</span>
            <h2>paid license, one time.</h2>
            <p>
              Patch Base will be sold as a one-time license — no subscription.
              Pricing is not yet set. Check back as development progresses, or
              watch the status pill above for updates.
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
