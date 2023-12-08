"use client";

import { useEffect, useState } from 'react';
import useLyrics from "@/hooks/useLyrics";
import useGetSongById from "@/hooks/useGetSongById"; // Import your custom hook
import usePlayer from '@/hooks/usePlayer';

const SongLyrics: React.FC = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId); // Assuming useGetSongById returns song object
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        if (song) {
          const result = await useLyrics(song.author, song.title);
          setLyrics(result);
        }
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };

    fetchLyrics();
  }, [song]);

  return (
    <div>
      <h1>Music Player</h1>
      {song && (
        <>
          <p>Artist: {song.author}</p>
          <p>Title: {song.title}</p>
        </>
      )}
      <p>Lyrics: {lyrics}</p>
      
    </div>
  );
};

export default SongLyrics;
