import Link from "next/link";
import { siteNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label="SHAPETAKER home">
        <span aria-hidden="true">
          SHAPETA<span className="brand-alt-glyph">&#xf02d;</span>E<span className="brand-alt-glyph">&#xf02e;</span>
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
