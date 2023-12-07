"use client";

// SongLyrics.tsx

import React, { useEffect, useState } from "react";
import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import axios from "axios"; // Make sure to install axios using npm install axios

const SongLyrics = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [lyrics, setLyrics] = useState<string | null>(null);

  useEffect(() => {
    // Check if both author and title are available
    if (song?.author && song?.title) {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const apiUrl = `YOUR_API_ENDPOINT?author=${encodeURIComponent(song.author)}&title=${encodeURIComponent(song.title)}`;

      axios.get(apiUrl)
        .then(response => {
          // Assuming the API returns lyrics as a string
          setLyrics(response.data.lyrics);
        })
        .catch(error => {
          console.error("Error fetching lyrics:", error);
        });
    }
  }, [song]);

  return (
    <div>
      {lyrics ? (
        <div>
          <h2>{song?.title} - {song?.author}</h2>
          <p>{lyrics}</p>
        </div>
      ) : (
        <p>Loading lyrics...</p>
      )}
    </div>
  );
};

export default SongLyrics;
