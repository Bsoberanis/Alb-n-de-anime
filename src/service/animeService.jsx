const base_url = 'https://kitsu.io/api/edge'; // URL base de la API de animes

// Función para buscar animes
export const reqAnime = async (query) => {
    try {
        // Consulta a la API de animes
        const response = await fetch(`${base_url}/anime?filter[text]=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map(anime => ({
            id: anime.id,
            title: anime.attributes.canonicalTitle, // Asegúrate de usar la propiedad correcta
            imageUrl: anime.attributes.posterImage.small, // Asegúrate de usar la propiedad correcta
            description: anime.attributes.synopsis // Asegúrate de usar la propiedad correcta
        }));
    } catch (err) {
        console.error("Error in reqAnime:", err);
        return [];
    }
};

// Función para obtener episodios de un anime
export const reqEpisodes = async (animeId) => {
    try {
        // Consulta a la API de episodios para un anime específico
        const response = await fetch(`${base_url}/anime/${animeId}/episodes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map(episode => ({
            id: episode.id,
            title: episode.attributes.canonicalTitle, // Asegúrate de usar la propiedad correcta
            airDate: episode.attributes.airdate // Asegúrate de usar la propiedad correcta
        }));
    } catch (err) {
        console.error("Error in reqEpisodes:", err);
        return [];
    }
};


