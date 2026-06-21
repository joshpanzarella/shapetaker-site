import { Headphones, Play } from "lucide-react";
import type { ModuleSpec } from "@/data/modules";

type MediaDockProps = {
  module: ModuleSpec;
};

export function MediaDock({ module }: MediaDockProps) {
  const hasVideo = Boolean(module.media.video);
  const hasAudio = Boolean(module.media.audio);

  return (
    <section className="media-dock" aria-label={`${module.name} media`}>
      <div className="media-dock__copy">
        <span className="eyebrow">demos</span>
        <h2>short explainers live beside the manual.</h2>
        <p>
          a focused audio or video walkthrough can sit with each module so the
          manual stays close to the sound.
        </p>
      </div>
      <div className="media-dock__players">
        {hasVideo ? (
          <video controls src={module.media.video} />
        ) : (
          <div className="media-placeholder">
            <Play size={22} aria-hidden="true" />
            <span>video slot</span>
          </div>
        )}
        {hasAudio ? (
          <audio controls src={module.media.audio} />
        ) : (
          <div className="audio-placeholder">
            <Headphones size={18} aria-hidden="true" />
            <span>audio slot</span>
          </div>
        )}
      </div>
    </section>
  );
}
