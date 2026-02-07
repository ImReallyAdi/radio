"use client";

import { useState, useCallback, useEffect } from "react";
import { TRACKS } from "@/lib/tracks";

export const useStation = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    setCurrentTrackIndex(Math.floor(Math.random() * TRACKS.length));
  }, []);

  const currentTrack = TRACKS[currentTrackIndex];

  const nextTrack = useCallback(() => {
    setHistory((prev) => {
      const newHistory = [currentTrackIndex, ...prev].slice(0, 5);
      return newHistory;
    });

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * TRACKS.length);
    } while (
      nextIndex === currentTrackIndex ||
      history.includes(nextIndex)
    );

    setCurrentTrackIndex(nextIndex);
  }, [currentTrackIndex, history]);

  const prevTrack = useCallback(() => {
    if (history.length > 0) {
      const prevIndex = history[0];
      setHistory((prev) => prev.slice(1));
      setCurrentTrackIndex(prevIndex);
    }
  }, [history]);

  return {
    currentTrack,
    nextTrack,
    prevTrack,
    hasHistory: history.length > 0,
  };
};
