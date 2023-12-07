"use client";
  
  // lyricsApi.tsx

import React, { useEffect, useState } from 'react';

async function fetchData() {
    try {
      const response = await fetch("https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871", {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '81174aae36msh687e4186b3b4204p14bed6jsn5de58200518f',
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


// Your React component using fetchData
function LyricsComponent() {
  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    async function fetchLyrics() {
      try {
        const data = await fetchData();
        setLyrics(data.lyrics); // Assuming the response object has a property called 'lyrics'
      } catch (error) {
        console.error(error);
      }
    }

    fetchLyrics();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h1>Lyrics</h1>
      <p>{lyrics}</p>
    </div>
  );
}

export default LyricsComponent;



