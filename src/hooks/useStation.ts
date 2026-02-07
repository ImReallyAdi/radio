"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { TRACKS, Track } from "@/lib/tracks";

export const useStation = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [initialOffset, setInitialOffset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<Track[]>([]);
  const lastTrackId = useRef<string | null>(null);

  const calculateSync = useCallback(() => {
    const totalDuration = TRACKS.reduce((acc, t) => acc + (t.duration || 0), 0);
    const now = Math.floor(Date.now() / 1000);
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

  useEffect(() => {
    if (mounted && currentTrack) {
      if (lastTrackId.current !== currentTrack.id) {
        if (lastTrackId.current !== null) {
          const prevTrack = TRACKS.find(t => t.id === lastTrackId.current);
          if (prevTrack) {
            setHistory(prev => {
              if (prev.some(t => t.id === prevTrack.id)) {
                return [prevTrack, ...prev.filter(t => t.id !== prevTrack.id)].slice(0, 20);
              }
              return [prevTrack, ...prev].slice(0, 20);
            });
          }
        }
        lastTrackId.current = currentTrack.id;
      }
    }
  }, [currentTrack, mounted]);

  const nextTrack = useCallback(() => {
    // In a live radio, "next" just forces a re-sync or jumps forward
    // For now, we just re-sync to the current global time
    calculateSync();
  }, [calculateSync]);

  const prevTrack = useCallback(() => {
    calculateSync();
  }, [calculateSync]);

  return {
    currentTrack: mounted ? currentTrack : TRACKS[0],
    initialOffset: mounted ? initialOffset : 0,
    nextTrack,
    prevTrack,
    history,
  };
};
