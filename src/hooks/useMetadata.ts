"use client";

import { useState, useEffect } from "react";

export interface Metadata {
  title: string;
  artist: string;
  artworkUrl: string | null;
}

export const useMetadata = (
  initialTitle: string,
  initialArtist: string,
  itunesId?: string,
  metadataSearch?: string
) => {
  const [metadata, setMetadata] = useState<Metadata>({
    title: initialTitle,
    artist: initialArtist,
    artworkUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        let url = "";
        if (itunesId) {
          url = `https://itunes.apple.com/lookup?id=${itunesId}`;
        } else {
          const queryStr = metadataSearch || (initialArtist === "Unknown Artist" || !initialArtist
            ? initialTitle
            : `${initialArtist} ${initialTitle}`);
          const query = encodeURIComponent(queryStr);
          url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setMetadata({
            title: result.trackName || initialTitle,
            artist: result.artistName || initialArtist,
            artworkUrl: result.artworkUrl100 ? result.artworkUrl100.replace("100x100bb.jpg", "1000x1000bb.jpg") : null,
          });
        } else {
          setMetadata({
            title: initialTitle,
            artist: initialArtist,
            artworkUrl: null,
          });
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setMetadata({
          title: initialTitle,
          artist: initialArtist,
          artworkUrl: null,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (initialTitle) {
      fetchMetadata();
    }
  }, [initialTitle, initialArtist, itunesId, metadataSearch]);

  return { metadata, isLoading };
};
