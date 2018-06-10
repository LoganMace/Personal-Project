import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import movieReducer from './ducks/movieReducer';
import userReducer from './ducks/userReducer';
import reviewReducer from './ducks/reviewReducer';

const combinedReducers = combineReducers({
  movie: movieReducer,
  user: userReducer,
  review: reviewReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;