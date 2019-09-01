import React from 'react';
import PropTypes from 'prop-types';
import './MoviePage.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFetchMovie } from '../../state/app';
import Spinner from '../../components/Spinner';

/**
 *
 * Displays details about a given movie
 *
 * @param {number} id the tmdb id of the selected movie
 * @param {funct} fetchMovie fetches selected movie from tmdb api
 * @param {Object} selectedMovie Movie information object
 * @param {bool} fetching Returns true when api request is being made
 * @param {bool} error Returns true if error in search fetch
 */
export class MoviePage extends React.Component {
  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
        fetchMovie,
      },
    } = this;
    fetchMovie(id);
  }

  render() {
    const {
      props: { selectedMovie: movie, fetching, error },
    } = this;
    if (error) return <div>Sorry. Something went wrong! Try refreshing.</div>;

    return (
      <main className="Movie">
        {movie && !fetching ? (
          <>
            <header className={`Movie-header ${movie.backdrop_url ? '' : 'Movie-header__no_backdrop'
            }`}
            >
              <Link to="/">
                <span className="Movie-header__back">
                  <svg
                    width="22"
                    height="25"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0435 11.3487V13.6513H6.64837L12.3215 20.2303L10.8913 21.875L2.73914 12.5L10.8913 3.125L12.3692 4.76974L6.64837 11.3487H19.0435Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </Link>
              {movie.backdrop_url ? (
                <img
                  src={movie.backdrop_url}
                  className="Movie-header__backdrop"
                  alt="logo"
                />
              ) : null}
            </header>
            <article>
              <section
                className="Movie-summary"
              >
                {movie.poster_url ? (
                  <div className="Movie-summary__poster">
                    <img src={movie.poster_url} alt="logo" />
                  </div>
                ) : null}
                <div className="Movie-summary__body">
                  <h1 className="Movie-summary__body--title">
                    {movie.title}
                  </h1>
                  <div className="Movie-summary__body--date_rating">
                    {movie.release_date.year ? movie.release_date.year : 'Not yet dated'}
                    {' '}
&middot;
                    {movie.vote_count ? `${movie.rating.value}% User
                    Score` : 'Not yet rated'}
                  </div>
                  <div className="Movie-summary__body--runtime">
                    {movie.runtime.hours && movie.runtime.minutes ? `${movie.runtime.hours}h ${movie.runtime.minutes} min` : 'Not yet timed'}
                  </div>
                </div>
              </section>
              <hr />
              <section className="Movie-overview">
                <h2 className="Movie-overview__title">Overview</h2>
                <p className="Movie-overview__body">{movie.overview}</p>
              </section>
            </article>
          </>
        ) : (
          <Spinner />
        )}
      </main>
    );
  }
}
MoviePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchMovie: PropTypes.func.isRequired,
  selectedMovie: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    backdrop_url: PropTypes.string,
    poster_url: PropTypes.string,
    overview: PropTypes.string,
    runtime: PropTypes.PropTypes.shape({ hours: PropTypes.number, minutes: PropTypes.number }),
    vote_count: PropTypes.number,
    rating: PropTypes.PropTypes.shape({ value: PropTypes.number }),
  }),
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

MoviePage.defaultProps = {
  selectedMovie: null,
};

export default connect(
  (state) => ({
    selectedMovie: state.app.selectedMovie,
    fetching: state.app.fetching,
    error: state.app.error,
  }),
  (dispatch) => ({
    fetchMovie: (id) => {
      dispatch(actionFetchMovie(id));
    },
  }),
)(MoviePage);
