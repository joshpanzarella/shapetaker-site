import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, Download, ExternalLink, Music, VolumeX, Send, Waves } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export const metadata = {
  title: "apotheca | shapetaker",
  description: "A handheld DAW for retro gaming devices. Self-contained, fast, free, and open source.",
};

const features = [
  {
    icon: Music,
    title: "instant chords",
    description:
      "Chord packs stored as plain JSON you can freely edit. Hold Y and drop a chord straight onto the piano roll, arrows pick the chord and inversion, R1 switches packs.",
  },
  {
    icon: VolumeX,
    title: "panic",
    description:
      "A MIDI-panic-style kill switch that stops all sound no matter what is happening. Too loud, too dissonant, all four shoulder buttons at once and it is gone.",
  },
  {
    icon: Send,
    title: "throw",
    description:
      "Fling any single chord or note to a bus for just that instance. Not quite send automation, a fast way to splash sauce on one moment of a lead line.",
  },
  {
    icon: Waves,
    title: "stretched samples",
    description:
      "Fit any sample to the duration you choose, measured in steps or bars, while keeping its pitch. No more nudging breaks to length by hand.",
  },
];

export default function ApothecaPage() {
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
            <h1 className="project-page__title">apotheca</h1>
            <p className="project-page__tagline">
              A handheld DAW for retro gaming devices. Self-contained,
              controller-fast, and free forever, no samples required,
              samples welcome.
            </p>
            <div className="spec-row" aria-label="project specifications">
              <span>alpha</span>
              <span>open source</span>
              <span>Anbernic RG40XXV</span>
            </div>
            <div className="project-page__actions">
              <Link
                className="button button--primary"
                href="https://github.com/joshpanzarella/apotheca/releases/latest/download/apotheca-rg40xxv.img.gz"
              >
                <Download size={15} aria-hidden="true" />
                download image
              </Link>
              <Link
                className="button button--ghost"
                href="https://github.com/joshpanzarella/apotheca"
              >
                <ExternalLink size={15} aria-hidden="true" />
                view on github
              </Link>
              <Link className="inline-link" href="/blog/introducing-apotheca">
                read the announcement
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                className="inline-link"
                href="https://github.com/joshpanzarella/apotheca/blob/main/docs/manual.md"
              >
                <BookOpen size={16} aria-hidden="true" />
                read the manual
              </Link>
              <span className="project-page__cta-note">v0.827 · 37 MB · etch to microSD</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={300}>
          <div className="project-screenshot" aria-label="Apotheca song view screenshot">
            <Image
              src="/blog/apotheca/song.png"
              alt="Apotheca song view showing three tracks across eight scenes"
              width={640}
              height={480}
              sizes="(max-width: 860px) calc(100vw - 2rem), 48vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
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
            <span className="eyebrow">current state</span>
            <h2>alpha, and growing.</h2>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={150}>
          <div className="project-prose">
            <p>
              Apotheca runs on its own custom firmware image and already
              covers the core of songwriting: up to 12 instruments per song,
              64 scenes, 7 synth engines with presets, per-track effects with
              echo and space buses, grid-locked modulation, MIDI in, and
              Wi-Fi sample transfer.
            </p>
            <p>
              The full rundown, including the tracker saga that led here,
              lives in the announcement post.
            </p>
            <p>
              <Link className="inline-link" href="/blog/introducing-apotheca">
                introducing: apotheca
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="content-band">
        <FadeIn direction="up">
          <div className="project-availability">
            <span className="eyebrow">pricing</span>
            <h2>free, forever.</h2>
            <p>
              Apotheca is free and open source, and always will be.{" "}
              <Link
                className="inline-link"
                href="https://github.com/joshpanzarella/apotheca/releases/latest/download/apotheca-rg40xxv.img.gz"
              >
                Download the v0.827 image
                <ArrowRight size={16} aria-hidden="true" />
              </Link>{" "}
              (37 MB), etch it to a microSD card, and fire it up, or browse
              all{" "}
              <Link
                className="inline-link"
                href="https://github.com/joshpanzarella/apotheca/releases"
              >
                releases
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
