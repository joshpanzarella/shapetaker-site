import Link from "next/link";
import { siteNav } from "@/lib/navigation";
import { RandomSymbols } from "@/components/RandomSymbols";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__strip">
        <RandomSymbols />
      </div>

      <div className="site-footer__body">
        <div className="site-footer__brand">
          <Link className="site-footer__wordmark" href="/" aria-label="shapetaker home">
            shapetaker
          </Link>
          <p className="site-footer__tagline">
            vcv rack modules, manuals, and audio tools.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="footer navigation">
          <span className="site-footer__col-label">navigate</span>
          {siteNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__contact">
          <span className="site-footer__col-label">get in touch</span>
          <a href="mailto:shapetakeraudio@gmail.com">shapetakeraudio@gmail.com</a>
        </div>
      </div>

      <div className="site-footer__bar">
        <span>© {year} shapetaker</span>
        <span>all module designs and documentation are original works.</span>
      </div>
    </footer>
  );
}
