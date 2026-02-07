"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LyricLine } from "@/hooks/useLyrics";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface LyricsAgentProps {
  lyrics: LyricLine[] | null;
  currentTime: number;
  isLoading: boolean;
  error: string | null;
  albumCover?: string;
  onClose: () => void;
}

export const LyricsAgent: React.FC<LyricsAgentProps> = ({
  lyrics,
  currentTime,
  isLoading,
  error,
  albumCover,
  onClose,
}) => {
  const activeIndex = lyrics ? lyrics.findLastIndex((line) => line.time <= currentTime) : -1;
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (activeIndex !== -1 && lineRefs.current[activeIndex] && containerRef.current) {
      const container = containerRef.current;
      const activeLine = lineRefs.current[activeIndex]!;

      const scrollTarget =
        activeLine.offsetTop - container.offsetHeight / 2 + activeLine.offsetHeight / 2;

      container.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-white/50 text-xl">
        Loading lyrics...
      </div>
    );
  }

  if (error || !lyrics) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/30 text-center px-10 relative">
        <button
          onClick={onClose}
          title="Close"
          className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
        >
          <ChevronDown size={32} />
        </button>
        <p className="text-xl mb-4">{error || "No lyrics available"}</p>
        <button
          onClick={onClose}
          className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          Return to player
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto scrollbar-hide py-[45vh] px-6 md:px-8 transition-all duration-500 relative"
    >
      <button
        onClick={onClose}
        title="Close"
        className="fixed top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90 z-20"
      >
        <ChevronDown size={32} />
      </button>
      <div className="max-w-2xl mx-auto space-y-6 md:space-y-10">
        {lyrics.map((line, index) => {
          const isActive = index === activeIndex;
          const isBefore = index < activeIndex;

          return (
            <motion.div
              key={`${index}-${line.time}`}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : (isBefore ? 0.4 : 0.15),
                scale: isActive ? 1.08 : 1,
                filter: isActive ? "blur(0px)" : "blur(2px)",
                y: isActive ? 0 : (isBefore ? -10 : 10)
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 24,
                mass: 0.8
              }}
              className={cn(
                "text-2xl md:text-5xl font-bold text-center cursor-default transition-colors duration-500 leading-tight",
                isActive ? "text-white" : "text-white/30"
              )}
            >
              {isActive && albumCover && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={albumCover}
                  className="w-16 h-16 rounded-lg mx-auto mb-4 shadow-xl"
                  alt="Album cover"
                />
              )}
              {line.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
