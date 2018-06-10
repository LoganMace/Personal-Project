import axios from 'axios';


const GET_POPULAR = 'GET_POPULAR';
const GET_SPECIFIC = 'GET_SPECIFIC';
// const SEARCH_MOVIE = 'SEARCH_MOVIE';
const GET_DB_MOVIE = 'GET_DB_MOVIE';


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


const initialState = {
  popularMovies: [],
  selected: {},
  savedMovie: {}
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
    default:
      return state;
  }
};