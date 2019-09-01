/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './utils/serviceWorker';
import MoviePage from './pages/MoviePage';
import Homepage from './pages/Homepage';
import rootReducer from './state';

const middleware = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk, promise)
  : applyMiddleware(thunk, promise, logger);
const createStore = () => reduxCreateStore(rootReducer, middleware);
ReactDOM.render(
  <Provider store={createStore()}>
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route path="/movies/:id" component={MoviePage} />
    </Router>
  </Provider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
