"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { alchemicalSymbols } from "@/lib/symbols";
import {
  MousePointer2, Settings2,
  Activity, ArrowLeftRight, ArrowRight, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp,
  Circle, Grid3x3, Link, Minus, Plus, RefreshCw, Repeat, Shuffle, Square, Spline, Unlink, Waves, Zap,
} from "lucide-react";

const DIAGRAM_ICONS: Record<string, React.ElementType> = {
  Activity, ArrowLeftRight, ArrowRight, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp,
  Circle, Grid3x3, Link, Minus, Plus, RefreshCw, Repeat, Shuffle, Square, Spline, Unlink, Waves, Zap,
};
import type { Hotspot, ModuleExplorerData } from "@/data/modules";

type ModuleExplorerProps = {
  module: ModuleExplorerData;
};

export function ModuleExplorer({ module }: ModuleExplorerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(module.controls[0]?.id ?? "");
  const [readoutMode, setReadoutMode] = useState<"controls" | "context">("controls");
  const [activeContextId, setActiveContextId] = useState(module.contextMenu?.[0]?.id ?? "");
  const [activeGroup, setActiveGroup] = useState(module.contextMenu?.[0]?.group ?? "");
  const hasContextMenu = Boolean(module.contextMenu?.length);

  const contextGroups = useMemo(() => {
    if (!module.contextMenu) return [];
    const seen = new Set<string>();
    const groups: string[] = [];
    for (const item of module.contextMenu) {
      if (!seen.has(item.group)) { seen.add(item.group); groups.push(item.group); }
    }
    return groups;
  }, [module.contextMenu]);

  const groupItems = useMemo(
    () => module.contextMenu?.filter((item) => item.group === activeGroup) ?? [],
    [module.contextMenu, activeGroup]
  );

  useEffect(() => {
    const first = module.contextMenu?.find((item) => item.group === activeGroup);
    if (first) setActiveContextId(first.id);
  }, [activeGroup, module.contextMenu]);

  const [symbols, setSymbols] = useState(["☿", "♄", "♁"]);

  useEffect(() => {
    const idx1 = Math.floor(Math.random() * alchemicalSymbols.length);
    let idx2 = Math.floor(Math.random() * alchemicalSymbols.length);
    while (idx2 === idx1) idx2 = Math.floor(Math.random() * alchemicalSymbols.length);
    let idx3 = Math.floor(Math.random() * alchemicalSymbols.length);
    while (idx3 === idx1 || idx3 === idx2) idx3 = Math.floor(Math.random() * alchemicalSymbols.length);
    setSymbols([alchemicalSymbols[idx1], alchemicalSymbols[idx2], alchemicalSymbols[idx3]]);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compactLayout = window.matchMedia("(max-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let displayProgress = 0;
    let rafId: number | null = null;
    let observer: IntersectionObserver | null = null;
    const MAX_STEP = 0.007;

    const revealImmediately = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      displayProgress = 1;
      section.style.setProperty("--reveal-progress", "1");
      section.classList.add("is-revealed");
    };

    const animateReveal = () => {
      if (rafId !== null || section.classList.contains("is-revealed")) return;

      const tick = () => {
        displayProgress = Math.min(1, displayProgress + MAX_STEP);
        section.style.setProperty("--reveal-progress", String(displayProgress));

        if (displayProgress >= 1) {
          rafId = null;
          section.classList.add("is-revealed");
          return;
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const configureReveal = () => {
      if (
        compactLayout.matches ||
        reducedMotion.matches ||
        section.getBoundingClientRect().top < window.innerHeight * 0.68
      ) {
        revealImmediately();
        return;
      }

      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          observer = null;
          animateReveal();
        },
        {
          rootMargin: "0px 0px -32% 0px",
          threshold: 0
        }
      );
      observer.observe(section);
    };

    compactLayout.addEventListener("change", configureReveal);
    reducedMotion.addEventListener("change", configureReveal);
    configureReveal();

    return () => {
      compactLayout.removeEventListener("change", configureReveal);
      reducedMotion.removeEventListener("change", configureReveal);
      observer?.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const activeControl = useMemo(
    () => module.controls.find((control) => control.id === activeId) ?? module.controls[0],
    [activeId, module.controls]
  );

  const activeContextItem = useMemo(
    () =>
      module.contextMenu?.find((item) => item.id === activeContextId) ??
      module.contextMenu?.[0],
    [activeContextId, module.contextMenu]
  );

  const isContextMode = readoutMode === "context" && activeContextItem;
  const readoutTitle = isContextMode 
    ? activeContextItem.label 
    : (activeControl?.label ?? "Panel Unmapped");
  const readoutDescription = isContextMode
    ? activeContextItem.description
    : (activeControl?.description ?? "Interactive hotspots have not been added to this panel yet.");
  const ReadoutIcon = isContextMode ? Settings2 : MousePointer2;
  
  const isVertical = module.panelImage
    ? module.panelImage.height > module.panelImage.width
    : true;
  const panelMaxWidth = module.panelImage
    ? Math.ceil(800 * (module.panelImage.width / module.panelImage.height))
    : (module.hp ?? 12) * 35;

  return (
    <section
      ref={sectionRef}
      className="module-explorer"
      data-orientation={isVertical ? "vertical" : "horizontal"}
      style={
        {
          "--panel-ratio": module.panelImage
            ? `${module.panelImage.height / module.panelImage.width}`
            : undefined,
          "--panel-aspect": module.panelImage
            ? `${module.panelImage.width} / ${module.panelImage.height}`
            : undefined,
          "--module-hp": module.hp ?? 12
        } as React.CSSProperties
      }
      aria-label={`${module.name} interactive controls`}
    >
      <span className="alchemical-symbol alchemical-symbol--panel" style={{ "--glow-color": "var(--symbol-white)" } as React.CSSProperties} aria-hidden="true">{symbols[2]}</span>
      <span className="alchemical-symbol alchemical-symbol--readout" style={{ "--glow-color": "var(--symbol-purple)" } as React.CSSProperties} aria-hidden="true">{symbols[0]}</span>
      <span className="alchemical-symbol alchemical-symbol--overview" style={{ "--glow-color": "var(--symbol-teal)" } as React.CSSProperties} aria-hidden="true">{symbols[1]}</span>

      <div className={`panel-stage${module.panelImage ? " panel-stage--image" : ""}`}>
          <div className="rack-rail rack-rail--top" aria-hidden="true" />
        <div
          className={`rack-panel${module.panelImage ? " rack-panel--image" : ""}`}
          style={
            {
              "--module-accent": module.accent,
              "--panel-aspect": module.panelImage
                ? `${module.panelImage.width} / ${module.panelImage.height}`
                : undefined
            } as CSSProperties
          }
        >
          {module.panelImage ? (
            <Image
              className="rack-panel__image"
              src={module.panelImage.src}
              alt={module.panelImage.alt}
              fill
              sizes={`(max-width: 900px) min(calc(100vw - 2rem), ${panelMaxWidth}px), ${panelMaxWidth}px`}
              quality={90}
              priority={true}
            />
          ) : (
            <>
              <div className="rack-panel__brand">shapetaker</div>
              <div className="rack-panel__name">{module.name}</div>
              <div className="rack-panel__divider" />
              <div className="rack-panel__circuit" aria-hidden="true" />
            </>
          )}
          {module.controls.map((control) => (
            <HotspotButton
              key={control.id}
              control={control}
              isActive={control.id === activeControl.id}
              onActivate={() => {
                setActiveId(control.id);
                setReadoutMode("controls");
              }}
            />
          ))}
        </div>
        <div className="rack-rail rack-rail--bottom" aria-hidden="true" />
      </div>

      <aside className="control-readout" aria-live="polite">
        {hasContextMenu ? (
          <div className="readout-tools" aria-label={`${module.name} readout mode`}>
            <div className="readout-segment">
              <button
                className={readoutMode === "controls" ? "is-active" : ""}
                type="button"
                onClick={() => setReadoutMode("controls")}
              >
                panel
              </button>
              <button
                className={readoutMode === "context" ? "is-active" : ""}
                type="button"
                onClick={() => setReadoutMode("context")}
              >
                context
              </button>
            </div>
            {readoutMode === "context" ? (
              <>
                <label className="context-select">
                  <span>right-click item</span>
                  <select
                    value={activeGroup}
                    onChange={(e) => setActiveGroup(e.target.value)}
                  >
                    {contextGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </label>
                {groupItems.length > 1 && (
                  <div className="context-options">
                    {groupItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={activeContextId === item.id ? "is-active" : ""}
                        onClick={() => setActiveContextId(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        ) : null}
        <span className="readout-kicker">
          <ReadoutIcon size={16} aria-hidden="true" />
          {isContextMode ? "context menu" : "control focus"}
        </span>
        <h2 key={readoutTitle}>{readoutTitle}</h2>
        {!isContextMode && activeControl?.type === "jack" && activeControl.voltageRange && (
          <span className="voltage-range-tag" aria-label={`voltage range: ${activeControl.voltageRange}`}>
            {activeControl.voltageRange}
          </span>
        )}
        <div className="readout-scroll">
          {Array.isArray(readoutDescription) ? (
            <ul className="readout-bullets">
              {readoutDescription.map((item, i) => {
                const colon = item.indexOf(': ');
                return colon !== -1 ? (
                  <li key={i}><strong>{item.slice(0, colon)}</strong>{': '}{item.slice(colon + 2)}</li>
                ) : (
                  <li key={i}>{item}</li>
                );
              })}
            </ul>
          ) : (
            <p>{readoutDescription}</p>
          )}
          
          {!isContextMode && activeControl?.diagrams && activeControl.diagrams.length > 0 ? (
            <div className="control-diagrams">
              {activeControl.diagrams.map((diagram) => {
                const hasVisual = activeControl.type === "switch" || diagram.rotation !== undefined;
                const cls = [
                  "control-diagram",
                  activeControl.type === "meter" ? "control-diagram--meter" : "",
                  !hasVisual ? "control-diagram--icon-only" : "",
                ].filter(Boolean).join(" ");
                const IconComponent = diagram.icon ? (DIAGRAM_ICONS[diagram.icon] ?? Circle) : null;
                return (
                  <div key={diagram.id} className={cls}>
                    {activeControl.type === "switch" ? (
                      <div className="control-diagram__switch">
                        <div
                          className="control-diagram__switch-bat"
                          style={{ transform: `rotate(${diagram.state === 'up' ? 0 : 180}deg)` }}
                        />
                      </div>
                    ) : diagram.rotation !== undefined ? (
                      <div className="control-diagram__knob">
                        <div
                          className="control-diagram__knob-indicator"
                          style={{ transform: `rotate(${diagram.rotation}deg)` }}
                        />
                      </div>
                    ) : null}
                    <div className="control-diagram__content">
                      {diagram.tracePath ? (
                        <span
                          style={{ display: 'flex' }}
                          dangerouslySetInnerHTML={{
                            __html: `<svg viewBox="0 0 200 200" width="90" height="90" class="control-diagram__oscope"><defs><filter id="tg-${diagram.id}" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><image href="/modules/clairaudient/vintage_oscope_screen.svg" width="200" height="200"/><path fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#tg-${diagram.id})" d="${diagram.tracePath}"/></svg>`
                          }}
                        />
                      ) : diagram.svg ? (
                        <span
                          style={{ display: 'flex' }}
                          dangerouslySetInnerHTML={{
                            __html: `<svg viewBox="0 0 24 24" width="28" height="28" class="control-diagram__icon">${diagram.svg}</svg>`
                          }}
                        />
                      ) : IconComponent ? (
                        <IconComponent size={28} className="control-diagram__icon" style={diagram.color ? { color: diagram.color } : undefined} />
                      ) : null}
                      <span className="control-diagram__label">{diagram.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {module.typeplate && (
          <dl className="module-typeplate" aria-label="module identification">
            <div className="module-typeplate__row">
              <dt>unit</dt>
              <dd>{module.typeplate.unit}</dd>
            </div>
            <div className="module-typeplate__row">
              <dt>type</dt>
              <dd>{module.typeplate.type}</dd>
            </div>
            {module.typeplate.alt && (
              <div className="module-typeplate__row">
                <dt>alt</dt>
                <dd>{module.typeplate.alt}</dd>
              </div>
            )}
          </dl>
        )}
      </aside>

      <aside className="module-overview" aria-hidden={isVertical ? "false" : "true"}>
        <span className="overview-eyebrow">{module.status}</span>
        <h3 className="overview-title">{module.name}</h3>
        <p className="overview-subtitle">{module.subtitle}</p>
        <p className="overview-summary">{module.summary}</p>
      </aside>
    </section>
  );
}

type HotspotButtonProps = {
  control: Hotspot;
  isActive: boolean;
  onActivate: () => void;
};

function HotspotButton({ control, isActive, onActivate }: HotspotButtonProps) {
  return (
    <button
      className={`hotspot hotspot--${control.type}${isActive ? " is-active" : ""}`}
      style={
        {
          left: `${control.x}%`,
          top: `${control.y}%`,
          "--hotspot-size": `${control.size}%`
        } as CSSProperties
      }
      type="button"
      aria-label={`${control.label}: ${control.description}`}
      onClick={onActivate}
      onFocus={onActivate}
    >
      <span className="hotspot__pulse" aria-hidden="true" />
    </button>
  );
}
