import Link from "next/link";
import Image from "next/image";
import { getVisibleModules } from "@/data/modules";
import { FadeIn } from "@/components/FadeIn";

export function ModuleCatalog() {
  const modules = getVisibleModules();

  return (
    <div className="catalog-grid">
      {modules.map((module, index) => (
        <FadeIn key={module.slug} delay={80 + (index % 4) * 70} direction="up" className="h-full">
          <Link className="catalog-card h-full" href={`/modules/${module.slug}`}>
            <span className="catalog-card__rack">
              {module.panelImage && (
                <Image
                  src={module.panelImage.src}
                  alt={module.panelImage.alt}
                  width={module.panelImage.width}
                  height={module.panelImage.height}
                  sizes="(max-width: 560px) 90vw, 320px"
                />
              )}
            </span>
            <span className="catalog-card__body">
              <span className="catalog-card__status">{module.status}</span>
              <span className="catalog-card__name">{module.name}</span>
              <span className="catalog-card__summary">{module.summary}</span>
              <span className="catalog-card__plate">
                <span>{module.typeplate?.unit ?? "shapetaker"}</span>
                <span>{module.hp} hp</span>
              </span>
            </span>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
