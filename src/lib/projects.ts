import fs from "node:fs";
import { modules } from "@/data/modules";

export type ProjectKind = "vcv rack modules" | "audio" | "software" | "visual" | "other";

export type ProjectSummary = {
  slug: string;
  title: string;
  kind: ProjectKind;
  status: string;
  summary: string;
  href?: string;
  image?: {
    src: string;
    alt: string;
  };
  audioSamples?: {
    title: string;
    url: string;
  }[];
};

const moduleAssetNames = [
  "panel-source.png",
  "panel.png",
  "panel.webp",
  "cover.png",
  "cover.webp",
  "thumbnail.png",
  "thumbnail.webp"
];

function titleFromSlug(slug: string) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.toLowerCase())
    .join(" ");
}

function findProjectImage(publicDir: string, publicPath: string) {
  for (const assetName of moduleAssetNames) {
    const assetPath = `${publicDir}/${assetName}`;
    if (fs.existsSync(assetPath)) {
      return {
        src: `${publicPath}/${assetName}`,
        alt: `${titleFromSlug(publicDir.split("/").at(-1) ?? "project")} project image`
      };
    }
  }

  return undefined;
}

export function getProjects(): ProjectSummary[] {
  const publicModulesDir = `${process.cwd()}/public/modules`;
  const moduleProjects = new Map<string, ProjectSummary>();

  for (const moduleSpec of modules) {
    moduleProjects.set(moduleSpec.slug, {
      slug: moduleSpec.slug,
      title: moduleSpec.name,
      kind: "vcv rack modules",
      status: moduleSpec.status,
      summary: moduleSpec.summary,
      href: `/modules/${moduleSpec.slug}`,
      image: moduleSpec.panelImage
        ? {
            src: moduleSpec.panelImage.src,
            alt: moduleSpec.panelImage.alt
          }
        : undefined,
      audioSamples: moduleSpec.audioSamples
    });
  }

  if (fs.existsSync(publicModulesDir)) {
    const moduleFolders = fs
      .readdirSync(publicModulesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const slug of moduleFolders) {
      const folderPath = `${publicModulesDir}/${slug}`;
      const publicPath = `/modules/${slug}`;
      const existingProject = moduleProjects.get(slug);
      const image = findProjectImage(folderPath, publicPath);

      moduleProjects.set(slug, {
        slug,
        title: existingProject?.title ?? titleFromSlug(slug),
        kind: "vcv rack modules",
        status: existingProject?.status ?? "asset added",
        summary:
          existingProject?.summary ??
          "a module asset folder exists for this project. add module data to unlock a full manual page.",
        href: existingProject?.href,
        image: existingProject?.image ?? image
      });
    }
  }

  return Array.from(moduleProjects.values()).sort((a, b) => {
    if (a.slug === "clairaudient" && b.slug !== "clairaudient") return -1;
    if (b.slug === "clairaudient" && a.slug !== "clairaudient") return 1;
    return a.title.localeCompare(b.title);
  });
}
