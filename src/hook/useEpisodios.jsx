// useEpisodios.jsx
import { useState, useEffect } from 'react';

const useEpisodios = () => {
    const [episodios, setEpisodios] = useState([]);

    useEffect(() => {
        // Lógica para obtener episodios (puede ser una llamada API)
        const fetchEpisodios = async () => {
            try {
                const response = await fetch('/api/episodios');
                const data = await response.json();
                setEpisodios(data);
            } catch (error) {
                console.error('Error fetching episodes:', error);
            }
        };

        fetchEpisodios();
    }, []);

    return { episodios };
};

export default useEpisodios; // Exportación por defecto








