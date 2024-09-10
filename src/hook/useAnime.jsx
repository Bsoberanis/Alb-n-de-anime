import { useState, useEffect } from 'react';

export const useAnime = (query) => {
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchAnimes = async () => {
        try {
          const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAnimes(data.data || []);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchAnimes();
    }
  }, [query]);

  return { animes, error };
};

export default useAnime;



















