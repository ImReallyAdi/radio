"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { Track } from "@/lib/tracks";

interface RecentlyPlayedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: Track[];
}

export const RecentlyPlayedDrawer: React.FC<RecentlyPlayedDrawerProps> = ({
  isOpen,
  onClose,
  history,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-white/10 backdrop-blur-2xl border-t border-white/20 rounded-t-[32px] z-50 overflow-hidden flex flex-col"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recently Played</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-4 scrollbar-hide">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40 space-y-2 py-20">
                  <Play size={48} className="opacity-20" />
                  <p>No tracks played yet</p>
                </div>
              ) : (
                history.map((track, index) => (
                  <motion.div
                    key={`${track.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
                  >
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${track.id}/default.jpg`}
                        alt={track.title}
                        className="w-14 h-14 rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={20} className="text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate text-lg">{track.title}</h3>
                      <p className="text-white/50 text-base truncate">{track.artist}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
