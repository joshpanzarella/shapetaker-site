"use client";

import Link from "next/link";
import { siteNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className="site-header"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <Link className="brand-mark" href="/" aria-label="SHAPETAKER home">
        <span aria-hidden="true">
          SH<span className="brand-alch-glyph">🜂</span>PET<span className="brand-alch-glyph" style={{ marginLeft: "-0.15em" }}>🜂</span><span className="brand-alt-glyph">&#xf02d;</span>E<span className="brand-alt-glyph">&#xf02e;</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="primary navigation">
        {siteNav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
