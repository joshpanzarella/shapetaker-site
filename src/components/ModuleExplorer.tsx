"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { alchemicalSymbols } from "@/lib/symbols";
import { MousePointer2, Settings2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Hotspot, ModuleExplorerData } from "@/data/modules";
import { FadeIn } from "./FadeIn";

type ModuleExplorerProps = {
  module: ModuleExplorerData;
};

export function ModuleExplorer({ module }: ModuleExplorerProps) {
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

  return (
    <section
      className="module-explorer"
      data-orientation={isVertical ? "vertical" : "horizontal"}
      style={
        {
          "--panel-ratio": module.panelImage
            ? `${module.panelImage.height / module.panelImage.width}`
            : undefined
        } as React.CSSProperties
      }
      aria-label={`${module.name} interactive controls`}
    >
      <span className="alchemical-symbol alchemical-symbol--panel" style={{ "--glow-color": "var(--symbol-white)" } as React.CSSProperties} aria-hidden="true">{symbols[2]}</span>
      <span className="alchemical-symbol alchemical-symbol--readout" style={{ "--glow-color": "var(--symbol-purple)" } as React.CSSProperties} aria-hidden="true">{symbols[0]}</span>
      <span className="alchemical-symbol alchemical-symbol--overview" style={{ "--glow-color": "var(--symbol-teal)" } as React.CSSProperties} aria-hidden="true">{symbols[1]}</span>

      <FadeIn direction="right" delay={1150} duration={3.0} className={`panel-stage${module.panelImage ? " panel-stage--image" : ""}`}>
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
              sizes="(max-width: 860px) calc(100vw - 2rem), 420px"
              priority={module.name === "clairaudient"}
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
      </FadeIn>

      <FadeIn as="aside" direction="left" delay={1550} duration={3.0} className="control-readout" aria-live="polite">
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
              </>
            ) : null}
          </div>
        ) : null}
        <span className="readout-kicker">
          <ReadoutIcon size={16} aria-hidden="true" />
          {isContextMode ? "context menu" : "control focus"}
        </span>
        <h2 key={readoutTitle}>{readoutTitle}</h2>
        <div className="readout-scroll">
          <p>{readoutDescription}</p>
          
          {!isContextMode && activeControl?.diagrams && activeControl.diagrams.length > 0 ? (
            <div className="control-diagrams">
              {activeControl.diagrams.map((diagram) => {
                return (
                  <div key={diagram.id} className="control-diagram">
                    {activeControl.type === "switch" ? (
                      <div className="control-diagram__switch">
                        <div 
                          className="control-diagram__switch-bat" 
                          style={{ transform: `rotate(${diagram.state === 'up' ? 0 : 180}deg)` }} 
                        />
                      </div>
                    ) : activeControl.type === "meter" ? null : (
                      <div className="control-diagram__knob">
                        <div 
                          className="control-diagram__knob-indicator" 
                          style={{ transform: `rotate(${diagram.rotation}deg)` }} 
                        />
                      </div>
                    )}
                    <div className="control-diagram__content">
                      {diagram.svg ? (
                        <span 
                          style={{ display: 'flex' }}
                          dangerouslySetInnerHTML={{ 
                            __html: `<svg viewBox="0 0 24 24" width="${activeControl.type === 'meter' ? '40' : '28'}" height="${activeControl.type === 'meter' ? '40' : '28'}" class="control-diagram__icon">${diagram.svg}</svg>`
                          }}
                        />
                      ) : diagram.icon ? (
                        (() => {
                          const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[diagram.icon] || LucideIcons.Circle;
                          return <IconComponent size={28} className="control-diagram__icon" />;
                        })()
                      ) : null}
                      <span className="control-diagram__label">{diagram.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn as="aside" direction="left" delay={1950} duration={3.0} className="module-overview" aria-hidden={isVertical ? "false" : "true"}>
        <span className="overview-eyebrow">{module.status}</span>
        <h3 className="overview-title">{module.name}</h3>
        <p className="overview-subtitle">{module.subtitle}</p>
        <p className="overview-summary">{module.summary}</p>
      </FadeIn>
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
