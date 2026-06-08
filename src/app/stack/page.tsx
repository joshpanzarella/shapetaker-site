import { Code2, FileText, Palette, Rocket, Volume2, Waypoints } from "lucide-react";

export const metadata = {
  title: "stack | shapetaker"
};

const stack = [
  {
    title: "next.js app router",
    body: "route-based pages, static export, react components, metadata, and future api support if the hosting changes.",
    icon: Code2
  },
  {
    title: "typescript",
    body: "typed module data, safer page generation, and cleaner refactors as the portfolio grows.",
    icon: Waypoints
  },
  {
    title: "tailwind css v4",
    body: "fast styling with a small global design layer for the custom rack-inspired interface.",
    icon: Palette
  },
  {
    title: "data-driven manuals",
    body: "manual content starts in typescript and can move to mdx once long-form docs need richer formatting.",
    icon: FileText
  },
  {
    title: "media-ready pages",
    body: "audio and video paths are modeled per module so demos can live with the manual experience.",
    icon: Volume2
  },
  {
    title: "static deployment",
    body: "the production build emits an `out` directory that can be uploaded to standard static hosting.",
    icon: Rocket
  }
];

export default function StackPage() {
  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">technical setup</span>
        <h1>modern stack, simple deploy target.</h1>
        <p>
          this setup keeps the site polished and interactive without locking it to a heavy backend.
        </p>
      </section>

      <section className="stack-grid stack-grid--wide" aria-label="technology stack">
        {stack.map((item) => {
          const Icon = item.icon;
          return (
            <article className="stack-tile" key={item.title}>
              <Icon size={22} aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
