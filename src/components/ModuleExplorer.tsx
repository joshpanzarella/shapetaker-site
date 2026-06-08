"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { MousePointer2, Settings2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Hotspot, ModuleExplorerData } from "@/data/modules";

type ModuleExplorerProps = {
  module: ModuleExplorerData;
};

export function ModuleExplorer({ module }: ModuleExplorerProps) {
  const [activeId, setActiveId] = useState(module.controls[0]?.id ?? "");
  const [readoutMode, setReadoutMode] = useState<"controls" | "context">("controls");
  const [activeContextId, setActiveContextId] = useState(module.contextMenu?.[0]?.id ?? "");
  const hasContextMenu = Boolean(module.contextMenu?.length);

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
      aria-label={`${module.name} interactive controls`}
    >
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
              <label className="context-select">
                <span>right-click menu item</span>
                <select
                  value={activeContextItem?.id}
                  onChange={(event) => setActiveContextId(event.target.value)}
                >
                  {module.contextMenu?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.group} - {item.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        ) : null}
        <span className="readout-kicker">
          <ReadoutIcon size={16} aria-hidden="true" />
          {isContextMode ? "context menu" : "control focus"}
        </span>
        <h2 key={readoutTitle} style={{ display: 'flex', gap: '0px' }}>
          {readoutTitle.split("").map((char, i) => {
            const speeds = [0.9, 1.2, 0.75, 1.4, 1.0, 1.3];
            const isCW = i % 2 === 0;
            return (
              <span 
                key={i} 
                className="crazy-letter-spin"
                style={{
                  animation: `${isCW ? 'spinCW' : 'spinCCW'} ${speeds[i % speeds.length]}s cubic-bezier(0.25, 1, 0.5, 1) forwards`
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </h2>
        <p>{readoutDescription}</p>
        {isContextMode && activeContextItem.values ? (
          <p className="context-values">{activeContextItem.values.join(" / ")}</p>
        ) : null}
        
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
                  ) : (
                    <div className="control-diagram__knob">
                      <div 
                        className="control-diagram__knob-indicator" 
                        style={{ transform: `rotate(${diagram.rotation}deg)` }} 
                      />
                    </div>
                  )}
                  <div className="control-diagram__content">
                    {diagram.svg ? (
                      <svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        className="control-diagram__icon"
                        dangerouslySetInnerHTML={{ __html: diagram.svg }}
                      />
                    ) : diagram.icon ? (
                      (() => {
                        const IconComponent = (LucideIcons as Record<string, React.ElementType>)[diagram.icon] || LucideIcons.Circle;
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
      onMouseEnter={onActivate}
    >
      <span className="hotspot__pulse" aria-hidden="true" />
    </button>
  );
}
