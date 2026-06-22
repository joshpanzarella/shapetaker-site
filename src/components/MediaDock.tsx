import { Headphones } from "lucide-react";
import type { ModuleSpec } from "@/data/modules";
import { AudioPlayer } from "@/components/AudioPlayer";

type MediaDockProps = {
  module: ModuleSpec;
};

export function MediaDock({ module }: MediaDockProps) {
  const hasVideo = Boolean(module.media.video);
  const hasAudio = Boolean(module.media.audioDemos?.length);

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
        {hasVideo && <video controls src={module.media.video} />}
        {hasAudio ? (
          <AudioPlayer
            demos={module.media.audioDemos!}
            moduleName={module.name}
            moduleStatus={module.status}
          />
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
