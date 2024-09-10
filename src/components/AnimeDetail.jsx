import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID del anime desde la URL

export const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}/episodes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  return (
    <div>
      <h1>{anime.attributes.canonicalTitle}</h1>
      <img
        src={anime.attributes.posterImage.large} // O cualquier otra propiedad de imagen
        alt={anime.attributes.canonicalTitle}
        className="anime-detail-image"
      />
      <p>{anime.attributes.synopsis}</p>
      {/* Añade más detalles del anime aquí */}
    </div>
  );
};

export default AnimeDetail;

