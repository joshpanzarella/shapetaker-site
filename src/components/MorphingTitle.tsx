"use client";

import { useMemo } from "react";

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

const speeds = [1.2, 1.7, 1.0, 2.0, 1.4, 1.8];

export function MorphingTitle({ title, as: Tag = "h3", speedMultiplier = 1.0 }: { title: string; as?: "h1" | "h2" | "h3" | "h4" | "div" | "span"; speedMultiplier?: number }) {
  const words = title.split(" ");
  let charIndex = 0;

  return (
    <Tag style={{ display: 'flex', flexWrap: 'wrap', gap: '0em 0.3em' }}>
      {words.map((word, wIdx) => {
        const wordChars = word.split("");
        const startIdx = charIndex;
        charIndex += wordChars.length + 1; // advance index including the space
        
        return (
          <span key={`${word}-${wIdx}`} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {wordChars.map((char, i) => (
              <MorphingChar key={`${char}-${startIdx + i}`} targetChar={char} index={startIdx + i} speedMultiplier={speedMultiplier} />
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

function MorphingChar({ targetChar, index, speedMultiplier }: { targetChar: string; index: number; speedMultiplier: number }) {
  // Use deterministic hash so we don't need useEffect or Math.random
  const symbol = useMemo(() => {
    const hash = targetChar.charCodeAt(0) + index * 31;
    return alchemicalSymbols[hash % alchemicalSymbols.length];
  }, [targetChar, index]);

  const isCW = index % 2 === 0;
  const spinSpeed = speeds[index % speeds.length];
  const fadeSpeed = spinSpeed * speedMultiplier;

  if (targetChar === " ") {
    return (
      <span className="crazy-letter-spin" style={{ animation: `${isCW ? 'spinCW' : 'spinCCW'} ${spinSpeed}s ease-out forwards` }}>
        {"\u00A0"}
      </span>
    );
  }

  return (
    <span 
      className="crazy-letter-spin"
      style={{
        animation: `${isCW ? 'spinCW' : 'spinCCW'} ${spinSpeed}s ease-out forwards`,
        position: "relative",
        display: "inline-flex",
        color: "var(--text-accent)",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <span 
        style={{ 
          position: "absolute", 
          animation: `crossfadeOut ${fadeSpeed}s ease-out forwards`,
          fontFamily: "sans-serif"
        }}
      >
        {symbol}
      </span>
      
      <span 
        style={{ 
          animation: `crossfadeIn ${fadeSpeed}s ease-out forwards`,
          opacity: 0
        }}
      >
        {targetChar}
      </span>
    </span>
  );
}
