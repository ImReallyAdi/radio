"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Share2, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";

import { cn } from "@/lib/utils";

interface UIAgentProps {
  track: {
    title: string;
    artist: string;
    id: string;
  };
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (volume: number) => void;
  onShowLyrics: () => void;
  showLyrics: boolean;
}

export const UIAgent: React.FC<UIAgentProps> = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onVolumeChange,
  onShowLyrics,
  showLyrics,
}) => {
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const thumbnailUrl = `https://img.youtube.com/vi/${track.id}/maxresdefault.jpg`;

  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-700",
      showLyrics ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
    )}>
      {/* Album Art Section */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
        <BlurFade delay={0.2} inView>
          <motion.div
            key={track.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-square w-full max-w-[80vw] md:max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group"
          >
            <img
              src={thumbnailUrl}
              alt={track.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </motion.div>
        </BlurFade>
      </div>

      {/* Info & Controls Section */}
      <div className="p-6 md:p-8 pb-8 md:pb-20 space-y-6 md:space-y-8 bg-gradient-to-t from-black/40 to-transparent">
        <div className="space-y-1 md:space-y-2">
          <BlurFade delay={0.3} inView>
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight line-clamp-2">
              {track.title}
            </h1>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="text-lg md:text-2xl text-white/60 font-medium line-clamp-1">
              {track.artist}
            </h2>
          </BlurFade>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/40 font-medium tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            className="p-4 text-white/80 hover:text-white transition-colors active:scale-90"
          >
            <SkipBack size={32} fill="currentColor" />
          </button>

          <button
            onClick={onTogglePlay}
            className="p-6 bg-white text-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl"
          >
            {isPlaying ? (
              <Pause size={40} fill="currentColor" />
            ) : (
              <Play size={40} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-4 text-white/80 hover:text-white transition-colors active:scale-90"
          >
            <SkipForward size={32} fill="currentColor" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onShowLyrics}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <Share2 size={20} />
            </button>
            <a
              href={`https://youtube.com/watch?v=${track.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>

          <div className="flex items-center gap-3 group">
            <Volume2 size={18} className="text-white/40" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onVolumeChange(parseInt(e.target.value))}
              className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
