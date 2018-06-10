import axios from 'axios';

const ADD_REVIEW = 'ADD_REVIEW';
const GET_MOVIE_REVIEWS = 'GET_MOVIE_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';
const EDIT_REVIEW = 'EDIT_REVIEW';

export function addReview(title, poster_path, overview, review, userid, api_id) {
  return {
    type: ADD_REVIEW,
    payload: axios.post('/api/review', {title, poster_path, overview, review, userid, api_id})
  };
};

export function getMovieReviews(id) {
  return {
    type: GET_MOVIE_REVIEWS,
    payload: axios.get(`/api/movie/reviews/${id}`)
  };
};

export function deleteReview(id) {
  return {
    type: DELETE_REVIEW,
    payload: axios.delete(`/api/movie/reviews/${id}`)
  };
};

export function editReview(id, review) {
  return {
    type: EDIT_REVIEW,
    payload: axios.put(`/api/movie/reviews/${id}`, {review: review})
  }
}

const initialState = {
  reviews: []
};

export default function reviewReducer(state=initialState, action){
  // console.log(action.payload);
  switch (action.type) {
    case `${ADD_REVIEW}_FULFILLED`:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    case `${GET_MOVIE_REVIEWS}_FULFILLED`:
      return {
        ...state,
        reviews: action.payload.data
      };
    case `${DELETE_REVIEW}_FULFILLED`:
      return {
        ...state
      };
    case `${EDIT_REVIEW}_FULFILLED`:
      return {
        ...state
      }
    default:
      return state;
  }
};