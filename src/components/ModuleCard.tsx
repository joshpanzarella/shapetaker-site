import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ModuleSpec } from "@/data/modules";

type ModuleCardProps = {
  module: ModuleSpec;
};

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <Link className="module-card" href={`/modules/${module.slug}`}>
      <span className="module-card__topline">
        <span className="module-card__category">
          <Icon size={16} aria-hidden="true" />
          {module.category}
        </span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
      <span>
        <span className="module-card__name">{module.name}</span>
        <span className="module-card__subtitle">{module.subtitle}</span>
      </span>
      <span className="module-card__meta">
        <span>{module.hp} hp</span>
        <span>{module.status}</span>
      </span>
      <span
        className="module-card__glow"
        style={{ background: module.accentSoft }}
        aria-hidden="true"
      />
    </Link>
  );
}
