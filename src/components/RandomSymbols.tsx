"use client";

import { useEffect, useRef, useState } from "react";

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

function countForWidth(width: number) {
  return Math.max(3, Math.floor((width - 64) / 56));
}

export function RandomSymbols() {
  // poolRef holds a large stable bank of symbols generated once on mount.
  // On resize we only change how many we show — never re-randomize.
  const poolRef = useRef<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const maxCount = countForWidth(window.innerWidth);
    // Generate a pool larger than we'll ever need so extending never requires new picks.
    const pool = Array.from({ length: 80 }, () =>
      alchemicalSymbols[Math.floor(Math.random() * alchemicalSymbols.length)]
    );
    poolRef.current = pool;
    setCount(maxCount);

    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setCount(countForWidth(window.innerWidth)));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="source-strip" aria-hidden="true">
      {poolRef.current.slice(0, count).map((sym, i) => (
        <span key={i}>{sym}</span>
      ))}
    </div>
  );
}
