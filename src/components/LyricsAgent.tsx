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
}

export const LyricsAgent: React.FC<LyricsAgentProps> = ({
  lyrics,
  currentTime,
  isLoading,
  error,
}) => {
  let activeIndex = -1;
  if (lyrics) {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (lyrics[i].time <= currentTime) {
        activeIndex = i;
        break;
      }
    }
  }
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
      className="h-full overflow-y-auto scrollbar-hide py-[45vh] px-6 md:px-8 transition-all duration-500"
    >
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
                "text-2xl md:text-5xl font-bold text-center cursor-default transition-colors duration-500 leading-tight",
                isActive ? "text-white" : "text-white/30"
              )}
            >
              {line.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
