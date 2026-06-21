"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Headphones, Cable } from "lucide-react";
import type { SuggestedPatch, PatchNode, PatchPort } from "@/data/modules";

type PatchWalkerProps = {
  patches: SuggestedPatch[];
};

export function PatchWalker({ patches }: PatchWalkerProps) {
  const [patchIndex, setPatchIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const patch = patches[patchIndex];
  if (!patch) return null;

  const totalSteps = patch.steps.length;
  const isComplete = started && stepIndex >= totalSteps;

  const cableStepMap = new Map<string, number>();
  patch.steps.forEach((step, i) => {
    step.cableIds.forEach((id) => cableStepMap.set(id, i));
  });

  function getCableState(cableId: string): "complete" | "active" | "upcoming" {
    if (!started) return "upcoming";
    const cableStep = cableStepMap.get(cableId) ?? 0;
    if (isComplete || cableStep < stepIndex) return "complete";
    if (cableStep === stepIndex) return "active";
    return "upcoming";
  }

  function getPortPos(nodeId: string, portId: string): [number, number] | null {
    const node = patch.nodes.find((n) => n.id === nodeId);
    if (!node) return null;
    const port = node.ports.find((p) => p.id === portId);
    if (!port) return null;
    const x = port.side === "right" ? node.x + node.width : node.x;
    const y = node.y + port.offsetY;
    return [x, y];
  }

  function handleStart() {
    setStarted(true);
    setStepIndex(0);
  }

  function handleNext() {
    if (stepIndex < totalSteps) setStepIndex(stepIndex + 1);
  }

  function handlePrev() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function handleRestart() {
    setStarted(false);
    setStepIndex(0);
  }

  const currentStep = patch.steps[stepIndex];
  const activeCableIds = new Set(currentStep?.cableIds ?? []);

  return (
    <div className="patch-walker">
      {patches.length > 1 && (
        <div className="patch-walker__tabs" role="tablist" aria-label="suggested patches">
          {patches.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === patchIndex}
              className={`patch-tab${i === patchIndex ? " is-active" : ""}`}
              onClick={() => {
                setPatchIndex(i);
                setStarted(false);
                setStepIndex(0);
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      <div className="patch-walker__body">
        <div className="patch-walker__diagram" aria-label={`${patch.title} patch diagram`}>
          <svg viewBox={patch.viewBox} aria-hidden="true">
            {patch.nodes.map((node) => (
              <NodeShape key={node.id} node={node} />
            ))}
            {patch.cables.map((cable) => {
              const fromPos = getPortPos(cable.fromNode, cable.fromPort);
              const toPos = getPortPos(cable.toNode, cable.toPort);
              if (!fromPos || !toPos) return null;
              const [fx, fy] = fromPos;
              const [tx, ty] = toPos;
              const dx = Math.max(Math.abs(tx - fx) * 0.5, 40);
              const d = `M ${fx} ${fy} C ${fx + dx} ${fy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
              const state = getCableState(cable.id);
              return (
                <path
                  key={cable.id}
                  d={d}
                  stroke={cable.color}
                  fill="none"
                  strokeLinecap="round"
                  className={`patch-cable patch-cable--${state}`}
                  data-active={activeCableIds.has(cable.id) ? "true" : undefined}
                />
              );
            })}
          </svg>
        </div>

        <div className="patch-walker__panel">
          {!started ? (
            <>
              <span className={`patch-difficulty patch-difficulty--${patch.difficulty}`}>
                {patch.difficulty}
              </span>
              <h3 className="patch-title">{patch.title}</h3>
              <p className="patch-description">{patch.description}</p>
              <button className="patch-start-btn" onClick={handleStart}>
                <Cable size={15} aria-hidden="true" />
                start patch
              </button>
            </>
          ) : isComplete ? (
            <>
              <span className="patch-complete-label">patch complete</span>
              <p className="patch-step__instruction">
                all connections made. experiment with the Z Fine Tune knob for subtle detuning, or swap the LFO waveform for a different crossfade character.
              </p>
              {patch.audioUrl && (
                <div className="patch-audio">
                  <span className="patch-audio__label">
                    <Headphones size={13} aria-hidden="true" />
                    demo recording
                  </span>
                  <audio controls src={patch.audioUrl} />
                </div>
              )}
              <button className="patch-restart-btn" onClick={handleRestart}>
                <RotateCcw size={13} aria-hidden="true" />
                restart
              </button>
            </>
          ) : (
            <>
              <span className="patch-step-counter">
                step {stepIndex + 1} / {totalSteps}
              </span>
              <p className="patch-step__instruction">{currentStep.instruction}</p>
              {currentStep.detail && (
                <p className="patch-step__detail">{currentStep.detail}</p>
              )}
              <div className="patch-step__nav">
                <button
                  className="patch-nav-prev"
                  onClick={handlePrev}
                  disabled={stepIndex === 0}
                  aria-label="previous step"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  prev
                </button>
                <button className="patch-nav-next" onClick={handleNext}>
                  {stepIndex === totalSteps - 1 ? "finish" : "next step"}
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NodeShape({ node }: { node: PatchNode }) {
  const HEADER_HEIGHT = 44;
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={3}
        className="patch-node"
      />
      <line
        x1={node.x}
        y1={node.y + HEADER_HEIGHT}
        x2={node.x + node.width}
        y2={node.y + HEADER_HEIGHT}
        className="patch-node__divider"
      />
      <text
        x={node.x + node.width / 2}
        y={node.y + 17}
        textAnchor="middle"
        className="patch-node__label"
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x + node.width / 2}
          y={node.y + 31}
          textAnchor="middle"
          className="patch-node__sublabel"
        >
          {node.sublabel}
        </text>
      )}
      {node.ports.map((port) => (
        <PortShape key={port.id} node={node} port={port} />
      ))}
    </g>
  );
}

function PortShape({ node, port }: { node: PatchNode; port: PatchPort }) {
  const px = port.side === "right" ? node.x + node.width : node.x;
  const py = node.y + port.offsetY;
  const labelX = port.side === "right" ? px - 8 : px + 8;
  const anchor = port.side === "right" ? "end" : "start";
  return (
    <g>
      <circle cx={px} cy={py} r={4} className="patch-port" />
      <text x={labelX} y={py + 4} textAnchor={anchor} className="patch-port__label">
        {port.label}
      </text>
    </g>
  );
}
