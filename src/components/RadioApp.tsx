"use client";

import React, { useState } from "react";
import { PlaybackAgent } from "./PlaybackAgent";
import { BackgroundAgent } from "./BackgroundAgent";
import { UIAgent } from "./UIAgent";
import { LyricsAgent } from "./LyricsAgent";
import { useStation } from "@/hooks/useStation";
import { useLyrics } from "@/hooks/useLyrics";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function RadioApp() {
  const { currentTrack, nextTrack, prevTrack } = useStation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showLyrics, setShowLyrics] = useState(false);

  const { lyrics, isLoading: lyricsLoading, error: lyricsError } = useLyrics(
    currentTrack.artist,
    currentTrack.title
  );

  return (
    <main className="relative h-screen w-full overflow-hidden text-white selection:bg-white/20">
      {/* Background Agent */}
      <BackgroundAgent videoId={currentTrack.id} />

      {/* Playback Agent (Hidden) */}
      <PlaybackAgent
        videoId={currentTrack.id}
        isPlaying={isPlaying}
        volume={volume}
        onTimeUpdate={setCurrentTime}
        onDurationChange={setDuration}
        onEnded={nextTrack}
        onReady={() => setIsPlaying(true)}
      />

      {/* Main UI Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation Bar */}
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
          >
            <ChevronDown
              className={`transform transition-transform duration-500 ${showLyrics ? "rotate-0" : "-rotate-90"}`}
            />
          </button>
          <div className="text-sm font-bold tracking-widest uppercase opacity-40">
            {/* Branding removed */}
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {showLyrics ? (
              <motion.div
                key="lyrics"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-0"
              >
                <LyricsAgent
                  lyrics={lyrics}
                  currentTime={currentTime}
                  isLoading={lyricsLoading}
                  error={lyricsError}
                  albumCover={`https://img.youtube.com/vi/${currentTrack.id}/maxresdefault.jpg`}
                />
              </motion.div>
            ) : (
              <motion.div
                key="ui"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="absolute inset-0"
              >
                <UIAgent
                  track={currentTrack}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onNext={nextTrack}
                  onPrev={prevTrack}
                  onVolumeChange={setVolume}
                  onShowLyrics={() => setShowLyrics(true)}
                  showLyrics={showLyrics}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
