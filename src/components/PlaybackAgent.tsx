"use client";

import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

interface PlaybackAgentProps {
  videoId: string;
  isPlaying: boolean;
  volume: number;
  initialOffset?: number;
  onTimeUpdate: (currentTime: number) => void;
  onDurationChange: (duration: number) => void;
  onEnded: () => void;
  onReady: () => void;
  onTogglePlay: (isPlaying: boolean) => void;
}

export const PlaybackAgent: React.FC<PlaybackAgentProps> = ({
  videoId,
  isPlaying,
  volume,
  initialOffset = 0,
  onTimeUpdate,
  onDurationChange,
  onEnded,
  onReady,
  onTogglePlay,
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(initialOffset, true);
    }
  }, [videoId, initialOffset]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      try {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          onTimeUpdate(playerRef.current.getCurrentTime());
        }
      } catch {
        // Ignore
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onTimeUpdate]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
    onDurationChange(playerRef.current.getDuration());

    if (initialOffset > 0 && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(initialOffset, true);
    }

    if (isPlaying) {
      playerRef.current.playVideo();
    }
    onReady();
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    // YouTube state codes:
    // 1 = playing, 2 = paused, 0 = ended, 3 = buffering, 5 = cued
    if (event.data === 1) {
      onTogglePlay(true);
    } else if (event.data === 2) {
      onTogglePlay(false);
    } else if (event.data === 0) {
      onEnded();
    }

    if (event.target) {
      onDurationChange(event.target.getDuration());
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 0,
      rel: 0,
      enablejsapi: 1,
    },
  };

  if (!isMounted) return null;

  return (
    <div className="fixed top-4 right-4 w-48 md:w-64 aspect-video rounded-xl overflow-hidden shadow-2xl z-50 border border-white/10 transition-all hover:scale-105">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        onEnd={onEnded}
      />
    </div>
  );
};
