"use client";

import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer';
import React, { useEffect, useState } from 'react';

// ... (your imports)

const LyricsProvider: React.FC = () => {
    const [lyricsHTML, setLyricsHTML] = useState<string | null>(null);
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Ensure song details are available
          if (song) {
            // Create the search query using the author and title
            const searchQuery = `${song.author}&&${song.title}`;
  
            // Make the API call with the dynamically generated search query
            const searchResponse = await fetch(
              `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchQuery}`,
              {
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': '81174aae36msh687e4186b3b4204p14bed6jsn5de58200518f',
                  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
                },
              }
            );
  
            if (searchResponse.ok) {
              const searchResult = await searchResponse.json();
  
              // Debugging log to inspect the structure of the searchResult
              console.log('Search Result:', searchResult);
  
              // Check if hits array exists and has at least one result
              if (searchResult.hits?.length > 0) {
                // Extracting the ID of the first result
                const firstResultId = searchResult.hits[0].result.id;
  
                console.log(firstResultId);
                // Second API call to get lyrics based on the extracted ID
                const lyricsResponse = await fetch(
                  `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${firstResultId}`,
                  {
                    method: 'GET',
                    headers: {
                      'X-RapidAPI-Key': '81174aae36msh687e4186b3b4204p14bed6jsn5de58200518f',
                      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
                    }
                  }
                );
  
                if (lyricsResponse.ok) {
                  const lyricsResult = await lyricsResponse.json();
  
                  // Check if lyrics HTML exists
                  if (lyricsResult.lyrics?.lyrics?.body?.html) {
                    const lyricsHtml = lyricsResult.lyrics.lyrics.body.html;
                    console.log('Lyrics HTML:', lyricsHtml);
                    setLyricsHTML(lyricsHtml);
                  } else {
                    console.error('Lyrics HTML not found');
                  }
                } else {
                  console.error('Failed to fetch lyrics');
                }
              } else {
                console.error('No search results found');
              }
            } else {
              console.error('Failed to search for the song');
            }
          } else {
            console.error('Song details not available');
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchData();
    }, [song]);
  
    return (
      <div>
        {lyricsHTML ? (
          <div dangerouslySetInnerHTML={{ __html: lyricsHTML }} />
        ) : (
          <p>Loading lyrics...</p>
        )}
      </div>
    );
  };
  
  export default LyricsProvider;
  
