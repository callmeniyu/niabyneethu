"use client";

import { useEffect, useRef, useState } from "react";

export interface LazyVideoProps {
  src: string;
  className?: string;
  ariaLabel?: string;
  autoPlay?: boolean;
  /**
   * Distance before entering the viewport at which the video source attaches and starts loading.
   * Keeps initial page load free of offscreen video downloads while buffering just before scroll-in.
   */
  loadRootMargin?: string;
  /**
   * Margin around the viewport within which the loaded video actively plays.
   * Outside this zone the video pauses without detaching its source, preventing repeated downloads.
   */
  playbackRootMargin?: string;
}

function attemptMutedPlay(video: HTMLVideoElement) {
  if (!video.paused) return;
  video.muted = true;
  video.defaultMuted = true;
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Gracefully ignore browser autoplay restrictions or transient aborts.
    });
  }
}

export default function LazyVideo({
  src,
  className,
  ariaLabel,
  autoPlay = true,
  loadRootMargin = "250px 0px",
  playbackRootMargin = "100px 0px",
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);
  const isInPlaybackZoneRef = useRef(false);
  const autoPlayRef = useRef(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);

  autoPlayRef.current = autoPlay;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (typeof IntersectionObserver === "undefined") {
      hasLoadedRef.current = true;
      isInPlaybackZoneRef.current = true;
      setIsLoaded(true);
      return;
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (hasLoadedRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            hasLoadedRef.current = true;
            setIsLoaded(true);
            loadObserver.disconnect();
            break;
          }
        }
      },
      { rootMargin: loadRootMargin, threshold: 0 },
    );

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInPlaybackZoneRef.current = entry.isIntersecting;
          if (!hasLoadedRef.current) continue;

          if (entry.isIntersecting && autoPlayRef.current) {
            attemptMutedPlay(video);
          } else if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        }
      },
      { rootMargin: playbackRootMargin, threshold: 0 },
    );

    loadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [loadRootMargin, playbackRootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    if (autoPlay && isInPlaybackZoneRef.current) {
      attemptMutedPlay(video);
    } else if (!autoPlay && !video.paused) {
      video.pause();
    }
  }, [autoPlay, isLoaded]);

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video || !autoPlayRef.current || !isInPlaybackZoneRef.current) return;
    attemptMutedPlay(video);
  };

  return (
    <video
      ref={videoRef}
      className={className}
      src={isLoaded ? src : undefined}
      muted
      loop
      playsInline
      preload={isLoaded ? (autoPlay ? "auto" : "metadata") : "none"}
      aria-label={ariaLabel}
      onCanPlay={handleCanPlay}
    />
  );
}
