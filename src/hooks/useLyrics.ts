"use client";

import { useState, useEffect } from "react";

export interface LyricLine {
  time: number;
  text: string;
}

export const useLyrics = (artist: string, title: string) => {
  const [lyrics, setLyrics] = useState<LyricLine[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      setIsLoading(true);
      setError(null);
      setLyrics(null);

      try {
        const queryStr = artist === "Unknown Artist" || !artist ? title : `${artist} ${title}`;
        const query = encodeURIComponent(queryStr);
        const response = await fetch(`https://lrclib.net/api/search?q=${query}`);
        const data = await response.json();

        if (data && data.length > 0) {
          // Find the best match (ideally one with syncedLyrics)
          const match = data.find((item: { syncedLyrics?: string }) => item.syncedLyrics) || data[0];

          if (match.syncedLyrics) {
            const lines = parseLRC(match.syncedLyrics);
            setLyrics(lines);
          } else if (match.plainLyrics) {
            // Fallback to plain lyrics with no timing
            const lines = match.plainLyrics.split("\n").map((line: string) => ({
              time: 0,
              text: line,
            }));
            setLyrics(lines);
          } else {
            setError("No lyrics found");
          }
        } else {
          setError("No lyrics found");
        }
      } catch (err) {
        setError("Failed to fetch lyrics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (artist && title) {
      fetchLyrics();
    }
  }, [artist, title]);

  const parseLRC = (lrc: string): LyricLine[] => {
    const lines = lrc.split("\n");
    const result: LyricLine[] = [];
    const timeRegex = /\[(\d+):(\d+\.\d+)\]/;

    lines.forEach((line) => {
      const match = timeRegex.exec(line);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseFloat(match[2]);
        const time = minutes * 60 + seconds;
        const text = line.replace(timeRegex, "").trim();
        if (text) {
          result.push({ time, text });
        }
      }
    });

    return result.sort((a, b) => a.time - b.time);
  };

  return { lyrics, isLoading, error };
};
