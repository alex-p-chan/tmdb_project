import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './MovieTile.scss';

const MovieTile = ({ movie }) => (
  <Link to={`/movies/${movie.id}`} key={movie.id}>
    <div className="Tile">
      <div className={`Tile-img${movie.poster_url ? '' : ' Tile-img__none'}`}>
        {movie.poster_url ? (
          <img src={movie.poster_url} alt={movie.title} />
        ) : null}
        <div
          className={`Tile-img__rating Tile-img__rating--${movie.rating.type}`}
        >
          {movie.vote_count ? `${movie.rating.value}%` : 'NYR'}
        </div>
      </div>

      <div className="Tile-title">{movie.title}</div>
      <div className="Tile-release_date">
        {movie.release_date.month && movie.release_date.year
          ? `${movie.release_date.month} ${movie.release_date.year}`
          : null}
      </div>
    </div>
  </Link>
);

MovieTile.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    poster_url: PropTypes.string,
    vote_count: PropTypes.number,
    rating: PropTypes.shape({
      value: PropTypes.number,
      type: PropTypes.string,
    }),
    release_date: PropTypes.shape({
      month: PropTypes.string,
      year: PropTypes.string,
    }),
  }).isRequired,
};


export default MovieTile;
