"use client";

import React from "react";
import { Play, Pause, Volume2, Share2, Youtube, ListMusic } from "lucide-react";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";

import { cn } from "@/lib/utils";

interface UIAgentProps {
  track: {
    title: string;
    artist: string;
    id: string;
  };
  artworkUrl?: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleLyrics: () => void;
}

export const UIAgent: React.FC<UIAgentProps> = ({
  track,
  artworkUrl,
  isPlaying,
  currentTime,
  duration,
  volume,
  onTogglePlay,
  onVolumeChange,
  onToggleLyrics,
}) => {
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: "Radio",
      text: `Listening to ${track.title} by ${track.artist} on Radio`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayArtwork = artworkUrl || `https://img.youtube.com/vi/${track.id}/maxresdefault.jpg`;

  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-700"
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
              src={displayArtwork}
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
          <div className="flex justify-between items-center text-xs text-white/40 font-medium tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-red-500/10 text-red-500 font-bold tracking-wider text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center">
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
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLyrics}
              className="p-2 text-white/40 hover:text-white transition-colors"
              title="Lyrics"
            >
              <ListMusic size={20} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-white/40 hover:text-white transition-colors"
              title="Share"
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
