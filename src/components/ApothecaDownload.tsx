"use client";

import { useEffect, useState } from "react";
import {
  type ApothecaRelease,
  fetchApothecaRelease,
  megabytes,
} from "@/lib/apotheca-release";

// The download's build number and size. The page is built with the numbers GitHub had at build
// time; the browser then asks GitHub again, so a newer image shows without a redeploy.
export function ApothecaBuildNote({
  initial,
  className,
}: {
  initial: ApothecaRelease;
  className?: string;
}) {
  const [release, setRelease] = useState(initial);

  useEffect(() => {
    let live = true;
    fetchApothecaRelease({ cache: "no-store" }).then((fresh) => {
      if (live && fresh) setRelease(fresh);
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <span className={className}>
      build {release.build} · {megabytes(release.bytes)} · etch to microSD
    </span>
  );
}
