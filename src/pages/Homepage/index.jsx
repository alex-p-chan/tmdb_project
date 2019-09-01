import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../images/logo.svg';
import './Homepage.scss';
import { validateText } from '../../utils/helpers';
import {
  actionSetQuery,
  actionSearch,
  actionFetchPopular,
} from '../../state/app';
import Spinner from '../../components/Spinner';
import MovieContent from '../../components/MovieContent';

/**
 *
 * Homepage
 *
 * @param {funct} fetchPopular Fetches popular movies from tmdb api
 * @param {funct} handleChange Updates search text change and will search, if valid
 * @param {string} query The value of the seach text
 * @param {Object} search Search results object
 * @param {funct} popularMovies Popular movie results object.
 * @param {bool} fetching Returns true when api request is being made
 * @param {bool} error Returns true if error in search fetch
 *
 * @todo tighten the assignment of state to props
 *
 */

export class Homepage extends React.Component {
  componentDidMount() {
    const {
      props: { fetchPopular },
    } = this;
    fetchPopular();
  }

  render() {
    const {
      props: {
        handleChange, fetching, query, search, popularMovies, error,
      },
    } = this;
    const movies = query ? search.results : popularMovies.results;
    if (error) return <div>Sorry. Something went wrong! Try refreshing.</div>;
    return (
      <div className="Homepage">
        <header className="Homepage-header">
          <img src={logo} className="Homepage-logo" alt="logo" />
        </header>
        <main>
          <section className="Homepage-search">
            <input
              className="Homepage-search__input"
              placeholder="Search"
              onChange={handleChange}
              value={query}
              type="search"
            />
          </section>
          <section>
            <h2 className="Homepage-title">{query ? 'Search Results' : 'Popular Movies'}</h2>
            <div className="Homepage-results">
              {fetching ? <Spinner /> : <MovieContent movies={movies} />}
            </div>
          </section>
        </main>
      </div>
    );
  }
}
Homepage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  query: PropTypes.string.isRequired,
  search: PropTypes.shape({
    results: PropTypes.arrayOf(
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
  }).isRequired,
  popularMovies: PropTypes.shape({
    results: PropTypes.arrayOf(
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
  }).isRequired,
  fetchPopular: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};
export default connect(
  (state) => ({ ...state.app }),
  (dispatch) => ({
    handleChange: ({ target: { value } }) => {
      dispatch(actionSetQuery(value));
      if (validateText(value)) dispatch(actionSearch(value));
    },
    fetchPopular: () => dispatch(actionFetchPopular()),
  }),
)(Homepage);
