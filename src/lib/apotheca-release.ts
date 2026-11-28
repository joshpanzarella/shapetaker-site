// Where Apotheca's downloads live: the files on the repo's main branch, which every ship updates.
// The card image's build number is in dist/firmware/IMAGE_BUILD (written when an image is shipped).

const RAW = "https://raw.githubusercontent.com/joshpanzarella/apotheca/main";

export const APOTHECA_IMAGE_URL =
  "https://github.com/joshpanzarella/apotheca/raw/main/dist/firmware/apotheca-rg40xxv.img.gz";
export const APOTHECA_IMAGE_RAW = `${RAW}/dist/firmware/apotheca-rg40xxv.img.gz`;
export const APOTHECA_IMAGE_BUILD_RAW = `${RAW}/dist/firmware/IMAGE_BUILD`;
export const APOTHECA_INSTALL_URL =
  "https://github.com/joshpanzarella/apotheca/blob/main/INSTALL.md";

export interface ApothecaRelease {
  build: string;
  bytes: number;
}

// Used only if GitHub cannot be reached at build time and in the browser.
export const APOTHECA_RELEASE_FALLBACK: ApothecaRelease = { build: "989", bytes: 39249967 };

export function megabytes(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

// Reads the build number and the image's size from GitHub. Returns null when either cannot be read.
export async function fetchApothecaRelease(init?: RequestInit): Promise<ApothecaRelease | null> {
  try {
    const [buildRes, imageRes] = await Promise.all([
      fetch(APOTHECA_IMAGE_BUILD_RAW, init),
      fetch(APOTHECA_IMAGE_RAW, { ...init, method: "HEAD" }),
    ]);
    if (!buildRes.ok || !imageRes.ok) return null;
    const build = (await buildRes.text()).trim();
    const bytes = Number(imageRes.headers.get("content-length"));
    if (!/^\d+$/.test(build) || !Number.isFinite(bytes) || bytes <= 0) return null;
    return { build, bytes };
  } catch {
    return null;
  }
}
