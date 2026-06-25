export type NavItem = {
  href: string;
  label: string;
  labelParts?: Array<{ text: string; glyph?: boolean; fontSize?: string }>;
};

export const siteNav: NavItem[] = [
  {
    href: "/",
    label: "home",
    labelParts: [
      { text: "♄", glyph: true, fontSize: "1.44em" },
      { text: "ome" },
    ],
  },
  { href: "/projects", label: "projects" },
  {
    href: "/manuals",
    label: "manuals",
    labelParts: [
      { text: "manu" },
      { text: "△", glyph: true },
      { text: "ls" },
    ],
  },
  { href: "/blog", label: "notes" }
];
