"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Headphones } from "lucide-react";

type Demo = { title: string; src: string; description?: string };

type AudioPlayerProps = {
  demos: Demo[];
  moduleName: string;
  moduleStatus: string;
};

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ demos, moduleName, moduleStatus }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number>(0);
  const pendingPlayRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const activeDemo = demos[activeIndex];

  function startRaf() {
    const audio = audioRef.current;
    if (!audio) return;
    const tick = () => {
      setCurrentTime(audio.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopRaf() {
    cancelAnimationFrame(rafRef.current);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onMetadata = () => {
      if (isFinite(audio.duration)) { setDuration(audio.duration); setIsLoaded(true); }
    };
    const onCanPlay = () => {
      setIsLoaded(true);
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        audio.play().then(() => { setIsPlaying(true); startRaf(); }).catch(() => {});
      }
    };
    const onEnded = () => { setIsPlaying(false); stopRaf(); };

    audio.addEventListener("loadedmetadata", onMetadata);
    audio.addEventListener("durationchange", onMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);

    if (audio.readyState >= 1 && isFinite(audio.duration)) {
      setDuration(audio.duration);
      setIsLoaded(true);
    } else if (audio.readyState >= 3) {
      setIsLoaded(true);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onMetadata);
      audio.removeEventListener("durationchange", onMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      stopRaf();
    };
  }, []);

  function selectDemo(index: number) {
    if (index === activeIndex) return;
    pendingPlayRef.current = isPlaying;
    stopRaf();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoaded(false);
    setActiveIndex(index);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      stopRaf();
    } else {
      audio.play().then(() => { setIsPlaying(true); startRaf(); }).catch(() => {});
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
      <audio ref={audioRef} src={activeDemo.src} preload="metadata" />

      <div className="audio-player__header">
        <span className="audio-player__eyebrow">
          <Headphones size={12} aria-hidden="true" />
          demo recording
        </span>
        <span className="audio-player__status">{moduleStatus}</span>
      </div>

      <div className="audio-player__title">{moduleName}</div>

      {demos.length > 1 && (
        <div className="audio-player__demos" role="listbox" aria-label="demo tracks">
          {demos.map((demo, i) => (
            <button
              key={demo.src}
              role="option"
              aria-selected={i === activeIndex}
              className={`audio-player__demo-row${i === activeIndex ? " is-active" : ""}`}
              onClick={() => selectDemo(i)}
            >
              <span className="audio-player__demo-dot" aria-hidden="true" />
              {demo.title}
            </button>
          ))}
        </div>
      )}

      {activeDemo.description && (
        <p className="audio-player__description">{activeDemo.description}</p>
      )}

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
