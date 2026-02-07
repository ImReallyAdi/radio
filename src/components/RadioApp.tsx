"use client";

import React, { useState, useEffect } from "react";
import { PlaybackAgent } from "./PlaybackAgent";
import { BackgroundAgent } from "./BackgroundAgent";
import { UIAgent } from "./UIAgent";
import { LyricsAgent } from "./LyricsAgent";
import { RecentlyPlayedDrawer } from "./RecentlyPlayedDrawer";
import { useStation } from "@/hooks/useStation";
import { useLyrics } from "@/hooks/useLyrics";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

export default function RadioApp() {
  const { currentTrack, initialOffset, nextTrack, prevTrack, history } = useStation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);

  const { lyrics, isLoading: lyricsLoading, error: lyricsError } = useLyrics(
    currentTrack.artist,
    currentTrack.title
  );

  useEffect(() => {
    const savedVolume = localStorage.getItem("radio-volume");
    if (savedVolume !== null) {
      setVolume(parseInt(savedVolume));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("radio-volume", volume.toString());
  }, [volume]);

  return (
    <main className="relative h-screen w-full overflow-hidden text-white selection:bg-white/20">
      {/* Background Agent */}
      <BackgroundAgent videoId={currentTrack.id} />

      {/* Playback Agent (Hidden) */}
      <PlaybackAgent
        videoId={currentTrack.id}
        isPlaying={isPlaying && !needsInteraction}
        volume={volume}
        initialOffset={initialOffset}
        onTimeUpdate={setCurrentTime}
        onDurationChange={setDuration}
        onEnded={nextTrack}
        onReady={() => {}}
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
                className="absolute inset-0 z-20"
              >
                <LyricsAgent
                  lyrics={lyrics}
                  currentTime={currentTime}
                  isLoading={lyricsLoading}
                  error={lyricsError}
                  albumCover={`https://img.youtube.com/vi/${currentTrack.id}/maxresdefault.jpg`}
                  onClose={() => setShowLyrics(false)}
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
                  onShowHistory={() => setIsHistoryOpen(true)}
                  showLyrics={showLyrics}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <RecentlyPlayedDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
      />

      {/* Tap to Start Overlay */}
      <AnimatePresence>
        {needsInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setNeedsInteraction(false);
                setIsPlaying(true);
              }}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-xl shadow-2xl flex items-center gap-3"
            >
              <Play fill="currentColor" />
              Start Radio
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
