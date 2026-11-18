import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "@/components/icons";

/**
 * Hero video with autoplay-muted inline playback, mute/unmute and
 * play/pause controls, viewport-aware pause/resume, and a poster
 * fallback. Respects prefers-reduced-motion.
 */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Viewport-aware playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !userPausedRef.current && !reducedMotion) {
            video.play().catch(() => {});
            setPlaying(true);
          } else {
            video.pause();
            setPlaying(false);
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
        setPlaying(false);
      } else if (!userPausedRef.current && !reducedMotion) {
        video.play().catch(() => {});
        setPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reducedMotion]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      userPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20"
      />
      <div className="absolute right-3 bottom-3 z-20 flex items-center gap-2 sm:right-5 sm:bottom-5">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          {playing ? <Pause /> : <Play />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
      </div>
    </div>
  );
}
