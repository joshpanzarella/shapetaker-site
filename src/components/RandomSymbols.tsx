"use client";

import { useEffect, useState } from "react";

const alchemicalSymbols = [
  "🜀", "🜁", "🜂", "🜃", "🜄", "🜅", "🜆", "🜇", "🜈", "🜉", "🜊", "🜋", "🜌", "🜍", "🜎", "🜏",
  "🜐", "🜑", "🜒", "🜓", "🜔", "🜕", "🜖", "🜗", "🜘", "🜙", "🜚", "🜛", "🜜", "🜝", "🜞", "🜟",
  "🜠", "🜡", "🜢", "🜣", "🜤", "🜥", "🜦", "🜧", "🜨", "🜩", "🜪", "🜫", "🜬", "🜭", "🜮", "🜯",
  "🜰", "🜱", "🜲", "🜳", "🜴", "🜵", "🜶", "🜷", "🜸", "🜹", "🜺", "🜻", "🜼", "🜽", "🜾", "🜿",
  "🝊", "🝋", "🝌", "🝍", "🝎", "🝏", "🝐", "🝑", "🝒", "🝓", "🝔", "🝕", "🝖", "🝗", "🝘", "🝙"
];

export function RandomSymbols() {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    function generateSymbols() {
      // Calculate how many fit based on window width.
      // Assuming ~3.5rem (56px) space per symbol and 4rem (64px) total horizontal padding
      const availableWidth = window.innerWidth - 64; 
      const count = Math.max(3, Math.floor(availableWidth / 56));
      
      const randomSymbols = Array.from({ length: count }).map(
        () => alchemicalSymbols[Math.floor(Math.random() * alchemicalSymbols.length)]
      );
      setSymbols(randomSymbols);
    }

    generateSymbols();
    
    // Re-calculate when the window is resized
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(generateSymbols, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return a stable placeholder of the same height during server render to prevent layout shift
  if (symbols.length === 0) {
    return <div className="source-strip" style={{ minHeight: '3.4rem', padding: '1rem 2rem' }} />;
  }

  return (
    <div 
      className="source-strip" 
      aria-hidden="true" 
      style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'nowrap', 
        justifyContent: 'space-between', 
        opacity: 0.6, 
        fontSize: '1.4rem', 
        lineHeight: 1, 
        overflow: 'hidden', 
        width: '100%', 
        padding: '1rem 2rem' 
      }}
    >
      {symbols.map((sym, i) => (
        <span key={i} style={{ flexShrink: 0, display: 'inline-flex', justifyContent: 'center' }}>
          {sym}
        </span>
      ))}
    </div>
  );
}
