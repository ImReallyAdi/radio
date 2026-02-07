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
    // 0 is ended
    if (event.data === 0) {
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
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      enablejsapi: 1,
    },
  };

  if (!isMounted) return null;

  return (
    <div className="opacity-0 pointer-events-none absolute inset-0 -z-20">
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
