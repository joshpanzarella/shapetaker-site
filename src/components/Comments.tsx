"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function Comments() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-12 pt-10 border-t border-[var(--line-invert)]">
      <h3 className="text-2xl font-bold mb-6 text-[var(--teal)] font-display">Comments</h3>
      <Giscus
        id="comments"
        repo="[YOUR_GITHUB_USERNAME]/[YOUR_REPO_NAME]"
        repoId="[ENTER_REPO_ID_HERE]"
        category="Announcements"
        categoryId="[ENTER_CATEGORY_ID_HERE]"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
