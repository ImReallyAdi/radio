"use client";

import { useState, useCallback, useEffect } from "react";
import { TRACKS } from "@/lib/tracks";

export const useStation = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [initialOffset, setInitialOffset] = useState(0);
  const [mounted, setMounted] = useState(false);

  const calculateSync = useCallback((nudge = 0) => {
    const totalDuration = TRACKS.reduce((acc, t) => acc + (t.duration || 0), 0);
    const now = Math.floor(Date.now() / 1000) + nudge;
    const elapsedTotal = now % totalDuration;

    let cumulative = 0;
    for (let i = 0; i < TRACKS.length; i++) {
      const trackDuration = TRACKS[i].duration || 180;
      if (elapsedTotal < cumulative + trackDuration) {
        setCurrentTrackIndex(i);
        setInitialOffset(elapsedTotal - cumulative);
        return;
      }
      cumulative += trackDuration;
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    calculateSync();
    const interval = setInterval(calculateSync, 30000);
    return () => clearInterval(interval);
  }, [calculateSync]);

  const currentTrack = TRACKS[currentTrackIndex];

  const nextTrack = useCallback(() => {
    // Nudge forward by 5 seconds to ensure we transition to the next track if we're at the end
    calculateSync(5);
  }, [calculateSync]);

  const prevTrack = useCallback(() => {
    calculateSync();
  }, [calculateSync]);

  // To prevent hydration mismatch, we ensure the first render matches SSR (TRACKS[0], offset 0)
  // and then update once mounted.
  // Wait, if we return DIFFERENT values after mounting, we must handle it correctly.

  return {
    currentTrack: mounted ? currentTrack : TRACKS[0],
    initialOffset: mounted ? initialOffset : 0,
    nextTrack,
    prevTrack,
    hasHistory: false,
  };
};
