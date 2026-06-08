"use client";

import { useMemo } from "react";

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

const speeds = [1.8, 2.4, 1.5, 2.8, 2.0, 2.6];

export function MorphingTitle({ title, as: Tag = "h3" }: { title: string; as?: "h2" | "h3" | "h4" | "div" | "span" }) {
  return (
    <Tag style={{ display: 'flex', gap: '0px' }}>
      {title.split("").map((char, i) => (
        <MorphingChar key={`${title}-${i}`} targetChar={char} index={i} />
      ))}
    </Tag>
  );
}

function MorphingChar({ targetChar, index }: { targetChar: string; index: number }) {
  // Use deterministic hash so we don't need useEffect or Math.random
  const symbol = useMemo(() => {
    const hash = targetChar.charCodeAt(0) + index * 31;
    return alchemicalSymbols[hash % alchemicalSymbols.length];
  }, [targetChar, index]);

  const isCW = index % 2 === 0;
  const speed = speeds[index % speeds.length];

  if (targetChar === " ") {
    return (
      <span className="crazy-letter-spin" style={{ animation: `${isCW ? 'spinCW' : 'spinCCW'} ${speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards` }}>
        {"\u00A0"}
      </span>
    );
  }

  return (
    <span 
      className="crazy-letter-spin"
      style={{
        animation: `${isCW ? 'spinCW' : 'spinCCW'} ${speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
        position: "relative",
        display: "inline-flex",
        color: "var(--teal)",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <span 
        style={{ 
          position: "absolute", 
          animation: `crossfadeOut ${speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          fontFamily: "sans-serif"
        }}
      >
        {symbol}
      </span>
      
      <span 
        style={{ 
          animation: `crossfadeIn ${speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          opacity: 0
        }}
      >
        {targetChar}
      </span>
    </span>
  );
}
