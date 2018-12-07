import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import movieReducer from './ducks/movieReducer';
import userReducer from './ducks/userReducer';
import reviewReducer from './ducks/reviewReducer';
import followReducer from './ducks/followReducer';

const combinedReducers = combineReducers({
  movie: movieReducer,
  user: userReducer,
  review: reviewReducer,
  follow: followReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;