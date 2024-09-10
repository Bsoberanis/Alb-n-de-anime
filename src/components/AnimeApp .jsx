import React, { useState, useEffect } from 'react';
import { useAnime } from '../hook/useAnime';
import useEpisodes from '../hook/useEpisodios';
import '../diseñoApp/diseñoApp.css';

export const AnimeApp = () => {
  const [query, setQuery] = useState('');
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [animeQuery, setAnimeQuery] = useState('');
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { animes, error } = useAnime(animeQuery);
  const { episodes, loadingEpisodes, error: episodesError, fetchEpisodes } = useEpisodes(selectedAnimeId);

  useEffect(() => {
    if (selectedAnimeId) {
      fetchEpisodes(); // Fetch episodes when an anime is selected
    }
  }, [selectedAnimeId, fetchEpisodes]);

  const handleSearch = () => {
    setAnimeQuery(query);
    setSelectedAnimeId(null); // Reset selectedAnimeId when searching
    setShowEpisodes(false); // Hide episodes when searching
  };

  const handleAnimeClick = (animeId, event) => {
    setSelectedAnimeId(animeId);
    setShowEpisodes(true);

    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setPosition({ top: top + height + window.scrollY, left: left + window.scrollX });
  };

  const createSearchBar = () => {
    return React.createElement('div', { className: 'search-bar' },
      React.createElement('input', {
        type: 'text',
        value: query,
        onChange: (e) => setQuery(e.target.value),
        placeholder: 'Search for an anime...'
      }),
      React.createElement('button', { onClick: handleSearch }, 'Search')
    );
  };

  const createErrorMessage = (message) => {
    return message ? React.createElement('p', { className: 'error' }, message) : null;
  };

  const createAnimeItem = (anime, isSelected) => {
    return React.createElement('div', {
      key: anime.id,
      className: `anime-item ${isSelected ? 'selected' : ''}`,
      onClick: (e) => handleAnimeClick(anime.id, e)
    },
      React.createElement('img', {
        src: anime.attributes.posterImage.original || '/path/to/default/image.jpg',
        alt: anime.attributes.canonicalTitle,
        className: 'anime-list-image'
      }),
      React.createElement('h2', null, anime.attributes.canonicalTitle),
      React.createElement('p', null, anime.attributes.synopsis)
    );
  };

  const createAnimeList = () => {
    if (animes.length > 0) {
      return React.createElement('div', { className: 'anime-list' },
        animes.map((anime) => createAnimeItem(anime, selectedAnimeId === anime.id))
      );
    } else {
      return React.createElement('p', null, 'No animes found.');
    }
  };

  const createEpisodeList = () => {
    if (loadingEpisodes) {
      return React.createElement('p', null, 'Loading episodes...');
    } else if (episodes && episodes.length > 0) {
      return React.createElement('ul', { className: 'episode-list' },
        episodes.map((episode) =>
          React.createElement('li', { key: episode.id },
            React.createElement('h3', null, episode.attributes.canonicalTitle),
            React.createElement('p', null, `Air Date: ${episode.attributes.airdate}`)
          )
        )
      );
    } else {
      return React.createElement('p', null, 'No episodes found.');
    }
  };

  const createEpisodesPopup = () => {
    if (showEpisodes && selectedAnimeId) {
      return React.createElement('div', {
        className: 'episodes-popup',
        style: { top: position.top, left: position.left }
      },
        React.createElement('h2', null, 'Episodes'),
        createEpisodeList(),
        episodesError && createErrorMessage(episodesError),
        React.createElement('button', { onClick: () => setShowEpisodes(false) }, 'Close')
      );
    }
    return null;
  };

  return React.createElement('div', { className: 'app-container' },
    createSearchBar(),
    createErrorMessage(error),
    createAnimeList(),
    createEpisodesPopup()
  );
};

export default AnimeApp;
