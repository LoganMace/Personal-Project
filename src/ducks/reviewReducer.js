import axios from 'axios';

const ADD_REVIEW = 'ADD_REVIEW';
const GET_MOVIE_REVIEWS = 'GET_MOVIE_REVIEWS';
const DELETE_REVIEW = 'DELETE_REVIEW';
const SAVE_EDIT = 'SAVE_EDIT';
// const CLICK_EDIT = 'CLICK_EDIT';

export function addReview(title, poster_path, overview, rating, review, userid, api_id) {
  return {
    type: ADD_REVIEW,
    payload: axios.post('/api/review', {title, poster_path, overview, rating, review, userid, api_id})
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

export function saveEdit(id, review) {
  return {
    type: SAVE_EDIT,
    payload: axios.put(`/api/movie/reviews/${id}`, {review: review})
  };
};
// export function clickEdit(index) {
//   return {
//     type: CLICK_EDIT,
//     payload: index
//   };
// };

const initialState = {
  reviews: [],
  isLoading: false
};

export default function reviewReducer(state=initialState, action){
// console.log(action.type);
  switch (action.type) {
    case `${ADD_REVIEW}_FULFILLED`:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    // case `${GET_MOVIE_REVIEWS}_PENDING`:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    case `${GET_MOVIE_REVIEWS}_FULFILLED`:
      return {
        ...state,
        reviews: action.payload.data,
        isLoading: false
      };
    case `${DELETE_REVIEW}_FULFILLED`:
      return {
        ...state
      };
    // case `${CLICK_EDIT}_FULFILLED`:
    //   return {
    //     ...state,
    //     edit: true,
    //     reviewText: state.reviews[action.payload].review
    //   };
    case `${SAVE_EDIT}_FULFILLED`:
      return {
        ...state
      };
    default:
      return state;
  }
};