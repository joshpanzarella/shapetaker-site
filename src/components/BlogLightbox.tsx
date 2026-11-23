"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Shot = {
  src: string;
  alt: string;
  caption: string;
};

function collectShots(): Shot[] {
  const figures = Array.from(
    document.querySelectorAll(".blog-post-copy .blog-figure")
  );

  return figures.flatMap((figure) => {
    const img = figure.querySelector("img");

    if (!img) {
      return [];
    }

    const caption = figure.querySelector("figcaption");

    return [
      {
        src: img.currentSrc || img.src,
        alt: img.alt,
        caption: caption?.textContent?.trim() ?? ""
      }
    ];
  });
}

export function BlogLightbox() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const figures = Array.from(
      document.querySelectorAll(".blog-post-copy .blog-figure")
    );
    const unwraps: (() => void)[] = [];

    figures.forEach((figure) => {
      const img = figure.querySelector(":scope > img");

      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "blog-thumb-btn";
      button.setAttribute("aria-label", `enlarge image: ${img.alt}`);
      figure.insertBefore(button, img);
      button.appendChild(img);
      unwraps.push(() => {
        button.replaceWith(img);
      });
    });

    setShots(collectShots());

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.(".blog-post-copy .blog-figure button");

      if (!(button instanceof HTMLElement)) {
        return;
      }

      const figures = Array.from(
        document.querySelectorAll(".blog-post-copy .blog-figure")
      );
      const figure = button.closest(".blog-figure");
      const figureIndex = figure ? figures.indexOf(figure) : -1;

      if (figureIndex < 0) {
        return;
      }

      openerRef.current = button;
      setIndex(figureIndex);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      unwraps.forEach((unwrap) => unwrap());
    };
  }, []);

  const close = useCallback(() => {
    setIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null || shots.length === 0) {
          return current;
        }

        return (current + delta + shots.length) % shots.length;
      });
    },
    [shots.length]
  );

  useEffect(() => {
    if (index === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [index, close, step]);

  if (index === null || shots.length === 0) {
    return null;
  }

  const shot = shots[index];

  return createPortal(
    <div
      className="blog-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={close}
    >
      <div className="blog-lightbox__frame" onClick={(event) => event.stopPropagation()}>
        <div className="blog-lightbox__bar">
          <span className="blog-lightbox__count">
            {index + 1} / {shots.length}
          </span>
          <button
            ref={closeRef}
            className="blog-lightbox__close"
            type="button"
            onClick={close}
            aria-label="close enlarged image"
          >
            ✕
          </button>
        </div>
        <img src={shot.src} alt={shot.alt} />
        {shot.caption ? (
          <p className="blog-lightbox__caption">{shot.caption}</p>
        ) : null}
        {shots.length > 1 ? (
          <div className="blog-lightbox__nav">
            <button type="button" onClick={() => step(-1)} aria-label="previous image">
              ← prev
            </button>
            <button type="button" onClick={() => step(1)} aria-label="next image">
              next →
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
