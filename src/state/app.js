import axios from 'axios';
import { api, apiKey, imgApi } from '../utils/apis';
import {
  formatText,
  formatRating,
  formatDate,
  formatTime,
} from '../utils/helpers';

const initialState = {
  query: '',
  search: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  popularMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  selectedMovie: null,
  fetching: true,
  fetched: false,
  error: false,
  selected: null,
};
// ACTIONS
const SET_QUERY = 'SET_QUERY';
const SEARCH = 'SEARCH';
const SEARCH_FULFILLED = 'SEARCH_FULFILLED';
const SEARCH_PENDING = 'SEARCH_PENDING';
const SEARCH_REJECTED = 'SEARCH_REJECTED';
const FETCH_MOVIE = 'FETCH_MOVIE';
const FETCH_MOVIE_FULFILLED = 'FETCH_MOVIE_FULFILLED';
const FETCH_MOVIE_PENDING = 'FETCH_MOVIE_PENDING';
const FETCH_MOVIE_REJECTED = 'FETCH_MOVIE_REJECTED';
const FETCH_POPULAR = 'FETCH_POPULAR';
const FETCH_POPULAR_FULFILLED = 'FETCH_POPULAR_FULFILLED';
const FETCH_POPULAR_PENDING = 'FETCH_POPULAR_PENDING';
const FETCH_POPULAR_REJECTED = 'FETCH_MOVIE_REJECTED';

export const actionFetchPopular = () => ({
  type: FETCH_POPULAR,
  payload: axios.get(`${api}/movie/popular?api_key=${apiKey}`),
});

export const actionFetchMovie = (id) => ({
  type: FETCH_MOVIE,
  payload: axios.get(`${api}/movie/${id}?api_key=${apiKey}`),
});

export const actionSetQuery = (query) => ({ type: SET_QUERY, payload: query });

export const actionSearch = (text) => {
  const formattedSearch = formatText(text);
  return {
    type: SEARCH,
    payload: axios.get(
      `${api}/search/movie?api_key=${apiKey}&query=${formattedSearch}`,
    ),
  };
};

// REDUCERS
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_QUERY:
      return { ...state, query: payload };
    case SEARCH_PENDING:
    case FETCH_POPULAR_PENDING:
    case FETCH_MOVIE_PENDING:
      return {
        ...state, fetched: false, fetching: true, error: false,
      };
    case SEARCH_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        search: {
          ...payload.data,
          results: payload.data.results.map((movie) => ({
            ...movie,
            poster_url: movie.poster_path
              ? `${imgApi(200)}${movie.poster_path}`
              : null,
            release_date: formatDate(movie.release_date),
            rating: formatRating(movie.vote_average),
          })),
        },
      };
    case FETCH_POPULAR_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        popularMovies: {
          ...payload.data,
          results: payload.data.results.map((movie) => ({
            ...movie,
            poster_url: movie.poster_path
              ? `${imgApi(200)}${movie.poster_path}`
              : null,
            release_date: formatDate(movie.release_date),
            rating: formatRating(movie.vote_average),
          })),
        },
      };
    case FETCH_MOVIE_FULFILLED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        selectedMovie: {
          ...payload.data,
          poster_url: payload.data.poster_path
            ? `${imgApi(200)}${payload.data.poster_path}`
            : null,
          backdrop_url: payload.data.backdrop_path
            ? `${imgApi(500)}${payload.data.backdrop_path}`
            : null,
          release_date: formatDate(payload.data.release_date),
          rating: formatRating(payload.data.vote_average),
          runtime: formatTime(payload.data.runtime),
        },
      };
    case SEARCH_REJECTED:
    case FETCH_MOVIE_REJECTED:
    case FETCH_POPULAR_REJECTED:
      return {
        ...state, fetched: false, fetching: false, error: true,
      };

    default:
      return state;
  }
};
