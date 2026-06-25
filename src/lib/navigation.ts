export type NavItem = {
  href: string;
  label: string;
  labelParts?: Array<{ text: string; glyph?: boolean }>;
};

export const siteNav: NavItem[] = [
  { href: "/", label: "home" },
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
