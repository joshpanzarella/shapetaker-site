"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import type { ProjectKind, ProjectSummary } from "@/lib/projects";

type ProjectGalleryProps = {
  projects: ProjectSummary[];
};

const allFilter = "all";
type ProjectFilter = ProjectKind | typeof allFilter;

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeKind, setActiveKind] = useState<ProjectFilter>(allFilter);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [symbolsLeft, setSymbolsLeft] = useState<string[]>(Array(4).fill(alchemicalSymbols[0]));
  const [symbolsRight, setSymbolsRight] = useState<string[]>(Array(4).fill(alchemicalSymbols[1]));

  useEffect(() => {
    const shuffled = [...alchemicalSymbols].sort(() => 0.5 - Math.random());
    setSymbolsLeft(shuffled.slice(0, 4));
    setSymbolsRight(shuffled.slice(4, 8));
  }, [activeSlug]);

  const kinds = useMemo(
    (): ProjectFilter[] => [allFilter, ...Array.from(new Set(projects.map((project) => project.kind)))],
    [projects]
  );

  const filteredProjects = useMemo(
    () =>
      activeKind === allFilter
        ? projects
        : projects.filter((project) => project.kind === activeKind),
    [activeKind, projects]
  );

  const activeProject =
    filteredProjects.find((project) => project.slug === activeSlug) ??
    filteredProjects[0] ??
    projects[0];

  function selectKind(kind: ProjectFilter) {
    setActiveKind(kind);
    const nextProject =
      kind === allFilter ? projects[0] : projects.find((project) => project.kind === kind);
    setActiveSlug(nextProject?.slug ?? "");
  }

  if (!projects.length) {
    return null;
  }

  return (
    <section className="project-gallery" aria-label="project gallery">
      <div className="project-gallery__controls">
        <div className="gallery-tabs" aria-label="project type filter">
          {kinds.map((kind) => (
            <button
              key={kind}
              className={kind === activeKind ? "is-active" : ""}
              type="button"
              onClick={() => selectKind(kind)}
            >
              {kind}
            </button>
          ))}
        </div>
        <label className="project-select">
          <span>select project</span>
          <select value={activeProject.slug} onChange={(event) => setActiveSlug(event.target.value)}>
            {filteredProjects.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="project-gallery__layout">
        <div className="project-preview">
          {activeProject.image ? (
            <Image
              src={activeProject.image.src}
              alt={activeProject.image.alt}
              fill
              sizes="(max-width: 860px) calc(100vw - 2rem), 48vw"
            />
          ) : (
            <div className="project-preview__empty">
              <Images size={30} aria-hidden="true" />
            </div>
          )}
        </div>

        <aside className="project-detail">
          <span className="eyebrow">{activeProject.status}</span>
          <h3 key={activeProject.title} style={{ display: 'flex', gap: '0px' }}>
            {activeProject.title.split("").map((char, i) => {
              const speeds = [0.6, 0.9, 0.75, 1.0, 0.65, 1.2];
              const isCW = i % 2 === 0;
              return (
                <span 
                  key={i} 
                  className="crazy-letter-spin"
                  style={{
                    animation: `${isCW ? 'spinCW' : 'spinCCW'} ${speeds[i % speeds.length]}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h3>
          <p>{activeProject.summary}</p>
          {activeProject.href ? (
            <Link className="button button--primary" href={activeProject.href}>
              <span style={{ display: 'inline-flex', gap: '0.6rem', paddingRight: '0.6rem', alignItems: 'center' }}>
                {symbolsLeft.map((sym, i) => (
                  <span key={i} style={{ fontSize: '1.2em', lineHeight: 1 }}>{sym}</span>
                ))}
              </span>
              open
              <span style={{ display: 'inline-flex', gap: '0.6rem', paddingLeft: '0.6rem', alignItems: 'center' }}>
                {symbolsRight.map((sym, i) => (
                  <span key={i} style={{ fontSize: '1.2em', lineHeight: 1 }}>{sym}</span>
                ))}
              </span>
            </Link>
          ) : (
            <span className="project-detail__note">project page not configured yet</span>
          )}
        </aside>
      </div>

      <div className="project-strip" aria-label="project thumbnails">
        {filteredProjects.map((project) => (
          <button
            key={project.slug}
            className={project.slug === activeProject.slug ? "is-active" : ""}
            type="button"
            onClick={() => setActiveSlug(project.slug)}
          >
            <span className="jitter-text">
              {project.title.split("").map((char, i) => {
                const speeds = [2.0, 3.2, 2.4, 3.8, 2.6, 4.0];
                const dirs = ["normal", "reverse", "reverse", "normal", "reverse", "normal"];
                return (
                  <span 
                    key={i} 
                    className="jitter-char"
                    style={{
                      '--spin-speed': `${speeds[i % speeds.length]}s`,
                      '--spin-dir': dirs[i % dirs.length]
                    } as React.CSSProperties}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </span>
            <small>{project.status}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
