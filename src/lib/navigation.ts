export type NavItem = {
  href: string;
  label: string;
  labelParts?: Array<{ text: string; glyph?: boolean; fontSize?: string; top?: string; marginLeft?: string; marginRight?: string; fontFamily?: string; fontWeight?: string }>;
};

export const siteNav: NavItem[] = [
  {
    href: "/",
    label: "home",
    labelParts: [
      { text: "♄", glyph: true, fontSize: "1.64em", top: "-0.07em", fontFamily: '"Noto Sans Symbols 2", "Segoe UI Symbol", "Apple Symbols", sans-serif', fontWeight: "300" },
      { text: "ome" },
    ],
  },
  {
    href: "/projects",
    label: "projects",
    labelParts: [
      { text: "projec" },
      { text: "†", glyph: true, fontSize: "1.15em", top: "-0.06em" },
      { text: "s" },
    ],
  },
  {
    href: "/manuals",
    label: "manuals",
    labelParts: [
      { text: "manu" },
      { text: "△", glyph: true, fontSize: "0.85em" },
      { text: "ls" },
    ],
  },
  {
    href: "/blog",
    label: "notes",
    labelParts: [
      { text: "n" },
      { text: "☉", glyph: true, fontSize: "1.35em", top: "0em", marginLeft: "-0.24em", marginRight: "-0.20em" },
      { text: "tes" },
    ],
  },
];
