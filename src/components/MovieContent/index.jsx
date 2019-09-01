import React from 'react';
import PropTypes from 'prop-types';
import MovieTile from '../MovieTile';

const MovieContent = ({ movies }) => (movies.length ? (
  movies.map((movie) => <MovieTile movie={movie} key={movie.id} />)
) : (
  <div>
      No movies could be found
  </div>
));
MovieContent.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
};

MovieContent.defaultProps = {
  movies: [],
};

export default MovieContent;
