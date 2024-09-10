// Función para obtener episodios de un anime
export const reqEpisodes = async (animeId) => {
    try {
        const response = await fetch(`${base_url}/anime/${animeId}/episodes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map(episode => ({
            id: episode.id,
            title: episode.attributes.canonicalTitle,
            airDate: episode.attributes.airdate
        }));
    } catch (err) {
        console.error("Error in reqEpisodes:", err);
        return [];
    }
};