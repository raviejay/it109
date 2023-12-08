const BASE_URL = 'https://api.genius.com';

interface GeniusSearchHit {
  result: {
    id: number;
  };
}


const useLyrics = async (artist: string, title: string): Promise<string> => {
  try {
    // Search for the song
    const searchUrl = new URL(`${BASE_URL}/search`);
    searchUrl.searchParams.append('q', `${artist} && ${title}`);

    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GENIUS_API_KEY}`,
      },
    });

    const searchData = await searchResponse.json();
    const hits: GeniusSearchHit[] = searchData.response.hits;

    if (hits.length > 0) {
      // Get lyrics using the song ID
      const songId = hits[0].result.id;
      const lyricsUrl = new URL(`${BASE_URL}/songs/${songId}`);

      const lyricsResponse = await fetch(lyricsUrl.toString(), {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GENIUS_API_KEY}`,
        },
      });

      const lyricsData = await lyricsResponse.json();
      const lyrics: string = lyricsData.response.song.lyrics;

      return lyrics;
    } else {
      throw new Error('Lyrics not found');
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    throw error;
  }
};

export default useLyrics;
