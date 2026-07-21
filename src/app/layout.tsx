import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans"
});

// body prose — the printed-manual voice; Plex Sans remains for
// display-font fallbacks and to match the small print on the panels
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-serif"
});

export const metadata: Metadata = {
  title: "SHAPETAKER | vcv rack modules",
  description: "portfolio and manuals for shapetaker vcv rack modules."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable}`} data-scroll-behavior="smooth" lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
