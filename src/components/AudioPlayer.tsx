"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Headphones } from "lucide-react";

type AudioPlayerProps = {
  src: string;
  moduleName: string;
  moduleStatus: string;
};

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, moduleName, moduleStatus }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => { setDuration(audio.duration); setIsLoaded(true); };
    const onEnded = () => setIsPlaying(false);
    const onCanPlay = () => setIsLoaded(true);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  }

  const progress = duration ? currentTime / duration : 0;

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="audio-player__header">
        <span className="audio-player__eyebrow">
          <Headphones size={12} aria-hidden="true" />
          demo recording
        </span>
        <span className="audio-player__status">{moduleStatus}</span>
      </div>
      <div className="audio-player__title">{moduleName}</div>
      <div className="audio-player__controls">
        <button
          className={`audio-player__btn${isPlaying ? " is-playing" : ""}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "pause" : "play"}
          disabled={!isLoaded}
        >
          {isPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
        <div
          className="audio-player__progress"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="playback position"
        >
          <div className="audio-player__track">
            <div className="audio-player__fill" style={{ width: `${progress * 100}%` }} />
            <div className="audio-player__head" style={{ left: `${progress * 100}%` }} />
          </div>
        </div>
        <div className="audio-player__time">
          <span>{formatTime(currentTime)}</span>
          <span className="audio-player__sep">/</span>
          <span>{isLoaded ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>
    </div>
  );
}
