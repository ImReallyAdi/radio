"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LyricLine } from "@/hooks/useLyrics";
import { cn } from "@/lib/utils";

interface LyricsAgentProps {
  lyrics: LyricLine[] | null;
  currentTime: number;
  isLoading: boolean;
  error: string | null;
  albumCover?: string;
}

export const LyricsAgent: React.FC<LyricsAgentProps> = ({
  lyrics,
  currentTime,
  isLoading,
  error,
  albumCover,
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
      <div className="flex flex-col items-center justify-center h-full text-white/30 text-center px-10">
        <p className="text-xl mb-4">{error || "No lyrics available"}</p>
        <p className="text-sm">Close the tab to return to player.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto scrollbar-hide py-[50vh] px-8 transition-all duration-500"
    >
      <div className="max-w-2xl mx-auto space-y-8">
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
                opacity: isActive ? 1 : (isBefore ? 0.4 : 0.2),
                scale: isActive ? 1.05 : 1,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className={cn(
                "text-3xl md:text-5xl font-bold text-center cursor-default transition-colors duration-500",
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
