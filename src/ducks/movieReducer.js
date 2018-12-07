import axios from 'axios';


const GET_POPULAR = 'GET_POPULAR';
const GET_SPECIFIC = 'GET_SPECIFIC';
const GET_DB_MOVIE = 'GET_DB_MOVIE';
const GET_AVERAGE = 'GET_AVERAGE';


export function getPopular() {
  return {
    type: GET_POPULAR,
    payload: axios.get('/api/popular')
  };
};

export function getSpecific(id) {
  // console.log(id);
  return {
    type: GET_SPECIFIC,
    payload: axios.get(`/api/movie/${id}`)
  };
};

export function getDbMovie(id) {
  return {
    type: GET_DB_MOVIE,
    payload: axios.get(`/api/data/${id}`) 
  };
};

export function getAverage(id) {
  return {
    type: GET_AVERAGE,
    payload: axios.get(`/api/movie/rating/${id}`)
  }
}


const initialState = {
  popularMovies: [],
  selected: {},
  savedMovie: {},
  avgRating: 0,
  totalReviews: 0
};


export default function movieReducer(state=initialState, action){
  // console.log('action payload    ', action.payload);
  switch (action.type) {
    case `${GET_POPULAR}_FULFILLED`:
      return {
        ...state,
        popularMovies: action.payload.data
      }
    case `${GET_SPECIFIC}_FULFILLED`:
      return {
        ...state,
        selected: action.payload.data
      }
    case `${GET_DB_MOVIE}_FULFILLED`:
      return {
        ...state,
        savedMovie: action.payload.data
      }
    case `${GET_AVERAGE}_FULFILLED`:
      return {
        ...state,
        avgRating: action.payload.data[0].round,
        totalReviews: action.payload.data[0].count
      }
    default:
      return state;
  }
};