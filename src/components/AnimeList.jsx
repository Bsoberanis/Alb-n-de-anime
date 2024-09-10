import React from 'react';
import PropTypes from 'prop-types';

export const AnimeList = ({ animes, onShowEpisodes, selectedAnimeId, episodes, loadingEpisodes }) => {

  // Función para generar la lista de episodios
  const renderEpisodes = (animeId) => {
    if (selectedAnimeId !== animeId) return null;

    return loadingEpisodes ? (
      React.createElement('p', {}, 'Loading episodes...')
    ) : episodes.length > 0 ? (
      React.createElement(
        'ul',
        {},
        episodes.map((episode) =>
          React.createElement(
            'li',
            { key: episode.id },
            episode.attributes?.canonicalTitle || 'No title'
          )
        )
      )
    ) : (
      React.createElement('p', {}, 'No episodes available')
    );
  };

  // Función para generar la lista de animes
  const renderAnimeList = () => {
    if (animes.length === 0) {
      return React.createElement('p', {}, 'No animes found');
    }

    return animes.map((anime) =>
      React.createElement(
        'li',
        { key: anime.id },
        [
          anime.attributes?.coverImage?.original
            ? React.createElement('img', {
                src: anime.attributes.coverImage.original,
                alt: anime.attributes.canonicalTitle || 'No title',
                className: 'anime-list-image',
              })
            : React.createElement('p', {}, 'No cover image available'),
          React.createElement('p', {}, anime.attributes?.canonicalTitle || 'No title'),
          React.createElement(
            'button',
            { onClick: () => onShowEpisodes(anime.id) },
            selectedAnimeId === anime.id ? 'Hide Episodes' : 'Show Episodes'
          ),
          renderEpisodes(anime.id),
        ]
      )
    );
  };

  // JSX sin etiquetas HTML, todo con React.createElement
  return React.createElement(
    'div',
    {},
    [
      React.createElement('h2', {}, 'Anime List'),
      React.createElement('ul', {}, renderAnimeList())
    ]
  );
};

AnimeList.propTypes = {
  animes: PropTypes.array.isRequired,
  onShowEpisodes: PropTypes.func.isRequired,
  selectedAnimeId: PropTypes.string,
  episodes: PropTypes.array,
  loadingEpisodes: PropTypes.bool,
};

export default AnimeList;
















