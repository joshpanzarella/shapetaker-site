"use client";

import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProjectKind, ProjectSummary } from "@/lib/projects";
import { MorphingTitle } from "@/components/MorphingTitle";
import { alchemicalSymbols } from "@/lib/symbols";

type ProjectGalleryProps = {
  projects: ProjectSummary[];
};

const allFilter = "all";
type ProjectFilter = ProjectKind | typeof allFilter;

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeKind, setActiveKind] = useState<ProjectFilter>(allFilter);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  // Generate deterministic symbols based on activeSlug so it's a pure function
  const { symbolsLeft, symbolsRight } = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < activeSlug.length; i++) {
      hash = activeSlug.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Seeded random-like selection
    const getSymbol = (seed: number) => alchemicalSymbols[Math.abs(hash + seed * 13) % alchemicalSymbols.length];
    
    return {
      symbolsLeft: [getSymbol(1), getSymbol(2), getSymbol(3), getSymbol(4)],
      symbolsRight: [getSymbol(5), getSymbol(6), getSymbol(7), getSymbol(8)]
    };
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
        <div className="project-gallery__filter">
          <span className="eyebrow">project gallery</span>
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
          <MorphingTitle title={activeProject.title} />
          <p>{activeProject.summary}</p>

          {activeProject.audioSamples && activeProject.audioSamples.length > 0 && (
            <div className="project-detail__samples" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem', marginBottom: '0.5rem', flex: 1 }}>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>Sound Samples</strong>
              {activeProject.audioSamples.map((sample, i) => (
                <audio key={i} controls src={sample.url} style={{ height: '36px', width: '100%', borderRadius: '4px' }} />
              ))}
            </div>
          )}
          {activeProject.href ? (
            <Link className="button button--primary gallery-open" href={activeProject.href}>
              <span className="gallery-open__syms" aria-hidden="true">
                {symbolsLeft.map((sym, i) => (
                  <span key={i}>{sym}</span>
                ))}
              </span>
              <span className="gallery-open__label">open the interactive manual</span>
              <span className="gallery-open__syms" aria-hidden="true">
                {symbolsRight.map((sym, i) => (
                  <span key={i}>{sym}</span>
                ))}
              </span>
            </Link>
          ) : (
            <span className="project-detail__note">project page not configured yet</span>
          )}
        </aside>
      </div>

    </section>
  );
}
