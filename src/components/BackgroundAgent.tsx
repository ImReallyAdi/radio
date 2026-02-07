"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorThief from "colorthief";

interface BackgroundAgentProps {
  videoId: string;
}

export const BackgroundAgent: React.FC<BackgroundAgentProps> = ({ videoId }) => {
  const [dominantColor, setDominantColor] = useState<[number, number, number]>([0, 0, 0]);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = thumbnailUrl;
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setDominantColor(color);
    };
  }, [thumbnailUrl]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={videoId}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Main Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-[80px] brightness-50"
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundColor: `rgb(${dominantColor.join(",")})`
            }}
          />

          {/* Animated Gradient Overlay */}
          <div
            className="absolute inset-0 transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at center, rgba(${dominantColor.join(",")}, 0.2) 0%, rgba(0,0,0,0.8) 100%)`
            }}
          />

          {/* Subtle Grain Effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
